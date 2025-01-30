// components/ai/AiExplanation.tsx
'use client';
import { useChat } from 'ai/react';

export default function AiExplanation({ topic }: { topic: string }) {
  const { messages } = useChat({
    api: '/api/explain',
    initialMessages: [{
      id: '1',
      role: 'user',
      content: `Explain ${topic} for SAT preparation in simple terms`
    }]
  });

  return (
    <div className="mt-6 border-t pt-4">
      {messages.map(m => (
        <div key={m.id} className="prose max-w-none">
          {m.content}
        </div>
      ))}
    </div>
  );
}