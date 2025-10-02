// Firebase configuration for Aswang Chronicles
import { initializeApp } from 'firebase/app'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'

// Firebase config using environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

// Development fallback configuration
const developmentConfig = {
  apiKey: "demo-api-key",
  authDomain: "aswang-chronicles-demo.firebaseapp.com",
  projectId: "aswang-chronicles-demo",
  storageBucket: "aswang-chronicles-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:demo"
}

// Use environment config if available, otherwise fallback to development
const config = firebaseConfig.apiKey ? firebaseConfig : developmentConfig
const isDevelopment = import.meta.env.VITE_ENVIRONMENT === 'development' || !firebaseConfig.apiKey

// Initialize Firebase
let app
let db

try {
  app = initializeApp(config)
  db = getFirestore(app)
  
  // Connect to Firestore emulator in development mode
  if (isDevelopment && !db._delegate?._databaseId) {
    console.warn('🔥 Using Firebase development mode')
    // Note: You can set up Firebase emulator if needed
    // connectFirestoreEmulator(db, 'localhost', 8080)
  }
  
  console.log(`🔥 Firebase initialized successfully (${import.meta.env.VITE_ENVIRONMENT || 'development'} mode)`)
} catch (error) {
  console.error('Firebase initialization error:', error)
}

export { db, app }

// Collection names
export const COLLECTIONS = {
  COMMENTS: 'aswang-comments',
  ANALYTICS: 'aswang-analytics'
}

// Firestore error handling
export function handleFirestoreError(error) {
  console.error('Firestore error:', error)
  
  const errorMessages = {
    'permission-denied': 'You don\'t have permission to perform this action.',
    'unavailable': 'Service is currently unavailable. Please try again later.',
    'failed-precondition': 'The operation failed due to a conflict.',
    'already-exists': 'This item already exists.',
    'not-found': 'The requested item was not found.',
    'invalid-argument': 'Invalid data provided.',
    'deadline-exceeded': 'The operation took too long. Please try again.',
    'unauthenticated': 'Authentication required for this operation.'
  }
  
  return errorMessages[error.code] || 'An unexpected error occurred. Please try again.'
}

// Offline detection
export function isOnline() {
  return navigator.onLine
}

// Firebase status
export function getFirebaseStatus() {
  return {
    isInitialized: !!app && !!db,
    isOnline: isOnline(),
    isDevelopmentMode: config === developmentConfig,
    projectId: config.projectId
  }
}