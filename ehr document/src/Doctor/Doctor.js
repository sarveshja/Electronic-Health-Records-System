import { useState, useEffect } from 'react';
import Navbar from '../componentsdoc/Navbardoc';
import Home from './Home';
import PatientList from './PatientList';
import Prescription from './Prescription';
import TopRow from './toprowdoc';
import DocCal from './DocCal';
import Profiledoc from './Profiledoc';
import { fetchData } from '../FetchData';

const Doctor = () => {
  const [activePage, setActivePage] = useState('home');
  const [loggedInUser, setLoggedInUser] = useState('');
  const [data, setData] = useState([]);
  const [appointmentsData,setAppointment] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem('user_id');
    setLoggedInUser(storedData);
  }, []);

  
  

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const handlePatientListClick = () => {
    handlePageChange('patientList');
  };

  const handleCalendarClick = () => {
    handlePageChange('calendar');
  };

  const handlePrescriptionClick = () => {
    handlePageChange('prescription');
  };

  const handleProfileClick = () => {
    handlePageChange('profiledoc');
  };

  const handleSendAppointment = (appointment) =>{
    setAppointment(appointment);
    handlePageChange('prescription');

  }

  return (
    <div>
      <TopRow onProfileClick={handleProfileClick} />
      <Navbar
        onHomeClick={() => handlePageChange('home')}
        onPatientListClick={handlePatientListClick}
        onCalendarClick={handleCalendarClick}
        onPrescriptionClick={handlePrescriptionClick}
      />
      <div className="content-container">
        {activePage === 'home' ? (
          <Home onSendAppointment={handleSendAppointment}/>
        ) : activePage === 'patientList' ? (
          <PatientList />
        ) : activePage === 'calendar' ? (
          <DocCal />
        ) : activePage === 'prescription' ? (
          <Prescription appointment={appointmentsData}/>
        ) : activePage === 'profiledoc' ? (
          <Profiledoc />
        ) : null}
      </div>
    </div>
  );
};

export default Doctor;
