import React, { useEffect, useState } from 'react';

const PatientHealthRecords = ({ patientId }) => {
  const [healthRecords, setHealthRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    // Fetch health records from the API based on the patientId
    // Replace 'apiEndpoint' with your actual API endpoint
    fetch(`apiEndpoint/patients/${patientId}/health-records`)
      .then(response => response.json())
      .then(data => setHealthRecords(data))
      .catch(error => console.error(error));
  }, [patientId]);

  const handleRecordClick = record => {
    setSelectedRecord(record);
  };

  const closeDetails = () => {
    setSelectedRecord(null);
  };

  return (
    <div>
      <h2>Health Records for Patient {patientId}</h2>
      {selectedRecord ? (
        <div>
          <h3>Details for Record {selectedRecord.id}</h3>
          <p>Date: {selectedRecord.date}</p>
          <p>Condition: {selectedRecord.condition}</p>
          {/* Render additional fields here */}
          <button onClick={closeDetails}>Close</button>
        </div>
      ) : (
        <ul>
          {healthRecords.map(record => (
            <li key={record.id}>
              <p>Date: {record.date}</p>
              <p>Condition: {record.condition}</p>
              {/* Render additional fields here */}
              <button onClick={() => handleRecordClick(record)}>
                View Details
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PatientHealthRecords;
