import React, { useEffect, useState } from 'react';
import { fetchData } from '../FetchData';

// ...

function Prescription({onPrescriptionClick}) {
    const [appointments, setAppointments] = useState([]);
  
    useEffect(() => {
        const fetchAppointments = async () => {
          const appointmentsData = await fetchData('Appointments');
          const filteredAppointments = appointmentsData.filter(
            (appointment) =>
              appointment.appointmentStatus === 'Prescription given' &&
              appointment.selectedDate === new Date().toISOString().split('T')[0]
          );
          setAppointments(filteredAppointments);
        };
      
        fetchAppointments();
      }, []);
  
    const handleViewPrescription = (appointmentId) => {
        onPrescriptionClick(appointmentId);
      // Handle the action when the "View Prescription" button is clicked
      // You can navigate to a new page or show a modal with the prescription details
      // Here, let's log the appointmentId to the console
      console.log('View Prescription for Appointment ID:', appointmentId);
    };
  
    return (
      <div>
        <h1>Appointments</h1>
        {appointments.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Appointment ID</th>
                <th>Appointment Status</th>
                <th>Date of Appointment</th>
                <th>Doctor name</th>
                <th>Speciality</th>
                <th>Time</th>
                <th>Assigned Nurse ID</th>
                
                {/* <th>Contact</th> */}
                {/* <th>Date</th> */}
                {/* <th>Email</th> */}
                <th>Full Name</th>
                <th>Blood Pressure</th>
                <th>Height</th>
                <th>Pulse Rate</th>
                
                
                
                <th>Temperature</th>
                <th>Time</th>
                <th>Weight</th>
                <th>Reason</th>
                
                <th></th> {/* New column for the button */}
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.appointmentId}</td>
                  <td>{appointment.appointmentStatus}</td>
                  <td>{appointment.selectedDate}</td>
                  <td>{appointment.selectedDoctor}</td>
                  <td>{appointment.speciality}</td>
                  <td>{appointment.selectedTime}</td>
                  <td>{appointment.assigned_nurse_id}</td>
                  
                  {/* <td>{appointment.contact}</td> */}
                  {/* <td>{appointment.date_vitalsigns}</td> */}
                  {/* <td>{appointment.email}</td> */}
                  <td>{appointment.fullName}</td>
                  <td>{appointment.bloodpressure_vitalsigns}</td>
                  <td>{appointment.height_vital_signs}</td>
                  <td>{appointment.pulserate_vitalsigns}</td>
                  
                  
                  
                  <td>{appointment.temperature_vital_signs}</td>
                  <td>{appointment.time_vitalsigns}</td>
                  <td>{appointment.weight_vitalsigns}</td>
                  <td>{appointment.reason}</td>
                  
                  <td>
                    <button onClick={() => handleViewPrescription(appointment.appointmentId)}>
                      View Prescription
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No appointments found.</p>
        )}
      </div>
    );
  }
  
  export default Prescription;
  