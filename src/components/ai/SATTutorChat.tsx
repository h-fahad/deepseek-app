// components/ai/SATTutorChat.tsx
'use client';
import { useChat } from 'ai/react';

export default function SATTutorChat({ context }: { context: string }) {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat-tutor',
    body: {
      context: {
        currentTopic: context,
        knownConcepts: ['algebra-basics'],
        weakAreas: ['quadratic-equations']
      }
    }
  });

  return (
    <div className="border rounded-lg p-4 h-[500px] flex flex-col">
      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.map(m => (
          <div key={m.id} className={`p-3 rounded-lg ${m.role === 'user' ? 'bg-blue-50 ml-8' : 'bg-gray-50 mr-8'}`}>
            {m.content}
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSubmit} className="mt-auto">
        <input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask your SAT question..."
          className="w-full p-2 border rounded"
        />
      </form>
    </div>
  );
}