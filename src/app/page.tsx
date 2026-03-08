"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="gradient-bg" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Nav */}
      <nav style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "20px 40px", borderBottom: "1px solid rgba(255,255,255,0.05)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "linear-gradient(135deg, #7c3aed, #a855f7)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 18, boxShadow: "0 0 20px rgba(124,58,237,0.5)"
          }}>⚡</div>
          <span style={{ fontSize: 20, fontWeight: 700, color: "var(--text-primary)" }}>Sanju's AI</span>
        </div>
        <Link href="/login">
          <button className="btn-primary" style={{ padding: "10px 20px", fontSize: 14 }}>
            Get Started →
          </button>
        </Link>
      </nav>

      {/* Hero */}
      <section style={{
        flex: 1, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "80px 24px", textAlign: "center"
      }}>
        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(124,58,237,0.15)", border: "1px solid rgba(124,58,237,0.3)",
          borderRadius: 100, padding: "6px 16px", marginBottom: 32,
          fontSize: 13, color: "#c4b5fd"
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#a855f7", display: "inline-block" }}></span>
          Powered by Groq · LLaMA 3 · 70B
        </div>

        <h1 style={{
          fontSize: "clamp(40px, 7vw, 72px)", fontWeight: 800,
          lineHeight: 1.1, marginBottom: 24, letterSpacing: "-0.03em"
        }}>
          AI Conversations,{" "}
          <span style={{
            background: "linear-gradient(135deg, #7c3aed, #a855f7, #c084fc)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
          }}>
            Blazing Fast
          </span>
        </h1>

        <p style={{
          fontSize: "clamp(16px, 2vw, 20px)", color: "var(--text-secondary)",
          maxWidth: 560, lineHeight: 1.7, marginBottom: 48
        }}>
          Experience the fastest AI chatbot on the internet. Powered by Groq&apos;s LPU inference engine and
          LLaMA 3 70B — responses in milliseconds, not seconds.
        </p>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          <Link href="/login">
            <button className="btn-primary" style={{ fontSize: 16, padding: "14px 32px" }}>
              ⚡ Start Chatting Free
            </button>
          </Link>
          <a href="https://github.com/Sanju-1976/chatbot" target="_blank" rel="noreferrer">
            <button className="btn-secondary" style={{ fontSize: 16, padding: "14px 32px" }}>
              ★ View on GitHub
            </button>
          </a>
        </div>

        {/* Feature cards */}
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 20, marginTop: 80, maxWidth: 800, width: "100%"
        }}>
          {[
            { icon: "⚡", title: "Ultra-Fast Responses", desc: "Groq LPU delivers sub-second AI replies with LLaMA 3 70B" },
            { icon: "💬", title: "Chat History", desc: "All conversations saved to Firestore — pick up where you left off" },
            { icon: "🔐", title: "Secure Auth", desc: "Google Sign-In + Email/Password via Firebase Authentication" },
            { icon: "🎨", title: "Markdown Support", desc: "Rich text, code blocks, and formatted AI responses" },
          ].map((f) => (
            <div key={f.title} className="glass" style={{
              padding: "24px", borderRadius: 16, textAlign: "left",
              transition: "transform 0.2s, border-color 0.2s", cursor: "default"
            }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(124,58,237,0.5)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)";
              }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
              <div style={{ fontWeight: 600, marginBottom: 8, color: "var(--text-primary)" }}>{f.title}</div>
              <div style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        textAlign: "center", padding: "24px",
        color: "var(--text-muted)", fontSize: 13,
        borderTop: "1px solid rgba(255,255,255,0.05)"
      }}>
        Built with Next.js · Firebase · Groq API · ❤️
      </footer>
    </main>
  );
}
