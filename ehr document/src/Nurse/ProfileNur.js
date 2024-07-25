import { useEffect, useState } from "react";
import { fetchData } from "../FetchData";
import { doc, updateDoc } from 'firebase/firestore';
import { storage , firestore } from '../firebase';



function ProfileNur() {
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

  const handleChange = e => {
    const { name, value } = e.target;
    setUserData(prevUserData => ({
      ...prevUserData,
      [name]: value
    }));
  };

  

  return (
    <div>
      <h1>Profile Details</h1>
      <p>
        
        
          {/* <img src={patientprofile} alt="Profile" /> */}
        
      </p>
      <p>
        
        User ID: {userData.userId}
      </p>
      <p>
        Username:
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
        Email:
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
        Password:
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
        Phone Number:
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
        Date of Birth:
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
        Gender:
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
    </div>
  );
}

export default ProfileNur;
