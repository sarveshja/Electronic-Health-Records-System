import React from 'react';

const PatientDetails = ({ name, contact, dob, dateTime }) => {
  return (
    <div style={styles.container}>
      <h2>Patient Details</h2>
      <div style={styles.details}>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Contact:</strong> {contact}</p>
        <p><strong>Date of Birth:</strong> {dob}</p>
        <p><strong>Appointment Date & Time:</strong> {dateTime}</p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    border: '1px solid #ccc',
    padding: '20px',
    margin: '20px',
  },
  details: {
    textAlign: 'center',
  },
};

export default PatientDetails;
