import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaCamera, FaCode, FaCalendarAlt, FaSave, FaArrowLeft } from 'react-icons/fa';

const Profile = () => {
  const navigate = useNavigate();
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
    alert('Profile saved successfully!');
  };

  const skillsArray = profile.skills.split(',').filter(skill => skill.trim() !== '');

  return (
    <div className="min-h-screen bg-dark-bg p-6">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 group"
        >
          <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-200" />
          <span>Back</span>
        </button>

        <div className="bg-card-bg rounded-2xl shadow-elegant-lg p-8 border border-border-gray">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="relative inline-block mb-4">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary-hover flex items-center justify-center mx-auto shadow-elegant">
                {profile.profilePic ? (
                  <img 
                    src={profile.profilePic} 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <FaUser className="text-white text-3xl" />
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 bg-primary hover:bg-primary-hover rounded-full p-2 cursor-pointer transition-colors shadow-elegant">
                <FaCamera className="text-white text-sm" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Edit Profile</h1>
            <p className="text-gray-400">Update your personal information and skills</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSave} className="space-y-6">
            {/* Age Input */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <FaCalendarAlt className="text-primary" />
                Age
              </label>
              <input
                type="number"
                name="age"
                placeholder="Enter your age"
                value={profile.age}
                onChange={handleChange}
                className="w-full p-4 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 outline-none focus:bg-gray-700"
              />
            </div>

            {/* Profile Picture URL Input */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <FaCamera className="text-primary" />
                Profile Picture URL
              </label>
              <input
                type="url"
                name="profilePic"
                placeholder="https://example.com/your-photo.jpg"
                value={profile.profilePic}
                onChange={handleChange}
                className="w-full p-4 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 outline-none focus:bg-gray-700"
              />
              {profile.profilePic && (
                <div className="mt-3 p-3 bg-dark-bg rounded-lg border border-border-gray">
                  <p className="text-sm text-gray-400 mb-2">Preview:</p>
                  <img 
                    src={profile.profilePic} 
                    alt="Profile preview" 
                    className="w-16 h-16 rounded-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            {/* Skills Input */}
            <div className="group">
              <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                <FaCode className="text-primary" />
                Skills
              </label>
              <textarea
                name="skills"
                placeholder="React, JavaScript, Node.js, Python (comma separated)"
                value={profile.skills}
                onChange={handleChange}
                rows={3}
                className="w-full p-4 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 outline-none resize-none focus:bg-gray-700"
              />
              {skillsArray.length > 0 && (
                <div className="mt-3 p-3 bg-dark-bg rounded-lg border border-border-gray">
                  <p className="text-sm text-gray-400 mb-2">Skills preview:</p>
                  <div className="flex flex-wrap gap-2">
                    {skillsArray.map((skill, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium border border-primary/30"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Save Button */}
            <div className="pt-4">
              <button 
                type="submit" 
                className="w-full bg-gradient-to-r from-primary to-primary-hover text-white font-semibold py-4 px-6 rounded-xl shadow-elegant hover:shadow-elegant-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2 group"
              >
                <FaSave className="group-hover:rotate-12 transition-transform duration-200" />
                Save Profile
              </button>
            </div>
          </form>

          {/* Additional Info */}
          <div className="mt-8 p-4 bg-dark-bg rounded-xl border border-border-gray">
            <h3 className="text-lg font-semibold text-white mb-2">Profile Tips</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>• Use a clear, professional profile picture</li>
              <li>• List your most relevant skills</li>
              <li>• Keep your information up to date</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
