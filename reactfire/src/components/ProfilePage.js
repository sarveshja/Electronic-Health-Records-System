import { useEffect, useState } from "react";
import { fetchData } from "../FetchData";
import { doc, updateDoc } from 'firebase/firestore';
import { storage , firestore } from '../firebase';



function ProfilePage() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const [data, setData] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [userData, setUserData] = useState({
    userId: '',
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: '',
    isEditing: false,
    docId: ''
  });

  useEffect(() => {
    const storedData = localStorage.getItem('user_id');
    setLoggedInUser(storedData);
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      const usersData = await fetchData('Users');
      setData(usersData);
    };
    getUsers();
  }, []);

  useEffect(() => {
    const matchedUser = data.find(user => user['user_id'] === loggedInUser);
    if (matchedUser) {
      setUserData(prevUserData => ({
        ...prevUserData,
        userId: matchedUser['user_id'],
        username: matchedUser['u_name'],
        email: matchedUser['email'],
        password: matchedUser['password'],
        phoneNumber: matchedUser['phone_no'],
        gender: matchedUser['gender'],
        dateOfBirth: matchedUser['dob'],
        docId: matchedUser.id
      }));
    }
  }, [data]);

  const handleEditClick = () => {
    setUserData(prevUserData => ({
      ...prevUserData,
      isEditing: true
    }));
  };

  const handleSaveClick = async () => {
    try {
      const userRef = doc(firestore, 'Users', userData.docId);
      await updateDoc(userRef, {
        u_name: userData.username,
        email: userData.email,
        password: userData.password,
        phone_no: userData.phoneNumber,
        dateOfBirth: userData.dateOfBirth,
        gender: userData.gender
      });
      setUserData(prevUserData => ({
        ...prevUserData,
        isEditing: false
      }));

      
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };
  const handlePhotoChange = e => {
    setPhoto(e.target.files[0]);
  };
  const handleChange = e => {
    const { name, value } = e.target;
    setUserData(prevUserData => ({
      ...prevUserData,
      [name]: value
    }));
  };

  const handleLogout = () =>{
    const confirmed = window.confirm('Are you sure you want to log out?');
  if (confirmed) {
    localStorage.removeItem('user_id');
    window.location.reload();
  } 
  }

  

  return (
    <div>
      <h1>Profile Details</h1>
      <p>
        Profile Picture:
        {userData.isEditing ? (
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
          />
        ) : (
          <img
            src={userData.photoURL}
            alt="Profile"
            style={{ width: '200px' }}
          />
        )}
      </p>
      <p>
        
        User ID : <space/> {userData.userId}
      </p>
      <p>
        Username : <space/>
        {userData.isEditing ? (
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleChange}
          />
        ) : (
          userData.username
        )}
      </p>
      <p>
        Email : <space/>
        {userData.isEditing ? (
          <input
            type="text"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        ) : (
          userData.email
        )}
      </p>
      <p>
        Password : <space/>
        {userData.isEditing ? (
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
        ) : (
          userData.password
        )}
      </p>
      <p>
        Phone Number : <space/>
        {userData.isEditing ? (
          <input
            type="text"
            name="phoneNumber"
            value={userData.phoneNumber}
            onChange={handleChange}
          />
        ) : (
          userData.phoneNumber
        )}
      </p>
      <p>
        Date of Birth : <space/>
        {userData.isEditing ? (
          <input
            type="text"
            name="dateOfBirth"
            value={userData.dateOfBirth}
            onChange={handleChange}
          />
        ) : (
          userData.dateOfBirth
        )}
      </p>
      <p>
        Gender : <space/>
        {userData.isEditing ? (
          <input
            type="text"
            name="gender"
            value={userData.gender}
            onChange={handleChange}
          />
        ) : (
          userData.gender
        )}
      </p>
      {userData.isEditing ? (
        <button onClick={handleSaveClick}>Save</button>
      ) : (
        <button onClick={handleEditClick}>Edit</button>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ProfilePage;
