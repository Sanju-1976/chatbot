"use client";

import { Conversation } from "@/lib/firestore";
import { User } from "firebase/auth";

interface Props {
    conversations: Conversation[];
    activeConvId: string | null;
    onSelect: (id: string) => void;
    onNewChat: () => void;
    onDelete: (id: string) => void;
    isOpen: boolean;
    onToggle: () => void;
    user: User | null;
    onSignOut: () => void;
}

export default function ChatSidebar({
    conversations, activeConvId, onSelect, onNewChat, onDelete,
    isOpen, onToggle, user, onSignOut
}: Props) {
    if (!isOpen) return null;

    return (
        <div style={{
            width: 280, flexShrink: 0, display: "flex", flexDirection: "column",
            background: "var(--bg-secondary)", borderRight: "1px solid var(--border)",
            height: "100%", overflow: "hidden"
        }}>
            {/* Header */}
            <div style={{ padding: "16px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid var(--border)" }}>
                <div style={{
                    width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                    background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14
                }}>⚡</div>
                <span style={{ fontWeight: 700, color: "var(--text-primary)", flex: 1 }}>Sanju's AI</span>
                <button onClick={onToggle} style={{
                    background: "none", border: "none", color: "var(--text-muted)",
                    cursor: "pointer", fontSize: 18, padding: "4px", borderRadius: 6,
                    transition: "color 0.2s"
                }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                >✕</button>
            </div>

            {/* New Chat */}
            <div style={{ padding: "12px 14px" }}>
                <button onClick={onNewChat} style={{
                    width: "100%", background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(168,85,247,0.1))",
                    border: "1px solid rgba(124,58,237,0.4)", color: "#c4b5fd",
                    borderRadius: 12, padding: "10px 14px", cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 8,
                    fontSize: 14, fontWeight: 500, transition: "all 0.2s"
                }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(168,85,247,0.2))")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(168,85,247,0.1))")}
                >
                    <span style={{ fontSize: 18 }}>+</span> New Chat
                </button>
            </div>

            {/* Conversations */}
            <div style={{ flex: 1, overflowY: "auto", padding: "4px 8px" }}>
                {conversations.length === 0 && (
                    <div style={{
                        textAlign: "center", padding: "40px 16px",
                        color: "var(--text-muted)", fontSize: 13
                    }}>
                        <div style={{ fontSize: 32, marginBottom: 10 }}>💬</div>
                        No conversations yet.<br />Start a new chat!
                    </div>
                )}
                {conversations.map((conv) => (
                    <div
                        key={conv.id}
                        onClick={() => onSelect(conv.id)}
                        style={{
                            display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
                            borderRadius: 10, cursor: "pointer", marginBottom: 2,
                            background: activeConvId === conv.id ? "var(--bg-hover)" : "transparent",
                            border: activeConvId === conv.id ? "1px solid rgba(124,58,237,0.3)" : "1px solid transparent",
                            transition: "all 0.15s"
                        }}
                        onMouseEnter={(e) => {
                            if (activeConvId !== conv.id)
                                (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)";
                        }}
                        onMouseLeave={(e) => {
                            if (activeConvId !== conv.id)
                                (e.currentTarget as HTMLDivElement).style.background = "transparent";
                        }}
                    >
                        <span style={{ fontSize: 15, flexShrink: 0 }}>💬</span>
                        <span style={{
                            flex: 1, fontSize: 13, color: activeConvId === conv.id ? "var(--text-primary)" : "var(--text-secondary)",
                            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
                        }}>
                            {conv.title}
                        </span>
                        <button
                            onClick={(e) => { e.stopPropagation(); onDelete(conv.id); }}
                            style={{
                                background: "none", border: "none", color: "var(--text-muted)",
                                cursor: "pointer", opacity: 0, fontSize: 12, padding: "2px 4px",
                                borderRadius: 4, transition: "opacity 0.2s"
                            }}
                            onMouseEnter={(e) => {
                                (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                                (e.currentTarget as HTMLButtonElement).style.color = "#f87171";
                            }}
                            onMouseLeave={(e) => {
                                (e.currentTarget as HTMLButtonElement).style.opacity = "0";
                            }}
                        >🗑</button>
                    </div>
                ))}
            </div>

            {/* User */}
            {user && (
                <div style={{
                    padding: "14px", borderTop: "1px solid var(--border)",
                    display: "flex", alignItems: "center", gap: 10
                }}>
                    <div style={{
                        width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 13, fontWeight: 700, color: "white", flexShrink: 0
                    }}>
                        {user.displayName ? user.displayName[0].toUpperCase() : user.email?.[0].toUpperCase() ?? "U"}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, color: "var(--text-primary)", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {user.displayName || user.email}
                        </div>
                        <div style={{ fontSize: 11, color: "var(--text-muted)" }}>Signed in</div>
                    </div>
                    <button onClick={onSignOut} style={{
                        background: "none", border: "1px solid var(--border)", borderRadius: 8,
                        color: "var(--text-muted)", cursor: "pointer", padding: "5px 8px", fontSize: 12,
                        transition: "all 0.2s"
                    }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.borderColor = "#f87171";
                            (e.currentTarget as HTMLButtonElement).style.color = "#f87171";
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
                            (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)";
                        }}
                    >Sign out</button>
                </div>
            )}
        </div>
    );
}
