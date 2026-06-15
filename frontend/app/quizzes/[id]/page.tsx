import { api } from '@/services/api';
import type { Question } from '@/types';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function QuizDetailPage({ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const quiz = await api.getQuiz(id);

    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
        <div className="space-y-4">
          <Link href="/quizzes" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to Dashboard
          </Link>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">{quiz.title}</h1>
          <p className="text-slate-500">
            Created on {new Date(quiz.createdAt).toLocaleDateString()} • {quiz.questions?.length ?? 0} questions
          </p>
        </div>

        <div className="space-y-6">
          {quiz.questions?.map((question, index) => (
            <QuestionPreview key={question.id ?? index} question={question} index={index + 1} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Failed to load quiz details:', error);
    return (
      <div className="text-center py-20 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Quiz not found or failed to load.</h2>
        <Link href="/quizzes">
          <Button variant="secondary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Quizzes
          </Button>
        </Link>
      </div>
    );
  }
}

function QuestionPreview({ question, index }: { question: Question; index: number }) {
  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-lg flex items-start gap-3">
            <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 text-sm font-bold">
              {index}
            </span>
            <span className="mt-1">{question.text}</span>
          </CardTitle>
          <span className="flex-shrink-0 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-slate-500 bg-slate-100 rounded-md">
            {question.type}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="pl-11 space-y-4">
          {/* Render options for BOOLEAN or CHECKBOX */}
          {(question.type === 'BOOLEAN' || question.type === 'CHECKBOX') && (
            <div className="space-y-2">
              {(question.type === 'BOOLEAN' ? ['True', 'False'] : question.options || []).map((opt, i) => {
                const isCorrect = question.correctAnswers.includes(opt);
                return (
                  <div 
                    key={i} 
                    className={`flex items-center justify-between p-3 rounded-xl border ${
                      isCorrect 
                        ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
                        : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    <span>{opt}</span>
                    {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                  </div>
                );
              })}
            </div>
          )}

          {/* Render input answer for INPUT type */}
          {question.type === 'INPUT' && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-500">Accepted Answers:</p>
              <div className="flex flex-wrap gap-2">
                {question.correctAnswers.map((ans, i) => (
                  <span key={i} className="inline-flex items-center px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-medium">
                    {ans}
                    <CheckCircle2 className="w-4 h-4 ml-1.5 text-emerald-500" />
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
