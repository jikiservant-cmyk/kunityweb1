'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Wallet, ArrowUpRight, ArrowDownRight, CreditCard, Activity, Loader2, LogOut } from 'lucide-react';

export default function WalletPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(0);
  const [deposits, setDeposits] = useState(0);
  const [loans, setLoans] = useState(0);
  const [activity, setActivity] = useState<any[]>([]);

  useEffect(() => {
    let active = true;

    const fetchWalletData = async () => {
      const supabase = getSupabase();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        if (active) router.push('/login');
        return;
      }

      if (active) setUser(session.user);
      
      try {
        // Fetch accounts for the user from public.admin_profiles which updates kuntiy.members
        // We know member_id in kuntiy matches profile_id or id. The trigger copies id to id in members.
        const memberId = session.user.id;
        
        // 1. Fetch balance from member accounts
        const { data: accountsData } = await supabase
          .schema('kuntiy')
          .from('accounts')
          .select('cached_balance')
          .eq('member_id', memberId);
          
        let totalBalance = 0;
        if (accountsData && accountsData.length > 0) {
            totalBalance = accountsData.reduce((acc, curr) => acc + Number(curr.cached_balance || 0), 0);
        }
        
        // 2. Fetch loans outstanding
        const { data: loansData } = await supabase
          .schema('kuntiy')
          .from('loans')
          .select('principal, status')
          .eq('member_id', memberId);
          
        let outstandingLoans = 0;
        if (loansData && loansData.length > 0) {
            // Include active or pending loans as owed
            outstandingLoans = loansData.reduce((acc, curr) => acc + Number(curr.principal || 0), 0);
        }

        // 3. Fetch recent activity from payment_requests
        const { data: payReqs } = await supabase
          .schema('kuntiy')
          .from('payment_requests')
          .select('direction, amount, created_at, status')
          .eq('member_id', memberId)
          .order('created_at', { ascending: false })
          .limit(4);

        if (active) {
          setBalance(totalBalance);
          setDeposits(totalBalance); // Simplified for demo, deposits = balance
          setLoans(outstandingLoans);
          setActivity(payReqs || []);
        }
      } catch (error) {
        console.error("Error fetching wallet data:", error);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchWalletData();
    return () => { active = false; };
  }, [router]);

  const handleLogout = async () => {
    const supabase = getSupabase();
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin text-[#c9922a]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#0b1f3a] font-serif">My Wallet</h1>
            <p className="text-gray-500">Welcome back, {user?.email || 'Investor'}</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
            <LogOut className="h-4 w-4" /> Sign Out
          </Button>
        </div>

        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          <Card className="bg-[#0b1f3a] text-white border-none shadow-lg">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-white/10 rounded-lg">
                  <Wallet className="h-6 w-6 text-[#c9922a]" />
                </div>
                <span className="text-xs font-medium text-[#c9922a] bg-[#c9922a]/10 px-2 py-1 rounded-full border border-[#c9922a]/20">Active</span>
              </div>
              <p className="text-white/70 text-sm font-medium mb-1">Total Balance</p>
              <h2 className="text-4xl font-bold font-serif tabular-nums">
                <span className="text-2xl mr-1 text-white/50">UGX</span>
                {balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h2>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <ArrowDownRight className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <p className="text-gray-500 text-sm font-medium mb-1">Total Deposits</p>
              <h2 className="text-2xl font-bold text-gray-900 tabular-nums">UGX {deposits.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
            </CardContent>
          </Card>

          <Card className="shadow-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-red-50 rounded-lg">
                  <ArrowUpRight className="h-6 w-6 text-red-600" />
                </div>
              </div>
              <p className="text-gray-500 text-sm font-medium mb-1">Outstanding Loans</p>
              <h2 className="text-2xl font-bold text-gray-900 tabular-nums">UGX {loans.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
            </CardContent>
          </Card>

        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - Actions & Info */}
          <div className="lg:col-span-2 space-y-8">
            <Tabs defaultValue="deposit" className="w-full">
              <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
                <TabsTrigger value="deposit">Deposit Funds</TabsTrigger>
                <TabsTrigger value="loans">Apply for Loan</TabsTrigger>
              </TabsList>
              
              <TabsContent value="deposit" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Make a Deposit</CardTitle>
                    <CardDescription>Add funds to your wallet securely via M-Pesa or Bank Transfer.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount (UGX)</Label>
                      <Input id="amount" placeholder="e.g. 5000" type="number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="method">Payment Method</Label>
                      <select id="method" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                        <option>M-Pesa Express</option>
                        <option>Bank Transfer</option>
                        <option>Card</option>
                      </select>
                    </div>
                    <Button className="w-full bg-[#c9922a] hover:bg-[#e8b455] text-white">Deposit Now</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="loans" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Request a Loan</CardTitle>
                    <CardDescription>Apply for an instant loan against your savings.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="loanAmount">Loan Amount (UGX)</Label>
                      <Input id="loanAmount" placeholder="e.g. 10000" type="number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Repayment Duration (Months)</Label>
                      <select id="duration" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                        <option>1 Month</option>
                        <option>3 Months</option>
                        <option>6 Months</option>
                        <option>12 Months</option>
                      </select>
                    </div>
                    <Button className="w-full bg-[#0b1f3a] text-white hover:bg-[#0b1f3a]/90">Calculate Eligibility & Apply</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Recent Activity */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your latest transactions and updates</CardDescription>
                </div>
                <Activity className="h-5 w-5 text-gray-400" />
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {activity.length === 0 ? (
                    <div className="text-center text-sm text-gray-500 py-4">No recent activity</div>
                  ) : activity.map((item, i) => (
                    <div key={i} className="flex items-center justify-between border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                      <div>
                        <p className="font-medium text-gray-900">
                          {item.direction === 'inbound' ? 'Deposit' : 'Withdrawal/Loan'} {item.status && `(${item.status})`}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(item.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                      <div className={`font-medium ${
                        item.direction === 'inbound' && item.status === 'completed' ? 'text-green-600' :
                        item.direction === 'outbound' ? 'text-red-600' :
                        'text-gray-500'
                      }`}>
                        {item.direction === 'inbound' ? '+' : '-'} UGX {Number(item.amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Quick Stats & Wallet Details */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Wallet Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Account Type</span>
                  <span className="font-medium">Premium Member</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">KYC Status</span>
                  <span className="font-medium text-green-600">Verified</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Loan Limit</span>
                  <span className="font-medium">UGX 50,000</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-[#c9922a] to-[#e8b455] text-white border-none shadow-md">
              <CardContent className="p-6 flex flex-col justify-between h-48">
                <div className="flex justify-between items-start">
                  <CreditCard className="h-8 w-8 text-white/80" />
                  <span className="text-sm font-medium px-2 py-1 bg-white/20 rounded">Virtual Card</span>
                </div>
                <div>
                  <p className="font-mono text-lg tracking-widest mb-1">**** **** **** 4829</p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs text-white/70 uppercase">Card Holder</p>
                      <p className="font-medium truncate max-w-[150px]">{user?.user_metadata?.full_name || 'Investor Name'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-white/70 uppercase">Expires</p>
                      <p className="font-medium">12/28</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
          </div>
        </div>

      </div>
    </div>
  );
}
