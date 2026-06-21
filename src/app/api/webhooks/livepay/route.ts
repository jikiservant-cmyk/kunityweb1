import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const payload = JSON.parse(rawBody);

    const signatureHeader = req.headers.get('x-webhook-signature');
    if (!signatureHeader) {
      return NextResponse.json({ error: 'Missing signature' }, { status: 401 });
    }

    const secret = process.env.LIVEPAY_WEBHOOK_SECRET;
    const webhookUrl = process.env.LIVEPAY_WEBHOOK_URL;
    
    if (!secret || !webhookUrl) {
      console.error('Webhook secret or URL not configured');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const [timestampPart, signaturePart] = signatureHeader.split(',');
    const timestamp = timestampPart?.split('=')[1];
    const receivedSignature = signaturePart?.split('=')[1];

    if (!timestamp || !receivedSignature) {
      return NextResponse.json({ error: 'Invalid signature format' }, { status: 401 });
    }

    const params: Record<string, any> = {
      status: payload.status,
      customer_reference: payload.customer_reference,
      internal_reference: payload.internal_reference
    };

    const sortedKeys = Object.keys(params).sort();
    let stringToSign = webhookUrl + timestamp;
    for (const key of sortedKeys) {
        stringToSign += key + params[key];
    }

    const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(stringToSign)
        .digest('hex');

    if (receivedSignature !== expectedSignature) {
      console.error('Signature mismatch');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const { customer_reference, status } = payload; 

    if (!customer_reference) {
      return NextResponse.json({ error: 'Missing customer_reference' }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const finalStatus = status === 'Success' ? 'success' : (status === 'Failed' ? 'failed' : 'pending');

    if (finalStatus !== 'pending') {
      const { error: updateError } = await supabase
        .schema('kuntiy')
        .from('payment_requests')
        .update({ status: finalStatus })
        .eq('internal_reference', customer_reference)
        .eq('status', 'pending');

      if (updateError) {
        console.error('Failed to update payment request from webhook:', updateError);
        return NextResponse.json({ error: 'Failed to update payment record' }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
