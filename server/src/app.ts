import express, { Request, Response } from 'express';
import cors from 'cors';
import taskRoutes from './routes/tasks';
import { swaggerUi, swaggerSpec } from './swagger';

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json());

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/tasks', taskRoutes);

// Health check
app.get('/', (req: Request, res: Response) => {
  res.send('Task Tracker API is running');
});

export default app;
