"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import ChatSidebar from "@/components/ChatSidebar";
import ChatWindow from "@/components/ChatWindow";
import ChatInput from "@/components/ChatInput";
import { Message, createConversation, getMessages, addMessage, getConversations, Conversation } from "@/lib/firestore";

export const dynamic = "force-dynamic";

function ChatContent() {
    const { user, loading, signOut } = useAuth();
    const router = useRouter();

    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [activeConvId, setActiveConvId] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        if (!loading && !user) router.push("/login");
    }, [user, loading, router]);

    useEffect(() => {
        if (user) loadConversations();
    }, [user]);

    useEffect(() => {
        if (user && activeConvId) loadMessages(activeConvId);
    }, [activeConvId, user]);

    const loadConversations = async () => {
        if (!user) return;
        const convs = await getConversations(user.uid);
        setConversations(convs);
        if (convs.length > 0 && !activeConvId) {
            setActiveConvId(convs[0].id);
        }
    };

    const loadMessages = async (convId: string) => {
        if (!user) return;
        const msgs = await getMessages(user.uid, convId);
        setMessages(msgs);
    };

    const handleNewChat = async () => {
        if (!user) return;
        const id = await createConversation(user.uid, "New Conversation");
        await loadConversations();
        setActiveConvId(id);
        setMessages([]);
    };

    const handleSend = async (content: string) => {
        if (!user || !content.trim()) return;

        let convId = activeConvId;

        // Auto-create conversation if none exists
        if (!convId) {
            convId = await createConversation(user.uid, content.slice(0, 40));
            await loadConversations();
            setActiveConvId(convId);
        }

        // Update title of first message
        if (messages.length === 0 && conversations.find(c => c.id === convId)?.title === "New Conversation") {
            // title already set on creation; skip update for now
        }

        const userMsg: Message = { role: "user", content };
        setMessages((prev) => [...prev, userMsg]);
        await addMessage(user.uid, convId, userMsg);

        setIsTyping(true);
        try {
            const history = [...messages, userMsg].map((m) => ({ role: m.role, content: m.content }));
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ messages: history }),
            });

            const data = await res.json();
            const aiMsg: Message = { role: "assistant", content: data.content };
            setMessages((prev) => [...prev, aiMsg]);
            await addMessage(user.uid, convId, aiMsg);
        } catch {
            const errMsg: Message = { role: "assistant", content: "⚠️ Sorry, something went wrong. Please try again." };
            setMessages((prev) => [...prev, errMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleSelectConv = (id: string) => {
        setActiveConvId(id);
    };

    const handleDelete = async (id: string) => {
        const { deleteConversation } = await import("@/lib/firestore");
        if (!user) return;
        await deleteConversation(user.uid, id);
        await loadConversations();
        if (activeConvId === id) {
            setActiveConvId(null);
            setMessages([]);
        }
    };

    if (loading) {
        return (
            <div style={{ height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-primary)" }}>
                <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 40, marginBottom: 16 }}>⚡</div>
                    <p style={{ color: "var(--text-secondary)" }}>Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{ display: "flex", height: "100vh", background: "var(--bg-primary)", overflow: "hidden" }}>
            {/* Sidebar */}
            <ChatSidebar
                conversations={conversations}
                activeConvId={activeConvId}
                onSelect={handleSelectConv}
                onNewChat={handleNewChat}
                onDelete={handleDelete}
                isOpen={sidebarOpen}
                onToggle={() => setSidebarOpen(!sidebarOpen)}
                user={user}
                onSignOut={async () => { await signOut(); router.push("/"); }}
            />

            {/* Main */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
                {/* Top bar */}
                <div style={{
                    display: "flex", alignItems: "center", padding: "16px 24px",
                    borderBottom: "1px solid var(--border)", background: "rgba(10,10,15,0.8)",
                    backdropFilter: "blur(10px)", gap: 12, flexShrink: 0
                }}>
                    {!sidebarOpen && (
                        <button onClick={() => setSidebarOpen(true)} style={{
                            background: "none", border: "1px solid var(--border)", borderRadius: 8,
                            color: "var(--text-secondary)", cursor: "pointer", padding: "6px 10px", fontSize: 16
                        }}>☰</button>
                    )}
                    <div style={{
                        width: 28, height: 28, borderRadius: 8,
                        background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14
                    }}>⚡</div>
                    <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>GroqChat</span>
                    <span style={{
                        marginLeft: "auto", fontSize: 12, background: "rgba(124,58,237,0.15)",
                        color: "#c4b5fd", padding: "4px 10px", borderRadius: 100,
                        border: "1px solid rgba(124,58,237,0.3)"
                    }}>LLaMA 3 · 70B</span>
                </div>

                {/* Messages */}
                <ChatWindow messages={messages} isTyping={isTyping} />

                {/* Input */}
                <ChatInput onSend={handleSend} disabled={isTyping} />
            </div>
        </div>
    );
}

export default function ChatPage() {
    return <ChatContent />;
}
