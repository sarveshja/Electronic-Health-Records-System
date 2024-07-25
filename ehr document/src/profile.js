import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from './firebase';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({});
  const [loading, setLoading] = useState(true);
  //const [useridp , setUserIdp] = useState();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      fetchProfileData(userId);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchProfileData = async (userId) => {
    try {
      const usersRef = collection(firestore, 'Users');
      const q = query(usersRef, where('user_id', '==', userId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log('No matching documents.');
        setLoading(false);
        return;
      }

      const userData = querySnapshot.docs[0].data();
      setProfileData(userData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching profile data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Profile Details</h1>
      <p>User ID: {profileData.user_id}</p>
      <p>Username: {profileData.u_name}</p>
      <p>Email: {profileData.email}</p>
      <p>Password: {profileData.password}</p>
      <p>Phone Number: {profileData.phone_no}</p>
      <p>Date of Birth: {profileData.dob}</p>
      <p>Gender: {profileData.gender}</p>
      {/* Display other profile details */}
    </div>
  );
};

export default ProfilePage;