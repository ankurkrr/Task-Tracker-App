import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/typing.css'; 


const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();



  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, formData);
      localStorage.setItem('token', data.token);
      navigate('/projects', { replace: true });
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    // <div className="min-h-screen flex items-center justify-center bg-gradient-to-br px-4">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-sm text-white">
        <h1 className="text-2xl font-bold text-center mb-6 text-white">
          <span className="typing-animation inline-block">Welcome to Task Tracker</span>
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
           className="w-full px-4 py-2 rounded-lg bg-[#1E1E2F] border border-[#3B3B4F] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
             className="w-full px-4 py-2 rounded-lg bg-[#1E1E2F] border border-[#3B3B4F] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition"
          >
            Sign In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-300">
          Don’t have an account?
          <button
            className="ml-1 text-blue-400 hover:underline"
            onClick={() => navigate('/signup')}
          >
            Signup
          </button>
        </p>

        {/* Typing animation */}
        {/* <style>
          {`
            .typing-animation {
              overflow: hidden;
              white-space: nowrap;
              border-right: .15em solid orange;
              animation: typing 2.5s steps(30, end), blink-caret .75s step-end infinite;
            }
            @keyframes typing {
              from { width: 0 }
              to { width: 100% }
            }
            @keyframes blink-caret {
              from, to { border-color: transparent }
              50% { border-color: orange; }
            }
          `}
        </style> */}
      </div>
    // </div>
  );
};

export default Login;
