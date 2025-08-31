import { z } from 'zod';

// Zod schema for Task
export const TaskSchema = z.object({
  id: z.string(), // We'll use MongoDB ObjectId as string
  description: z.string().min(1, 'Description cannot be empty'),
  status: z.enum(['todo', 'in-progress', 'done']),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// TypeScript type inferred from Zod schema
export type Task = z.infer<typeof TaskSchema>;

// For creating new tasks, without id and dates
export const CreateTaskSchema = z.object({
  description: z.string().min(1, 'Description cannot be empty'),
  status: z.enum(['todo', 'in-progress', 'done']).optional().default('todo'),
});

// For updating tasks
export const UpdateTaskSchema = TaskSchema.omit({ id: true, createdAt: true }).partial();
