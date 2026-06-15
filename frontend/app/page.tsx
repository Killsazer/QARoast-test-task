import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="space-y-4">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent pb-2">
          Build Quizzes. <br />
          <span className="text-slate-900">Engage Everyone.</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-slate-600 sm:text-xl">
          Create dynamic quizzes with ease. Support for multiple question types,
          instant previews, and a beautiful user experience.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/create">
          <Button size="lg" className="w-full sm:w-auto">
            Start Building
          </Button>
        </Link>
        <Link href="/quizzes">
          <Button variant="secondary" size="lg" className="w-full sm:w-auto">
            View Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
