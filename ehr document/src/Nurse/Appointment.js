import React, { useEffect, useState } from 'react';
import { fetchData, updateData } from '../FetchData';
import './Appointment.css';

const DocCal = ({onGoToVitalScience, onPatientSend,onDocIdSend}) => {
  const [appointmentsData, setAppointmentsData] = useState([]);

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const appointmentsData = await fetchData('Appointments');
        const today = new Date().toISOString().split('T')[0];
        const filteredAppointments = appointmentsData.filter(
          (appointment) => appointment.selectedDate === today && appointment.assigned_nurse_id == null
        );
        setAppointmentsData(filteredAppointments);
        alert('Today is ' + today);
      } catch (error) {
        console.error('Error fetching appointments data:', error);
      }
    };

    getAppointments();
  }, []);

  const handleAcceptAppointment = (appointment) => {
    const assignedNurseId = localStorage.getItem('user_id');
  const updatedAppointment = {
    ...appointment,
    assigned_nurse_id: assignedNurseId,
  };

  // Update the appointment data in Firebase Firestore
  updateData('Appointments', appointment.id, updatedAppointment);

    // Logic for accepting appointment
    onPatientSend(appointment.fullName);  
    onDocIdSend(appointment);
    onGoToVitalScience('vitalSigns');
    console.log('Accepted appointment:', appointment);
  };

  return (
    <div>
      <h1>Today's Appointments</h1>
      <table>
        <thead>
          <tr>
            <th>Appointment ID</th>
            <th>Full Name</th>
            <th>Speciality</th>
            <th> Doctor</th>
            <th>Appointment Time</th>
            <th>Accept</th>
          </tr>
        </thead>
        <tbody>
          {appointmentsData.map((appointment) => (
            <tr key={appointment.appointmentId}>
              <td>{appointment.appointmentId}</td>
              <td>{appointment.fullName}</td>
              <td>{appointment.speciality}</td>
              
              <td>{appointment.selectedDoctor}</td>
              <td>{appointment.selectedTime}</td>
              <td>
                <button onClick={() => handleAcceptAppointment(appointment)} className='acceptbtn'>Accept</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocCal;
