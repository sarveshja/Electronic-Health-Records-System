import React, { useState } from 'react';
import './NavBar.css';

const NavBar = ({ onVariableChange }) => {
  const [isOpen, setIsOpen] = useState(false);


  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };



  const handlePageSelection = (name) => {
    onVariableChange(name);
  };

  return (
    <nav>
      <ul className={`navbar ${isOpen ? 'open' : ''}`}>
        <li><a href="#">Home</a></li>
        <li className="dropdown" onClick={handleDropdown}>
          <a href="#" onClick={()=>handlePageSelection('stackholders')}>StackHolders</a>
          <div className="dropdown-content">
            <a href="#" onClick={()=>handlePageSelection('patient')}>Patients</a>
            <a href="#" onClick={()=>handlePageSelection('doctor')}>Doctors</a>
            <a href="#" onClick={()=>handlePageSelection('nurse')}>Nurses</a>
          </div>
        </li>
        <li><a href="#">About</a></li>
        <li className="dropdown" onClick={handleDropdown}>
          <a href="#">Appointments</a>
          <div className="dropdown-content">
          <a href="#" onClick={()=>handlePageSelection('new appointment')}>New Appointment</a>
            <a href="#" onClick={()=>handlePageSelection('all appointments')}>Appointments List</a>
            
          </div>
        </li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  );
};

export default NavBar;
