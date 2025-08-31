import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';

const router = Router();

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Add a new task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *             required:
 *               - description
 *     responses:
 *       201:
 *         description: Task added successfully
 *       400:
 *         description: Invalid input
 */
router.post('/', TaskController.addTask);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     responses:
 *       200:
 *         description: List of all tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   description:
 *                     type: string
 *                   status:
 *                     type: string
 *                     enum: [todo, in-progress, done]
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 */
router.get('/', TaskController.getAllTasks);

/**
 * @swagger
 * /tasks/{status}:
 *   get:
 *     summary: Get tasks by status
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum: [todo, in-progress, done]
 *     responses:
 *       200:
 *         description: List of tasks with the specified status
 */
router.get('/:status', TaskController.getTasksByStatus);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update a task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [todo, in-progress, done]
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 */
router.put('/:id', TaskController.updateTask);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 */
router.delete('/:id', TaskController.deleteTask);

/**
 * @swagger
 * /tasks/{id}/in-progress:
 *   patch:
 *     summary: Mark task as in progress
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task marked as in progress
 *       404:
 *         description: Task not found
 */
router.patch('/:id/in-progress', TaskController.markInProgress);

/**
 * @swagger
 * /tasks/{id}/done:
 *   patch:
 *     summary: Mark task as done
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task marked as done
 *       404:
 *         description: Task not found
 */
router.patch('/:id/done', TaskController.markDone);

export default router;
