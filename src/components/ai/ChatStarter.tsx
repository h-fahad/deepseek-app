// components/ai/ChatStarter.tsx
"use client";
import { useChat } from 'ai/react';

export default function ChatStarter({ prompt }: { prompt: string }) {
  const { messages } = useChat({
    initialMessages: [{
      id: '1',
      role: 'user',
      content: prompt
    }]
  });

  return (
    <div className="border-t pt-4 mt-6">
      {messages.map(m => (
        <div key={m.id} className="my-2">
          {m.content}
        </div>
      ))}
    </div>
  );
}