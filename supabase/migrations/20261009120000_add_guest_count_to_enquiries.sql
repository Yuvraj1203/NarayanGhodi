/*
# Add guest count to enquiries

The website enquiry form collects the expected number of guests.

1. Changes
- `enquiries.guest_count` (text) — guest range selected on the form
*/

ALTER TABLE enquiries ADD COLUMN IF NOT EXISTS guest_count text;
