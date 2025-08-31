import { useState, useEffect } from 'react'
import './App.css'

interface Task {
  id: string
  description: string
  status: 'todo' | 'in-progress' | 'done'
  createdAt: string
  updatedAt: string
}

const API_BASE = 'http://localhost:3000/tasks'

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState('')
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('darkMode') === 'true'
  })

  useEffect(() => {
    fetchTasks()
  }, [])

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString())
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  const fetchTasks = async () => {
    try {
      const res = await fetch(API_BASE)
      const data = await res.json()
      setTasks(data)
    } catch (error) {
      console.error('Error fetching tasks:', error)
    }
  }

  const addTask = async () => {
    if (!newTask.trim()) return
    setLoading(true)
    try {
      const res = await fetch(API_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: newTask })
      })
      if (res.ok) {
        setNewTask('')
        fetchTasks()
      }
    } catch (error) {
      console.error('Error adding task:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      })
      if (res.ok) fetchTasks()
    } catch (error) {
      console.error('Error updating task:', error)
    }
  }

  const deleteTask = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' })
      if (res.ok) fetchTasks()
    } catch (error) {
      console.error('Error deleting task:', error)
    }
  }

  const markInProgress = (id: string) => updateTask(id, { status: 'in-progress' })
  const markDone = (id: string) => updateTask(id, { status: 'done' })

  // Filter tasks based on search query
  const filteredTasks = tasks.filter(task =>
    task.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="app">
      <header>
        <div className="header-content">
          <h1>Task Tracker</h1>
          <p className="subtitle">Organize your tasks with style ✨</p>
        </div>
        <button 
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle dark mode"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>
      </header>
      <main>
        <div className="search-section">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks..."
            className="search-input"
          />
        </div>

        <div className="add-task">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a new task..."
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
          />
          <button onClick={addTask} disabled={loading}>
            {loading ? 'Adding...' : 'Add Task'}
          </button>
        </div>
        <div className="tasks">
          {filteredTasks.map(task => (
            <div key={task.id} className={`task ${task.status}`}>
              <div className="task-content">
                <p>{task.description}</p>
                <div className="task-status">
                  <span className={`status-badge ${task.status}`}>
                    {task.status === 'todo' && '📋 Todo'}
                    {task.status === 'in-progress' && '🚀 In Progress'}
                    {task.status === 'done' && '✅ Done'}
                  </span>
                </div>
              </div>
              <div className="task-actions">
                {task.status === 'todo' && (
                  <button onClick={() => markInProgress(task.id)}>Start</button>
                )}
                {task.status === 'in-progress' && (
                  <button onClick={() => markDone(task.id)}>Complete</button>
                )}
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default App
