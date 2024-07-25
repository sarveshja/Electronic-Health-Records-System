import React, { useState , useEffect } from 'react';
import Navbar from './components/Navbar';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';
import CentresOfExcellencePage from './components/CentresOfExcellencePage';
import PatientCarePage from './components/PatientCarePage';
import AppointmentPage from './components/AppointmentPage';
import BillsPage from './components/BillsPage';
import ContactUsPage from './components/ContactUsPage';
import TopRow from './components/toprow';
import ProfilePage from './components/ProfilePage';
import Cardiology from './Specialities/Cardiology';
import Cardiology1 from './Specialities/Cardiology1';
import { act } from 'react-dom/test-utils';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [activePage, setActivePage] = useState('');
  const [loggedInUserId, setLoggedInUserId] = useState('');

  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      setIsRegistered(true);
      // setIsLoggedIn(true);
      handleLogin();
    }
  }, []);

  const [beforeProfile,setBeforeProfile] = useState('');

  useEffect(() => {
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      setIsRegistered(true);
      handleLogin();
    }
  }, []);
  // const handleSubPageClick = (page) => {
  //   console.log(`Clicked on sub-page: ${page}`);
  //   // Handle the logic for sub-page click here
  //   setActivePage(page);
  // };

  const handleLogin = () => {
    // Perform authentication logic here
    setIsLoggedIn(true);
    setActivePage('home');
  };

  const handleRegister = () => {
    // Perform registration logic here
    setIsRegistered(true);
    setActivePage('home');
  };

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  const handleCentresOfExcellenceClick = () => {
    handlePageChange('centresOfExcellence');
  };

  const handlePatientCareClick = () => {
    handlePageChange('patientCare');
  };

  const handleAppointmentClick = () => {
    handlePageChange('appointment');
  };

  const handleBillsClick = () => {
    handlePageChange('bills');
  };

  const handleContactUsClick = () => {
    handlePageChange('contactUs');
  };

  const handleSpecialization = (name) => {
    setActivePage(name);

  };

  const handleProfileClick = () =>{
    if (activePage != 'profile') {
      setBeforeProfile(activePage);
    }
    setActivePage(activePage == 'profile' ? beforeProfile : 'profile');
    }
 

  return (
    <div>
      <TopRow onProfileClick={handleProfileClick} />
      {activePage === 'profile' ? (
        <ProfilePage />
      ) : (
        <>
          <Navbar
            onSubPageClick={handleSpecialization}
            onHomeClick={() => handlePageChange('home')}
            onCentresOfExcellenceClick={handleCentresOfExcellenceClick}
            onPatientCareClick={handlePatientCareClick}
            onAppointmentClick={handleAppointmentClick}
            onBillsClick={handleBillsClick}
            onContactUsClick={handleContactUsClick}
          />
          {isRegistered ? (
            isLoggedIn ? (
              activePage === 'home' ? (
                <HomePage />
              ) : activePage === 'centresOfExcellence' ? (
                <CentresOfExcellencePage onSubPageClick={handleSpecialization} />
              ) : activePage === 'patientCare' ? (
                <PatientCarePage />
              ) : activePage === 'appointment' ? (
                <AppointmentPage />
              ) : activePage === 'bills' ? (
                <BillsPage />
              ) : activePage === 'contactUs' ? (
                <ContactUsPage />
              ) : (activePage === 'cardiology' || activePage == 'neurology' ||
               activePage == 'oncology' || activePage == 'gynecology' || activePage == 'urology' 
               || activePage == 'pulmonology' || activePage == 'rheumatology' ||
                activePage == 'ophthalmology' || activePage == 'radiology' ||
              activePage == 'dermatology'|| activePage == 'nephrology' || activePage == 'neurosurgery' 
              || activePage == 'plasticsurgery'||  activePage == 'gastroenterology' ||  activePage == 'neonatology'
              || activePage == 'dentistry'||  activePage == 'endocrinology' ||  activePage == 'vascularsurgery'
              || activePage == 'pediatrics'||  activePage == 'ent'||  activePage == 'orthopaedic' ||  activePage == 'psychiatry'
              ) ? (
                <Cardiology speciality={activePage} />
              ) : activePage === 'cardiology1' ? (
                <Cardiology1 />
              ) : null
            ) : (
              <LoginPage onLogin={handleLogin} />
            )
          ) : (
            <RegisterPage onRegister={handleRegister} />
          )}
        </>
      )}
    </div>
  );
};

export default App;
