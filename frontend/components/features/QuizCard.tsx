import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Trash2, Eye } from 'lucide-react';
import Link from 'next/link';
import type { Quiz } from '@/types';

interface QuizCardProps {
  quiz: Quiz;
  onDelete?: (id: number) => void;
}

export function QuizCard({ quiz, onDelete }: QuizCardProps) {
  const questionCount = quiz._count?.questions ?? 0;
  
  return (
    <Card className="flex flex-col h-full hover:shadow-2xl hover:shadow-indigo-500/10 transition-shadow duration-300">
      <CardHeader className="flex-1">
        <CardTitle className="text-xl">{quiz.title}</CardTitle>
        <CardDescription>
          {questionCount} {questionCount === 1 ? 'question' : 'questions'}
        </CardDescription>
      </CardHeader>
      
      <CardFooter className="flex items-center justify-between gap-4 mt-auto">
        <Link href={`/quizzes/${quiz.id}`} className="flex-1">
          <Button variant="secondary" className="w-full gap-2">
            <Eye className="w-4 h-4" />
            View
          </Button>
        </Link>
        
        {onDelete && (
          <Button 
            variant="danger" 
            size="sm"
            onClick={() => onDelete(quiz.id)}
            className="px-3"
            aria-label="Delete quiz"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
