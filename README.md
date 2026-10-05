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
