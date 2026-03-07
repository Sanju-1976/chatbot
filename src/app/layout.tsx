import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GroqChat — AI Chatbot",
  description: "A modern AI chatbot powered by Groq and Firebase",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
