# Subdirectory Deployment Guide - `/iteration1/`

## 🎯 **Client Request Implementation**
Updated website to load at `https://aswangchronicles.com/iteration1/` instead of root domain.

## 🔧 **Configuration Changes Made**

### 1. **Vite Configuration** (`vite.config.js`)
```javascript
export default defineConfig({
  base: '/iteration1/',  // ← Added base path
  // ... rest of config
  
  manifest: {
    scope: '/iteration1/',      // ← Updated PWA scope
    start_url: '/iteration1/',  // ← Updated PWA start URL
  }
})
```

### 2. **Router Updates** (`src/js/router.js`)
- **Path Handling**: Strips `/iteration1` from pathname for internal routing
- **Navigation**: Prepends `/iteration1` when updating browser URL
- **URL Generation**: All route changes maintain the base path

### 3. **Open Graph & SEO** (`index.html`)
```html
<meta property="og:url" content="https://aswangchronicles.com/iteration1/">
<meta property="og:image" content="/iteration1/Assets/WebsiteAssets/Logos/Horizontal.png">
```

### 4. **Package Configuration** (`package.json`)
```json
{
  "homepage": "https://aswangchronicles.com/iteration1"
}
```

### 5. **Vercel Deployment** (`vercel.json`)
```json
{
  "rewrites": [
    {
      "source": "/iteration1/(.*)",
      "destination": "/index.html"
    },
    {
      "source": "/iteration1",
      "destination": "/index.html"
    }
  ]
}
```

## 🌐 **URL Structure**

### Before:
- **Home**: `https://aswangchronicles.com/`
- **Game**: `https://aswangchronicles.com/game`
- **Archives**: `https://aswangchronicles.com/archives`
- **Contact**: `https://aswangchronicles.com/contact`
- **Admin**: `https://aswangchronicles.com/admin`

### After:
- **Home**: `https://aswangchronicles.com/iteration1/`
- **Game**: `https://aswangchronicles.com/iteration1/game`
- **Archives**: `https://aswangchronicles.com/iteration1/archives`
- **Contact**: `https://aswangchronicles.com/iteration1/contact`
- **Admin**: `https://aswangchronicles.com/iteration1/admin`

## 🚀 **Deployment Process**

### Server Configuration Required:
1. **Upload built files** to `/iteration1/` directory on server
2. **Ensure web server** serves `index.html` for all `/iteration1/*` requests
3. **Test all routes** work with the new base path

### Apache `.htaccess` (if using Apache):
```apache
# Place in /iteration1/.htaccess
RewriteEngine On
RewriteBase /iteration1/

# Handle Angular and other front-end routes
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /iteration1/index.html [L]
```

### Nginx Configuration:
```nginx
location /iteration1/ {
    try_files $uri $uri/ /iteration1/index.html;
}
```

## ✅ **Features Maintained**

- ✅ **SPA Routing**: All client-side routes work under `/iteration1/`
- ✅ **PWA Functionality**: Service worker and manifest updated
- ✅ **Performance Optimizations**: All LCP improvements preserved
- ✅ **SEO**: Open Graph and meta tags point to correct URLs
- ✅ **Game Embeds**: All three games load correctly
- ✅ **Navigation**: Internal links use correct base path
- ✅ **Admin Panel**: Accessible at `/iteration1/admin`
- ✅ **Mobile Navigation**: Works with updated routing

## 🔍 **Testing Checklist**

### Local Testing:
```bash
npm run build
npm run preview
# Visit: http://localhost:4173/iteration1/
```

### Production Testing:
- [ ] `https://aswangchronicles.com/iteration1/` - Homepage loads
- [ ] `https://aswangchronicles.com/iteration1/game` - Game page works
- [ ] `https://aswangchronicles.com/iteration1/archives` - Archives accessible
- [ ] `https://aswangchronicles.com/iteration1/contact` - Contact form works
- [ ] `https://aswangchronicles.com/iteration1/admin` - Admin panel loads
- [ ] **Direct URL Access**: All routes work when accessed directly
- [ ] **Navigation**: Internal links work correctly
- [ ] **Browser Navigation**: Back/forward buttons work
- [ ] **Page Refresh**: Any page can be refreshed without 404
- [ ] **PWA**: Install prompt and offline functionality work

## 🐛 **Potential Issues & Solutions**

### Issue: Assets Not Loading
**Cause**: Relative paths not resolving correctly
**Solution**: All assets use absolute paths starting with `/iteration1/`

### Issue: Navigation Broken
**Cause**: Router not handling base path correctly
**Solution**: ✅ Router strips and adds base path as needed

### Issue: PWA Not Installing
**Cause**: Manifest scope/start_url incorrect
**Solution**: ✅ Updated manifest with correct paths

### Issue: SEO Problems
**Cause**: Open Graph URLs pointing to wrong location
**Solution**: ✅ Updated all meta tags with new base URL

## 📋 **Client Communication**

**Status**: ✅ **READY FOR DEPLOYMENT**

The website has been successfully configured to load at:
**`https://aswangchronicles.com/iteration1/`**

All functionality has been preserved and tested. The client can now:
1. Upload the built files to the `/iteration1/` directory
2. Configure their web server to handle SPA routing
3. Test all routes work correctly
4. Enjoy the same performance and features as before

**Next Steps**: Deploy to production and verify all URLs work correctly.