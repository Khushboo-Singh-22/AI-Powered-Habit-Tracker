# 🚀 AI-Powered Habit Tracker

<div align="center">

# 🧠 AI-Powered Habit Tracker

### Build Better Habits • Track Progress • Stay Consistent

A modern full-stack habit tracking application designed to help users build positive habits, monitor progress, analyze performance, and receive AI-powered insights.

![MERN](https://img.shields.io/badge/MERN-Stack-green?style=for-the-badge)
![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge)
![Node](https://img.shields.io/badge/Node.js-Express-green?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green?style=for-the-badge)
![JWT](https://img.shields.io/badge/Auth-JWT-orange?style=for-the-badge)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Styled-blue?style=for-the-badge)

</div>

---

# 📖 About

AI-Powered Habit Tracker is a productivity application that helps users create healthy routines and maintain consistency.

The application provides:

* Daily habit tracking
* Streak management
* Weekly analytics
* Progress charts
* Heatmap visualization
* AI-generated reports
* AI habit suggestions
* Personalized recovery plans
* Dark mode support
* Beautiful responsive dashboard

---

# ✨ Features

## 🔐 Authentication

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* User Profile

---

## 📅 Habit Management

* Create habits
* Update habits
* Delete habits
* Archive habits
* Habit categories
* Custom colors
* Custom icons
* Daily and weekly habits

---

## 📊 Analytics

* Completion statistics
* Current streak
* Longest streak
* Weekly insights
* Category distribution
* Completion heatmap
* Daily performance graph

---

## 🤖 AI Features

### AI Weekly Report

Generates personalized weekly reports based on habit completion.

### AI Habit Suggestions

Suggests new habits according to user activity.

### AI Recovery Plan

Provides recovery strategies after missing habits.

### AI Chat

Simple motivational AI assistant.

### Morning Motivation

Daily motivational messages.

---

# 🖥️ Dashboard

Users can view:

✅ Active habits

✅ Today's progress

✅ Weekly completion

✅ Completion percentage

✅ Streaks

✅ Statistics

---

# 🏗️ Project Structure

```
AI-Powered-Habit-Tracker

│
├── backend
│   ├── config
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── server.js
│   └── package.json
│
├── frontend
│   └── ai-Habit-Tracker
│       ├── src
│       ├── public
│       ├── package.json
│       └── vite.config.js
│
└── README.md
```

---

# 🛠 Tech Stack

## Frontend

* React
* Vite
* Tailwind CSS
* React Router
* Axios
* Recharts
* Framer Motion

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcryptjs

## Authentication

* JWT Tokens

## Database

* MongoDB Atlas

---

# 📦 Installation

## Clone Repository

```
git clone https://github.com/Khushboo-Singh-22/AI-Powered-Habit-Tracker.git
```

```
cd AI-Powered-Habit-Tracker
```

---

# Backend Setup

```
cd backend
```

Install dependencies:

```
npm install
```

Create .env

```
PORT=8000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret

CLIENT_URL=http://localhost:5173
```

Run:

```
npm run dev
```

---

# Frontend Setup

```
cd frontend/ai-Habit-Tracker
```

Install:

```
npm install
```

Create:

```
.env

VITE_API_URL=http://localhost:8000/api
```

Run:

```
npm run dev
```

---

# API Routes

## Authentication

```
POST /api/auth/register

POST /api/auth/login

GET /api/auth/me
```

---

## Habits

```
GET /api/habits

POST /api/habits

PUT /api/habits/:id

DELETE /api/habits/:id
```

---

## Logs

```
POST /api/logs

DELETE /api/logs

GET /api/logs/today

GET /api/logs/stats
```

---

## AI

```
POST /api/ai/chat

POST /api/ai/weekly-report

POST /api/ai/recovery-plan

POST /api/ai/suggest-habits
```

---

# 🔒 Security

* JWT Authentication
* Password Hashing
* Protected Routes
* Environment Variables
* Secure MongoDB Connection

---

# 🎯 Future Improvements

* Google Authentication
* Email Verification
* Push Notifications
* AI Chatbot Upgrade
* Mobile Application
* Habit Sharing
* Friends System
* Leaderboard
* Rewards System
* Calendar Sync

---

# 📸 Screenshots

## Landing Page

Add screenshot here.

## Dashboard

Add screenshot here.

## Habit Management

Add screenshot here.

## Weekly Insights

Add screenshot here.

## Statistics

Add screenshot here.

---

# 🤝 Contributing

Contributions are welcome.

1. Fork repository
2. Create branch
3. Commit changes
4. Push branch
5. Open Pull Request

---

# 👩‍💻 Author

## Khushboo Singh

### Full Stack Developer

### MERN Stack Developer

### Java Developer

GitHub:
https://github.com/Khushboo-Singh-22

---

# ⭐ Support

If you like this project, please consider giving it a ⭐ on GitHub.

It helps motivate future development and supports open-source contributions.

---

<div align="center">

## 🌟 Build Better Habits, Build a Better Life 🌟

Made with ❤️ by Khushboo Singh

</div>
