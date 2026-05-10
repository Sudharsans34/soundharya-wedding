# Cinematic Wedding Website

A Next.js wedding invitation starter with Apple-style scroll storytelling, GSAP animations, Lenis smooth scroll, countdown, events, gallery, RSVP links, and wishes form UI.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Replace content

Main editable file:

```bash
app/page.tsx
```

Change:
- Couple names in `couple`
- Wedding date in `components/Countdown.tsx`
- Event details in `events`
- WhatsApp number in RSVP link
- Map and calendar links

## Replace images

Sample SVG placeholders are in:

```bash
public/images/
```

Replace them with real images using same filenames or update the image paths in `app/page.tsx`.

## Deploy on Vercel

1. Push this folder to GitHub
2. Import in Vercel
3. Deploy
4. Add your GoDaddy domain in Vercel Project Settings > Domains
5. Update DNS in GoDaddy as Vercel shows

## Tech

- Next.js
- Tailwind CSS
- GSAP + ScrollTrigger
- Lenis smooth scroll
- Framer Motion dependency included for future component animations
