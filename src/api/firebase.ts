/**
 * Firebase initialization and configuration
 * 
 * React Native Firebase uses native modules, so the actual initialization is handled
 * by the native SDKs via google-services.json (Android) and GoogleService-Info.plist (iOS).
 * 
 * This file re-exports the Firebase modules for convenient importing throughout the app.
 */

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

/**
 * Firebase Authentication module
 * Used for user registration, login, logout, and session management
 */
export const firebaseAuth = auth;

/**
 * Firestore database module
 * Used for CRUD operations on tasks and real-time synchronization
 */
export const firebaseFirestore = firestore;

/**
 * Helper to check if Firebase is properly initialized
 * Useful for debugging setup issues during development
 */
export const isFirebaseInitialized = (): boolean => {
  try {
    // Accessing auth() will throw if Firebase is not set up correctly
    auth();
    return true;
  } catch (error) {
    console.error('Firebase initialization error:', error);
    return false;
  }
};
