# Scale Breakers Website - Complete Project Export

## What's Included

This folder contains your complete Scale Breakers website project, ready to push to GitHub and deploy to Netlify.

### Folder Structure

```
scalebreakers-export/
├── client/                 # Frontend (React + Tailwind)
│   ├── src/
│   │   ├── pages/         # Website pages (Home, Shop, Portfolio, etc.)
│   │   ├── components/    # Reusable UI components
│   │   ├── styles/        # CSS including glitch effects
│   │   └── public/        # Images and assets
│   └── index.html
├── server/                 # Backend (Express + tRPC)
│   ├── routers.ts         # API endpoints
│   ├── db.ts              # Database queries
│   └── storage.ts         # File storage
├── drizzle/               # Database schema & migrations
├── package.json           # Project dependencies
├── pnpm-lock.yaml         # Locked dependencies
├── vite.config.ts         # Build configuration
├── tsconfig.json          # TypeScript configuration
└── seed.ts                # Database seeding script
```

## Quick Start

### 1. Install Dependencies
```bash
cd scalebreakers-export
pnpm install
```

### 2. Set Up Environment Variables
Copy `.env.example` to `.env` and fill in your values:
```bash
cp .env.example .env
```

Edit `.env` with:
- DATABASE_URL (your MySQL connection)
- JWT_SECRET (your secret key)
- VITE_APP_ID (your app ID)
- OAUTH_SERVER_URL (OAuth server)
- And other required variables

### 3. Run Locally
```bash
pnpm dev
```

Visit: http://localhost:3000

## What's NOT Included

These folders are excluded (they're generated or large):
- `node_modules/` - Install with `pnpm install`
- `dist/` - Generated during build
- `.git/` - Initialize with `git init`

## Features Included

✅ **Homepage** with hero section and feature showcase
✅ **Workshops** page with ticket purchasing
✅ **Shop** with 17 products (workshops, 3D models, dioramas, canvases)
✅ **Portfolio** with 8 artwork pieces and project photos
✅ **Mural Service** with custom request form and commission flyer
✅ **Newsletter** signup for email updates
✅ **Admin Panel** for product management
✅ **Glitch/Static** hover effects on all titles
✅ **Social Media** icons (Instagram, Facebook, Email)
✅ **Responsive Design** for all devices
✅ **Authentication** with user login/logout
✅ **Database** with MySQL integration

## Deployment Steps

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit: Scale Breakers website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/scalebreakers.git
git push -u origin main
```

### Step 2: Deploy to Netlify
1. Go to netlify.com
2. Click "Add new site" → "Import an existing project"
3. Select your GitHub repository
4. Configure build settings:
   - Build command: `pnpm build`
   - Publish directory: `dist`
5. Add environment variables (from your `.env` file)
6. Click "Deploy site"

### Step 3: Connect Custom Domain
1. In Netlify, go to "Domain management"
2. Add custom domain: `scalebreakers.space`
3. Update nameservers at your domain registrar
4. Wait 24-48 hours for DNS propagation
5. Visit https://scalebreakers.space

## Key Files

| File | Purpose |
|------|---------|
| `package.json` | Project dependencies & scripts |
| `vite.config.ts` | Build & dev server config |
| `drizzle/schema.ts` | Database tables definition |
| `server/routers.ts` | API endpoints (tRPC) |
| `server/db.ts` | Database query helpers |
| `client/src/App.tsx` | Main app routing |
| `client/src/pages/Home.tsx` | Homepage |
| `.env.example` | Environment variables template |

## Environment Variables Needed

Copy these from your original `.env` file:

```
DATABASE_URL=
JWT_SECRET=
VITE_APP_ID=
OAUTH_SERVER_URL=
VITE_OAUTH_PORTAL_URL=
OWNER_OPEN_ID=
OWNER_NAME=
VITE_APP_TITLE=Scale Breakers
VITE_APP_LOGO=
BUILT_IN_FORGE_API_URL=
BUILT_IN_FORGE_API_KEY=
VITE_ANALYTICS_ENDPOINT=
VITE_ANALYTICS_WEBSITE_ID=
```

## Database Setup

Your database schema is in `drizzle/schema.ts`. To set up:

1. Create a MySQL database
2. Update `DATABASE_URL` in `.env`
3. Run: `pnpm db:push`
4. Seed data: `pnpm tsx seed.ts`

## Available Scripts

```bash
# Development
pnpm dev              # Start dev server

# Building
pnpm build            # Build for production
pnpm preview          # Preview production build

# Database
pnpm db:push          # Push schema to database
pnpm db:studio        # Open database studio

# Other
pnpm lint             # Check code quality
pnpm format           # Format code
```

## Customization

### Change Logo
- Replace `client/public/logo-main.png` with your logo
- Update `VITE_APP_LOGO` in environment variables

### Change Colors
- Edit `client/src/index.css` for color palette
- Update Tailwind theme colors

### Add Products
- Use the admin panel at `/admin/products`
- Or edit `seed.ts` and run `pnpm tsx seed.ts`

### Update Content
- Edit pages in `client/src/pages/`
- Edit components in `client/src/components/`

## Troubleshooting

### Build Fails
- Run `pnpm install` to ensure dependencies are installed
- Check that all environment variables are set
- Review error messages in console

### Database Connection Error
- Verify `DATABASE_URL` is correct
- Ensure database is accessible (not blocked by firewall)
- Check credentials are correct

### Site Not Loading
- Check that `pnpm dev` is running
- Verify port 3000 is not blocked
- Check browser console for errors

## Support

For detailed deployment instructions, see: `DETAILED_DEPLOYMENT_STEPS.md`

## License

MIT License - Feel free to use and modify!

---

**Ready to deploy?** Follow the deployment steps above or see `DETAILED_DEPLOYMENT_STEPS.md` for ultra-detailed instructions.

Good luck! 🚀

