import {
    collection,
    addDoc,
    getDocs,
    query,
    orderBy,
    serverTimestamp,
    Timestamp,
    doc,
    deleteDoc,
    writeBatch,
} from "firebase/firestore";
import { getFirebaseDb } from "./firebase";

export interface Message {
    id?: string;
    role: "user" | "assistant";
    content: string;
    createdAt?: Timestamp;
}

export interface Conversation {
    id: string;
    title: string;
    createdAt?: Timestamp;
}

// Create a new conversation
export async function createConversation(userId: string, title: string): Promise<string> {
    const ref = await addDoc(collection(getFirebaseDb(), "users", userId, "conversations"), {
        title,
        createdAt: serverTimestamp(),
    });
    return ref.id;
}

// Get all conversations for a user
export async function getConversations(userId: string): Promise<Conversation[]> {
    const q = query(
        collection(getFirebaseDb(), "users", userId, "conversations"),
        orderBy("createdAt", "desc")
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Conversation));
}

// Add a message to a conversation
export async function addMessage(
    userId: string,
    conversationId: string,
    message: Omit<Message, "id">
): Promise<string> {
    const ref = await addDoc(
        collection(getFirebaseDb(), "users", userId, "conversations", conversationId, "messages"),
        { ...message, createdAt: serverTimestamp() }
    );
    return ref.id;
}

// Get all messages in a conversation
export async function getMessages(
    userId: string,
    conversationId: string
): Promise<Message[]> {
    const q = query(
        collection(getFirebaseDb(), "users", userId, "conversations", conversationId, "messages"),
        orderBy("createdAt", "asc")
    );
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Message));
}

// Delete a conversation and all its messages
export async function deleteConversation(userId: string, conversationId: string) {
    const db = getFirebaseDb();
    const messagesSnap = await getDocs(
        collection(db, "users", userId, "conversations", conversationId, "messages")
    );
    const batch = writeBatch(db);
    messagesSnap.docs.forEach((d) => batch.delete(d.ref));
    batch.delete(doc(db, "users", userId, "conversations", conversationId));
    await batch.commit();
}
