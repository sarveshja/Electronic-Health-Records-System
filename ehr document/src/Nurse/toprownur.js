import React from 'react';
import logo from './logoo.png';
// import profile from './profile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './toprownur.css'

const TopRow = ({onProfileClick}) => { 

  const profileClick = ()=>{
    onProfileClick();
  }

  return (
    <div className="top-row">
      {/* Logo */}
      <div className="logo">
        <img id="mainlogo" src={logo} alt="Logo" />
      </div>

     {/* Search Bar */}
<div className="search-bar">
  <input type="text"  placeholder="Search..." />
  <button className="search-button"><FontAwesomeIcon icon={faSearch} /></button>
</div>

      {/* Profile */}
      <div className="profile">
        <button className="profile-button" onClick={profileClick}><FontAwesomeIcon icon={faUser} /></button>
      </div>
    </div>
  );
};

export default TopRow;