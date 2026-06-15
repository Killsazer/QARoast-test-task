import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Quiz Builder',
  description: 'Create and take amazing quizzes',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 selection:bg-indigo-500/30">
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/70 backdrop-blur-xl">
          <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link
              href="/"
              className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
            >
              Quiz Builder
            </Link>
            <nav className="flex items-center gap-6 text-sm font-medium">
              <Link
                href="/quizzes"
                className="text-slate-600 hover:text-indigo-600 transition-colors"
              >
                Dashboard
              </Link>
              <Link
                href="/create"
                className="inline-flex h-9 items-center justify-center rounded-lg bg-indigo-600 px-4 text-white shadow-sm hover:bg-indigo-700 transition-colors"
              >
                Create Quiz
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
