import type { Quiz, CreateQuizPayload } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const api = {
  getQuizzes: async (): Promise<Quiz[]> => {
    const res = await fetch(`${API_URL}/quizzes`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch quizzes');
    return res.json();
  },

  getQuiz: async (id: string | number): Promise<Quiz> => {
    const res = await fetch(`${API_URL}/quizzes/${id}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch quiz');
    return res.json();
  },

  createQuiz: async (data: CreateQuizPayload): Promise<Quiz> => {
    const res = await fetch(`${API_URL}/quizzes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => null);
      console.error('Backend error:', errorData);
      throw new Error(errorData?.message ? JSON.stringify(errorData.message) : 'Failed to create quiz');
    }
    return res.json();
  },

  deleteQuiz: async (id: string | number): Promise<void> => {
    const res = await fetch(`${API_URL}/quizzes/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete quiz');
  },
};
