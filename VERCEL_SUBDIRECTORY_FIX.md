# Vercel Configuration Troubleshooting - Subdirectory Deployment

## 🚨 **ISSUE**: Production still loads at `aswangchronicles.com` instead of `aswangchronicles.com/iteration1`

## 🔍 **Vercel Dashboard Checklist**

### 1. **Login to Vercel Dashboard**
```
https://vercel.com/dashboard
```

### 2. **Find Your Project**
- Look for `aswang-chronicles` project
- Click on the project name

### 3. **Check Project Settings**
Navigate to: **Settings** → **General**

#### **Build & Output Settings:**
- ✅ **Framework Preset**: Should be "Vite"
- ✅ **Build Command**: Should be `npm run build`
- ✅ **Output Directory**: Should be `dist`
- ✅ **Install Command**: Should be `npm install`

### 4. **Check Domain Configuration**
Navigate to: **Settings** → **Domains**

#### **Current Issue Likely Here:**
- **Custom Domain**: `aswangchronicles.com` 
- **Problem**: Domain points to root `/` instead of `/iteration1/`

#### **Required Fix Options:**

**Option A: Subdirectory Redirect (Recommended)**
Add this configuration in Vercel Dashboard:
```
Domain: aswangchronicles.com
Redirect to: aswangchronicles.com/iteration1
```

**Option B: Update Domain to Point to Subdirectory**
- Remove current domain: `aswangchronicles.com`
- Add new domain: `aswangchronicles.com/iteration1`

### 5. **Check Environment Variables**
Navigate to: **Settings** → **Environment Variables**
- Ensure no conflicting `BASE_URL` or similar variables

### 6. **Check Deployment**
Navigate to: **Deployments** tab
- Check latest deployment status
- Verify it used the correct `vercel.json` configuration

## 🔧 **Immediate Fix Options**

### **Option 1: Vercel Dashboard Redirect**
1. Go to **Settings** → **Functions**
2. Add a redirect function or use **Rewrites** section:
```json
{
  "source": "/",
  "destination": "/iteration1/"
}
```

### **Option 2: Root Index Redirect**
Create a simple redirect at domain root:
1. Create `public/index-redirect.html`:
```html
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="refresh" content="0; url=/iteration1/">
    <script>window.location.href = '/iteration1/';</script>
</head>
<body>
    <p>Redirecting to <a href="/iteration1/">Aswang Chronicles</a>...</p>
</body>
</html>
```

2. Update `vercel.json` to serve this for root:
```json
{
  "rewrites": [
    {
      "source": "/",
      "destination": "/index-redirect.html"
    },
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

### **Option 3: Update vercel.json (Most Likely Fix)**
The current `vercel.json` might not be handling the root domain correctly.

**Current vercel.json:**
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

**Updated vercel.json needed:**
```json
{
  "redirects": [
    {
      "source": "/",
      "destination": "/iteration1/",
      "permanent": false
    }
  ],
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

## 🚀 **Step-by-Step Fix Process**

### **Step 1: Check Current Vercel Configuration**
1. Login to Vercel dashboard
2. Navigate to your project
3. Check **Settings** → **General** → **Build & Output Settings**
4. Verify domain configuration in **Settings** → **Domains**

### **Step 2: Implement Root Redirect**
**In Vercel Dashboard:**
1. Go to **Settings** → **Functions** or **Rewrites**
2. Add redirect rule: `/` → `/iteration1/`

**OR Update vercel.json locally:**
1. Add redirect to `vercel.json`
2. Commit and push changes
3. Redeploy

### **Step 3: Test Configuration**
After making changes:
1. **Force redeploy** in Vercel dashboard
2. Test URLs:
   - `aswangchronicles.com` → should redirect to `aswangchronicles.com/iteration1/`
   - `aswangchronicles.com/iteration1/` → should load the app
   - `aswangchronicles.com/iteration1/game` → should load game page

## 🐛 **Common Issues**

### **Issue**: Changes not taking effect
**Solution**: Force redeploy in Vercel dashboard

### **Issue**: Domain still points to root
**Solution**: Check domain configuration in Vercel settings

### **Issue**: 404 errors on subdirectory
**Solution**: Verify `vercel.json` is in project root and properly formatted

## 📋 **Quick Verification Commands**

**Test current behavior:**
```bash
curl -I https://aswangchronicles.com
curl -I https://aswangchronicles.com/iteration1/
```

**Check what Vercel is serving:**
1. View page source at `aswangchronicles.com`
2. Check if it's serving the redirect or the main app

## 🎯 **Expected Result After Fix**

- ✅ `aswangchronicles.com` redirects to `aswangchronicles.com/iteration1/`
- ✅ `aswangchronicles.com/iteration1/` loads the main application
- ✅ All routes work under `/iteration1/` path
- ✅ Direct URL access works for all pages

## 📞 **If You Need Help**
Provide me with:
1. Current domain configuration from Vercel dashboard
2. Latest deployment logs from Vercel
3. What happens when you visit the root domain

The most likely fix is adding a redirect rule in Vercel dashboard settings!