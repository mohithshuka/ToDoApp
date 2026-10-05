# 📝 ToDoApp — Smart Task Manager

A clean and simple **Todo / Task Management mobile application** built with **React Native CLI + TypeScript**.

The app helps users create, organize, track, and complete tasks with useful details such as deadlines, priority, categories, and descriptions.

---

## 📱 Screenshots

### 🔐 Sign In

Users can sign in with their email and password.

<img width="300" alt="Sign In" src="https://github.com/user-attachments/assets/24bbfedc-e871-4270-9abc-7f7fcf7ace81" />

---

### 📋 My Tasks

View all tasks, filter between active and completed tasks, mark tasks as complete, and delete tasks.

<img width="300" alt="My Tasks" src="https://github.com/user-attachments/assets/41f63da8-fc57-4818-922c-0e5ea6e6e696" />

---

### ✅ Completed Task

Completed tasks are visually separated and can be viewed from the **Completed** tab.

<img width="300" alt="Completed Task" src="https://github.com/user-attachments/assets/c8d42a00-28ff-4cf0-99e8-dae763d2cb63" />

---

### ➕ Create a New Task

Create a task with a title, description, start date/time, deadline, priority, and category.

<img width="300" alt="New Task" src="https://github.com/user-attachments/assets/671bd2c0-3982-4230-a4c8-781ed551072f" />

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

---

# 🚀 How to Run

## 1️⃣ Clone the Repository

```bash
git clone https://github.com/mohithshuka/ToDoApp.git
cd ToDoApp
```

---

## 2️⃣ Install Dependencies

Make sure **Node.js** is installed on your computer.

Then run:

```bash
npm install
```

---

## 3️⃣ Configure Firebase

This application uses:

- Firebase Authentication
- Cloud Firestore

Make sure your Firebase Android configuration is available in:

```text
android/app/google-services.json
```

> ⚠️ Do not commit sensitive credentials or private configuration files to GitHub.

---

## 4️⃣ Connect an Android Device

Enable the following on your Android phone:

- Developer Options
- USB Debugging

Connect your phone to your computer using a USB cable.

Check the connected device:

```bash
adb devices
```

You should see something similar to:

```text
List of devices attached
RZCW50T3KLZ    device
```

If your phone shows `unauthorized`, unlock your phone and accept:

**Allow USB debugging?**

---

## 5️⃣ Start Metro

Open **Terminal 1** inside the project folder:

```bash
npx react-native start
```

Keep this terminal running.

Metro will run on:

```text
http://localhost:8081
```

---

## 6️⃣ Connect the Phone to Metro

Open **Terminal 2** inside the project folder:

```bash
adb reverse tcp:8081 tcp:8081
```

---

## 7️⃣ Run the Android App

In **Terminal 2**, run:

```bash
npx react-native run-android
```

The application will build and install on your connected Android phone.

---

# 📱 Quick Start

If everything is already installed and configured:

### Terminal 1

```bash
npx react-native start
```

Keep Metro running.

### Terminal 2

```bash
adb devices
adb reverse tcp:8081 tcp:8081
npx react-native run-android
```

The app should then open on your Android phone.

---

# 🔥 Firebase

The application uses Firebase for backend services.

## Firebase Authentication

Firebase Authentication handles:

- User registration
- User login
- User authentication
- User sign out

## Cloud Firestore

Cloud Firestore is used for storing task information.

Tasks contain information such as:

- Title
- Description
- Start date and time
- Deadline
- Priority
- Category
- Completion status

---

## 📋 Task Data

A task contains:

```text
Title
Description
Start Date & Time
Deadline
Priority
Category
Completion Status
```

### Example

```text
Title: Complete assignment

Description:
Finish the Todo application

Start:
Oct 5, 2026, 8:32 PM

Deadline:
Oct 6, 2026, 8:32 PM

Priority:
Medium

Category:
Personal

Status:
Active
```

---

# 🎯 Main User Flow

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

# 🔎 Task Filtering

The application provides three task views:

### All

Displays all tasks.

### Active

Displays tasks that are currently active.

### Completed

Displays tasks that have been completed.

---

# 🚦 Task Priority

Tasks can have three priority levels:

| Priority | Description |
|---|---|
| 🟢 Low | Lower-priority tasks |
| 🟡 Medium | Normal-priority tasks |
| 🔴 High | Important or urgent tasks |

---

# 🏷️ Task Categories

Tasks can be organized into:

- 💼 Work
- 👤 Personal
- 📚 Study
- 📁 Other

---

# ⏰ Deadline Tracking

Tasks display their deadline and remaining time.

Example:

```text
Due: Oct 6, 2026 at 8:32 PM

23 hours left
```

---

# 🧪 Development Commands

### Start Metro

```bash
npx react-native start
```

### Run Android

```bash
npx react-native run-android
```

### Run Tests

```bash
npm test
```

### Check Connected Android Devices

```bash
adb devices
```

### Connect Physical Device to Metro

```bash
adb reverse tcp:8081 tcp:8081
```

---

# 🐛 Troubleshooting

## Android Device Shows `unauthorized`

If you see:

```text
RZCW50T3KLZ    unauthorized
```

unlock your phone and accept the:

**Allow USB debugging?**

popup.

You can also restart ADB:

```bash
adb kill-server
adb start-server
adb devices
```

---

## Metro Connection Problem

Run:

```bash
adb reverse tcp:8081 tcp:8081
```

Then restart the application:

```bash
npx react-native run-android
```

---

## No Connected Devices

Check:

```bash
adb devices
```

Your phone should appear as:

```text
RZCW50T3KLZ    device
```

If it does not appear:

1. Check the USB cable.
2. Unlock your phone.
3. Enable USB debugging.
4. Accept the USB debugging permission.
5. Reconnect the phone.
6. Run `adb devices` again.

---

# 📌 Important Notes

- This is a **React Native CLI** project.
- The project uses **TypeScript**.
- The application currently targets **Android**.
- Android development requires the Android SDK.
- A physical Android device or emulator is required to run the Android application.
- Firebase configuration is required for authentication and cloud task functionality.
- This project does **not** use Expo Go.

---

# 📈 Future Improvements

- 🔔 Push notifications for deadlines
- ✏️ Edit existing tasks
- 🔍 Search tasks
- 🏷️ Custom tags
- 📊 Task statistics
- 🔃 Advanced sorting
- 🌙 Dark mode
- ☁️ Improved offline support
- 📅 Calendar view
- 🔔 Deadline reminders

---

# 👨‍💻 Author

**Mohit Shukla**

GitHub:

https://github.com/mohithshuka

---

# ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

### Repository

https://github.com/mohithshuka/ToDoApp

---

# 📄 License

This project is available for educational and development purposes.
