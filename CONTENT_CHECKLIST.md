# Content status

Business details in `data/site.ts`: Sekhon Tour and Travel, +91 80542 02500 (call + WhatsApp), sukhbirsingh82635@gmail.com, 2227, Street No. 3, Old Jawahar Nagar, Amritsar, Punjab.
Fleet: Toyota Etios, Toyota Innova, Innova Crysta, Toyota Fortuner, Tempo Traveller (12–17 seats).

# Before public customer launch

- No prices, ratings, customer reviews or business statistics are invented. Cars show "Best Rates / Quote in minutes". Add real prices and approved reviews when available.
- Social media links are not included (no verified URLs). Add them to the footer when supplied.
- Images are AI-generated representative imagery (Magnific, Nano Banana 2, 1K, WebP). Replace with real fleet photos when available.
- No video exists in the project; none was generated.
- Enquiries are emailed to sukhbirsingh82635@gmail.com via FormSubmit (AJAX endpoint, `FORMSUBMIT_ENDPOINT` in `data/site.ts`) and also saved in D1 as a backup. The success screen additionally offers "Send on WhatsApp".
- **FormSubmit activation required:** the first live submission makes FormSubmit send an "Activate Form" email to the client inbox. Emails are only delivered after that link is clicked. Optionally, replace the email in `FORMSUBMIT_ENDPOINT` with the random alias FormSubmit provides after activation, to keep the address out of the page source.
- Confirm self-drive availability before advertising it (currently not advertised).
- `public/images/sekho homepage ui.png` is the design reference (2.2 MB) and is publicly served; remove it before deploying.

# Local preview notes

- `npm run dev` (Vite + workerd) crashes on this Windows machine with `ECONNRESET` during dependency optimisation. Use `npm run build` then `npm start -- --port 8787`.
- Fresh local databases need the migration: see README "Local D1 migrations".
- `next/link` is replaced by `components/site/nav-link.tsx` (plain anchors): vinext 1.0.0-beta.5 production builds break client-side Link navigation.

# Verification (2026-09-25)

- TypeScript, ESLint (0 errors) and production build pass.
- Crawled 70 internal URLs (31 routes + filter variants): all 200. All 19 referenced images load.
- Desktop 1440px and mobile 390px screenshots: no horizontal overflow, no page errors.
- Nav dropdowns, car/tour filters, Book Now prefill, destination scroller links and enquiry submission (local DB) verified.
