# 📝 ToDoApp — Smart Task Manager

A clean and simple **Todo / Task Management mobile application** built with **React Native CLI + TypeScript**.

The app helps users create, organize, track, and complete tasks with useful details such as deadlines, priority, categories, and descriptions.

---

## 📱 Screenshots

### 🔐 Sign In
Users can sign in with their email and password.

![Sign In](screenshots/login.jpeg)

### 📋 My Tasks
View all tasks, filter between active and completed tasks, mark tasks as complete, and delete tasks.

![My Tasks](screenshots/tasks.jpeg)

### ✅ Completed Task
Completed tasks are visually separated and can be viewed from the **Completed** tab.

![Completed Task](screenshots/completed-task.jpeg)

### ➕ Create a New Task
Create a task with a title, description, start date/time, deadline, priority, and category.

![New Task](screenshots/new-task.jpeg)

---

## ✨ Features

- 🔐 Email/password authentication
- 📝 Create tasks
- 📄 Add task descriptions
- 📅 Set start date & time
- ⏰ Set task deadlines
- 🚦 Set task priority
  - Low
  - Medium
  - High
- 🏷️ Organize tasks by category
  - Work
  - Personal
  - Study
  - Other
- ✅ Mark tasks as completed
- 🗑️ Delete tasks
- 📊 View task counts
- 🔎 Filter tasks by:
  - All
  - Active
  - Completed
- ⏳ Display remaining time until a deadline
- 📱 Android mobile interface
- 🎨 Clean and responsive UI

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| React Native | Mobile application |
| TypeScript | Type-safe development |
| React Native CLI | Project/build tooling |
| Firebase Authentication | User authentication |
| Firebase Firestore | Task data storage |
| Android | Mobile platform |

---

## 📂 Project Structure

```text
ToDoApp/
├── android/
├── ios/
├── src/
│   ├── components/
│   ├── screens/
│   ├── services/
│   ├── navigation/
│   └── ...
├── __tests__/
├── App.tsx
├── index.js
├── package.json
├── tsconfig.json
├── babel.config.js
└── README.md
```

> The exact contents of `src/` may vary depending on the current implementation.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/mohithshuka/ToDoApp.git
cd ToDoApp
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Firebase

This application uses Firebase for authentication and task storage.

Follow the project's Firebase setup instructions before running the app.

Make sure your Firebase Android configuration is correctly added to the Android project.

### 4. Connect an Android device

Enable **Developer Options** and **USB Debugging** on your Android phone.

Check the connected device:

```bash
adb devices
```

The device should appear with status:

```text
device
```

### 5. Start Metro

```bash
npx react-native start
```

### 6. Run the Android application

In another terminal:

```bash
npx react-native run-android
```

---

## 🔥 Firebase

The current application uses:

- **Firebase Authentication** for account sign-in/sign-up
- **Cloud Firestore** for storing task information

Each user's tasks can be associated with their authenticated account.

---

## 📋 Task Data

A task contains information such as:

```text
Title
Description
Start Date & Time
Deadline
Priority
Category
Completion Status
```

Example:

```text
Title: Complete assignment
Description: Finish the Todo application
Start: Oct 5, 2026, 8:32 PM
Deadline: Oct 6, 2026, 8:32 PM
Priority: Medium
Category: Personal
Status: Active
```

---

## 🎯 Main User Flow

```text
Sign In
   ↓
My Tasks
   ↓
Create New Task
   ↓
Enter Task Details
   ↓
Save Task
   ↓
Task Appears in My Tasks
   ↓
Complete / Delete Task
```

---

## 🧪 Development

Start Metro:

```bash
npx react-native start
```

Run Android:

```bash
npx react-native run-android
```

Run tests:

```bash
npm test
```

---

## 📌 Notes

- This is a **React Native CLI** project, not an Expo Go project.
- Android development requires the Android SDK and a connected Android device or emulator.
- Firebase configuration is required for authentication and cloud task functionality.

---

## 👨‍💻 Author

**Mohit Shukla**

GitHub: [@mohithshuka](https://github.com/mohithshuka)

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

**Repository:** https://github.com/mohithshuka/ToDoApp
