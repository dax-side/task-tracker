# Task Tracker Fullstack

A fullstack task management application with a RESTful API backend and a clean React frontend.

## Features

-  Add, update, and delete tasks
-  Mark tasks as in-progress or done
-  List all tasks with status filtering
-  Clean, minimal UI design
-  Swagger documentation for API testing
-  Zod schema validation
-  MongoDB Atlas integration

## Tech Stack

- **Backend**: Node.js, Express.js, TypeScript
- **Frontend**: React, TypeScript, Vite
- **Database**: MongoDB (Atlas)
- **Validation**: Zod
- **Documentation**: Swagger/OpenAPI
- **Styling**: Custom CSS (clean, minimal design)

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/tasks` | Add a new task |
| GET | `/tasks` | Get all tasks |
| GET | `/tasks/{status}` | Get tasks by status (todo, in-progress, done) |
| PUT | `/tasks/{id}` | Update a task |
| DELETE | `/tasks/{id}` | Delete a task |
| PATCH | `/tasks/{id}/in-progress` | Mark task as in-progress |
| PATCH | `/tasks/{id}/done` | Mark task as done |

## Task Schema

```json
{
  "id": "string",
  "description": "string",
  "status": "todo | in-progress | done",
  "createdAt": "date",
  "updatedAt": "date"
}
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB Atlas account
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd task-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the `server/` directory:
   ```
   MONGODB_URI=your-mongodb-atlas-connection-string
   PORT=3000
   ```

4. Install dependencies:
   ```bash
   npm run install-server
   npm run install-client
   ```

5. Build the backend:
   ```bash
   npm run build
   ```

6. Start both server and client:
   ```bash
   npm run dev
   ```

The backend will run on `http://localhost:3000` and the frontend on `http://localhost:3001`.

## Testing the API

### Swagger UI
Visit `http://localhost:3000/api-docs` for interactive API documentation and testing.

### Example Requests

#### Add a Task
```bash
curl -X 'POST' 'http://localhost:3000/tasks' \
  -H 'Content-Type: application/json' \
  -d '{"description": "Buy groceries"}'
```

#### Get All Tasks
```bash
curl -X 'GET' 'http://localhost:3000/tasks'
```

#### Update a Task
```bash
curl -X 'PUT' 'http://localhost:3000/tasks/{id}' \
  -H 'Content-Type: application/json' \
  -d '{"description": "Updated task", "status": "in-progress"}'
```

#### Delete a Task
```bash
curl -X 'DELETE' 'http://localhost:3000/tasks/{id}'
```

## Project Structure

```
task-tracker/
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── TaskController.ts
│   │   ├── models/
│   │   │   ├── Task.ts
│   │   │   └── TaskModel.ts
│   │   ├── routes/
│   │   │   └── tasks.ts
│   │   ├── services/
│   │   │   └── TaskService.ts
│   │   ├── app.ts
│   │   ├── database.ts
│   │   ├── server.ts
│   │   └── swagger.ts
│   ├── .env
│   ├── package.json
│   └── tsconfig.json
├── client/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── App.css
│   │   └── main.tsx
│   ├── package.json
│   ├── vite.config.ts
│   └── index.html
├── .gitignore
├── package.json
└── README.md
```
├── tsconfig.json
└── README.md
```

## Development

- **Build**: `npm run build`
- **Start**: `npm start`
- **Dev**: `npm run dev` (if you add ts-node)

## Deployment

This API can be deployed to platforms like Heroku, Vercel, or AWS. Make sure to set the `MONGODB_URI` environment variable in production.


Built with ❤️ using TypeScript and Express.js
