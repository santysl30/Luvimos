import { NextResponse } from "next/server";

const SYSTEM = `You are Lesa, the Luvimos emotional-support AI companion. Be warm, calm, concise, non-judgmental and curious. Help users reflect on emotions and patterns without diagnosing mental-health conditions. If a user indicates immediate danger or an emergency, encourage them to contact local emergency services or a trusted person. Never claim to be a therapist or doctor.`;

export async function POST(request: Request) {
  try {
    const { message, history = [] } = await request.json();
    if (typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({
        reply: "Lesa is in local-demo mode right now. Add OPENAI_API_KEY to frontend/.env.local to activate the live AI brain. I can still listen through the browser voice controls.",
        mode: "demo",
      });
    }

    const input = [
      { role: "system", content: SYSTEM },
      ...history.slice(-12).map((item: { role: string; text: string }) => ({
        role: item.role === "you" ? "user" : "assistant",
        content: item.text,
      })),
      { role: "user", content: message.trim() },
    ];

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-5-mini",
        input,
      }),
    });

    if (!response.ok) {
      return NextResponse.json({
        reply: "I hit a temporary connection issue. Your reflection is still here — try sending that again in a moment.",
        mode: "fallback",
      });
    }

    const data = await response.json();
    const reply = typeof data.output_text === "string"
      ? data.output_text
      : "I’m listening. Tell me a little more about what is happening for you right now.";

    return NextResponse.json({ reply, mode: "live" });
  } catch {
    return NextResponse.json({
      reply: "I’m having trouble reaching the AI layer right now. We can still keep reflecting here.",
      mode: "fallback",
    });
  }
}
