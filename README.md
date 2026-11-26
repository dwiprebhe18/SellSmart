# SellSmart

A responsive React frontend prototype for SellSmart - a digital business growth platform for micro and small businesses.

## Landing page
The public landing page introduces SellSmart, previews the business dashboard, and includes a short animated walkthrough of getting a business online.

## Included pages
### Business owner workspace
- Post-focused business home with a direct post-creation entry point
- Posts composer with local photo/video upload, webpage image drop, previews, captions, and local demo publishing
- Business profile editor
- Product catalogue (search, filter, add and delete demo products)
- Analytics charts
- Growth recommendations and checklist
- Content planner
- Competitor watchlist (sample data)
- Customer enquiries
- Subscription pricing

### Admin workspace
Use the workspace switcher at the top of the sidebar to switch to Admin.
- Admin overview
- User and business management (demo status toggles)
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
- Actions update local React state only; refreshing resets demo data.
- Posts and selected media are demo-only and are not sent to a server or social network. Images dropped from webpages remain linked to their original URL.
- No real authentication, backend, database, payment, email, or external social media API is connected.
- Product images use remote Unsplash URLs and require internet access.
- Charts and metrics are illustrative. Replace them with real data after integrating the Java Spring Boot backend and MySQL database.
- Admin actions are visual demos. A real backend must enforce authorization for every admin endpoint.
- Do not claim external social network analytics are available unless connected through approved APIs or authorized data.
