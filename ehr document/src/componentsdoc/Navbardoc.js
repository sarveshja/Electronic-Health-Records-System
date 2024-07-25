import React from 'react';
import './navbardoc.css';

const Navbar = ({ onHomeClick,
   onCalendarClick,
    onPatientListClick, 
    onPrescriptionClick,
  
     }) => {
  return (
    <div>
    <nav>
      <ul>
      <li>
          <button className="dropbtn" onClick={onHomeClick}>Patient List</button>
        </li>
        <li >
          <button className="dropbtn" onClick={onCalendarClick}>Calendar</button>
        </li>
        <li >
            {/* <button className="dropbtn" onClick={onPatientListClick}>
              Patient List
            </button> */}
          </li>
        <li >
          {/* <button className="dropbtn" onClick={onPrescriptionClick}>Prescription</button> */}
        </li>

      </ul>
    </nav>
    </div>
  );
};

export default Navbar;
