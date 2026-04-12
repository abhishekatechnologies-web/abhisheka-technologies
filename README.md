# Abhisheka Technologies

Personal consulting website and admin dashboard for [Abhisheka Technologies](https://abhisheka.tech) — Abhishek Kumar's tech consulting practice.

Built as a showcase of modern Next.js 14 patterns: App Router, SSG, server/client component separation, Framer Motion animations, and a lightweight localStorage-backed CMS — no database required.

---

## Live Site

**[abhisheka-technologies.vercel.app](https://abhisheka-technologies.vercel.app)**

---

## Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS v3 — custom Tesla-inspired design system |
| Animations | Framer Motion — scroll reveals, stagger, count-up |
| Email | EmailJS — client-side, no backend required |
| CMS | localStorage — SEO editor, case study manager, message inbox |
| Deployment | Vercel |

---

## Features

### Public site
- **Hero** — staggered Framer Motion entry animation with scroll indicator
- **About** — count-up stat cards triggered by scroll position (`useInView`)
- **Services** — 6 service cards with hover microinteractions; featured Cloud & Backend card with grouped tech panels
- **Case Studies** — 7 projects in a responsive 3-column grid, each linking to a full detail page with reading progress bar
- **Contact** — EmailJS form with per-field inline validation, loading spinner, animated success/error states, INR + USD budget options

### Admin dashboard (`/admin`)
Password-protected via `localStorage`. No backend, no auth library — intentionally lightweight for a solo-admin site.

| Route | Purpose |
|-------|---------|
| `/admin` | Overview dashboard with live stats |
| `/admin/seo` | Edit meta title, description, keywords per page; export as JSON |
| `/admin/case-studies` | Add / edit / delete case studies (built-in ones are read-only) |
| `/admin/messages` | Inbox for contact form submissions (localStorage backup) |

### SEO
- Per-page `metadata` exports and `generateMetadata` for dynamic routes
- Auto-generated `sitemap.xml` and `robots.txt` (admin excluded)
- Open Graph and Twitter card metadata

---

## Design System

Tesla-inspired — radical subtraction, whitespace as a trust signal, zero shadows or gradients.

| Token | Hex | Use |
|-------|-----|-----|
| Carbon Dark | `#171A20` | Hero bg, dark sections, primary headings |
| Graphite | `#393C41` | Body text |
| Pewter | `#5C5E62` | Sub-text, labels |
| Electric Blue | `#3E6AE1` | Primary CTA — used nowhere else |
| Light Ash | `#F4F4F4` | Alternate section backgrounds |
| Cloud Gray | `#EEEEEE` | Borders, dividers |

Rules: `font-weight` 400/500 only, `border-radius` 4px on buttons / 12px on cards, `transition-duration` 330ms, 100vh hero.

---

## Project Structure

```
app/
├── page.js                     # Landing page (server component, assembles sections)
├── layout.js                   # Root layout + global metadata
├── contact/page.js             # Standalone contact page
├── case-studies/[slug]/page.js # 7 case studies, SSG via generateStaticParams
├── sitemap.js                  # Auto-generated sitemap
├── robots.js                   # robots.txt
├── admin/
│   ├── layout.js               # Auth wrapper — guards all /admin/* routes
│   ├── page.js                 # Dashboard overview
│   ├── login/page.js           # Password login
│   ├── seo/page.js             # SEO manager
│   ├── case-studies/page.js    # Case study CMS
│   └── messages/page.js        # Message inbox
└── components/
    ├── NavBar.js               # Scroll-reactive nav, animated mobile drawer
    ├── HeroClient.js           # Staggered entry animation
    ├── AboutStats.js           # Count-up stat cards with useInView
    ├── ServicesSection.js      # Service cards with hover interactions
    ├── CaseStudyCards.js       # Responsive case study grid
    ├── ContactForm.js          # EmailJS form with validation and error handling
    ├── ScrollReveal.js         # Reveal / StaggerReveal / StaggerItem utilities
    └── ReadingProgress.js      # Fixed progress bar for case study pages
```

---

## Local Development

```bash
# Install dependencies
npm install

# Copy env template and fill in your keys
cp .env.example .env.local

# Start dev server
npm run dev       # http://localhost:3000

# Verify before deploying
npm run lint      # zero lint errors
npm run build     # clean production build
```

### Environment variables

```bash
# .env.local — never commit this file
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_ADMIN_PASSWORD=your_admin_password
```

Get your EmailJS keys at [emailjs.com](https://www.emailjs.com) — free tier allows 200 emails/month.

---

## Deployment

Deployed on Vercel. Add the four environment variables above in **Project Settings → Environment Variables**, then push to `main`.

```bash
git push origin main   # Vercel auto-deploys on push
```

---

## Architecture Notes

- **Server vs client**: `page.js` is a server component. Interactive sections (`ContactForm`, `NavBar`, `ServicesSection`, `AboutStats`, `CaseStudyCards`, `HeroClient`) are extracted as `'use client'` components and imported into it.
- **No database**: all admin CMS data lives in `localStorage`. Contact submissions are sent via EmailJS and also saved locally as a backup.
- **SSG case studies**: content is hardcoded in `app/case-studies/[slug]/page.js`; `generateStaticParams` pre-renders all 7 at build time.
- **Auth**: a single `localStorage` flag (`at_admin = 'true'`) checked in the admin layout. Intentionally minimal — solo-admin site, no multi-user requirements.

---

## Case Studies

| # | Project | Domain | Stack |
|---|---------|--------|-------|
| 01 | AAFES — Shop My Exchange | Enterprise headless commerce | Frontastic, Flutter, Node.js |
| 02 | Bright Smile | Dental clinic management | Flutter, Firebase |
| 03 | NariCare | Women's health / OB-GYN | Flutter, Firebase |
| 04 | AlgoTrader Pro | Algorithmic trading | Next.js, Vercel |
| 05 | Job Search Agent | AI multi-agent pipeline | Python, CrewAI, Groq |
| 06 | Microservices on GCP | Backend migration | Node.js, Java, Spring Boot, GCP |
| 07 | BS Food & Beverage | Business operations | Flutter Web, Firebase |

---

## License

MIT — feel free to use this as a template for your own consulting site.
