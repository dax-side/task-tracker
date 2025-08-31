import { TaskModel, ITask } from '../models/TaskModel';
import { Task, CreateTaskSchema, UpdateTaskSchema } from '../models/Task';

export class TaskService {
  // Add a new task
  static async addTask(data: any): Promise<Task> {
    // Validate input using Zod
    const validatedData = CreateTaskSchema.parse(data);
    
    // Create new task in DB
    const newTask = new TaskModel(validatedData);
    const savedTask = await newTask.save();
    
    // Return as Task type
    return {
      id: savedTask._id.toString(),
      description: savedTask.description,
      status: savedTask.status,
      createdAt: savedTask.createdAt,
      updatedAt: savedTask.updatedAt,
    };
  }

  // Get all tasks
  static async getAllTasks(): Promise<Task[]> {
    // Fetch all tasks from the database
    const tasks = await TaskModel.find();
    
    // Map the Mongoose documents to our Task type
    return tasks.map(task => ({
      id: task._id.toString(),
      description: task.description,
      status: task.status,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    }));
  }

  // Get tasks by status
  static async getTasksByStatus(status: string): Promise<Task[]> {
    const tasks = await TaskModel.find({status});
    // Map the Mongoose documents to our Task type
    return tasks.map(task => ({
        id:task._id.toString(),
        description: task.description,
        status:task.status,
        createdAt:task.createdAt,
        updatedAt:task.updatedAt
    }))
  }

  // Update a task
  static async updateTask(id: string, data: any): Promise<Task | null> {
    const validatedData = UpdateTaskSchema.parse(data);
    const updatedTask = await TaskModel.findByIdAndUpdate(id, validatedData, { new: true });
    if (!updatedTask) return null;
    return {
      id: updatedTask._id.toString(),
      description: updatedTask.description,
      status: updatedTask.status,
      createdAt: updatedTask.createdAt,
      updatedAt: updatedTask.updatedAt,
    };
  }

  // Delete a task
  static async deleteTask(id: string): Promise<boolean> {
    const result = await TaskModel.findByIdAndDelete(id);
    return !!result;

  }

  // Mark task as in progress
  static async markInProgress(id: string): Promise<Task | null> {
    return this.updateTask(id, { status: 'in-progress' });
  }

  // Mark task as done
  static async markDone(id: string): Promise<Task | null> {
   return this.updateTask(id,{status:'done'}) 
  }
}
