import React, { useState } from 'react';
import Navbar from '../componentsnurse/Navbarnur';
import Home from './Home';
import VitalSigns from './VitalSigns';
import Appointment from './Appointment';
import LabReport from './LabReport';
import Prescription from './Prescription';
import TopRow from './toprownur';
import ProfileNur from './ProfileNur';

const Nursee = () => {
  const [activePage, setActivePage] = useState('appointment');
  const [patientname,setName]=useState('');
  const [docId,setDocId]= useState(null);
  const [appointmentId,setappointmentId] = useState('');

  const handlePageChange = (page) => {
    setActivePage(page);
    
  };

  const handleVitalSignsClick = () => {
    handlePageChange('vitalSigns');
  };

  const handleAppointmentClick = () => {
    handlePageChange('appointment');
  };

  const handleLabReportClick = (id) => {
    setappointmentId(id);
    handlePageChange('labReport');
  };

  const handlePrescriptionClick = () => {
    handlePageChange('prescription');
  };

  const handleProfileClick = () => {
    handlePageChange('profile');
  };

  const handlePatient = (name)=>{
    setName(name);
    console.log(patientname);
  }
  const handleDocIdReceiver = (id)=>{
    setDocId(id);
  }

  const handleBack = ()=>{
    handlePageChange('prescription');
  }

  return (
    <div className="container">
       <TopRow onProfileClick={handleProfileClick} />
       <Navbar
          onHomeClick={() => handlePageChange('home')}
          onVitalSignsClick={handleVitalSignsClick}
          onAppointmentClick={handleAppointmentClick}
          onLabReportClick={handleLabReportClick}
          onPrescriptionClick={handlePrescriptionClick}
   
        />
        <div className="content-container">
          {activePage === 'home' ? (
            <Home />
          ) : activePage === 'vitalSigns' ? (
            <VitalSigns patientName={patientname} id={docId}/>
          ) : activePage === 'appointment' ? (
            <Appointment onGoToVitalScience={handlePageChange} onPatientSend={handlePatient} onDocIdSend={handleDocIdReceiver}/>
          ) : activePage === 'labReport' ? (
            <LabReport appointmentid={appointmentId} onBackClick={handleBack}/>
          ) : activePage === 'prescription' ? (
            <Prescription onPrescriptionClick={handleLabReportClick}/>
          ) : activePage === 'profile' ? (
            <ProfileNur />  
          ) : null}
        </div>
      </div>
  
  );
};

export default Nursee;