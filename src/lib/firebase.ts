import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

let app: FirebaseApp | null = null;
let authInstance: Auth | null = null;
let dbInstance: Firestore | null = null;

function getFirebaseApp(): FirebaseApp {
    if (!app) {
        app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    }
    return app;
}

export function getFirebaseAuth(): Auth {
    if (!authInstance) authInstance = getAuth(getFirebaseApp());
    return authInstance;
}

export function getFirebaseDb(): Firestore {
    if (!dbInstance) dbInstance = getFirestore(getFirebaseApp());
    return dbInstance;
}

// Lazy proxy exports — always resolve at call time, never cached as null
export const auth = new Proxy({} as Auth, {
    get(_target, prop) {
        return (getFirebaseAuth() as unknown as Record<string | symbol, unknown>)[prop];
    },
});

export const db = new Proxy({} as Firestore, {
    get(_target, prop) {
        return (getFirebaseDb() as unknown as Record<string | symbol, unknown>)[prop];
    },
});

export default getFirebaseApp;
