# Content status

Business details in `data/site.ts`: Sekhon Tour and Travel, +91 80542 02500 (call + WhatsApp), sukhbirsingh82635@gmail.com, 2227, Street No. 3, Old Jawahar Nagar, Amritsar, Punjab.
Fleet: Toyota Etios, Toyota Innova, Innova Crysta, Toyota Fortuner, Tempo Traveller (12–17 seats).

# Before public customer launch

- No prices, ratings, customer reviews or business statistics are invented. Cars show "Best Rates / Quote in minutes". Add real prices and approved reviews when available.
- Social media links are not included (no verified URLs). Add them to the footer when supplied.
- Images are AI-generated representative imagery (Magnific, Nano Banana 2, 1K, WebP). Replace with real fleet photos when available.
- No video exists in the project; none was generated.
- Enquiries are emailed to sukhbirsingh82635@gmail.com via FormSubmit (AJAX endpoint, `FORMSUBMIT_ENDPOINT` in `data/site.ts`) and a backup copy is stored in Netlify Forms (definition in `public/__forms.html`). The success screen additionally offers "Send on WhatsApp".
- **FormSubmit activation required:** the first live submission makes FormSubmit send an "Activate Form" email to the client inbox. Emails are only delivered after that link is clicked. Optionally, replace the email in `FORMSUBMIT_ENDPOINT` with the random alias FormSubmit provides after activation, to keep the address out of the page source.
- Confirm self-drive availability before advertising it (currently not advertised).
- `public/images/sekho homepage ui.png` is the design reference (2.2 MB) and is publicly served; remove it before deploying.

# Deployment (Netlify)

- `netlify.toml` builds a Next.js static export: `pnpm run build:netlify` → publish `out/`. It overrides the build settings in the Netlify UI.
- In Netlify: **Forms → enable form detection** once, then redeploy, so the `enquiry` form is registered. Optionally add a form notification email there.
- Canonical URLs use Netlify's `URL` build variable; set your custom domain as the primary domain in Netlify.
- The Cloudflare/vinext setup (`npm run build`, `vite.config.ts`, D1 files) is no longer used for Netlify deploys. The D1 enquiry API route was removed because static hosting cannot run it.
- All internal links end with `/` (`trailingSlash: true`); `components/site/nav-link.tsx` adds it automatically.

# Local preview

- `pnpm run build:netlify`, then serve the `out/` folder with any static file server.
