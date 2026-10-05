# Todo App - React Native

A production-ready task management application built with React Native CLI, featuring Firebase authentication, real-time cloud synchronization, and an intelligent priority-based task sorting system.

## 📱 Overview

This is a feature-complete To-Do application designed for mobile platforms (Android/iOS) using React Native CLI. The app demonstrates production-quality code architecture, comprehensive state management, real-time data synchronization, and an intelligent task organization system that prioritizes tasks based on deadline urgency and user-defined importance.

## ✨ Features

### Core Functionality
- ✅ **User Authentication**
  - Email/password registration and login
  - Secure Firebase Authentication integration
  - Persistent session management (auto-login on app restart)
  - Account validation with client-side and server-side checks

- ✅ **Task Management**
  - Create, read, update, and delete tasks (full CRUD)
  - Comprehensive task properties:
    - Title and description
    - Start date/time
    - Deadline
    - Priority level (Low, Medium, High)
    - Category (Work, Personal, Study, Other)
    - Completion status
  - Real-time cloud synchronization (changes sync instantly across devices)
  - Offline-first architecture with optimistic updates

- ✅ **Smart Task Organization**
  - **Intelligent Priority Algorithm**: Tasks are sorted using a scoring system that combines:
    - Priority weights (High: 100, Medium: 50, Low: 10)
    - Urgency bonuses (Overdue: +1000, <24h: +500, <48h: +200, <7d: +50)
    - Time until deadline (earlier deadlines score higher)
    - Completed tasks automatically sorted to bottom
  - Filter by status: All tasks, Active only, or Completed only
  - Task count badges for quick overview

### User Experience
- 🎨 **Modern UI/UX**
  - Clean, Material Design-inspired interface
  - Priority-colored indicators for quick visual scanning
  - Overdue task highlighting (red background for overdue items)
  - Smooth animations on task completion
  - Pull-to-refresh for manual sync
  - Floating Action Button (FAB) for quick task creation

- 📅 **Smart Date/Time Handling**
  - Native date and time pickers (platform-specific: Android/iOS)
  - Human-readable time remaining ("2 hours left", "Overdue by 3 days")
  - Automatic deadline validation (ensures deadline is after start time)

- 🔔 **User Feedback**
  - Visual overdue indicators
  - Time remaining badges
  - Success/error alerts for all operations
  - Loading states during data operations

## 🏗️ Architecture

### Tech Stack
- **Framework**: React Native 0.84.0 with TypeScript (type-safe development)
- **Backend**: Firebase (React Native Firebase native modules)
  - Firebase Authentication (user management)
  - Cloud Firestore (NoSQL database with real-time sync)
- **State Management**: React Context API + useReducer pattern
- **Navigation**: React Navigation v6 (native stack navigator)
- **Date/Time**: @react-native-community/datetimepicker
- **Icons**: react-native-vector-icons

### Project Structure
```
TodoApp/
├── src/
│   ├── api/
│   │   ├── firebase.ts                 # Firebase module exports
│   │   └── taskService.ts              # Firestore CRUD operations
│   ├── components/
│   │   ├── AddTaskModal.tsx            # Task creation/edit modal
│   │   ├── EmptyState.tsx              # Empty view placeholders
│   │   ├── FilterBar.tsx               # Task filter tabs
│   │   └── TaskCard.tsx                # Individual task display
│   ├── context/
│   │   ├── AuthContext.tsx             # Authentication state provider
│   │   ├── authReducer.ts              # Auth action reducer
│   │   ├── TaskContext.tsx             # Task state provider
│   │   └── taskReducer.ts              # Task action reducer
│   ├── navigation/
│   │   ├── RootNavigator.tsx           # Main navigation coordinator
│   │   └── types.ts                    # Navigation type definitions
│   ├── screens/
│   │   ├── LoginScreen.tsx             # User login
│   │   ├── RegisterScreen.tsx          # User registration
│   │   └── TaskListScreen.tsx          # Main task management
│   ├── theme/
│   │   └── index.ts                    # Design system (colors, spacing, typography)
│   ├── types/
│   │   └── index.ts                    # TypeScript type definitions
│   └── utils/
│       ├── dateUtils.ts                # Date formatting and calculations
│       ├── taskUtils.ts                # Task sorting and filtering
│       └── validators.ts               # Form validation utilities
├── android/                             # Android-specific files
├── ios/                                 # iOS-specific files
├── App.tsx                              # Application entry point
├── FIREBASE_SETUP.md                    # Firebase configuration guide
└── README.md                            # This file
```

