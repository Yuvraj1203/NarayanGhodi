/*
# Create enquiries table for wedding horse service bookings

1. New Tables
- `enquiries`
- `id` (uuid, primary key)
- `full_name` (text, not null) — customer's full name
- `phone` (text, not null) — phone number
- `whatsapp` (text) — WhatsApp number (optional)
- `wedding_date` (text) — preferred wedding date
- `wedding_venue` (text) — venue name/details
- `city` (text) — city location
- `service_required` (text) — selected service type
- `horse_preference` (text) — horse preference notes
- `decoration_preference` (text) — decoration style preference
- `expected_duration` (text) — expected service duration
- `additional_requirements` (text) — free-form notes
- `status` (text, default 'new') — enquiry status for the business owner
- `created_at` (timestamp, default now())

2. Security
- Enable RLS on `enquiries`.
- Allow anon + authenticated INSERT (public enquiry form, no sign-in).
- No SELECT/UPDATE/DELETE for anon (enquiries are private to the business owner).
- This is a single-tenant no-auth app — the enquiry form is public-facing.
*/

CREATE TABLE IF NOT EXISTS enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone text NOT NULL,
  whatsapp text,
  wedding_date text,
  wedding_venue text,
  city text,
  service_required text,
  horse_preference text,
  decoration_preference text,
  expected_duration text,
  additional_requirements text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE enquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_enquiries" ON enquiries;
CREATE POLICY "anon_insert_enquiries"
ON enquiries FOR INSERT
TO anon, authenticated
WITH CHECK (true);
