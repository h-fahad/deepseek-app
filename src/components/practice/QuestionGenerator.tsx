// components/practice/QuestionGenerator.tsx
'use client';
import { useState } from 'react';

type Question = {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
  commonMistakes: string[];
};

export default function QuestionGenerator() {
  const [topic, setTopic] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [loading, setLoading] = useState(false);

  const generateQuestions = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });
      
      const data = await response.json();
      setQuestions(data.questions);
      setCurrentQuestion(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex gap-4 mb-8">
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter topic (e.g. Quadratic Equations)"
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={generateQuestions}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-400"
        >
          {loading ? 'Generating...' : 'Generate Questions'}
        </button>
      </div>

      {questions.length > 0 && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">
              Question {currentQuestion + 1} of {questions.length}
            </h3>
            <p className="mb-4">{questions[currentQuestion].question}</p>
            
            <div className="space-y-2">
              {questions[currentQuestion].options.map((option, i) => (
                <div
                  key={i}
                  className="p-3 border rounded hover:bg-gray-50 cursor-pointer"
                >
                  {String.fromCharCode(65 + i)}. {option}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              className="px-4 py-2 bg-gray-100 rounded"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}