import React, { useEffect, useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '../firebase';
import { fetchData } from '../FetchData';

const MyAvailability = ({onBackClicked} ) => {
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const [loggedInUser, setLoggedInUser] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem('user_id');
    setLoggedInUser(storedData);
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      const usersData = await fetchData('DoctorsAvailability');
      setData(usersData);
    };
    getUsers();
  }, []);

  const handleSlotSelection = (e) => {
    setSelectedSlot(e.target.value);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const userId = localStorage.getItem('user_id');
      const username = localStorage.getItem('username');

      if (!userId || !username) {
        alert(userId+username)
        console.error('User ID or username not found in localStorage');
        return;
      }

      const docData = {
        userId,
        username,
        selectedDate,
        selectedSlot,
      };

      // Add the document to the "DoctorsAvailability" collection
      await addDoc(collection(firestore, 'DoctorsAvailability'), docData);

      console.log('Form submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleBack = () => {
    // Handle back button click here
    onBackClicked();
  };

  // Filter the data array based on selectedDate, selectedSlot, and loggedInUser
  const filteredData = data.filter((item) => item.userId === loggedInUser);

  return (
    <div>
      <button onClick={handleBack}>Back</button>

      <div>
        <p>Date:</p>
        <input
          type="date"
          value={selectedDate}
          onChange={handleDateChange}
          required
        />
      </div>
      <div>
        <p>Slot:</p>
        <select value={selectedSlot} onChange={handleSlotSelection}>
          <option value="">Select a slot</option>
          <option value="8am to 2pm">8am to 2pm</option>
          <option value="4pm to 10pm">4pm to 10pm</option>
        </select>
      </div>
      <button onClick={handleSubmit}>Submit</button>

      {filteredData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Available Slot</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.selectedDate}</td>
                <td>{item.selectedSlot}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No matching data found.</p>
      )}
    </div>
  );
};

export default MyAvailability;
