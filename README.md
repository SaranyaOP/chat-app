# PingMe — React Chat App

A lightweight real-time one-to-one chat application built with React and Firebase. This project is intended as a demo/portfolio app showcasing authentication, realtime messaging, and presence tracking.

---

## About

A simple chat app that supports user authentication, presence (online/offline), and one-to-one messaging. Note: there is currently no profile image upload or display feature included — this may be added in a future update.

## Tech stack

- **Frontend:** React 19 + Vite ⚡
- **Styling:** Tailwind CSS
- **Realtime & Storage:** Firebase (Auth, Firestore, Realtime Database, Storage)
- **UI / Utilities:** react-icons, react-toastify
- **Dev tools:** ESLint, PostCSS

## Key features

- User sign up / login via Firebase Auth
- One-to-one chats stored in `chats/{chatId}/messages` (Firestore)
- Chat list with last message & sorting by timestamp
- Online presence using Firebase Realtime Database (`/status/{uid}`)
- Toast notifications for UX feedback

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

