import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import ProjectManager from './components/ProjectManager';
import TaskManager from './components/TaskManager';
import PrivateRoute from './components/PrivateRoute';
import Profile from './components/Profile';


const Landing = () => {
  // const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black px-4">
      <Login />
        {/* className="mt-4 text-blue-500 underline"
        onClick={() => navigate('/signup')}
      >
        Signup
      </button> */} */
    </div>
  );
};

const App = () => (
  <div className="min-h-screen bg-[#2a2a2a]">
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="/projects"
        element={
          <PrivateRoute>
            <ProjectManager />
          </PrivateRoute>
        }
      />
      <Route
        path="/tasks/:projectId"
        element={
          <PrivateRoute>
            <TaskManager />
          </PrivateRoute>
        }
      />
    </Routes>
  </div>
);

export default App;
