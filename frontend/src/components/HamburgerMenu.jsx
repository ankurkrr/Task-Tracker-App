import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HamburgerMenu = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleProfile = () => {
    setOpen(false);
    navigate('/profile');
  };

  return (
    <div className="relative">
      <button
        className="p-3 text-gray-300 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200"
        onClick={() => setOpen(!open)}
        aria-label="Open menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      
      {open && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-xl shadow-elegant-lg z-50 backdrop-blur-sm">
            <div className="py-2">
              <button
                className="flex items-center w-full text-left px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors duration-200"
                onClick={handleProfile}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Profile
              </button>
              
              <div className="border-t border-gray-700 my-1" />
              
              <button
                className="flex items-center w-full text-left px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-600/10 transition-colors duration-200"
                onClick={handleLogout}
              >
                <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HamburgerMenu;
