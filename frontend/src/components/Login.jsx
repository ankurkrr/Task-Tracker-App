import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/typing.css'; 


const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

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

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/forgot-password`, {
        email: forgotEmail,
        newPassword,
      });
      alert('Password updated. Please login with your new password.');
      setShowForgot(false);
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to reset password');
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

        <button
          type="button"
          className="w-full text-blue-400 hover:text-blue-600 transition mt-4 mb-2 font-semibold bg-transparent border-none"
          style={{ background: 'none', border: 'none', padding: 0 }}
          onClick={() => setShowForgot(true)}
        >
          Forgot Password?
        </button>

        {showForgot && (
          <form onSubmit={handleForgotPassword} className="space-y-4 mt-4">
            <input
              type="email"
              placeholder="Email"
              value={forgotEmail}
              onChange={e => setForgotEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[#1E1E2F] border border-[#3B3B4F] text-white placeholder-gray-400"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-[#1E1E2F] border border-[#3B3B4F] text-white placeholder-gray-400"
            />
            <button type="submit" className="w-full py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition">
              Reset Password
            </button>
            <button type="button" onClick={() => setShowForgot(false)} className="w-full py-2 rounded-lg bg-gray-500 text-white mt-2">
              Cancel
            </button>
          </form>
        )}
      </div>
    // </div>
  );
};

export default Login;
