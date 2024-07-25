import './App.css';
import { useState } from 'react';
import Login from './Login';
import Doctor from './Doctor/Doctor';
import Nursee from './Nurse/Nursee';


function App() {
  const [designationSelected, setDesignationSelection] = useState('');
  const [isSelected, setIsSelected] = useState(false);

  const handleDesignation = (des) => {
    setDesignationSelection(des);
    console.log(designationSelected);
  }

  const handleChildValue = (value) => {
    setIsSelected(value);
  };
  

  return (
    <div className="container">
      <div className="button-container">
        {designationSelected === '' && (
          <div>
            <button onClick={() => handleDesignation("nurse")}>Nurse</button>
            <button onClick={() => handleDesignation("doctor")}>Doctor</button>
          </div>
        )}
      </div>
      
      
      {designationSelected !== '' && (
        <div className="login-container">
          <Login des={designationSelected} onLoginState={handleChildValue} />
        </div>
      )}

      {isSelected && designationSelected === "doctor" && (
        <div className="doctor-container">
          <Doctor />
        </div>
      )}

      {isSelected && designationSelected === "nurse" && (
        <div className="nurse-container">
          <Nursee/>
        </div>
      )}
    </div>
    
  );
}

export default App;
