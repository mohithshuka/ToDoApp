/**
 * Authentication Context
 * 
 * Provides authentication state and operations throughout the app.
 * Uses useReducer for predictable state management and Firebase for authentication.
 * 
 * Features:
 * - User registration with email/password
 * - Login with email/password
 * - Logout
 * - Automatic session restoration on app restart
 * - Loading states for all async operations
 * - User-friendly error messages
 */

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { firebaseAuth } from '../api/firebase';
import { authReducer, initialAuthState } from './authReducer';
import { AuthState } from '../types';

/**
 * Auth context value type
 * Includes state and all auth operations
 */
interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

/**
 * Create the context with undefined default
 * This forces consumers to use the Provider or get a runtime error
 */
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/**
 * AuthProvider Props
 */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * AuthProvider Component
 * 
 * Wraps the app (or part of it) to provide authentication functionality.
 * Automatically restores user session on mount if user was previously logged in.
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  /**
   * Session restoration effect
   * 
   * Firebase Auth persists session automatically on native platforms.
   * This effect listens for auth state changes and updates our context accordingly.
   * Runs once on component mount.
   */
  useEffect(() => {
    dispatch({ type: 'AUTH_LOADING' });
    
    // Subscribe to auth state changes
    const unsubscribe = firebaseAuth().onAuthStateChanged(
      (user: FirebaseAuthTypes.User | null) => {
        if (user) {
          // User is signed in
          dispatch({ type: 'AUTH_SUCCESS', payload: user });
        } else {
          // User is signed out
          dispatch({ type: 'AUTH_LOGOUT' });
        }
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  /**
   * Register a new user with email and password
   * 
   * @param email - User's email address
   * @param password - User's password (min 6 characters)
   * @throws Error with user-friendly message if registration fails
   */
  const register = async (email: string, password: string): Promise<void> => {
    try {
      dispatch({ type: 'AUTH_LOADING' });
      
      // Firebase creates user and automatically signs them in
      const userCredential = await firebaseAuth().createUserWithEmailAndPassword(
        email,
        password
      );
      
      // Auth state listener will handle the success dispatch
      // No need to manually dispatch AUTH_SUCCESS here
    } catch (error: any) {
      // Parse Firebase error codes into user-friendly messages
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'This email is already registered. Please sign in instead.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address format.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password is too weak. Please use at least 6 characters.';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your connection.';
      }
      
      dispatch({ type: 'AUTH_ERROR', payload: errorMessage });
      throw new Error(errorMessage);
    }
  };

  /**
   * Sign in existing user with email and password
   * 
   * @param email - User's email address
   * @param password - User's password
   * @throws Error with user-friendly message if login fails
   */
  const login = async (email: string, password: string): Promise<void> => {
    try {
      dispatch({ type: 'AUTH_LOADING' });
      
      await firebaseAuth().signInWithEmailAndPassword(email, password);
      
      // Auth state listener will handle the success dispatch
    } catch (error: any) {
      // Parse Firebase error codes into user-friendly messages
      let errorMessage = 'Login failed. Please try again.';
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email. Please register first.';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password. Please try again.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address format.';
      } else if (error.code === 'auth/user-disabled') {
        errorMessage = 'This account has been disabled. Please contact support.';
      } else if (error.code === 'auth/network-request-failed') {
        errorMessage = 'Network error. Please check your connection.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later.';
      }
      
      dispatch({ type: 'AUTH_ERROR', payload: errorMessage });
      throw new Error(errorMessage);
    }
  };

  /**
   * Sign out the current user
   * 
   * @throws Error if logout fails (rare)
   */
  const logout = async (): Promise<void> => {
    try {
      await firebaseAuth().signOut();
      // Auth state listener will handle the logout dispatch
    } catch (error: any) {
      console.error('Logout error:', error);
      // Even if logout fails, clear local state
      dispatch({ type: 'AUTH_LOGOUT' });
      throw new Error('Failed to sign out. Please try again.');
    }
  };

  // Context value includes state and operations
  const value: AuthContextValue = {
    ...state,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook to access auth context
 * 
 * Usage: const { user, login, logout, loading, error } = useAuth();
 * 
 * @throws Error if used outside of AuthProvider
 */
export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
