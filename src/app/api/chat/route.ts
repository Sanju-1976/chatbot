import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
    try {
        const { messages } = await req.json();

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json({ error: "Messages are required" }, { status: 400 });
        }

        // Lazy import to avoid module-level initialization without env vars
        const Groq = (await import("groq-sdk")).default;
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY! });

        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            messages: [
                {
                    role: "system",
                    content: `You are GroqChat, a helpful, friendly, and highly intelligent AI assistant powered by Groq's LPU inference engine. 
You provide accurate, thoughtful responses. You can help with coding, writing, analysis, math, and general knowledge.
Use markdown formatting for code blocks, lists, and structured content to improve readability.
Be concise but comprehensive. Always be respectful and helpful.`,
                },
                ...messages,
            ],
            max_tokens: 2048,
            temperature: 0.7,
        });

        const content = completion.choices[0]?.message?.content ?? "I'm sorry, I couldn't generate a response.";
        return NextResponse.json({ content });
    } catch (error: unknown) {
        console.error("Groq API error:", error);
        return NextResponse.json(
            { error: "Failed to get response from AI" },
            { status: 500 }
        );
    }
}
