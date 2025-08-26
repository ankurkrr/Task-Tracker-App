import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const TaskManager = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'Pending' });
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTask, setEditTask] = useState({ title: '', description: '', status: 'Pending' });
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [projectTitle, setProjectTitle] = useState('');

  const statusConfig = {
    'Pending': { 
      label: 'Yet to Begin', 
      color: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      icon: '⏳'
    },
    'In Progress': { 
      label: 'In Progress', 
      color: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
      icon: '🔄'
    },
    'Completed': { 
      label: 'Completed', 
      color: 'bg-green-500/20 text-green-300 border-green-500/30',
      icon: '✅'
    }
  };

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/tasks?project=${projectId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setTasks(data);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    }
  };

  const fetchProjectDetails = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/projects`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      const project = data.find(p => p._id === projectId);
      setProjectTitle(project?.title || 'Project');
    } catch (err) {
      console.error('Failed to fetch project details:', err);
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim() || !newTask.description.trim()) return;
    
    setIsCreating(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/tasks`,
        { ...newTask, project: projectId },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setNewTask({ title: '', description: '', status: 'Pending' });
      fetchTasks();
    } catch (err) {
      console.error('Failed to create task:', err);
    } finally {
      setIsCreating(false);
    }
  };

  const startEdit = (task) => {
    setEditingTaskId(task._id);
    setEditTask({
      title: task.title,
      description: task.description,
      status: task.status,
    });
  };

  const cancelEdit = () => {
    setEditingTaskId(null);
    setEditTask({ title: '', description: '', status: 'Pending' });
  };

  const saveEdit = async (taskId) => {
    if (!editTask.title.trim() || !editTask.description.trim()) return;
    
    setIsSaving(true);
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/tasks/${taskId}`,
        editTask,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setEditingTaskId(null);
      setEditTask({ title: '', description: '', status: 'Pending' });
      fetchTasks();
    } catch (err) {
      console.error('Failed to update task:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const deleteTask = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/tasks/${taskId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      fetchTasks();
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchProjectDetails();
    // eslint-disable-next-line
  }, [projectId]);

  const isFormValid = newTask.title.trim() && newTask.description.trim();
  const isEditValid = editTask.title.trim() && editTask.description.trim();

  const tasksByStatus = {
    'Pending': tasks.filter(task => task.status === 'Pending'),
    'In Progress': tasks.filter(task => task.status === 'In Progress'),
    'Completed': tasks.filter(task => task.status === 'Completed')
  };

  return (
    <div className="min-h-screen bg-[#2a2a2a] text-gray-200">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/projects')}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200"
                title="Back to Projects"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">Tasks</h1>
                <p className="text-gray-400 font-medium">
                  {projectTitle} • {tasks.length} tasks total
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Create Task Form */}
        <div className="mb-16">
          <div className="form-container bg-gray-800/50 border border-gray-700 rounded-2xl p-8 shadow-elegant">
            <h2 className="text-xl font-semibold text-white mb-6">Create New Task</h2>
            
            <form onSubmit={createTask} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="task-title" className="block text-sm font-medium text-gray-300">
                    Task Title
                  </label>
                  <input
                    id="task-title"
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    placeholder="Enter task title..."
                    className="input-field w-full"
                    disabled={isCreating}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="task-status" className="block text-sm font-medium text-gray-300">
                    Status
                  </label>
                  <div className="dropdown-container">
                    <select
                      id="task-status"
                      value={newTask.status}
                      onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
                      className="select-field w-full"
                      disabled={isCreating}
                    >
                      <option value="Pending">Yet to Begin</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="task-description" className="block text-sm font-medium text-gray-300">
                  Description
                </label>
                <textarea
                  id="task-description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="Describe the task..."
                  rows={3}
                  className="input-field w-full resize-none"
                  disabled={isCreating}
                />
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={!isFormValid || isCreating}
                  className="btn-primary disabled:opacity-50"
                >
                  {isCreating ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Creating...
                    </span>
                  ) : (
                    'Create Task'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Tasks by Status */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Task Overview</h2>
            <div className="flex gap-4 text-sm">
              {Object.entries(tasksByStatus).map(([status, statusTasks]) => (
                <div key={status} className="text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full border border-gray-700">
                  {statusConfig[status].icon} {statusTasks.length} {statusConfig[status].label}
                </div>
              ))}
            </div>
          </div>

          {tasks.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-6 bg-gray-700 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-300 mb-2">No tasks yet</h3>
              <p className="text-gray-500">Create your first task to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {Object.entries(tasksByStatus).map(([status, statusTasks]) => (
                <div key={status} className="space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-2xl">{statusConfig[status].icon}</span>
                    <h3 className="text-lg font-semibold text-white">{statusConfig[status].label}</h3>
                    <span className="text-sm text-gray-400 bg-gray-700 px-2 py-1 rounded-full">
                      {statusTasks.length}
                    </span>
                  </div>

                  <div className="space-y-4">
                    {statusTasks.map((task) => (
                      <div key={task._id} className="project-card">
                        {editingTaskId === task._id ? (
                          <div className="space-y-4">
                            <input
                              value={editTask.title}
                              onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
                              className="input-field w-full"
                              placeholder="Task title"
                            />
                            <textarea
                              value={editTask.description}
                              onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
                              className="input-field w-full resize-none"
                              rows={3}
                              placeholder="Task description"
                            />
                            <div className="dropdown-container">
                              <select
                                value={editTask.status}
                                onChange={(e) => setEditTask({ ...editTask, status: e.target.value })}
                                className="select-field w-full"
                              >
                                <option value="Pending">Yet to Begin</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                              </select>
                            </div>
                            <div className="flex gap-3 pt-2">
                              <button
                                onClick={() => saveEdit(task._id)}
                                disabled={!isEditValid || isSaving}
                                className="btn-primary flex-1 disabled:opacity-50"
                              >
                                {isSaving ? (
                                  <span className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Saving...
                                  </span>
                                ) : (
                                  'Save Changes'
                                )}
                              </button>
                              <button
                                onClick={cancelEdit}
                                className="btn-secondary"
                                disabled={isSaving}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="mb-4">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="text-lg font-semibold text-white">{task.title}</h4>
                                <span className={`text-xs px-2 py-1 rounded-full border ${statusConfig[task.status].color}`}>
                                  {statusConfig[task.status].icon} {statusConfig[task.status].label}
                                </span>
                              </div>
                              <p className="text-gray-400 text-sm leading-relaxed mb-3">
                                {task.description}
                              </p>
                              <div className="text-xs text-gray-500 space-y-1">
                                <p>Created: {new Date(task.createdAt).toLocaleDateString()}</p>
                                {task.completedAt && (
                                  <p>Completed: {new Date(task.completedAt).toLocaleDateString()}</p>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3 pt-4 border-t border-gray-700">
                              <button
                                onClick={() => startEdit(task)}
                                className="btn-secondary flex-1 text-center"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => deleteTask(task._id)}
                                className="btn-danger px-3 py-2"
                                title="Delete task"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {statusTasks.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <div className="text-4xl mb-2">{statusConfig[status].icon}</div>
                        <p className="text-sm">No {statusConfig[status].label.toLowerCase()} tasks</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
