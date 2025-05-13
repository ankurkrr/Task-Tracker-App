import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    country: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  

  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/signup`, formData);
      localStorage.setItem('token', data.token);
      navigate('/projects', { replace: true });
    } catch (err) {
      alert(err.response?.data?.error || 'Signup failed');
    }
  };

  const isFormComplete = Object.values(formData).every(val => val.trim() !== '');


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black px-4">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-full max-w-sm text-white">
        <h2 className="text-2xl font-bold text-center mb-6 typing-animation inline-block ">Create Your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-[#1E1E2F] border border-[#3B3B4F] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-[#1E1E2F] border border-[#3B3B4F] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <div className="relative">
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-[#1E1E2F] border border-[#3B3B4F] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
            >
              <FaEye />
            </button>
          </div>
          <input
            name="country"
            placeholder="Country"
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-[#1E1E2F] border border-[#3B3B4F] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <button
            type="submit"
            disabled={!isFormComplete}
            className={`w-full py-2 rounded-lg font-semibold text-white transition ${
              isFormComplete
                ? 'bg-green-500 hover:bg-green-600'
                : 'w-full py-2 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition'
            }`}
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-300">
          Already have an account?
          <button
            className="ml-1 text-blue-400 hover:underline"
            onClick={() => navigate('/')}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
