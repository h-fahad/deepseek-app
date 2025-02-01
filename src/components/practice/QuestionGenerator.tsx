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

type Result = {
  correct: boolean;
  question: Question;
};

export default function QuestionGenerator() {
  const [topic, setTopic] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [results, setResults] = useState<Result[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateQuestions = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });

      if (!response.ok) throw new Error('Failed to generate questions');
      
      const data = await response.json();
      if (!data.questions) throw new Error('Invalid response format');
      
      setQuestions(data.questions);
      setCurrentQuestion(0);
      setQuizCompleted(false);
      setResults([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSubmit = () => {
    if (selectedAnswer === null) return;

    const correctAnswerIndex = questions[currentQuestion].answer.charCodeAt(0) - 65;
    const isCorrect = selectedAnswer === correctAnswerIndex;
    
    setResults([...results, {
      correct: isCorrect,
      question: questions[currentQuestion]
    }]);
    
    setHasAnswered(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setHasAnswered(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const calculateScore = () => {
    const correct = results.filter(r => r.correct).length;
    return Math.round((correct / results.length) * 100);
  };

  const getWeakAreas = () => {
    const weakTopics = results.filter(r => !r.correct).map(r => r.question.question);
    return Array.from(new Set(weakTopics)); // Remove duplicates
  };

  if (quizCompleted) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Quiz Results</h2>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-lg mb-4">
            Score: {calculateScore()}% ({results.filter(r => r.correct).length}/{results.length} correct)
          </p>
          
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Areas to Improve:</h3>
            <ul className="list-disc pl-4">
              {getWeakAreas().map((topic, i) => (
                <li key={i} className="mb-2">{topic}</li>
              ))}
            </ul>
          </div>

          <button
            onClick={() => setQuizCompleted(false)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Restart Quiz
          </button>
        </div>
      </div>
    );
  }

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

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          Error: {error}
        </div>
      )}

      {questions.length > 0 && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                Question {currentQuestion + 1} of {questions.length}
              </h3>
              <span className="text-gray-600">
                Score: {calculateScore()}%
              </span>
            </div>

            <p className="mb-4">{questions[currentQuestion].question}</p>
            
            <div className="space-y-2">
              {questions[currentQuestion].options.map((option, i) => {
                const correctAnswerIndex = questions[currentQuestion].answer.charCodeAt(0) - 65;
                const isCorrect = i === correctAnswerIndex;
                
                return (
                  <button
                    key={i}
                    onClick={() => !hasAnswered && setSelectedAnswer(i)}
                    className={`w-full p-3 text-left rounded
                      ${!hasAnswered
                        ? selectedAnswer === i
                          ? 'bg-blue-100 border-blue-300'
                          : 'hover:bg-gray-50 border-gray-200'
                        : isCorrect
                          ? 'bg-green-100 border-green-300'
                          : selectedAnswer === i
                            ? 'bg-red-100 border-red-300'
                            : 'bg-gray-50 border-gray-200'}
                      border`}
                    disabled={hasAnswered}
                  >
                    {String.fromCharCode(65 + i)}. {option}
                  </button>
                );
              })}
            </div>

            {hasAnswered && (
              <div className="mt-6 space-y-4">
                <div className="p-4 bg-blue-50 rounded">
                  <p className="font-semibold">
                    {selectedAnswer === (questions[currentQuestion].answer.charCodeAt(0) - 65)
                      ? 'Correct! 🎉'
                      : 'Incorrect! ❌'}
                  </p>
                  <p className="mt-2">{questions[currentQuestion].explanation}</p>
                  <div className="mt-4">
                    <h4 className="font-semibold">Common Mistakes:</h4>
                    <ul className="list-disc pl-4 mt-2">
                      {questions[currentQuestion].commonMistakes.map((mistake, i) => (
                        <li key={i}>{mistake}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <button
                  onClick={handleNextQuestion}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  {currentQuestion < questions.length - 1 ? 'Next Question →' : 'Finish Quiz'}
                </button>
              </div>
            )}

            {!hasAnswered && selectedAnswer !== null && (
              <button
                onClick={handleAnswerSubmit}
                className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Submit Answer
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}