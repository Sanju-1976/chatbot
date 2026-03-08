"use client";

import { useState, useRef, useEffect } from "react";

interface Props {
    onSend: (content: string) => void;
    disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: Props) {
    const [value, setValue] = useState("");
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 160) + "px";
        }
    }, [value]);

    const handleSend = () => {
        const trimmed = value.trim();
        if (!trimmed || disabled) return;
        onSend(trimmed);
        setValue("");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div style={{
            padding: "16px 24px 24px",
            background: "rgba(10,10,15,0.9)", backdropFilter: "blur(10px)",
            borderTop: "1px solid var(--border)"
        }}>
            <div style={{
                display: "flex", alignItems: "flex-end", gap: 10,
                background: "var(--bg-card)", border: "1px solid var(--border)",
                borderRadius: 16, padding: "10px 14px",
                transition: "border-color 0.2s, box-shadow 0.2s",
                boxShadow: "0 0 0 0 transparent"
            }}
                onFocusCapture={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "var(--accent)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 0 3px var(--accent-glow)";
                }}
                onBlurCapture={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
            >
                <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Message Sanju's AI… (Enter to send, Shift+Enter for newline)"
                    disabled={disabled}
                    rows={1}
                    style={{
                        flex: 1, background: "none", border: "none", outline: "none",
                        color: "var(--text-primary)", fontSize: 15, lineHeight: 1.6,
                        resize: "none", maxHeight: 160, fontFamily: "inherit",
                        scrollbarWidth: "thin"
                    }}
                />
                <button
                    onClick={handleSend}
                    disabled={disabled || !value.trim()}
                    style={{
                        width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                        background: disabled || !value.trim()
                            ? "rgba(124,58,237,0.2)"
                            : "linear-gradient(135deg, #7c3aed, #a855f7)",
                        border: "none", cursor: disabled || !value.trim() ? "not-allowed" : "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 16, transition: "all 0.2s",
                        boxShadow: disabled || !value.trim() ? "none" : "0 0 14px rgba(124,58,237,0.4)"
                    }}
                >
                    {disabled ? "⏳" : "↑"}
                </button>
            </div>
            <p style={{
                textAlign: "center", fontSize: 11, color: "var(--text-muted)",
                marginTop: 10
            }}>
                Sanju's AI can make mistakes. Verify important information.
            </p>
        </div>
    );
}
