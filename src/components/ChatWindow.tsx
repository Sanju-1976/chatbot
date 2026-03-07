"use client";

import { useEffect, useRef } from "react";
import { Message } from "@/lib/firestore";
import MessageBubble from "./MessageBubble";

interface Props {
    messages: Message[];
    isTyping: boolean;
}

export default function ChatWindow({ messages, isTyping }: Props) {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    return (
        <div style={{
            flex: 1, overflowY: "auto", padding: "24px",
            display: "flex", flexDirection: "column", gap: 4
        }}>
            {messages.length === 0 && !isTyping && (
                <div style={{
                    flex: 1, display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center", textAlign: "center",
                    padding: "40px 24px"
                }}>
                    <div style={{
                        fontSize: 56, marginBottom: 20,
                        filter: "drop-shadow(0 0 20px rgba(124,58,237,0.6))"
                    }}>⚡</div>
                    <h2 style={{ fontSize: 24, fontWeight: 700, color: "var(--text-primary)", marginBottom: 10 }}>
                        How can I help you today?
                    </h2>
                    <p style={{ color: "var(--text-secondary)", maxWidth: 400, lineHeight: 1.7 }}>
                        Ask me anything — code, analysis, writing, math, or just a conversation. I&apos;m powered by LLaMA 3 70B via Groq.
                    </p>
                    <div style={{
                        display: "grid", gridTemplateColumns: "repeat(2, 1fr)",
                        gap: 10, marginTop: 32, width: "100%", maxWidth: 500
                    }}>
                        {[
                            "Explain quantum computing",
                            "Write a Python web scraper",
                            "Help me plan a trip to Japan",
                            "What is the meaning of life?",
                        ].map((prompt) => (
                            <div key={prompt} style={{
                                background: "var(--bg-card)", border: "1px solid var(--border)",
                                borderRadius: 12, padding: "12px 14px", cursor: "pointer",
                                fontSize: 13, color: "var(--text-secondary)", textAlign: "left",
                                transition: "all 0.2s"
                            }}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(124,58,237,0.5)";
                                    (e.currentTarget as HTMLDivElement).style.color = "var(--text-primary)";
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
                                    (e.currentTarget as HTMLDivElement).style.color = "var(--text-secondary)";
                                }}
                            >
                                {prompt}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {messages.map((msg, i) => (
                <MessageBubble key={i} message={msg} />
            ))}

            {isTyping && (
                <div className="fade-in" style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "8px 0" }}>
                    <div style={{
                        width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                        background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                        display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14,
                        boxShadow: "0 0 12px rgba(124,58,237,0.4)"
                    }}>⚡</div>
                    <div style={{
                        background: "var(--ai-bubble)", border: "1px solid var(--border)",
                        borderRadius: "4px 18px 18px 18px", padding: "14px 18px",
                        display: "flex", gap: 5, alignItems: "center"
                    }}>
                        <span className="typing-dot" />
                        <span className="typing-dot" />
                        <span className="typing-dot" />
                    </div>
                </div>
            )}
            <div ref={bottomRef} />
        </div>
    );
}
