import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HamburgerMenu from './HamburgerMenu';

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: '', description: '' });
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/projects`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setProjects(data);
    } catch (err) {
      alert('Failed to fetch projects');
    }
  };

  const createProject = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/projects`,
        newProject,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      fetchProjects();
    } catch (err) {
      alert('Failed to create project');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Projects</h2>
        <HamburgerMenu />
      </div>
      <form onSubmit={createProject} className="mb-4">
        <input name="title" placeholder="Title" onChange={(e) => setNewProject({ ...newProject, title: e.target.value })} className="block w-full mb-2 p-2 border" />
        <input name="description" placeholder="Description" onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} className="block w-full mb-2 p-2 border" />
        <button
          type="submit"
          className="bg-teal-500 text-white px-4 py-2"
          disabled={projects.length >= 4}
        >
          Create Project
        </button>
        {projects.length >= 4 && (
          <div className="text-red-500 mt-2">You can only create up to 4 projects.</div>
        )}
      </form>
      <ul>
        {projects.map((project) => (
          <li key={project._id} className="mb-2 p-2 border">
            <h3 className="font-bold">{project.title}</h3>
            <p>{project.description}</p>
            <button onClick={() => navigate(`/tasks/${project._id}`)} className="text-blue-500 mr-2">View Tasks</button>
            <button
              onClick={async () => {
                await axios.delete(
                  `${import.meta.env.VITE_API_URL}/api/projects/${project._id}`,
                  { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
                );
                fetchProjects();
              }}
              className="text-red-500"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectManager;