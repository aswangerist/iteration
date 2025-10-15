# 🦇 Aswang Chronicles - Client Handover Package

## 📋 **Client Setup Instructions**

### **Repository Setup**
1. Create a new repository at: `https://github.com/aswangerist/aswang.git`
2. Push this code to your repository
3. Configure your own Firebase project

### **🔐 Firebase Configuration Required**

**Create Your Firebase Project:**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create new project named "Aswang Chronicles"
3. Enable Firestore Database
4. Enable Authentication (optional)

**Configure Environment Variables:**
1. Rename `.env.client` to `.env.production`
2. Update with your Firebase configuration:

```env
# Your Firebase Configuration
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

**Set Your Admin Key:**
```env
VITE_ADMIN_KEY=your_secure_admin_key_here
```

### **🚀 Deployment Instructions**

**Option 1: Netlify (Recommended)**
1. Connect your GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables in Netlify dashboard

**Option 2: Vercel**
1. Connect repository to Vercel
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`

**Option 3: Manual Hosting**
1. Run `npm install`
2. Run `npm run build`
3. Upload `dist/` folder contents to your hosting

### **🔧 Firebase Security Rules**

Add these rules to your Firestore:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /comments/{document} {
      allow read: if true;
      allow write: if true;
    }
    match /reports/{document} {
      allow read: if true;
      allow write: if true;
    }
  }
}
```

### **📞 Support**

For technical support or questions:
- **Developer**: TitoSenpai
- **Project Repository**: https://github.com/TitoSenpai/aswang-chronicles

### **🎮 Features Included**

- ✅ Dual interactive games
- ✅ Aswang folklore archive with modal lightbox
- ✅ Comment and rating system
- ✅ Admin panel for content management
- ✅ Progressive Web App (PWA) support
- ✅ Responsive design for all devices
- ✅ Dark mode gaming experience

### **🔑 Admin Access**

Access admin panel at: `yoursite.com/admin`
Use the admin key you configured in environment variables.

---

**Project delivered by TitoSenpai - Ready for production deployment** 🚀