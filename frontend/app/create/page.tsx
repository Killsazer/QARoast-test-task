"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { QuizForm } from '@/components/features/QuizForm';
import { api } from '@/services/api';
import type { QuizFormValues } from '@/lib/validations/quiz';

export default function CreateQuizPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (data: QuizFormValues) => {
    setIsSubmitting(true);
    setErrorMsg(null);
    try {
      await api.createQuiz({
        title: data.title,
        questions: data.questions.map(q => ({
          text: q.text,
          type: q.type,
          options: q.type === 'CHECKBOX' ? q.options : [],
          correctAnswers: q.correctAnswers,
        })),
      });
      router.push('/quizzes');
    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to create quiz. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Create New Quiz</h1>
        <p className="text-slate-500 mt-2">Build a dynamic quiz with multiple question types.</p>
      </div>

      {errorMsg && (
        <div className="mb-6 p-4 rounded-xl bg-rose-50 text-rose-600 border border-rose-200">
          {errorMsg}
        </div>
      )}

      <QuizForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </div>
  );
}
