# IRCTC Hotel Booking – static site

Plain HTML + CSS (+ ~100 lines of vanilla JS). No build step, no dependencies.

## Pages (the 5 screens in your Figma file)

| File | Screen |
|---|---|
| index.html | Home · Hotel search |
| search.html | Search results · New Delhi |
| hotel.html | Hotel & room details |
| checkout.html | Booking summary & payment |
| confirmation.html | Booking confirmation · Sample |

Flow: Home → Search → Hotel → Checkout → Confirmation (all buttons are linked).

## Run locally

    npx serve .

(or just open index.html in a browser)

## Deploy to Vercel

1. Add your photos to `images/` (see `images/README.md`).
2. Push this folder to a GitHub repo, then on vercel.com choose **Add New → Project** and import it.
   Framework Preset: **Other**. Leave Build Command and Output Directory empty. Deploy.
   – or – from this folder run `npx vercel` (and `npx vercel --prod` for production).

`vercel.json` enables clean URLs, so `/search.html` is served as `/search`.

## Customising

- Colours, spacing and fonts live in `css/styles.css` (design tokens are the `:root` variables at the top).
- Icons are Lucide icons inlined as an SVG sprite at the top of each page.
- `js/main.js` handles the payment-method tabs, checkout validation, and the Print / Download Voucher buttons.

This is a front-end demo: nothing is sent to a server and no payment is processed.
