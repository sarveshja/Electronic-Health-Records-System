import React from 'react';
import './box.css';

const cardiology1 = () => {
  const doctorsData = [
    {
      name: 'Dr. John Doe',
      specialization: 'Cardiology',
      photo: 'doctor1.jpg',
    },
    {
      name: 'Dr. Jane Smith',
      specialization: 'Dermatology',
      photo: 'doctor2.jpg',
    },
    {
      name: 'Dr. Jane Smith',
      specialization: 'Dermatology',
      photo: 'doctor2.jpg',
    },
    {
      name: 'Dr. Jane Smith',
      specialization: 'Dermatology',
      photo: 'doctor2.jpg',
    },
    {
      name: 'Dr. Jane Smith',
      specialization: 'Dermatology',
      photo: 'doctor2.jpg',
    },
    // Add more doctors' data as needed
  ];

  return (
    <div>
      <h1>Doctors List</h1>
      <div className="doctors-container">
        {doctorsData.map((doctor, index) => (
          <div className="doctor-box" key={index}>
            <img src={doctor.photo} alt={doctor.name} />
            <h3>{doctor.name}</h3>
            <p>{doctor.specialization}</p>
            {/* Add additional information or functionality here */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default cardiology1;
