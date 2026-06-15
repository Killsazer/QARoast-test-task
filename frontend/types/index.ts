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
