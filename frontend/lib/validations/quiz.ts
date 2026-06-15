import * as z from 'zod';

export const questionSchema = z.object({
  text: z.string().min(3, 'Question text must be at least 3 characters'),
  type: z.enum(['BOOLEAN', 'INPUT', 'CHECKBOX']),
  options: z.array(z.string()).optional(),
  correctAnswers: z.array(z.string()).min(1, 'At least one correct answer is required'),
}).refine(data => {
  if (data.type === 'CHECKBOX') {
    return data.options && data.options.length >= 2;
  }
  return true;
}, {
  message: 'Checkbox questions must have at least 2 options',
  path: ['options'],
});

export const quizSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  questions: z.array(questionSchema).min(1, 'You must add at least one question'),
});

export type QuizFormValues = z.infer<typeof quizSchema>;
