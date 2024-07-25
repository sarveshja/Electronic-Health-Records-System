import React, { useEffect, useState } from 'react';
import { fetchData } from '../FetchData';

const Home = ({onSendAppointment}) => {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      const data = await fetchData('Appointments');
      const docName = localStorage.getItem('username');

      // Filter appointments based on today's date
      const today = new Date().toISOString().split('T')[0];
      const filtered = data.filter(
        (appointment) =>
          appointment.selectedDate === today && appointment.selectedDoctor === docName
      );
      setAppointments(filtered);
      setFilteredAppointments(filtered);
    };

    fetchAppointments();
  }, []);

  const filterAppointments = (condition) => {
    let filtered = [];
    if (condition === 'confirmed') {
      filtered = appointments.filter((appointment) => appointment.appointmentStatus === 'Confirmed');
    } else if (condition === 'vitalSignsFinished') {
      filtered = appointments.filter(
        (appointment) => appointment.appointmentStatus === 'vitalSignsFinished'
      );
    } else {
      filtered = appointments;
    }
    setFilteredAppointments(filtered);
  };

  const viewVitalSigns = (appointmentId) => {
    const selected = filteredAppointments.find((appointment) => appointment.id === appointmentId);
    setSelectedAppointment(selected);
  };

  const addPrescription = (appointment) => {
    onSendAppointment(appointment);
    
    // Dummy function for adding prescription
    console.log(`Adding prescription for appointment with ID: ${appointment}`);
  };

  const goBack = () => {
    setSelectedAppointment(null);
  };

  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      <div>
        <button onClick={() => filterAppointments('confirmed')}>Booking Confirmed</button>
        <button onClick={() => filterAppointments('vitalSignsFinished')}>
          Vital Signs Taken
        </button>
        <button onClick={() => filterAppointments('all')}>All Appointments</button>
      </div>

      {selectedAppointment ? (
        <div>
          <button onClick={goBack}>Back</button>
          <div>
            <h2>Appointment Information</h2>
            <p>Full Name: {selectedAppointment.fullName}</p>
            <p>Height: {selectedAppointment.height_vital_signs}</p>
            <p>Weight: {selectedAppointment.weight_vitalsigns}</p>
            <p>Temperature: {selectedAppointment.temperature_vital_signs}</p>
            <p>Blood Pressure: {selectedAppointment.bloodpressure_vitalsigns}</p>
            <p>Pulse Rate: {selectedAppointment.pulserate_vitalsigns}</p>
            
            
          </div>
        </div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.fullName}</td>
                <td>{appointment.selectedDate}</td>
                <td>{appointment.selectedTime}</td>
                <td>{appointment.appointmentStatus}</td>
                <td>
                  {appointment.appointmentStatus === 'Confirmed' ? null : (
                    <>
                      <button onClick={() => viewVitalSigns(appointment.id)}>View Vital Signs</button>
                      <button onClick={() => addPrescription(appointment)}>Add Prescription</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Home;
