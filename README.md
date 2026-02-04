# PingMe — React Chat App

A lightweight real-time one-to-one chat application built with React and Firebase. This project is intended as a demo/portfolio app showcasing authentication, realtime messaging, and presence tracking.

---

**Live Demo:** [https://chat-app-df093.web.app/]

## About

A simple chat app that supports user authentication, presence (online/offline), and one-to-one messaging. Note: there is currently no profile image upload or display feature included — this may be added in a future update.

## Tech stack

- **Frontend:** React 19 + Vite ⚡
- **Styling:** Tailwind CSS
- **Realtime & Storage:** Firebase (Auth, Firestore, Realtime Database, Storage)
- **Database:** Cloud Firestore (NoSQL).
- **UI / Utilities:** react-icons, react-toastify
- **Dev tools:** ESLint, PostCSS
- **Hosting:** Firebase Hosting.

## Key features

- User login and registration powered by Firebase Auth.
- Messages sync instantly across all devices using Cloud Firestore.
- One-to-one chats stored in `chats/{chatId}/messages` (Firestore)
- Chat list with last message & sorting by timestamp
- Online presence using Firebase Realtime Database (`/status/{uid}`)
- Toast notifications for UX feedback
- Optimized for both desktop and mobile views.

## Important files & structure

- `src/firebase/firebase.js` — Firebase setup & helpers (listenForChats, sendMessage, listenForMessages)
- `src/firebase/firebaseUtility.js` — presence helpers (and utilities)
- `src/components/` — `Login`, `Register`, `Chatlist`, `Chatbox`, `SearchModal`, etc.
- `src/utils/formatTimestamp.js` — timestamp formatting

## Quick start

```bash
npm install
npm run dev
# open http://localhost:5173 (Vite default)
```

app is live in :https://chat-app-df093.web.app/
