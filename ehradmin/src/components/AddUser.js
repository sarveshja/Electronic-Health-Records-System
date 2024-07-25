import React, { useEffect, useState } from 'react';
import { firestore } from '../firebase';
import { addDoc, collection } from '@firebase/firestore';
import { fetchData } from '../FetchData';
import './AddUser.css';

const UserForm = () => {
  const [username, setUsername] = useState('');
  const [emailid, setEmail] = useState('');
  const [passwordd, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [dobd, setDob] = useState('');
  const [genderd, setGender] = useState('');
  const [designationd, setDesignation] = useState('');
  const [speciality, setSpeciality] = useState('');
  const ref = collection(firestore, 'Users');

  const [data, setData] = useState([]);

  function generateRandomNumber(des, data) {
    var char;
    if (des === 'patient') {
      char = 'P';
    } else if (des === 'nurse') {
      char = 'N';
    } else if (des === 'doctor') {
      char = 'D';
    }
    var count = 0;
    for (let i = 0; i < data.length; i++) {
      if (data[i]['designation'] === des) {
        count++;
      }
    }
    count++;

    console.log(count);

    return char + count;
  }

  useEffect(() => {
    const getUsers = async () => {
      const userData = await fetchData('Users');
      setData(userData);
    };

    getUsers();
  }, []);

  const handlePhone = (event) => {
    const { value } = event.target;
    // Remove non-numeric characters using a regular expression
    const sanitizedValue = value.replace(/\D/g, '');
    setPhone(sanitizedValue);
  };

  const handlePassword = (event) => {
    const { value } = event.target;

    // Apply regex pattern to validate the input value
    const isValid = /^[a-zA-Z0-9]*$/.test(value);

    if (isValid) {
      setPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let userdata = {
      user_id: generateRandomNumber(designationd, data),
      u_name: username,
      email: emailid,
      password: passwordd,
      phone_no: phone,
      gender: genderd,
      dob: dobd,
      designation: designationd,
      speciality: speciality,
      access: 'true',
    };

    try {
      addDoc(ref, userdata);
      alert(
        'User Added sucessfully! User ID: ' +
          userdata.user_id +
          ' Password: ' +
          passwordd
      );
    } catch (e) {
      alert('User not added');
      console.log(e);
    }
    resetform();
  };

  const resetform = () => {
    setUsername('');
    setEmail('');
    setPassword('');
    setPhone('');
    setDob('');
    setGender('');
    setDesignation('');
    setSpeciality('');
  };

  const specialities = [
    'Cardiology',
    'Neurology',
    'Orthopaedic',
    'Dentistry',
    'Vascular Surgery',
    'Oncology',
    'Gynecology',
    'Dermatology',
    'Psychiatry',
    'ENT',
    'Ophthalmology',
    'Urology',
    'Nephrology',
    'Pediatrics',
    'Pulmonology',
    'Rheumatology',
    'Neurosurgery',
    'Gastroenterology',
    'Radiology',
    'Plastic surgery',
    'Neonatology',
    'Endocrinology',
  ];

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          placeholder="Enter username"
        />
      </label>
      <br />

      <label>
        Email:
        <input
          type="email"
          value={emailid}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter email"
        />
      </label>
      <br />

      <label>
        Password:
        <input
          type="password"
          value={passwordd}
          onChange={handlePassword}
          required
          minLength={6}
          maxLength={16}
          placeholder="Enter password (only alphanumeric)"
        />
      </label>
      <br />

      <label>
        Phone Number:
        <input
          type="text"
          value={phone}
          onChange={handlePhone}
          required
          maxLength={10}
          minLength={10}
          placeholder="Enter phone number"
        />
      </label>
      <br />

      <label>
        Date of Birth:
        <input
          type="date"
          value={dobd}
          onChange={(e) => setDob(e.target.value)}
          required
        />
      </label>
      <br />

      <label>
        Gender:
        <label>
          <input
            type="radio"
            name="gender"
            value="male"
            checked={genderd === 'male'}
            onChange={(e) => setGender(e.target.value)}
            required
          />{' '}
          Male
        </label>
        <label>
          <input
            type="radio"
            name="gender"
            value="female"
            checked={genderd === 'female'}
            onChange={(e) => setGender(e.target.value)}
            required
          />{' '}
          Female
        </label>
      </label>
      <br />

      <label>
        Designation:
        <select
          value={designationd}
          onChange={(e) => setDesignation(e.target.value)}
          required
        >
          <option value="">Select Designation</option>
          <option value="patient">Patient</option>
          <option value="nurse">Nurse</option>
          <option value="doctor">Doctor</option>
        </select>
      </label>
      <br />

      <label>
        Speciality:
        <select
          value={speciality}
          onChange={(e) => setSpeciality(e.target.value)}
          required
        >
          <option value="">Select Speciality</option>
          {specialities.map((speciality) => (
            <option key={speciality} value={speciality}>
              {speciality}
            </option>
          ))}
        </select>
      </label>
      <br />

      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
