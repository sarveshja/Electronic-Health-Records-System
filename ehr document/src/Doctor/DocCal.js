import React, { useEffect, useState } from 'react';
import DoctorCalendar from './DoctorCalendar';
import PatientDetails from './PatientDetails';
import { fetchData } from '../FetchData';

const DocCal = () => {
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [appointmentsData,setAppointmentsData] = useState([]);

    // useEffect(() => {
    //   const getAppointments = async () => {
    //     try {
    //       const appointmentsData = await fetchData('Appointments');
    //       const storedUsername = localStorage.getItem('username');
    //       alert(storedUsername);
    
    //       if (storedUsername) {
    //         const filteredAppointments = appointmentsData.filter(
    //           (appointment) => appointment.selectedDoctor === storedUsername
    //         );
    //         setAppointmentsData(filteredAppointments);
    //         console.log('Filtered Data:', filteredAppointments);
    //       }
    //     } catch (error) {
    //       console.error('Error fetching appointments data:', error);
    //     }
    //   };
    
    //   getAppointments();
    // }, []);
    
    
    

    // // Mock data for appointments
    // const appointments = [
    //   {
    //     id: 1,
    //     title: 'Appointment 1',
    //     start: new Date(2023, 5, 2, 10, 0), // June 2nd, 2023, 10:00 AM
    //     end: new Date(2023, 5, 2, 11, 0), // June 2nd, 2023, 11:00 AM
    //     patient: {
    //       name: 'John Doe',
    //       contact: 'john.doe@example.com',
    //       dob: '1990-01-01',
    //       dateTime: '2023-06-02 10:00 AM',
    //     },
    //   },
    //   {
    //     id: 2,
    //     title: 'Appointment 2',
    //     start: new Date(2023, 6, 3, 15, 0), // July 3rd, 2023, 3:00 PM
    //     end: new Date(2023, 6, 3, 16, 0), // July 3rd, 2023, 4:00 PM
    //     patient: {
    //       name: 'Jane Smith',
    //       contact: 'jane.smith@example.com',
    //       dob: '1985-05-15',
    //       dateTime: '2023-07-03 3:00 PM',
    //     },
    //   },
    //   {
    //     id: 3,
    //     title: 'Appointment 3',
    //     start: new Date(2023, 7, 1, 9, 0), // August 1st, 2023, 9:00 AM
    //     end: new Date(2023, 7, 1, 10, 0), // August 1st, 2023, 10:00 AM
    //     patient: {
    //       name: 'Michael Johnson',
    //       contact: 'michael.johnson@example.com',
    //       dob: '1978-09-15',
    //       dateTime: '2023-08-01 9:00 AM',
    //     },
    //   },
    //   {
    //     id: 4,
    //     title: 'Appointment 4',
    //     start: new Date(2023, 8, 3, 16, 0), // September 3rd, 2023, 4:00 PM
    //     end: new Date(2023, 8, 3, 17, 0), // September 3rd, 2023, 5:00 PM
    //     patient: {
    //       name: 'Emily Wilson',
    //       contact: 'emily.wilson@example.com',
    //       dob: '1992-07-20',
    //       dateTime: '2023-09-03 4:00 PM',
    //     },
    //   },
      // Add more appointment objects...
    // ];

    useEffect(() => {
      const getAppointments = async () => {
        try {
          const appointmentsData = await fetchData('Appointments');
          const storedUsername = localStorage.getItem('username');
          alert(storedUsername);
    
          if (storedUsername) {
            const filteredAppointments = appointmentsData
              .filter((appointment) => appointment.selectedDoctor === storedUsername)
              .map((appointment) => {
                const start = new Date(appointment.selectedDate + ' ' + appointment.selectedTime);
                const end = new Date(start.getTime() + 25 * 60000); // Add 25 minutes to start time
    
                return {
                  id: appointment.appointmentId,
                  title: appointment.appointmentStatus,
                  start: start,
                  end: end,
                  patient: {
                    name: appointment.fullName,
                    contact: appointment.contact,
                    dob: appointment.dob,
                    dateTime: appointment.selectedDate + ' ' + appointment.selectedTime,
                  },
                };
              });
    
            setAppointmentsData(filteredAppointments);
            console.log('Filtered Data:', filteredAppointments);
          }
        } catch (error) {
          console.error('Error fetching appointments data:', error);
        }
      };
    
      getAppointments();
    }, []);
    
    
  
    // Event handler for appointment selection
    const handleAppointmentSelect = (event) => {
      const selectedEvent = appointmentsData.find((appointment) => appointment.id === event.id);
      setSelectedAppointment(selectedEvent);
    };
  
    // Event handler for clearing the selected appointment
    const handleClearAppointment = () => {
      setSelectedAppointment(null);
    };
  
    return (
      <div>
        {selectedAppointment ? (
          <div>
            <PatientDetails
              name={selectedAppointment.patient.name}
              contact={selectedAppointment.patient.contact}
              dob={selectedAppointment.patient.dob}
              dateTime={selectedAppointment.patient.dateTime}
            />
            <button onClick={handleClearAppointment}>Clear Appointment</button>
          </div>
        ) : (
          <DoctorCalendar appointments={appointmentsData} onAppointmentSelect={handleAppointmentSelect} />
        )}
      </div>
    );
  };

export default DocCal;
