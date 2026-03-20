# ShopHub — Online Shopping & Billing Prototype

This is a client-side prototype of an online shopping and billing site. It's inspired by the layout and UX patterns you see on e-commerce sites (e.g., search, product grid, cart sidebar, checkout & invoice) and includes animations and sound-effect hooks.

Important: This is a starting prototype for an online store. Do not copy or use any trademarked assets from other services — this project is only "inspired by" general layout patterns.

## Deployment (Netlify — Recommended)

This project is configured for **Netlify** deployment with serverless functions.

### Quick Deploy
1. Push this repo to GitHub.
2. Go to [netlify.com](https://app.netlify.com) → **Add new site** → **Import an existing project**.
3. Connect your GitHub repo and deploy — no build settings needed.

### Netlify CLI Deploy
```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

### Environment Variables (set in Netlify Dashboard → Site settings → Environment variables)
- `SECRET_KEY` — JWT signing key
- `DATABASE_URL` — Your cloud database URL (e.g., Supabase, PlanetScale)
- `GOOGLE_CLIENT_ID` — For Google OAuth (optional)
- `EMAIL_API_KEY` — For OTP emails via SendGrid/Mailgun (optional)

### Backend
All API endpoints (`/api/*`, `/admin/*`, `/send_otp`) are handled by **Netlify Functions** in `netlify/functions/`.

## Local Development
1. Clone or download this repo.
2. Put your sound effect files in `assets/sfx/` or update the paths in `index.html`.
3. Open `index.html` in a modern browser (Chrome/Edge/Firefox).
4. For backend APIs locally, run `python server.py` (port 5000) or `python app.py`.

What is included
- index.html: UI layout, markup, audio elements
- styles.css: theme, layout, and animations
- scripts.js: product data, rendering, cart, billing, invoice print/download, SFX playback
- assets/: sample image placeholders and SFX placeholder names (you need to add actual files)

Where to customize
- Replace product/menu data in `scripts.js` with your store's items.
- Replace logo and images in the directory.
- Add real sound files (.mp3/.wav) and update paths in `index.html` if needed.

License & Disclaimer
- This code is MIT-style for you to modify.
- Don't replicate any company's trademarked UX/UI assets.

Enjoy! If you'd like, I can:
- Add a backend (Flask + JSON/SQLite) for persistent orders and billing,
- Add payment integration (Stripe/PayPal test mode),
- Create server-rendered invoice PDFs,
- Or implement admin dashboard for daily reports.
