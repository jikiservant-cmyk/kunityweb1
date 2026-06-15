'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const supabase = getSupabase();
      
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (authError) {
        setError(authError.message || 'Invalid login credentials');
        return;
      }

      router.push('/wallet');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred during sign in.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-24 flex items-center justify-center bg-gray-50/50">
      <div className="container mx-auto px-4 max-w-md">
        <h1 className="text-4xl font-bold font-serif text-[#0b1f3a] text-center mb-8">Welcome Back</h1>
        
        <Card className="border border-gray-100 shadow-xl shadow-[#0b1f3a]/5">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Login to your Wallet</CardTitle>
            <CardDescription className="text-center text-sm">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm border border-red-200">
                {error}
              </div>
            )}
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  required 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="name@example.com"
                />
              </div>

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

              <Button 
                type="submit" 
                className="w-full bg-[#c9922a] hover:bg-[#e8b455] text-white py-6 text-lg rounded-xl shadow-lg transition-transform hover:scale-[1.02]"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center border-t border-gray-100 pt-6 text-sm text-gray-500">
            Don't have an account?{' '}
            <Link href="/join" className="text-[#0b1f3a] font-medium ml-1 hover:underline">
              Sign up
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
