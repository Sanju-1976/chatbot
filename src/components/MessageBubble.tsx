"use client";

import { Message } from "@/lib/firestore";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
    message: Message;
}

export default function MessageBubble({ message }: Props) {
    const isUser = message.role === "user";

    if (isUser) {
        return (
            <div className="fade-in" style={{
                display: "flex", justifyContent: "flex-end", padding: "6px 0"
            }}>
                <div style={{
                    maxWidth: "70%", background: "var(--user-bubble)",
                    borderRadius: "18px 4px 18px 18px",
                    padding: "12px 18px", color: "white",
                    fontSize: 15, lineHeight: 1.65,
                    boxShadow: "0 4px 20px rgba(124,58,237,0.3)"
                }}>
                    {message.content}
                </div>
            </div>
        );
    }

    return (
        <div className="fade-in" style={{
            display: "flex", alignItems: "flex-start", gap: 12, padding: "6px 0"
        }}>
            <div style={{
                width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 14, boxShadow: "0 0 12px rgba(124,58,237,0.4)"
            }}>⚡</div>
            <div style={{
                maxWidth: "75%", background: "var(--ai-bubble)",
                border: "1px solid var(--border)",
                borderRadius: "4px 18px 18px 18px",
                padding: "14px 18px", fontSize: 15, lineHeight: 1.65,
                color: "var(--text-primary)"
            }}>
                <div className="prose-chat">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {message.content}
                    </ReactMarkdown>
                </div>
            </div>
        </div>
    );
}
