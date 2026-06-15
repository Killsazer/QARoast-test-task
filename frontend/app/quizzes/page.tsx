import { api } from '@/services/api';
import { QuizListClient } from '@/components/features/QuizListClient';

export const dynamic = 'force-dynamic';

export default async function QuizzesPage() {
  let quizzes;
  let fetchError = false;

  try {
    quizzes = await api.getQuizzes();
  } catch (error) {
    console.error('Failed to load quizzes:', error);
    fetchError = true;
  }

  if (fetchError || !quizzes) {
    return (
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Dashboard</h1>
        </div>
        <div className="p-6 rounded-2xl bg-rose-50 text-rose-600 border border-rose-100 text-center">
          Failed to load quizzes. Please ensure the backend is running.
        </div>
      </div>
    );
  }

  return <QuizListClient initialQuizzes={quizzes} />;
}
