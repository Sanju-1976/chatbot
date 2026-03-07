# GroqChat 🤖⚡

A modern, blazing-fast AI chatbot powered by **Groq** (LLaMA 3 70B) and **Firebase**.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS + Custom CSS |
| Auth | Firebase Authentication (Google + Email) |
| Database | Firebase Firestore (Chat History) |
| AI Backend | Groq API (LLaMA 3 70B, 8192 tokens) |
| Deployment | Vercel + Firebase |

## Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/Sanju-1976/chatbot.git
cd chatbot
npm install
```

### 2. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com) and create a new project
2. Enable **Authentication** → Google + Email/Password
3. Enable **Firestore Database** (start in test mode, then apply rules)
4. Get your Firebase config from **Project Settings → Your Apps → Web App**

### 3. Groq API Key

1. Go to [console.groq.com](https://console.groq.com) and get your API key

### 4. Environment Variables

Copy the template and fill in your values:

```bash
cp .env.local.template .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
GROQ_API_KEY=your_groq_api_key
```

### 5. Apply Firestore Rules

```bash
npm install -g firebase-tools
firebase login
firebase deploy --only firestore:rules
```

### 6. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 7. Deploy to Vercel

```bash
npx vercel --prod
```

Add all environment variables in the Vercel dashboard.

## Features

- ⚡ **Ultra-fast** AI responses via Groq's LPU
- 💬 **Persistent chat history** in Firestore  
- 🔐 **Google + Email auth** via Firebase
- 🎨 **Markdown rendering** — code blocks, tables, lists
- 🌙 **Premium dark UI** with glassmorphism
- 📱 **Responsive** design

## Project Structure

```
src/
├── app/
│   ├── api/chat/route.ts    # Groq API proxy
│   ├── chat/page.tsx        # Main chat interface
│   ├── login/page.tsx       # Auth page
│   └── page.tsx             # Landing page
├── components/
│   ├── ChatSidebar.tsx      # Conversation list
│   ├── ChatWindow.tsx       # Message display
│   ├── ChatInput.tsx        # Input area
│   └── MessageBubble.tsx    # Message component
├── contexts/
│   └── AuthContext.tsx      # Firebase auth context
└── lib/
    ├── firebase.ts          # Firebase init
    └── firestore.ts         # DB helpers
```
