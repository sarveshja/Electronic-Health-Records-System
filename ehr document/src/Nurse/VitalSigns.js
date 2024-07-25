import React, { useState } from 'react';
import './Vitialsigns.css';
// import { updateDataVitalSigns } from '../FetchData';
// import { UpdateData } from 'firebase/firestore';
import { updateData } from '../FetchData';

function PatientVitalSigns(props) {
  const [name, setName] = useState(props.patientName);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [temperature, setTemperature] = useState('');
  const [bloodPressure, setBloodPressure] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [pulseRate, setPulseRate] = useState('');
  const [vitalSigns, setVitalSigns] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new vital sign object
    const updatedAppointment = {
      ...props.id,
      appointmentStatus: 'vitalSignsFinished',
      date_vitalsigns : date,
      time_vitalsigns : time,
      temperature_vital_signs : temperature,
      bloodpressure_vitalsigns : bloodPressure,
      weight_vitalsigns : weight,
      height_vital_signs : height,
      pulserate_vitalsigns : pulseRate
    };
    // alert(props.id.id);

    // Update the appointment with the new vital signs
    updateData('Appointments', props.id.id, updatedAppointment);

    // Add the new vital sign to the list
    // setVitalSigns([...vitalSigns, newVitalSign]);

    // Reset form fields
    setName('');
    setDate('');
    setTime('');
    setTemperature('');
    setBloodPressure('');
    setWeight('');
    setHeight('');
    setPulseRate('');
  };

  return (
    <div className="patient-vital-signs">
      <h2>Patient Vital Signs</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="time">Time:</label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="temperature">Temperature:</label>
          <input
            type="text"
            id="temperature"
            value={temperature}
            onChange={(e) => setTemperature(e.target.value)}
            required
          />
          <span>°C</span>
        </div>

        <div className="form-group">
          <label htmlFor="blood-pressure">Blood Pressure:</label>
          <input
            type="text"
            id="blood-pressure"
            value={bloodPressure}
            onChange={(e) => setBloodPressure(e.target.value)}
            required
          />
          <span>mmHg</span>
        </div>

        <div className="form-group">
          <label htmlFor="weight">Weight:</label>
          <input
            type="text"
            id="weight"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
          />
          <span>kg</span>
        </div>

        <div className="form-group">
          <label htmlFor="height">Height:</label>
          <input
            type="text"
            id="height"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            required
          />
          <span>m</span>
        </div>

        <div className="form-group">
          <label htmlFor="pulse-rate">Pulse Rate:</label>
          <input
            type="text"
            id="pulse-rate"
            value={pulseRate}
            onChange={(e) => setPulseRate(e.target.value)}
            required
          />
          <span>bpm</span>
        </div>

        <input type="submit" value="Add Vital Sign" className="submit-btn" />
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Time</th>
            <th>Temperature</th>
            <th>Blood Pressure</th>
            <th>Weight</th>
            <th>Height</th>
            <th>Pulse Rate</th>
          </tr>
        </thead>
        <tbody>
          {vitalSigns.map((vitalSign, index) => (
            <tr key={index}>
              <td>{vitalSign.name}</td>
              <td>{vitalSign.date}</td>
              <td>{vitalSign.time}</td>
              <td>{vitalSign.temperature}°C</td>
              <td>{vitalSign.bloodPressure}mmHg</td>
              <td>{vitalSign.weight}kg</td>
              <td>{vitalSign.height}m</td>
              <td>{vitalSign.pulseRate}bpm</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PatientVitalSigns;
