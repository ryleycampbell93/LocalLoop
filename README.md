# LocalLoop Prototype

A mobile-first old-school barter marketplace prototype built with Next.js App Router.

## What is included

- Marketplace home and browse experience
- Need / Offer listing cards
- Listing detail pages
- Post-a-listing form prototype
- Member profile and reputation
- Messaging / negotiation UI
- Barter Agreement flow with scope, timing, materials, completion and amendments
- Membership pricing screen
- Responsive styling
- Mock data only: no database or payment keys required to run

## Product rules baked into the prototype

- No credits
- No internal currency
- No cash handling between members
- Users negotiate their own exchange
- Accepted agreements should be versioned rather than silently edited
- Platform membership is the initial monetisation model

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Production build

```bash
npm run build
npm start
```

## Deploy to Vercel

Push this folder to a Git repository, import the repository into Vercel, and deploy. Vercel detects Next.js automatically. No environment variables are required for this prototype.

Alternatively, with Vercel CLI installed:

```bash
vercel --prod
```

## Next build phase

For a real MVP, add:

1. Authentication and verification
2. PostgreSQL database
3. Persistent listings and profiles
4. Real-time or persisted messaging
5. Immutable agreement versions + acceptance timestamps
6. Reviews and reports
7. Membership billing
8. Admin dashboard and moderation
9. Notifications
10. Legal review of platform terms and barter agreement wording

## Suggested data model for production

`User`, `Profile`, `Listing`, `Conversation`, `Message`, `BarterAgreement`, `AgreementParty`, `AgreementAmendment`, `Completion`, `Review`, `Report`, `Membership`, `AdminAction`.

## Important

The agreement language in this prototype is placeholder product copy, not legal advice. Have Australian counsel review production terms, liability allocation, consumer-law wording and membership terms before launch.

