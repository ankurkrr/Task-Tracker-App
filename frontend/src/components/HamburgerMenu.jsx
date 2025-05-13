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
        className="text-2xl p-2"
        onClick={() => setOpen(!open)}
        aria-label="Open menu"
      >
        &#9776;
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            onClick={handleProfile}
          >
            Profile
          </button>
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;