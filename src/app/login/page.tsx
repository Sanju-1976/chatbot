"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { sendPasswordResetEmail } from "firebase/auth";
import { getFirebaseAuth } from "@/lib/firebase";
import Link from "next/link";

export const dynamic = "force-dynamic";

function LoginForm() {
    const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();
    const router = useRouter();
    const [isSignUp, setIsSignUp] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [resetSent, setResetSent] = useState(false);
    const [resetLoading, setResetLoading] = useState(false);

    const isInvalidCredentialError = error.includes("invalid-credential") || error.includes("wrong-password") || error.includes("user-not-found");

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setShowForgotPassword(false);
        setResetSent(false);
        setLoading(true);
        try {
            if (isSignUp) {
                await signUpWithEmail(email, password);
            } else {
                await signInWithEmail(email, password);
            }
            router.push("/chat");
        } catch (err: unknown) {
            setError((err as Error).message || "Authentication failed");
            // Auto-show forgot password on bad credentials
            if (!isSignUp) setShowForgotPassword(true);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogle = async () => {
        setError("");
        try {
            await signInWithGoogle();
            router.push("/chat");
        } catch (err: unknown) {
            setError((err as Error).message || "Google sign-in failed");
        }
    };

    const handleForgotPassword = async () => {
        if (!email) {
            setError("Please enter your email address above first.");
            return;
        }
        setResetLoading(true);
        try {
            await sendPasswordResetEmail(getFirebaseAuth(), email);
            setResetSent(true);
            setError("");
            setShowForgotPassword(false);
        } catch (err: unknown) {
            setError((err as Error).message || "Failed to send reset email.");
        } finally {
            setResetLoading(false);
        }
    };

    return (
        <div className="gradient-bg" style={{
            minHeight: "100vh", display: "flex",
            alignItems: "center", justifyContent: "center", padding: "24px"
        }}>
            <div className="glass" style={{
                width: "100%", maxWidth: 420, borderRadius: 24, padding: "40px 36px"
            }}>
                {/* Logo */}
                <div style={{ textAlign: "center", marginBottom: 32 }}>
                    <div style={{
                        width: 56, height: 56, borderRadius: 16, margin: "0 auto 16px",
                        background: "linear-gradient(135deg, #7c3aed, #a855f7)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 26, boxShadow: "0 0 24px rgba(124,58,237,0.5)"
                    }}>⚡</div>
                    <h1 style={{ fontSize: 24, fontWeight: 700, color: "var(--text-primary)" }}>
                        {isSignUp ? "Create Account" : "Welcome Back"}
                    </h1>
                    <p style={{ color: "var(--text-secondary)", marginTop: 6, fontSize: 14 }}>
                        {isSignUp ? "Start chatting with AI today" : "Sign in to your GroqChat account"}
                    </p>
                </div>

                {/* Google */}
                <button className="btn-secondary" style={{ width: "100%", marginBottom: 16 }} onClick={handleGoogle}>
                    <svg width="18" height="18" viewBox="0 0 256 262" xmlns="http://www.w3.org/2000/svg">
                        <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" />
                        <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" />
                        <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" />
                        <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" />
                    </svg>
                    Continue with Google
                </button>

                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
                    <span style={{ color: "var(--text-muted)", fontSize: 13 }}>or</span>
                    <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
                </div>

                {/* Email form */}
                <form onSubmit={handleAuth} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    <div>
                        <label style={{ fontSize: 13, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
                            Email
                        </label>
                        <input
                            className="input-field"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label style={{ fontSize: 13, color: "var(--text-secondary)", display: "block", marginBottom: 6 }}>
                            Password
                        </label>
                        <input
                            className="input-field"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={6}
                        />
                    </div>

                    {/* Error message */}
                    {error && (
                        <div style={{
                            background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)",
                            borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#fca5a5"
                        }}>
                            {isInvalidCredentialError ? "Incorrect email or password." : error}
                        </div>
                    )}

                    {/* Reset email success */}
                    {resetSent && (
                        <div style={{
                            background: "rgba(34,197,94,0.1)", border: "1px solid rgba(34,197,94,0.3)",
                            borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#86efac"
                        }}>
                            ✅ Password reset email sent to <strong>{email}</strong>. Check your inbox!
                        </div>
                    )}

                    <button className="btn-primary" type="submit" disabled={loading} style={{ width: "100%", marginTop: 4 }}>
                        {loading ? "Please wait..." : isSignUp ? "Create Account" : "Sign In"}
                    </button>
                </form>

                {/* Forgot Password — shown after wrong credential error */}
                {showForgotPassword && !isSignUp && (
                    <div style={{ textAlign: "center", marginTop: 14 }}>
                        <button
                            onClick={handleForgotPassword}
                            disabled={resetLoading}
                            style={{
                                background: "none", border: "none", cursor: "pointer",
                                color: "#a78bfa", fontSize: 13, fontWeight: 500,
                                textDecoration: "underline", textUnderlineOffset: 3,
                                opacity: resetLoading ? 0.6 : 1,
                            }}
                        >
                            {resetLoading ? "Sending reset email..." : "🔑 Forgot Password? Click to send reset email"}
                        </button>
                    </div>
                )}

                <p style={{ textAlign: "center", marginTop: 20, fontSize: 14, color: "var(--text-secondary)" }}>
                    {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
                    <button
                        onClick={() => { setIsSignUp(!isSignUp); setError(""); setShowForgotPassword(false); setResetSent(false); }}
                        style={{ color: "var(--accent-light)", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}
                    >
                        {isSignUp ? "Sign In" : "Sign Up"}
                    </button>
                </p>

                <p style={{ textAlign: "center", marginTop: 12, fontSize: 13 }}>
                    <Link href="/" style={{ color: "var(--text-muted)" }}>← Back to Home</Link>
                </p>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return <LoginForm />;
}
