# Production Configuration

## Current Production Domain
https://aswangchronicles.com

## Environment Details
- **Primary Domain**: https://aswangchronicles.com
- **SSL**: Enabled
- **CDN**: Active
- **PWA**: Enabled with service worker
- **Framework**: Vite + Vanilla JS SPA

## SEO Configuration
- **Open Graph URL**: https://aswangchronicles.com
- **Canonical URL**: https://aswangchronicles.com
- **Sitemap**: Auto-generated for SPA routes

## Routing Configuration
All routes are handled client-side:
- `/` - HomePage
- `/game` - GamePage (3 embedded games)
- `/archives` - AswangArchives
- `/contact` - ContactPage
- `/admin` - AdminPage

## Performance Optimizations
- LCP optimized with font preloading
- Critical resource hints
- PWA caching strategy
- Bundle splitting active
- Asset optimization in place

## Deployment Pipeline
- **Repository**: https://github.com/TitoSenpai/aswang-chronicles.git
- **Branch**: main
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

## Domain Configuration Updated
✅ Open Graph tags point to production domain
✅ Package.json homepage set to production URL
✅ Documentation updated with correct domain
✅ Vercel configuration ready for custom domain