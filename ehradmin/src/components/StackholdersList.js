import React, { useEffect, useState } from 'react';
import { fetchData } from '../FetchData';
import './StackholdersList.css';

const StackholdersList = (props) => {
  const [users, setUsers] = useState([]);
  const [selectedStackholders, setSelectedStackholders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  let designation = '';
  if (props.des === 'doctor') {
    designation = 'Doctors';
  } else if (props.des === 'nurse') {
    designation = 'Nurses';
  } else if (props.des === 'patient') {
    designation = 'Patients';
  }

  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersData = await fetchData('Users');
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    getUsers();
  }, []);

  

  useEffect(() => {
    const filteredUsers = users.filter((user) => user.designation === props.des);
    setSelectedStackholders(filteredUsers);
  }, [users, props.des]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredStackholders = selectedStackholders.filter((user) => {
    const { user_id, phone_no, u_name, email } = user;
    const lowerCaseQuery = searchQuery.toLowerCase();

    return (
      user_id.toLowerCase().includes(lowerCaseQuery) ||
      phone_no.toLowerCase().includes(lowerCaseQuery) ||
      u_name.toLowerCase().includes(lowerCaseQuery) ||
      email.toLowerCase().includes(lowerCaseQuery)
    );
  })
  .sort((a, b) => {
    // Extract the numerical part of user_id
    const idA = parseInt(a.user_id.slice(1));
    const idB = parseInt(b.user_id.slice(1));

    // Compare the numerical parts
    return idA - idB;
  });

  return (
    <div className="stackholders-list-container">
      <div className="users-header">
        <h1>{designation}</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder={"Search "+designation+" by ID, Name, Email, or Phone"}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <table className="stackholders-table">
        <thead>
          <tr>
            <th className="stackholders-table-header">User ID</th>
            <th className="stackholders-table-header">Name</th>
            <th className="stackholders-table-header">Email</th>
            <th className="stackholders-table-header">Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {filteredStackholders.map((user) => (
            <tr key={user.user_id}>
              <td className="stackholders-table-data">{user.user_id}</td>
              <td className="stackholders-table-data">{user.u_name}</td>
              <td className="stackholders-table-data">{user.email}</td>
              <td className="stackholders-table-data">{user.phone_no}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StackholdersList;
