import React, { useState } from 'react';
import './componentsstyle.css';
import healthrec from '../photos/patient.png';
import lab from '../photos/lab.png';
import prescription from '../photos/prescription.png';
import PatientHealthRecords from './PatientHealthRecord';

const PatientCarePage = () => {
  const [activeTab, setActiveTab] = useState('health-records');

  const openTab = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div>
    <p></p>
    <div className="button-container">
      <button className="subbtn" onClick={() => openTab('health-records')}>
        <img src={healthrec} alt="Health Records" id='subimg'/>
        <div>
        Health Records
        </div>
      </button>
      <button className="subbtn" onClick={() => openTab('lab-reports')}>
        <img src={lab} alt="Lab Reports"  id='subimg' />
        <div>
        Lab Reports
        </div>
      </button>
      <button className="subbtn" onClick={() => openTab('prescription')}>
        <img src={prescription} alt="Prescription"  id='subimg' />
        <div>
        Prescription
        </div>
      </button>
    </div>
  

      {/* Health Records Tab */}
      {activeTab === 'health-records' && (
        <div>
         <PatientHealthRecords />
        </div> 
      )}

      {/* Lab Reports Tab */}
      {activeTab === 'lab-reports' && (
        <div>
          <h3>Lab Reports</h3>
          {/* Add your content for Lab Reports */}
        </div>
      )}

      {/* Prescription Tab */}
      {activeTab === 'prescription' && (
        <div>
          <h3>Prescription</h3>
          {/* Add your content for Prescription */}
        </div>
      )}
    </div>
  );
};

export default PatientCarePage;
