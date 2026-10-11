import { NextResponse } from 'next/server';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const schema = z.object({
  full_name: z.string().trim().min(2).max(120),
  phone: z
    .string()
    .trim()
    .regex(/^[+\d][\d\s-]{8,18}$/, 'Invalid phone number'),
  wedding_date: z.string().trim().max(20).optional().default(''),
  wedding_venue: z.string().trim().max(200).optional().default(''),
  service_required: z.string().trim().max(80).optional().default(''),
  guest_count: z.string().trim().max(40).optional().default(''),
  message: z.string().trim().max(2000).optional().default(''),
  // Honeypot — must stay empty
  company: z.string().max(0).optional(),
});

/**
 * Stores an enquiry in Supabase (table `enquiries`) when credentials are configured.
 * The client always follows up with a pre-filled WhatsApp message, so the
 * enquiry still reaches the business if storage is unavailable.
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request' }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'Please check the form details' }, { status: 422 });
  }

  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    return NextResponse.json({ ok: true, stored: false });
  }

  const { company: _honeypot, message, ...rest } = parsed.data;
  try {
    // Supabase REST (PostgREST) insert — RLS allows anon INSERT on `enquiries`.
    const res = await fetch(`${url.replace(/\/$/, '')}/rest/v1/enquiries`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        ...rest,
        wedding_date: rest.wedding_date || null,
        additional_requirements: message || null,
      }),
      cache: 'no-store',
    });
    if (!res.ok) {
      console.error('Enquiry insert failed:', res.status, await res.text());
      return NextResponse.json({ ok: true, stored: false });
    }
  } catch (err) {
    console.error('Enquiry insert failed:', err);
    return NextResponse.json({ ok: true, stored: false });
  }
  return NextResponse.json({ ok: true, stored: true });
}
