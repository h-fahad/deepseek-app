// lib/validators/question.ts
import { z } from 'zod';

const QuestionSchema = z.object({
  question: z.string(),
  options: z.array(z.string()).length(4),
  answer: z.string().regex(/^[A-D]$/),
  explanation: z.string(),
  commonMistakes: z.array(z.string())
});

export const QuestionsSchema = z.object({
  questions: z.array(QuestionSchema)
});