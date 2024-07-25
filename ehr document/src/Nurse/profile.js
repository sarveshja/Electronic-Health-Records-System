import React, { useState } from 'react';
import './profile.css';
const Profiledoc = () => {
  const [profileData, setProfileData] = useState({
    profileImage: null, 
    userId: 'N1',
    username: 'Dhanishga',
    email: 'dhanishga@example.com',
    password: '********',
    phoneNumber: '1234567890',
    dateOfBirth: '23/04/2003',
    gender: 'Female',
    isEditing: false
  });

  const handleEditClick = () => {
    setProfileData(prevProfileData => ({
      ...prevProfileData,
      isEditing: true
    }));
  };

  const handleSaveClick = () => {
    setProfileData(prevProfileData => ({
      ...prevProfileData,
      isEditing: false
    }));
    // Perform save operation or API call here to update the profile data
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setProfileData(prevProfileData => ({
      ...prevProfileData,
      [name]: value
    }));
  };

  return (
      <div className="profile-container">
      <h1>Profile Details</h1>
      <div>
        <img src={profileData.profileImage} alt="Profile" />
        {profileData.isEditing && (
          <input
            type="text"
            name="profileImage"
            value={profileData.profileImage}
            onChange={handleChange}
          />
        )}
      </div>
      <p>
        User ID:
        {profileData.isEditing ? (
          <input
            type="text"
            name="userId"
            value={profileData.userId}
            onChange={handleChange}
          />
        ) : (
          profileData.userId
        )}
      </p>
      <p>
        Username:
        {profileData.isEditing ? (
          <input
            type="text"
            name="username"
            value={profileData.username}
            onChange={handleChange}
          />
        ) : (
          profileData.username
        )}
      </p>
      <p>
        Email:
        {profileData.isEditing ? (
          <input
            type="text"
            name="email"
            value={profileData.email}
            onChange={handleChange}
          />
        ) : (
          profileData.email
        )}
      </p>
      <p>
        Password:
        {profileData.isEditing ? (
          <input
            type="password"
            name="password"
            value={profileData.password}
            onChange={handleChange}
          />
        ) : (
          profileData.password
        )}
      </p>
      <p>
        Phone Number:
        {profileData.isEditing ? (
          <input
            type="text"
            name="phoneNumber"
            value={profileData.phoneNumber}
            onChange={handleChange}
          />
        ) : (
          profileData.phoneNumber
        )}
      </p>
      <p>
        Date of Birth:
        {profileData.isEditing ? (
          <input
            type="text"
            name="dateOfBirth"
            value={profileData.dateOfBirth}
            onChange={handleChange}
          />
        ) : (
          profileData.dateOfBirth
        )}
      </p>
      <p>
        Gender:
        {profileData.isEditing ? (
          <input
            type="text"
            name="gender"
            value={profileData.gender}
            onChange={handleChange}
          />
        ) : (
          profileData.gender
        )}
      </p>
      {profileData.isEditing ? (
        <button className="profile-button" onClick={handleSaveClick}>
        Save
      </button>
      ) : (
        <button onClick={handleEditClick}>Edit</button>
      )}
    </div>
  );
};

export default Profiledoc;
