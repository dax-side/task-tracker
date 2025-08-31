import { Request, Response } from 'express';
import { TaskService } from '../services/TaskService';

export class TaskController {
  // Add a new task
  static async addTask(req: Request, res: Response) {
    try {
      const task = await TaskService.addTask(req.body);
      res.status(201).json({ message: 'Task added successfully', task });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  // Get all tasks
  static async getAllTasks(req: Request, res: Response) {
    try {
      const tasks = await TaskService.getAllTasks();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  // Get tasks by status
  static async getTasksByStatus(req: Request, res: Response) {
    try {
      const { status } = req.params;
      const tasks = await TaskService.getTasksByStatus(status);
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  // Update a task
  static async updateTask(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const task = await TaskService.updateTask(id, req.body);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json({ message: 'Task updated successfully', task });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  // Delete a task
  static async deleteTask(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleted = await TaskService.deleteTask(id);
      if (!deleted) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json({ message: 'Task deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  // Mark as in progress
  static async markInProgress(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const task = await TaskService.markInProgress(id);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json({ message: 'Task marked as in progress', task });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  // Mark as done
  static async markDone(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const task = await TaskService.markDone(id);
      if (!task) {
        return res.status(404).json({ error: 'Task not found' });
      }
      res.json({ message: 'Task marked as done', task });
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
