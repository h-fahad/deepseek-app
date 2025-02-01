// app/api/generate-questions/route.ts
import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY! });

export async function POST(req: Request) {
  const { topic, difficulty = 'medium' } = await req.json();
  
  const prompt = `
  Generate 10 SAT-style ${difficulty} difficulty questions about ${topic} with:
  - Clear question stem
  - 4 multiple-choice options (A-D)
  - Correct answer marked with [CORRECT]
  - Concise explanation (1-2 sentences)
  - Common mistakes section
  Format as JSON:
  {
    "questions": [
      {
        "question": "...",
        "options": ["...", "...", "...", "..."],
        "answer": "A",
        "explanation": "...",
        "commonMistakes": ["..."]
      }
    ]
  }`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      response_format: { type: "json_object" },
      messages: [{ role: "user", content: prompt }],
    });

    const content = completion.choices[0].message.content;
    if (content) {
      return NextResponse.json(JSON.parse(content));
    } else {
      return NextResponse.json(
        { error: "Failed to generate questions" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to generate questions" },
      { status: 500 }
    );
  }
}