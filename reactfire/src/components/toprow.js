import React from 'react';
import logo from './logoo.png';
// import profile from './profile.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

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
     {/* <div class="srch">
  <input type="text" name="text" class="srchinput" placeholder="search..."/>
  <span class="icon"> 
    <svg width="19px" height="19px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path opacity="1" d="M14 5H20" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path opacity="1" d="M14 8H17" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2" stroke="#000" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"></path> <path opacity="1" d="M22 22L20 20" stroke="#000" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
  </span>
</div> */}

      {/* Profile */}
      <div className="profile">
        <button className="profile-button" onClick={profileClick}><FontAwesomeIcon icon={faUser} /></button>
      </div>
    </div>
  );
};

export default TopRow;