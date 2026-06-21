import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { amount, phone, network, memberId, organizationId } = body;
    const authHeader = req.headers.get('Authorization');

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: authHeader || ''
        }
      }
    });

    // 1. Insert pending payment request into our database
    const idempotencyKey = crypto.randomUUID();
    const provider = network === 'MTN' ? 'mtn_momo' : 'airtel_money';
    const internalReference = `PAYWALL-ACTIVATE-${memberId.substring(0, 8)}`;

    const { data: request, error: insertError } = await supabase
      .schema('kuntiy')
      .from('payment_requests')
      .insert({
        organization_id: organizationId,
        member_id: memberId,
        provider: provider,
        direction: 'inbound',
        amount: amount,
        currency: 'UGX',
        phone_number: phone,
        status: 'pending',
        idempotency_key: idempotencyKey,
        internal_reference: internalReference,
      })
      .select()
      .single();

    if (insertError) {
      console.error('Failed to create payment request:', insertError);
      return NextResponse.json({ error: 'Failed to initialize payment record.' }, { status: 500 });
    }

    const livePayEndpoint = 'https://livepay.me/api/collect-money';
    
    const livePayResponse = await fetch(livePayEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.LIVEPAY_API_KEY}`,
      },
      body: JSON.stringify({
        accountNumber: process.env.LIVEPAY_ACCOUNT_NUMBER,
        phoneNumber: phone,
        amount: amount,
        currency: 'UGX',
        reference: internalReference,
        description: 'Virtual Account Card Activation'
      }),
    });

    if (!livePayResponse.ok) {
        const errorText = await livePayResponse.text();
        throw new Error('LivePay API error: ' + errorText);
    }
    const livePayData = await livePayResponse.json();

    return NextResponse.json({ 
      success: true, 
      message: 'Payment initialized successfully',
      requestId: request.id,
      livePayData
    });

  } catch (error: any) {
    console.error('Payment Error:', error);
    return NextResponse.json({ error: error.message || 'Payment processing failed.' }, { status: 500 });
  }
}
