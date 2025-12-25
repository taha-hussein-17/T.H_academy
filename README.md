# T.H Academy - Modern E-Learning Platform

T.H Academy is a premium, high-performance e-learning platform built with **React 19**, **Tailwind CSS**, and **Firebase**. It features a sophisticated UI/UX with smooth animations, local data persistence, and a comprehensive Admin Panel.

## 🚀 Key Features

### 🎓 For Students
- **Course Discovery**: Browse and search through various technology courses (React, JavaScript, UI/UX, etc.).
- **Interactive Dashboard**: Track your learning progress, points, and hours spent.
- **Lesson Player**: Smooth learning experience with simulated progress tracking.
- **Gamification**: Leaderboard system to compete with other learners and earn badges.
- **Certificate Verification**: Authentic certificate verification system with tamper-proof IDs.
- **Modern UI**: Fully responsive design with Framer Motion animations and dark mode support.

### 🛠 For Administrators
- **Unified Admin Console**: Manage all platform content (Courses, Blog, FAQs, Users) from one place.
- **CRUD Operations**: Add, edit, and delete courses and blog posts in real-time.
- **Data Resilience**: Works with Firebase Firestore and falls back to LocalStorage if the connection is unavailable.
- **Stats Overview**: Monitor platform health with real-time user and course statistics.

## 💻 Tech Stack
- **Frontend**: React 19, Vite, Tailwind CSS
- **Animations**: Framer Motion, Lucide React (Icons)
- **Backend/Auth**: Firebase (Authentication, Firestore)
- **Persistence**: LocalStorage (Offline-first approach)
- **Routing**: React Router DOM v7

## 🛠 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/taha-hussein-17/T.H_academy.git
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Firebase**:
   Create a `.env` file or update `src/utils/firebase.js` with your Firebase credentials:
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_AUTH_DOMAIN",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_STORAGE_BUCKET",
     messagingSenderId: "YOUR_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   ```

4. **Run development server**:
   ```bash
   npm run dev
   ```

## 🔐 Admin Access
To access the Admin Panel:
- Use one of the authorized emails (e.g., `admin@thacademy.com`).
- Or use the **Admin Access** shortcut on the Login page for testing purposes.

## 📄 License
MIT License - Copyright (c) 2025 T.H Academy
