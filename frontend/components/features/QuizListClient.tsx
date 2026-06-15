"use client";

import { useState } from 'react';
import { api } from '@/services/api';
import type { Quiz } from '@/types';
import { QuizCard } from '@/components/features/QuizCard';
import { Button } from '@/components/ui/Button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

interface QuizListClientProps {
  initialQuizzes: Quiz[];
}

export function QuizListClient({ initialQuizzes }: QuizListClientProps) {
  const [quizzes, setQuizzes] = useState<Quiz[]>(initialQuizzes);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this quiz?')) return;
    
    try {
      await api.deleteQuiz(id);
      setQuizzes((prev) => prev.filter((quiz) => quiz.id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete quiz');
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
          <p className="text-slate-500 mt-1">Manage all your created quizzes</p>
        </div>
        <Link href="/create">
          <Button className="w-full sm:w-auto gap-2">
            <Plus className="w-4 h-4" />
            Create Quiz
          </Button>
        </Link>
      </div>

      {quizzes.length === 0 ? (
        <div className="text-center py-24 px-6 rounded-3xl border-2 border-dashed border-slate-200 bg-slate-50/50">
          <h3 className="text-xl font-semibold text-slate-900 mb-2">No quizzes yet</h3>
          <p className="text-slate-500 mb-6">Get started by creating your first quiz.</p>
          <Link href="/create">
            <Button>Create your first Quiz</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <QuizCard 
              key={quiz.id} 
              quiz={quiz} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
      )}
    </div>
  );
}
