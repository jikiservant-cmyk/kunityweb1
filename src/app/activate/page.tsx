'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Loader2, ShieldCheck, CreditCard as CardIcon } from 'lucide-react';

export default function ActivateAccountPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [phone, setPhone] = useState('');
  const [network, setNetwork] = useState('MTN');
  
  useEffect(() => {
    const checkUser = async () => {
      const supabase = getSupabase() as any;
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/login');
      } else {
        setUser(session.user);
        
        // Check if user is already active. If so, redirect to wallet.
        const { data: accountsData } = await supabase
          .schema('kuntiy')
          .from('accounts')
          .select('is_active')
          .eq('member_id', session.user.id);
          
        if (accountsData && accountsData.some(acc => acc.is_active)) {
          router.push('/wallet');
        }
      }
    };
    checkUser();
  }, [router]);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || !user) return;
    
    setLoading(true);

    try {
      const supabase = getSupabase() as any;
      
      // 1. Get member details
      const { data: member } = await supabase
        .schema('kuntiy')
        .from('members')
        .select('id, organization_id')
        .eq('profile_id', user.id)
        .single();
        
      if (!member) {
        throw new Error("Member profile not found. Please contact support.");
      }

      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch('/api/payments/livepay', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({
          amount: 5000,
          phone: phone,
          network: network,
          memberId: member.id,
          organizationId: member.organization_id
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to initialize payment.');
      }

      alert('Payment initiated! Please check your phone for the USSD prompt to enter your PIN. Your Virtual Account Card will automatically activate once the payment succeeds.');
      
      // Optionally redirect user to a "waiting for payment" screen or just to wallet where it checks activation
      router.push('/wallet');

    } catch (err: any) {
      console.error(err);
      alert(err.message || 'An error occurred during payment processing.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 flex items-center justify-center bg-gray-50/50">
      <div className="container mx-auto px-4 max-w-lg">
        
        <div className="text-center mb-8">
          <div className="inline-flex justify-center items-center w-16 h-16 rounded-full bg-[#0b1f3a]/10 mb-6">
            <CardIcon className="h-8 w-8 text-[#0b1f3a]" />
          </div>
          <h1 className="text-4xl font-bold font-serif text-[#0b1f3a] mb-4">Activate Your Account</h1>
          <p className="text-gray-600">
            To proceed to your wallet, you need to purchase your Virtual Account Card.
          </p>
        </div>

        <Card className="border border-gray-100 shadow-2xl shadow-[#0b1f3a]/5">
          <CardHeader className="bg-[#0b1f3a] text-white rounded-t-xl border-b-0 pb-8">
            <CardTitle className="text-2xl font-serif flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-[#c9922a]" />
              Secure Paywall
            </CardTitle>
            <CardDescription className="text-white/80 mt-2">
              Buy a Virtual Account Card to unlock full wallet features.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="-mt-4 bg-white rounded-t-xl pt-8">
            <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center mb-8 border border-gray-100">
              <div>
                <p className="text-sm text-gray-500 font-medium">Virtual Card Fee</p>
                <p className="text-xl font-bold text-[#0b1f3a]">UGX 5,000</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500 font-medium">Powered by</p>
                <p className="font-bold text-[#c9922a] tracking-wider">LivePay</p>
              </div>
            </div>

            <form onSubmit={handlePayment} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="network">Mobile Network</Label>
                <select
                  id="network"
                  value={network}
                  onChange={(e) => setNetwork(e.target.value)}
                  className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  <option value="MTN">MTN Uganda</option>
                  <option value="Airtel">Airtel Money</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Mobile Money Number</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  required 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  placeholder="e.g. 0772 000 000"
                  className="h-11"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-[#c9922a] hover:bg-[#e8b455] text-white py-6 text-lg rounded-xl shadow-lg transition-transform hover:scale-[1.02] mt-4"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  'Pay UGX 5,000 via LivePay'
                )}
              </Button>
              
              <p className="text-xs text-center text-gray-400 mt-4 flex justify-center items-center gap-1">
                 <ShieldCheck className="w-3 h-3"/> Payments are secure and encrypted
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
