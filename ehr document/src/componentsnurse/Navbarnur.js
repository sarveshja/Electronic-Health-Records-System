import React, { useState } from 'react';
import './navbarnur.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ onHomeClick, onVitalSignsClick, onAppointmentClick, onLabReportClick, onPrescriptionClick }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navbar ${isMenuOpen ? 'open' : ''}`}>
      <div className="menu-toggle" onClick={handleMenuToggle}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <ul className={`nav-items ${isMenuOpen ? 'open' : ''}`}>
        
        <li className={`dropdown ${isDropdownOpen ? 'open' : ''}`}>
          {/* <button className="nav-btn" onClick={handleDropdownToggle}> */}
          {/* <FontAwesomeIcon icon={faBars} /></button> */}
          <ul className="dropdown-menu">
            <li>
               {/* <button className="nav-btn" onClick={onHomeClick}>Home</button> */}
            </li>
            <li>
              {/* <button className="dropdown-btn" onClick={onVitalSignsClick}>VitalSigns</button> */}
            </li>
            <li>
              <button className="dropdown-btn" onClick={onAppointmentClick}>Appointment</button>
            </li>
            <li>
              {/* <button className="dropdown-btn" onClick={onLabReportClick}>LabReport</button> */}
            </li>
            <li>
              <button className="dropdown-btn" onClick={onPrescriptionClick}>Prescription</button>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
