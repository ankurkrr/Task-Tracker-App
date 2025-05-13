import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const TaskManager = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'Pending' });
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTask, setEditTask] = useState({ title: '', description: '', status: 'Pending' });

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
      alert('Failed to fetch tasks');
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
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
      alert('Failed to create task');
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
      alert('Failed to update task');
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
      alert('Failed to delete task');
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line
  }, [projectId]);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Tasks</h2>
      <form onSubmit={createTask} className="mb-4">
        <input
          name="title"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          className="block w-full mb-2 p-2 border"
        />
        <input
          name="description"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          className="block w-full mb-2 p-2 border"
        />
        <select
          name="status"
          value={newTask.status}
          onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}
          className="block w-full mb-2 p-2 border"
        >
          <option value="Pending">Yet to Begin</option>
          <option value="In Progress">In Process</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit" className="bg-teal-500 text-white px-4 py-2">Create Task</button>
      </form>
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className="mb-2 p-2 border">
            {editingTaskId === task._id ? (
              <>
                <input
                  value={editTask.title}
                  onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
                  className="block w-full mb-2 p-2 border"
                />
                <input
                  value={editTask.description}
                  onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
                  className="block w-full mb-2 p-2 border"
                />
                <select
                  value={editTask.status}
                  onChange={(e) => setEditTask({ ...editTask, status: e.target.value })}
                  className="block w-full mb-2 p-2 border"
                >
                  <option value="Pending">Yet to Begin</option>
                  <option value="In Progress">In Process</option>
                  <option value="Completed">Completed</option>
                </select>
                <button onClick={() => saveEdit(task._id)} className="bg-green-500 text-white px-2 py-1 mr-2">Save</button>
                <button onClick={cancelEdit} className="bg-gray-400 text-white px-2 py-1">Cancel</button>
              </>
            ) : (
              <>
                <h3 className="font-bold">{task.title}</h3>
                <p>{task.description}</p>
                <p>Status: {task.status}</p>
                <p>Created: {new Date(task.createdAt).toLocaleString()}</p>
                {task.completedAt && <p>Completed: {new Date(task.completedAt).toLocaleString()}</p>}
                <button onClick={() => startEdit(task)} className="text-blue-500 mr-2">Edit</button>
                <button onClick={() => deleteTask(task._id)} className="text-red-500">Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;