# Firebase Setup Instructions for Android

This guide walks you through configuring Firebase for the TodoApp React Native project on Android.

## Prerequisites

- Firebase project created at [Firebase Console](https://console.firebase.google.com)
- Node.js and npm installed
- Android development environment set up (JDK, Android Studio, Android SDK)

---

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **"Add project"** or select an existing project
3. Enter project name: `TodoApp` (or your preferred name)
4. Disable Google Analytics (optional for this project)
5. Click **"Create project"**

---

## Step 2: Enable Authentication

1. In Firebase Console, navigate to **Build → Authentication**
2. Click **"Get started"**
3. Go to **"Sign-in method"** tab
4. Click on **"Email/Password"**
5. **Enable** the first option (Email/Password)
6. **Disable** "Email link (passwordless sign-in)" for now
7. Click **"Save"**

---

## Step 3: Create Firestore Database

1. In Firebase Console, navigate to **Build → Firestore Database**
2. Click **"Create database"**
3. Choose **"Start in production mode"** (we'll adjust rules next)
4. Select a location (choose closest to your target users)
5. Click **"Enable"**

### Configure Firestore Security Rules

Go to the **Rules** tab and replace with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Tasks collection: users can only read/write their own tasks
    match /tasks/{taskId} {
      allow read, write: if request.auth != null && 
                            request.resource.data.userId == request.auth.uid;
    }
  }
}
```

Click **"Publish"**

---

## Step 4: Register Android App

1. In Firebase Console, click the **Android icon** (or "Add app")
2. Fill in the form:
   - **Android package name**: `com.todoapp` (found in `android/app/build.gradle`)
   - **App nickname**: `TodoApp` (optional)
   - **Debug signing certificate SHA-1**: Leave blank for now (can add later for production)
3. Click **"Register app"**

---

## Step 5: Download google-services.json

1. Click **"Download google-services.json"**
2. **Move the file** to: `android/app/google-services.json`

**CRITICAL**: The file must be in `android/app/`, NOT in `android/` root.

---

## Step 6: Configure Android Project

### 6.1 Edit `android/build.gradle`

Open `android/build.gradle` and add the Google services classpath:

```gradle
buildscript {
    ext {
        buildToolsVersion = "34.0.0"
        minSdkVersion = 24
        compileSdkVersion = 35
        targetSdkVersion = 35
        ndkVersion = "27.0.12077973"
        kotlinVersion = '2.0.21'
    }
    repositories {
        google()
        mavenCentral()
    }
    dependencies {
        classpath("com.android.tools.build:gradle")
        classpath("com.facebook.react:react-native-gradle-plugin")
        classpath("org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlinVersion")
        
        // ADD THIS LINE:
        classpath('com.google.gms:google-services:4.4.2')
    }
}
```

### 6.2 Edit `android/app/build.gradle`

Open `android/app/build.gradle` and apply the Google services plugin **at the bottom** of the file:

```gradle
apply plugin: "com.android.application"
apply plugin: "org.jetbrains.kotlin.android"
apply plugin: "com.facebook.react"

// ... rest of the file ...

// ADD THIS LINE AT THE VERY END:
apply plugin: 'com.google.gms.google-services'
```

### 6.3 Increase minSdkVersion (if needed)

React Native Firebase requires `minSdkVersion >= 21`. Check `android/build.gradle`:

```gradle
minSdkVersion = 24  // Should be 21 or higher
```

---

## Step 7: Install and Link Native Dependencies

The dependencies are already installed. Now link them:

```bash
cd android
./gradlew clean
cd ..
```

For React Native 0.60+, auto-linking handles most of the native setup automatically.

---

## Step 8: Verify TypeScript Configuration

Ensure `tsconfig.json` includes:

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "lib": ["esnext"],
    "allowJs": true,
    "jsx": "react-native",
    "noEmit": true,
    "isolatedModules": true,
    "strict": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "exclude": [
    "node_modules",
    "babel.config.js",
    "metro.config.js",
    "jest.config.js"
  ]
}
```

---

## Step 9: Test Firebase Connection

Run TypeScript check to ensure no errors:

```bash
npx tsc --noEmit
```

Build and run the Android app:

```bash
npx react-native run-android
```

**Expected result**: App should launch and show the "Sign In" screen (placeholder).

To verify Firebase is connected, you can temporarily add this to `LoginScreen.tsx`:

```tsx
import { firebaseAuth } from '../api/firebase';

// Inside the component
useEffect(() => {
  console.log('Firebase Auth initialized:', firebaseAuth());
}, []);
```

Check the Metro logs - you should NOT see Firebase initialization errors.

---

## Common Issues & Troubleshooting

### Issue: "Task :app:processDebugGoogleServices FAILED"

**Solution**: Verify `google-services.json` is in `android/app/` (not `android/`)

### Issue: "Failed to resolve: com.google.firebase:firebase-bom"

**Solution**: Run `cd android && ./gradlew clean` then rebuild

### Issue: Duplicate classes error

**Solution**: Add this to `android/app/build.gradle`:

```gradle
configurations.all {
    resolutionStrategy {
        force 'com.google.android.gms:play-services-base:18.2.0'
    }
}
```

### Issue: "Installed Build Tools revision X is corrupted"

**Solution**: In Android Studio, go to SDK Manager → SDK Tools → uncheck/recheck Android SDK Build-Tools

### Issue: Metro bundler can't find modules

**Solution**:
```bash
npx react-native start --reset-cache
```

---

## Next Steps

✅ Firebase is now configured

**Phase 2** will implement:
- AuthContext with useReducer
- Login/Register screens with actual Firebase auth
- Session persistence
- Navigation guard based on auth state

---

## Security Checklist (Before Production)

- [ ] Add `google-services.json` to `.gitignore` (if not already)
- [ ] Generate release SHA-1 and add to Firebase Console
- [ ] Review Firestore security rules
- [ ] Enable email verification (optional)
- [ ] Set up password reset flow
- [ ] Configure Firebase App Check for abuse prevention

---

**Last updated**: February 19, 2026  
**Phase**: 1 - Foundation & Architecture