### State Management

The app uses **React Context API with useReducer** for predictable state management:

#### AuthContext
- **State**: `{ user, loading, error }`
- **Actions**: 
  - `AUTH_LOADING` - Show loading state during async operations
  - `AUTH_SUCCESS` - Store authenticated user
  - `AUTH_ERROR` - Handle authentication errors
  - `AUTH_LOGOUT` - Clear user session
- **Methods**: `login()`, `register()`, `logout()`
- **Session Restoration**: Automatically restores user session on app restart using Firebase `onAuthStateChanged` listener

#### TaskContext
- **State**: `{ tasks, loading, error }`
- **Actions**:
  - `TASKS_LOADING` - Show loading state
  - `TASKS_LOADED` - Load tasks from Firestore
  - `TASKS_ERROR` - Handle errors
  - `TASK_ADDED` - Optimistically add task
  - `TASK_UPDATED` - Optimistically update task
  - `TASK_DELETED` - Optimistically delete task
- **Methods**: `addTask()`, `updateTask()`, `deleteTask()`, `toggleTaskCompletion()`
- **Real-time Sync**: Subscribes to Firestore updates on mount, unsubscribes on unmount
- **Optimistic Updates**: UI updates immediately, Firestore sync happens in background

### Smart Sorting Algorithm

Tasks are scored and sorted using a multi-factor algorithm:

```typescript
Score Calculation:
1. Base Priority Weight:
   - HIGH: 100 points
   - MEDIUM: 50 points
   - LOW: 10 points

2. Urgency Bonuses:
   - Overdue: +1000 points
   - Due within 24 hours: +500 points
   - Due within 48 hours: +200 points
   - Due within 7 days: +50 points

3. Time Penalty:
   - Subtract hours until deadline (sooner = higher score)

4. Completion Penalty:
   - Completed tasks: -1000 points (moved to bottom)

Final Score = Priority Weight + Urgency Bonus - Hours Until Deadline
```

**Example Scores:**
- High priority task due in 2 hours: 100 + 500 - 2 = **598**
- Medium priority overdue task: 50 + 1000 - (-24) = **1074**
- Low priority task due in 5 days: 10 + 0 - 120 = **-110**

This ensures the most urgent and important tasks always appear at the top.

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Android Studio (for Android development) or Xcode (for iOS development)
- Java Development Kit (JDK 11 or higher)
- Firebase account

### Installation

1. **Clone the repository**
   ```bash
   cd TodoApp
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Firebase Setup**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Email/Password authentication in Firebase Console → Authentication → Sign-in method
   - Create a Firestore database in Firebase Console → Firestore Database
   - Download `google-services.json` (Android) and place it in `android/app/`
   - Download `GoogleService-Info.plist` (iOS) and add it to your Xcode project
   - See `FIREBASE_SETUP.md` for detailed instructions

4. **Firestore Security Rules**
   Set the following security rules in Firebase Console → Firestore → Rules:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /tasks/{taskId} {
         allow read, write: if request.auth != null 
                          && request.resource.data.userId == request.auth.uid;
       }
     }
   }
   ```

5. **Run the app**

   **For Android:**
   ```bash
   # Start Metro bundler
   npm start

   # In a new terminal, run Android
   npm run android
   ```

   **For iOS:**
   ```bash
   # Install iOS dependencies
   cd ios && pod install && cd ..

   # Start Metro bundler
   npm start

   # In a new terminal, run iOS
   npm run ios
   ```

### Troubleshooting

- **Build errors**: Clean and rebuild
  ```bash
  cd android && ./gradlew clean && cd ..
  npm run android
  ```

- **Metro bundler cache issues**: Reset cache
  ```bash
  npm start -- --reset-cache
  ```

