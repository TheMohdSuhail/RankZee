# RankZee Digital Marketing Agency 🚀

> **The Modern Growth & Digital Dominance Engine**  
> High-performance Next.js web application built for ranking #1 on Google, multi-channel paid acquisition, and client conversion.

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-R3F-black?logo=three.js)](https://threejs.org/)
[![Firebase](https://img.shields.io/badge/Firebase-v10-orange?logo=firebase)](https://firebase.google.com/)
[![Deployment](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com/)

---

## ⚡ Tech Stack Architecture

- **Framework**: [Next.js](https://nextjs.org/) (App Router, React 18, Strict TypeScript)
- **Styling**: Tailwind CSS + Glassmorphism UI tokens + Neon Dark Theme
- **3D Interactive Scene**: `@react-three/fiber` + `@react-three/drei` + `three.js` (Canvas lazy-loaded with dynamic SSR disabled, instanced particle swarm, pointer-reactive ranking ladder)
- **Database & Cloud**: Firebase (Client Modular SDK v10 + Firebase Admin SDK server-side)
- **Validation**: Zod + React Hook Form (Full client & server dual validation)
- **Analytics & Visuals**: Recharts (Executive admin charts) + Lucide Icons
- **SEO & Compliance**: Next.js Metadata API, dynamic `next/og` Open Graph images, dynamic `sitemap.ts`, `robots.ts`, rich JSON-LD schemas, and ePrivacy/DPDPA cookie consent controller.

---

## 📂 Project Architecture

```
RankZee/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx               # Client & Admin Login
│   │   └── signup/page.tsx              # User Registration
│   ├── (legal)/
│   │   ├── terms-and-conditions/page.tsx
│   │   ├── privacy-policy/page.tsx      # DPDPA & GDPR compliant
│   │   ├── refund-and-cancellation-policy/page.tsx
│   │   ├── shipping-and-delivery-policy/page.tsx
│   │   ├── disclaimer/page.tsx
│   │   ├── cookie-policy/page.tsx
│   │   └── acceptable-use-policy/page.tsx
│   ├── services/
│   │   ├── page.tsx                     # Services listing
│   │   └── [slug]/page.tsx              # 9 Dynamic service pages
│   ├── portfolio/
│   │   ├── page.tsx                     # Case studies grid
│   │   └── [slug]/page.tsx              # Detailed case study breakdowns
│   ├── blog/
│   │   ├── page.tsx                     # Growth Intel blog
│   │   └── [slug]/page.tsx              # Markdown articles
│   ├── pricing/page.tsx                 # Starter, Growth, Premium tiers
│   ├── contact/page.tsx                 # Map, direct lines, WhatsApp button
│   ├── book-consultation/page.tsx       # 45-Min Strategy session scheduler
│   ├── payment/
│   │   ├── success/page.tsx             # Payment confirmation
│   │   └── failed/page.tsx              # Retry payment flow
│   ├── dashboard/page.tsx               # User client portal
│   ├── admin/                           # Protected Admin Panel
│   │   ├── layout.tsx                   # Auth gate (custom claim admin: true)
│   │   ├── page.tsx                     # Executive Recharts dashboard
│   │   ├── leads/page.tsx               # Leads management + CSV export
│   │   ├── consultations/page.tsx       # Booking approvals & calendar
│   │   ├── messages/page.tsx            # Contact inbox & mark read
│   │   ├── users/page.tsx               # User roles & account status
│   │   ├── orders/page.tsx              # Payment orders & invoices
│   │   ├── cms/                         # Full CRUD for services, blog, portfolio, testimonials, pricing
│   │   ├── newsletter/page.tsx          # Subscriber audience list
│   │   └── settings/page.tsx            # Global site configuration
│   ├── api/
│   │   ├── leads/route.ts               # Lead capture + spam rate-limiter
│   │   ├── consultations/route.ts       # Booking handler
│   │   ├── contact/route.ts             # Contact messages
│   │   ├── newsletter/route.ts          # Opt-in handler
│   │   ├── checkout/route.ts            # Payment provider abstraction
│   │   ├── webhooks/payment/route.ts    # Webhook signature verifier
│   │   ├── admin/make-admin/route.ts    # Claim promoter API
│   │   └── og/route.tsx                 # Dynamic Edge Open Graph generator
│   ├── sitemap.ts                       # Dynamic sitemap (includes Firestore slugs)
│   ├── robots.ts                        # Crawler instructions
│   ├── not-found.tsx                    # Branded 404
│   └── error.tsx                        # Global error boundary
├── components/
│   ├── layout/                          # Header, Footer, ThemeToggle, CookieBanner
│   ├── three/                           # HeroCanvas, HeroScene, 3D Tilt Cards, Fallback
│   ├── sections/                        # Home page component sections
│   ├── forms/                           # LeadForm, ContactForm, ConsultationForm
│   ├── seo/                             # StructuredData, AnalyticsTracker
│   └── ui/                              # Shadcn/ui buttons, cards, modals, toasts
├── lib/
│   ├── firebase/                        # Client & Admin SDK initializers + AuthContext
│   ├── payments/                        # Provider abstraction (Razorpay & Stripe stubs)
│   ├── validators/                      # Zod validation schemas
│   ├── data/                            # Rich sample datasets (services, blog, pricing)
│   └── rate-limit.ts                    # Server-side sliding-window rate limiter
├── firestore.rules                      # Production security rules
├── storage.rules                        # Cloud storage permissions
└── .env.example                         # Environment variables template
```

---

## 🛠️ Step-by-Step Setup Guide

### 1. Clone Repository & Install Dependencies
```bash
git clone https://github.com/your-username/rankzee.git
cd rankzee
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Fill in your Firebase credentials in `.env.local`:
```env
# Public Firebase Web App Credentials
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-app.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-app.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=1:...

# Server-Side Firebase Admin SDK (Keep secret!)
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-...@your-project-id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

---

## 🔥 Firebase Setup Checklist

1. **Create Firebase Project**: Go to [Firebase Console](https://console.firebase.google.com/) and create a new project (e.g. `rankzee-production`).
2. **Enable Authentication Providers**:
   - Navigate to **Authentication** > **Sign-in method**.
   - Enable **Email/Password**.
   - Enable **Google** (select project support email and save).
3. **Initialize Cloud Firestore**:
   - Go to **Firestore Database** > **Create database**.
   - Start in **Production mode**.
   - Select your preferred regional server (e.g. `asia-south1` for Mumbai, India).
4. **Deploy Security Rules**:
   - Copy the contents of `firestore.rules` into the Firebase Console Rules tab (or run `firebase deploy --only firestore:rules`).
   - Copy the contents of `storage.rules` into the Firebase Storage Rules tab.
5. **Generate Admin Private Key**:
   - Go to **Project Settings** > **Service accounts**.
   - Click **Generate new private key**.
   - Copy `client_email` and `private_key` into your server `.env.local` or Vercel Environment Variables.

---

## 👑 Promoting the First Admin User

To grant administrative access to the `/admin` portal:

### Option A: Using the CLI Script
```bash
node scripts/make-admin.js your-admin-email@rankzee.com
```

### Option B: Using the Secure Admin Endpoint
Send a POST request to `/api/admin/make-admin`:
```bash
curl -X POST http://localhost:3000/api/admin/make-admin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "your-admin-email@rankzee.com",
    "secretKey": "rankzee_master_setup_secret_2025"
  }'
```

Once promoted, log in via `/login` and you will automatically have access to `/admin`.

---

## 💳 Payment Gateway Integration Guide (Readiness)

The payment flow is abstracted in `lib/payments/`:
- **Interface**: `createOrder`, `verifyPayment`, `handleWebhook`
- **Supported Stubs**: Razorpay (`lib/payments/razorpay.ts`) and Stripe (`lib/payments/stripe.ts`)
- **Ready Flow**:
  1. User selects plan on `/pricing` or clicks "Buy Package".
  2. A call to `/api/checkout` generates a pending record in the `orders` Firestore collection.
  3. Client receives order ID and redirect URL to `/payment/success` or `/payment/failed`.
  4. Webhooks at `/api/webhooks/payment` receive asynchronous capture events and update order status to `paid`.

To enable full production transactions:
1. Install official SDKs: `npm install razorpay` or `npm install stripe`.
2. Add your live API keys to `.env.local` (`RAZORPAY_KEY_SECRET` or `STRIPE_SECRET_KEY`).
3. Uncomment the SDK initialization blocks in `lib/payments/razorpay.ts` or `lib/payments/stripe.ts`.

---

## 🚀 Deployment to Vercel

1. Push your code to GitHub / GitLab.
2. Go to [Vercel](https://vercel.com/) and click **Add New** > **Project**.
3. Import your `rankzee` repository.
4. Add all environment variables from `.env.local` to Vercel Project Settings.
5. Deploy! Vercel automatically configures edge locations, image optimization, and dynamic API endpoints.

---

## 📋 On-Page SEO Checklist

- [x] **Semantic HTML**: Exactly one `<h1>` per page, sequential `<h2>` & `<h3>` structures.
- [x] **Metadata API**: Unique `<title>` (50-60 chars) and `<meta name="description">` (150-160 chars) on every route.
- [x] **Open Graph & Twitter**: Dynamic Edge OG cards generated via `/api/og` for 100% social sharing engagement.
- [x] **Structured Data (JSON-LD)**:
  - `Organization` & `ProfessionalService` on root layout
  - `WebSite` with SearchAction query box
  - `Service` schema on all `/services/[slug]` pages
  - `Article` / `BlogPosting` on all `/blog/[slug]` articles
  - `FAQPage` schema on home, service, and pricing pages
- [x] **Robots & Sitemap**:
  - `robots.ts` disallowing `/admin`, `/dashboard`, and `/api`
  - Dynamic `sitemap.ts` automatically discovering all published Firestore slugs
- [x] **Core Web Vitals**:
  - 3D Three.js canvas dynamically imported (`ssr: false`) with instant fallback mesh gradient
  - Zero layout shift (`next/image` with explicit aspect ratios, `next/font` with font-display swap)
  - Interactive scripts (GA4, Meta Pixel) loaded **only after user consent**.

---

## ⚖️ Legal Disclaimer

> **IMPORTANT NOTICE:**  
> The legal templates provided (`/terms-and-conditions`, `/privacy-policy`, `/refund-and-cancellation-policy`, `/shipping-and-delivery-policy`, `/disclaimer`, `/cookie-policy`, and `/acceptable-use-policy`) are written to reflect standard Indian digital marketing agency practices and payment gateway requirements (Razorpay/Stripe compliance). **However, they do not constitute formal legal advice.** Prior to launching commercial client billing, all legal texts must be reviewed and tailored by a licensed legal professional to ensure full compliance with your specific jurisdiction and operational requirements.

---

## 📄 License
Private & Proprietary. Developed for RankZee Digital Solutions Private Limited. All rights reserved.

