# SellSmart

A responsive React frontend prototype for SellSmart - a digital business growth platform for micro and small businesses.

## Landing page
The public landing page introduces SellSmart, previews the business dashboard, and includes a short animated walkthrough of getting a business online.

## Included pages
### Account access
- Login and role-specific registration for business owners and normal users
- Separate demo sign-in for platform administration
- Browser-persisted demo accounts and role-specific views; business and admin workspaces no longer switch roles from the sidebar

### Business owner workspace
- Post-focused business home with a direct post-creation entry point
- Posts composer with local photo/video upload, webpage image drop, previews, captions, and local demo publishing
- Business profile editor with WhatsApp and Instagram contact fields
- Product catalogue (search, filter, add and delete demo products)
- Analytics charts
- Growth recommendations and checklist
- Content planner
- Competitor watchlist (sample data)
- Customer enquiries
- Subscription pricing

### Normal user community
- Social-style feed with like/unlike, comments, follows, and saved posts
- Explore businesses with category, name, and location filters
- Public business profiles with products, posts, descriptions, and contact links
- Following, saved posts, profile, and settings views

### Admin workspace
- Sign in with the separate Admin demo option on the login screen.
- Admin overview
- User and business management (including registrations created in this browser)
- Reports/moderation queue (demo resolve actions)
- Platform analytics
- Category management
- Subscription activity

## Run locally
Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Open the local URL shown by Vite.

## Build
```bash
npm run build
npm run preview
```

## Notes
- This is a frontend prototype with mock/sample data.
- Business workspace data and metrics are illustrative React state; refreshing resets those changes.
- Account registrations, the active demo session, and normal-user likes, comments, follows, and saved posts use browser localStorage. These are prototype-only and are not secure authentication or cross-device data.
- Business posts and selected media are demo-only and are not sent to a server or social network. Images dropped from webpages remain linked to their original URL.
- No production authentication, backend, database, payment, email, or external social media API is connected. Keep credentials and personal information out of this prototype; integrate authentication and authorization through the planned Java Spring Boot and MySQL backend before launch.
- Product images use remote Unsplash URLs and require internet access.
- Charts and metrics are illustrative. Replace them with real data after integrating the Java Spring Boot backend and MySQL database.
- Admin actions are visual demos. A real backend must enforce authorization for every admin endpoint.
- Do not claim external social network analytics are available unless connected through approved APIs or authorized data.