- **TypeScript errors**: Run type check
  ```bash
  npx tsc --noEmit
  ```

## 📝 Usage

### Getting Started
1. **Register**: Create a new account with email and password
2. **Login**: Sign in with your credentials (session persists across app restarts)
3. **Add Tasks**: Tap the blue + button to create a new task
4. **Edit Tasks**: Tap on any task card to edit its details
5. **Complete Tasks**: Tap the checkbox to mark tasks as complete
6. **Filter Tasks**: Use the filter bar to view All/Active/Completed tasks
7. **Delete Tasks**: Tap the 🗑️ icon to delete a task (with confirmation)
8. **Refresh**: Pull down on the task list to manually refresh
9. **Logout**: Tap "Sign Out" in the header to log out

### Task Creation Guidelines
- **Title**: Required, max 100 characters
- **Description**: Optional, max 500 characters
- **Start Date/Time**: When the task begins
- **Deadline**: Must be after start date/time
- **Priority**: Low/Medium/High (affects sorting)
- **Category**: Work/Personal/Study/Other (for organization)

## 🔐 Security

- All user data is protected by Firebase Authentication
- Firestore security rules ensure users can only access their own tasks
- Passwords are hashed and managed by Firebase (never stored in plain text)
- Data transmission is encrypted (HTTPS)

## 🧪 Testing

### Type Safety
All code is written in TypeScript with strict type checking:
```bash
npx tsc --noEmit
```

### Manual Testing Checklist
- [ ] User registration (email validation, password requirements)
- [ ] User login (correct credentials, error handling)
- [ ] Session persistence (close and reopen app)
- [ ] Task creation (all fields, validation)
- [ ] Task editing (modify existing task)
- [ ] Task completion toggle (checkbox animation, sorting changes)
- [ ] Task deletion (confirmation alert)
- [ ] Filter switching (All/Active/Completed)
- [ ] Smart sorting (verify order matches priority + urgency)
- [ ] Overdue highlighting (red background for overdue tasks)
- [ ] Logout (returns to login screen)

## 🎯 Future Improvements

### Planned Features
- 🔔 **Push Notifications**: Reminders before task deadlines
- 🔍 **Search**: Full-text search for tasks by title or description
- 🏷️ **Custom Categories**: Allow users to create custom categories
- 📊 **Analytics Dashboard**: Task completion statistics and productivity insights
- 🌙 **Dark Mode**: Theme toggle for light/dark preferences
- 🔄 **Recurring Tasks**: Support for daily/weekly/monthly recurring tasks
- 📎 **Attachments**: Add images or files to tasks
- 👥 **Shared Tasks**: Collaborate with other users on tasks
- 📱 **Widgets**: Home screen widgets for quick task overview
- 🌐 **Offline Mode**: Full offline support with sync queue

### Code Quality
- Unit tests (Jest + React Native Testing Library)
- Integration tests for Firebase operations
- E2E tests (Detox)
- CI/CD pipeline (GitHub Actions)
- Code coverage reports
- Performance monitoring (Firebase Performance)
- Crash reporting (Firebase Crashlytics)

## 👨‍💻 Developer Notes

### Code Quality Standards
- **TypeScript**: Strict mode enabled, all files typed
- **Comments**: Comprehensive JSDoc-style documentation on all functions
- **Naming**: Consistent camelCase for variables/functions, PascalCase for components/types
- **Error Handling**: Try-catch blocks with user-friendly error messages
- **Performance**: Memoization (useMemo, useCallback) for expensive operations
- **Accessibility**: (Future) ARIA labels, screen reader support

### Key Design Decisions
1. **Context + useReducer over Redux**: Simpler state management for app of this size
2. **Optimistic Updates**: Immediate UI feedback while Firestore syncs in background
3. **ISO 8601 Date Strings**: Standard format for Firestore serialization
4. **Real-time Subscriptions**: Firestore `onSnapshot` for live data sync
5. **Native Firebase Modules**: Better performance than JS SDK for React Native

## 📄 License

This project is created for educational/portfolio purposes.

## 🙋‍♂️ Contact

For questions or feedback about this project, please reach out through the repository issues.

---

**Built with ❤️ using React Native**
