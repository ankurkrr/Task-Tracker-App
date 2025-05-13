import React, { useState } from 'react';

const Profile = () => {
  const [profile, setProfile] = useState({
    age: '',
    profilePic: '',
    skills: '',
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    // TODO: Save profile info to backend
    alert('Profile saved!');
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleSave}>
        <input
          name="age"
          placeholder="Age"
          value={profile.age}
          onChange={handleChange}
          className="block w-full mb-2 p-2 border"
        />
        <input
          name="profilePic"
          placeholder="Profile Pic URL"
          value={profile.profilePic}
          onChange={handleChange}
          className="block w-full mb-2 p-2 border"
        />
        <input
          name="skills"
          placeholder="Skills (comma separated)"
          value={profile.skills}
          onChange={handleChange}
          className="block w-full mb-2 p-2 border"
        />
        <button type="submit" className="bg-teal-500 text-white px-4 py-2">Save</button>
      </form>
    </div>
  );
};

export default Profile;