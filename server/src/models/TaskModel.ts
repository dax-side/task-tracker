import mongoose, { Schema, Document } from 'mongoose';
import { Task } from './Task';

export interface ITask extends Document, Omit<Task, 'id'> {
  _id: mongoose.Types.ObjectId;
}

const TaskSchema = new Schema<ITask>({
  description: { type: String, required: true },
  status: { type: String, enum: ['todo', 'in-progress', 'done'], default: 'todo' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Update the updatedAt field before saving
TaskSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const TaskModel = mongoose.model<ITask>('Task', TaskSchema);
