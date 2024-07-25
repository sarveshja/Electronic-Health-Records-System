import './Main.css';
import React, { useState } from 'react';
import AddUserPage from './AddUser';
import NavBar from './NavBar';
import StackholdersList from './StackholdersList';
import NewAppointment from './NewAppointment';
import AppointmentList from './AppointmentList';

function Main() {
    const [chosenpage, setChosenPage] = useState('');

  const handleAddUserClick = () => {
    setChosenPage('adduser');
    console.log(chosenpage);
  };

  const handleChosenPage = (value) => {
    setChosenPage(value);
  };

  const handleLogoutClick = () =>{
    const confirmed = window.confirm('Are you sure you want to log out?');
  if (confirmed) {
    localStorage.removeItem('user_id');
    window.location.reload();
  } 
  }

    return (
        <div>
            <div className='headersection'>
              <button className='btn_logout' onClick={handleLogoutClick}>Logout</button>
            <button onClick={handleAddUserClick} className='btn_add_user'>Add User</button>
            </div>
            <div className='navbar'><NavBar onVariableChange={handleChosenPage}></NavBar></div>
            <div>{chosenpage == "adduser" && (
                <AddUserPage></AddUserPage>
             )}
             </div>
             <div>{(chosenpage === "patient" || chosenpage === "doctor" || chosenpage === "nurse") && (
    <StackholdersList des={chosenpage}></StackholdersList>
)}</div>
            <div>{chosenpage === "new appointment" && (
    <NewAppointment />
)}</div>
            <div>{chosenpage === "all appointments" && (
    <AppointmentList />
)}</div>

             <h1>{chosenpage}</h1>
        </div>
    )
}

export default Main;