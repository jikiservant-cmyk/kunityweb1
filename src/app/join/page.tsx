'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export default function JoinSaccoPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [orgId, setOrgId] = useState<string | null>(null);
  
  const [savingProducts, setSavingProducts] = useState<any[]>([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: '',
    nationalId: '',
  });

  const loadOrgs = async () => {
    const supabase = getSupabase() as any;
    let { data: orgs, error } = await supabase.schema('kuntiy').from('organizations').select('id, name');
    
    if (!orgs || orgs.length === 0) {
      const { data: newOrg } = await supabase.schema('kuntiy').from('organizations').insert({
        name: 'Default Sacco',
        code: 'DEF',
        email: 'hello@def.com'
      }).select('id, name').single();
      if (newOrg) {
        orgs = [newOrg];
      }
    }
    
    if (orgs && orgs.length > 0) {
      setOrganizations(orgs);
      setOrgId(orgs[0].id);
    } else {
      setOrganizations([]);
      setError("Could not load cooperatives. " + (error?.message || ""));
    }
  };

  useEffect(() => {
    loadOrgs();
  }, []);

  useEffect(() => {
    async function loadProducts() {
      if (!orgId) {
        setSavingProducts([]);
        return;
      }
      
      const supabase = getSupabase() as any;
      const { data: products } = await supabase.schema('kuntiy').from('savings_products').select('*').eq('organization_id', orgId);
      
      if (products && products.length > 0) {
        setSavingProducts(products);
        setSelectedProductId(products[0].id);
      } else {
        const { data: newProduct } = await supabase.schema('kuntiy').from('savings_products').insert({
          organization_id: orgId,
          name: 'Standard Savings',
          code: 'STD',
          interest_rate: 5.0,
          minimum_balance: 0,
          allow_deposits: true,
          allow_withdrawals: true
        }).select('*').single();
        if (newProduct) {
          setSavingProducts([newProduct]);
          setSelectedProductId(newProduct.id);
        }
      }
    }
    loadProducts();
  }, [orgId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = getSupabase() as any;
      
      if (!orgId) {
        throw new Error("Please wait for cooperatives to load, or contact support if the issue persists.");
      }

      // 1. Sign up the user via Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            tenant_id: orgId,
            full_name: formData.fullName,
            role: 'member',
            app_type: 'sacco',
          }
        }
      });

      if (authError) throw authError;

      if (!authData.user) {
        throw new Error('No user returned after sign up.');
      }

      // 2. Insert into public.admin_profiles
      const { error: profileError } = await supabase
        .schema('public')
        .from('admin_profiles')
        .upsert({ 
          id: authData.user.id,
          full_name: formData.fullName,
          role: 'member',
          app_type: 'sacco',
          tenant_id: orgId,
        }, { onConflict: 'id' });

      if (profileError) {
        console.error('Profile creation error:', profileError);
        throw profileError;
      }

      // 3. Update kuntiy.members (initially created by public.admin_profiles trigger)
      const { data: member, error: memberError } = await supabase.schema('kuntiy').from('members').update({
        profile_id: authData.user.id,
        first_name: formData.fullName.split(' ')[0] || formData.fullName,
        last_name: formData.fullName.split(' ').slice(1).join(' ') || '',
        email: formData.email,
        phone: formData.phone,
        national_id: formData.nationalId,
      }).eq('id', authData.user.id).select('id').single();

      if (memberError) {
        console.error("Member creation error:", memberError);
      }

      if (member && selectedProductId) {
        const selectedProduct = savingProducts.find(p => p.id === selectedProductId);
        const productName = selectedProduct?.name || 'Main Wallet';
        
        // 1. Try to find existing active member_savings linked to an active account
        const { data: existingMs } = await supabase.schema('kuntiy')
          .from('member_savings')
          .select('id, account_id, accounts!inner(is_active, deleted_at)')
          .eq('organization_id', orgId)
          .eq('member_id', member.id)
          .eq('savings_product_id', selectedProductId)
          .eq('status', 'active')
          .is('deleted_at', null)
          .eq('accounts.is_active', true)
          .is('accounts.deleted_at', null)
          .limit(1)
          .maybeSingle();

        if (!existingMs) {
          // 2. Insert new account
          const { data: newAccount, error: accountError } = await supabase.schema('kuntiy').from('accounts').insert({
            organization_id: orgId,
            member_id: member.id,
            name: productName,
            account_category: 'asset',
            code: `WAL-${Math.floor(Math.random()*10000)}`,
            is_active: true,
            cached_balance: 0.00
          }).select('id').single();
          
          if (accountError) {
            console.error("Account creation error:", accountError);
          } else if (newAccount) {
            // 3. Create member_savings connection
            const { error: msError } = await supabase.schema('kuntiy').from('member_savings').insert({
              organization_id: orgId,
              member_id: member.id,
              savings_product_id: selectedProductId,
              account_id: newAccount.id,
              status: 'active'
            });
            if (msError) console.error("Member savings creation error:", msError);
          }
        }
      }

      // 4. Inform the user or redirect
      alert('Sign up successful! Please proceed to activate your Virtual Account Card.');
      router.push('/activate');
      
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred during sign up.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Join the Sacco</CardTitle>
          <CardDescription className="text-center">
            Create an account to become an investor and member.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSignUp}>
          <CardContent className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input 
                id="fullName" 
                name="fullName" 
                required 
                value={formData.fullName} 
                onChange={handleChange} 
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input 
                id="email" 
                name="email" 
                type="email" 
                required 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="john@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                name="phone" 
                type="tel" 
                required 
                value={formData.phone} 
                onChange={handleChange} 
                placeholder="+254 700 000 000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nationalId">National ID / Passport</Label>
              <Input 
                id="nationalId" 
                name="nationalId" 
                required 
                value={formData.nationalId} 
                onChange={handleChange} 
                placeholder="12345678"
              />
            </div>

            {organizations.length > 0 && (
              <div className="space-y-2">
                <Label htmlFor="orgId">Select Cooperative / Sacco</Label>
                <select
                  id="orgId"
                  value={orgId || ''}
                  onChange={(e) => setOrgId(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  {organizations.map(org => (
                    <option key={org.id} value={org.id}>
                      {org.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {savingProducts.length > 0 && (
              <div className="space-y-2">
                <Label htmlFor="selectedProductId">Select Saving Plan</Label>
                <select
                  id="selectedProductId"
                  value={selectedProductId}
                  onChange={(e) => setSelectedProductId(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  {savingProducts.map(product => (
                    <option key={product.id} value={product.id}>
                      {product.name} ({product.interest_rate}% interest)
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                name="password" 
                type="password" 
                required 
                value={formData.password} 
                onChange={handleChange} 
                placeholder="••••••••"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? 'Creating Account...' : 'Join Now'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
