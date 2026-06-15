const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export interface Question {
  id?: number;
  text: string;
  type: 'BOOLEAN' | 'INPUT' | 'CHECKBOX';
  options?: string[];
  correctAnswers: string[];
}

export interface Quiz {
  id: number;
  title: string;
  createdAt: string;
  _count?: {
    questions: number;
  };
  questions?: Question[];
}

export interface CreateQuizPayload {
  title: string;
  questions: Omit<Question, 'id'>[];
}

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
    if (!res.ok) throw new Error('Failed to create quiz');
    return res.json();
  },

  deleteQuiz: async (id: string | number): Promise<void> => {
    const res = await fetch(`${API_URL}/quizzes/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete quiz');
  },
};
