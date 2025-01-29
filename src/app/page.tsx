// app/page.tsx
"use client";
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Master the SAT with AI-Powered Learning
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Get personalized practice, instant explanations, and 24/7 AI tutoring
            for all SAT sections - Math, Reading, and Writing.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Link
              href="/signup"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors text-lg"
            >
              Start Free Trial
            </Link>
            <Link
              href="/login"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium border-2 border-blue-600 hover:bg-blue-50 transition-colors text-lg"
            >
              Existing User? Login
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="p-6 bg-white rounded-xl shadow-lg">
              <h3 className="text-xl font-bold mb-3">AI-Powered Tutoring</h3>
              <p className="text-gray-600">
                Get instant answers to your SAT questions with our smart AI tutor
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg">
              <h3 className="text-xl font-bold mb-3">Personalized Practice</h3>
              <p className="text-gray-600">
                Adaptive practice tests that focus on your weak areas
              </p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg">
              <h3 className="text-xl font-bold mb-3">Progress Tracking</h3>
              <p className="text-gray-600">
                Detailed analytics and score predictions to monitor your improvement
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}