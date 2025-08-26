import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HamburgerMenu from './HamburgerMenu';

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: '', description: '' });
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/projects`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setProjects(data);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
    }
  };

  const createProject = async (e) => {
    e.preventDefault();
    if (!newProject.title.trim() || !newProject.description.trim()) return;
    
    setIsCreating(true);
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/projects`,
        newProject,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }
      );
      setNewProject({ title: '', description: '' });
      fetchProjects();
    } catch (err) {
      console.error('Failed to create project:', err);
    } finally {
      setIsCreating(false);
    }
  };

  const deleteProject = async (projectId) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/projects/${projectId}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      fetchProjects();
    } catch (err) {
      console.error('Failed to delete project:', err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const isFormValid = newProject.title.trim() && newProject.description.trim();
  const hasReachedLimit = projects.length >= 4;

  return (
    <div className="min-h-screen bg-[#2a2a2a] text-gray-200">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Projects</h1>
              <p className="text-gray-400 font-medium">
                Manage your projects and track progress
              </p>
            </div>
            <HamburgerMenu />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Create Project Form */}
        <div className="mb-16">
          <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-8 shadow-elegant">
            <h2 className="text-xl font-semibold text-white mb-6">Create New Project</h2>
            
            <form onSubmit={createProject} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-300">
                    Project Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    placeholder="Enter project title..."
                    className="input-field w-full"
                    disabled={isCreating || hasReachedLimit}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-300">
                    Description
                  </label>
                  <input
                    id="description"
                    type="text"
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    placeholder="Describe your project..."
                    className="input-field w-full"
                    disabled={isCreating || hasReachedLimit}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <div>
                  {hasReachedLimit && (
                    <p className="text-amber-400 text-sm font-medium">
                      ⚠️ Project limit reached (4/4)
                    </p>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={!isFormValid || isCreating || hasReachedLimit}
                  className="btn-primary disabled:opacity-50"
                >
                  {isCreating ? (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Creating...
                    </span>
                  ) : (
                    'Create Project'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Your Projects</h2>
            <div className="text-sm text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full border border-gray-700">
              {projects.length} / 4 projects
            </div>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-6 bg-gray-700 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-300 mb-2">No projects yet</h3>
              <p className="text-gray-500">Create your first project to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project._id} className="project-card group">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-700">
                    <button
                      onClick={() => navigate(`/tasks/${project._id}`)}
                      className="btn-secondary flex-1 text-center"
                    >
                      View Tasks
                    </button>
                    <button
                      onClick={() => deleteProject(project._id)}
                      className="btn-danger px-3 py-2"
                      title="Delete project"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
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

export default ProjectManager;
