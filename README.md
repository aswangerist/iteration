# 🦇 Aswang Chronicles

A modern, interactive web application exploring Filipino folklore through immersive storytelling and digital experiences. This project reimagines traditional Aswang legends for the digital generation with engaging gameplay, educational content, and cultural preservation.

![Aswang Chronicles](Assets/WebsiteAssets/Logos/Horizontal.png)

## 🌟 Features

### 🎮 Interactive Gaming
- **Dual Game Experience**: Play both "Spoon Test" and "Left In the Shadows"
- **Fullscreen Mode**: Immersive gameplay with custom fullscreen controls
- **Dark Mode Toggle**: Enhanced gaming experience with background dimming
- **Responsive Design**: Seamless experience across desktop and mobile devices

### 📚 Cultural Education
- **Aswang Archives**: Comprehensive database of Filipino folklore creatures
- **Interactive Cards**: Click-to-enlarge creature details with modal lightbox
- **Cultural Impact**: Historical context and modern relevance of folklore
- **Educational Content**: Authentic information about Philippine mythology

### 💬 Community Features
- **Player Reviews**: Rate and review games with star ratings
- **Comment System**: Share experiences with the community
- **Real-time Updates**: Live comment feed powered by Firebase
- **Content Moderation**: Report inappropriate content

### 🔧 Technical Features
- **Progressive Web App (PWA)**: Install and use offline
- **Single Page Application (SPA)**: Fast, smooth navigation
- **Admin Panel**: Content management and moderation tools
- **Firebase Integration**: Real-time database and authentication
- **Responsive Design**: Bootstrap 5 powered responsive layout

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- **Git**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/TitoSenpai/aswang-chronicles.git
   cd aswang-chronicles
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy environment template
   cp .env.example .env.local
   
   # Edit .env.local with your Firebase configuration
   # See Firebase Setup section below
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:3000`

### Firebase Setup

1. **Create Firebase Project**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Firestore Database
   - Enable Authentication (optional)

2. **Configure Environment Variables**
   Update `.env.local` with your Firebase config:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

3. **Configure Firestore Rules**
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

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Project Structure

```
aswang-chronicles/
├── src/
│   ├── components/          # Page components
│   │   ├── HomePage.js
│   │   ├── GamePage.js
│   │   ├── AswangArchives.js
│   │   ├── ContactPage.js
│   │   └── AdminPage.js
│   ├── js/                  # JavaScript modules
│   │   ├── Router.js        # SPA routing
│   │   ├── comments.js      # Comment system
│   │   ├── gameControls.js  # Game functionality
│   │   ├── archivesModal.js # Archive interactions
│   │   └── ...
│   ├── styles/              # CSS stylesheets
│   │   └── components.css
│   └── main.js              # Application entry point
├── Assets/                  # Static assets
├── public/                  # Public assets
├── .env.example             # Environment template
└── index.html              # HTML entry point
```

### Key Technologies

- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Build Tool**: Vite 5.x
- **CSS Framework**: Bootstrap 5.3
- **Icons**: Font Awesome 6.4
- **Database**: Firebase Firestore
- **PWA**: Workbox service worker
- **Fonts**: Google Fonts (Kawit, Montserrat)

## 🎨 Design System

### Color Palette
- **Primary Red**: `#BD0300` - Brand accent and highlights
- **Dark Green**: `#001915` - Primary background
- **Teal**: `#065B51` - Secondary accent
- **Light Gray**: `#B5BDAD` - Text and borders
- **Olive Green**: `#657B50` - Supporting color
- **Yellow**: `#F4E04D` - Attention and titles

### Typography
- **Headers**: Kawit (Filipino-inspired serif)
- **Body Text**: Montserrat (Clean, readable sans-serif)

## 📱 Features in Detail

### Game Integration
- Embedded itch.io games with custom controls
- Fullscreen functionality with cross-browser support
- Dark mode toggle for better gaming experience
- Responsive iframe containers with proper aspect ratios

### Archives System
- Interactive creature cards with hover effects
- Modal lightbox for detailed creature information
- Lazy loading for optimal performance
- Search and filter capabilities (planned)

### Admin Panel
- Comment moderation and management
- User report handling
- Content statistics and analytics
- Secure authentication system

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Login: `vercel login`
3. Deploy: `vercel --prod`

## 🤝 Contributing

This is a personal project focused on Filipino cultural preservation. While not currently accepting external contributions, feedback and suggestions are welcome through issues.

## 📄 License

This project is for educational and cultural preservation purposes. All folklore content is based on traditional Filipino mythology and legends.

## 🙏 Acknowledgments

- Traditional Filipino folklore and storytelling
- itch.io for game hosting platform
- Firebase for backend services
- Bootstrap and Font Awesome for UI components
- Google Fonts for typography

## 📞 Contact

- **GitHub**: [@TitoSenpai](https://github.com/TitoSenpai)
- **Project**: [Aswang Chronicles](https://github.com/TitoSenpai/aswang-chronicles)

---

**Made with ❤️ for Filipino culture and folklore preservation**