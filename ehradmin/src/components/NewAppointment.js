import { useEffect, useState } from "react";
import AppoinmentImage from "./AppointmentImage";
import './NewAppointment.css';
import { fetchData } from "../FetchData";
import { firestore } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';

function NewAppointment() {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [bookingStatus, setBookingStatus] = useState('');
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [appointmentList, setAppointmentList] = useState([]);
  const [appointmentId, setAppointmentID] = useState('');
  const [doctorAvailabilityData, setDoctorAvailabilityData] = useState([]);
  const [filteredDoctorAvailability, setFilteredDoctorAvailability] = useState([]);
  const appointmentStatus = 'Confirmed';
  const timeSlots1 = ['8:00 am', '8:30 am', '9:00 am', '9:30 am', '10:00 am', '10:30 am', '11:00 am', '12:00 pm', '12:30 pm', '1:00 pm', '1:30 pm'];
  const timeSlots2 = ['4:00 pm', '4:30 pm', '5:00 pm', '5:30 pm', '6:00 pm', '6:30 pm', '8:00 pm', '8:30 pm', '9:00 pm', '9:30 pm'];
  const [filteredAppointments,setFilteredAppointments] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const usersData = await fetchData('Users');
      setData(usersData);
    };
    getUsers();
  }, []);

  useEffect(() => {
    const getDoctorAvailability = async () => {
      const usersData = await fetchData('DoctorsAvailability');
      setDoctorAvailabilityData(usersData);
    };
    getDoctorAvailability();
  }, []);

  useEffect(() => {
    const getAppointments = async () => {
      const usersData = await fetchData('Appointments');
      setAppointmentList(usersData);
    };
    getAppointments();
  }, []);

  useEffect(() => {
    const filteredAvailability = doctorAvailabilityData.filter(
      (availability) =>
        availability.username === selectedDoctor &&
        availability.selectedDate === selectedDate
    );
    setFilteredDoctorAvailability(filteredAvailability);
  }, [selectedDoctor, selectedDate, doctorAvailabilityData]);

  useEffect(() => {
    const filteredAppointments = appointmentList.filter(
      (appointment) => appointment.selectedDate === selectedDate && appointment.selectedDoctor === selectedDoctor
    );
    setFilteredAppointments(filteredAppointments);
  }, [selectedDate, appointmentList]);

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      // Prepare the data to be saved in Firestore
      const appointmentData = {
        fullName,
        contact,
        email,
        selectedDate,
        selectedTime,
        reason,
        selectedDoctor,
        speciality,
        appointmentStatus,
        appointmentId,
      };

      // Add the appointment data to the "Appointments" collection in Firestore
      const docRef = await addDoc(collection(firestore, 'Appointments'), appointmentData);
      console.log('Appointment added with ID:', docRef.id);

      // Clear the form after successful submission
      setFullName('');
      setContact('');
      setEmail('');
      setSelectedDate('');
      setSelectedTime('');
      setReason('');
      setSelectedDoctor('');
      setSpeciality('');
      setBookingStatus('Appointment submitted successfully!');
    } catch (error) {
      console.error('Error adding appointment:', error);
      setBookingStatus('Failed to submit appointment. Please try again.');
    }
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1); // Add 1 day to the current date

    const selectedDateTime = new Date(selectedDate).getTime();
    const tomorrowTime = tomorrow.getTime();

    if (selectedDateTime >= tomorrowTime) {
      setSelectedDate(selectedDate);
    } else {
      // Date is not valid, handle it as per your requirement (e.g., show an error message)
    }
  };

  const handleTimeSlotClick = (slot) => {
    console.log("Time slot clicked:", slot);
    setSelectedTime(slot);
  };

  const handleDoctorChange = (e) => {
    setSelectedDoctor(e.target.value);  
    setAppointmentID('A' + (appointmentList.length +1)); 
  };

  const filteredData = data.filter((item) => item.designation === 'doctor' && item.speciality === speciality);
  const doctorOptions = filteredData.map((doctor) => (
    <option key={doctor.u_name} value={doctor.u_name}>
      {doctor.u_name}
    </option>
  ));

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
    'Plastic Surgery',
    'Neonatology',
    'Endocrinology'
  ];

  useEffect(() => {
    if (filteredDoctorAvailability.length > 0) {
      const selectedSlot = filteredDoctorAvailability[0]['selectedSlot'];
      if (selectedSlot === '8am to 2pm') {
        setAvailableTimeSlots(timeSlots1);
      } else if (selectedSlot === '4pm to 10pm') {
        setAvailableTimeSlots(timeSlots2);
      } else {
        setAvailableTimeSlots([]);
      }
    } else {
      setAvailableTimeSlots([]);
    }
  }, [filteredDoctorAvailability]);

  return (
    <div>
      <AppoinmentImage />
      <div className="box">
        <h1>Appointment</h1>
        <form onSubmit={handleSave}>
          {bookingStatus && <p>{bookingStatus}</p>}
          <div className="form-group app">
            <label htmlFor="fullname">Patient Name:</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact">Contact Number:</label>
            <input
              type="tel"
              id="contact"
              name="contact"
              required
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Appointment Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              required
              value={selectedDate}
              onChange={handleDateChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="time">Appointment Time:</label>
            <div className="time-slots">
              {availableTimeSlots.map((slot) => (
                <button
                  key={slot}
                  className={selectedTime === slot ? "selected" : ""}
                  onClick={() => handleTimeSlotClick(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="reason">Reason for Appointment:</label>
            <textarea
              id="reason"
              name="reason"
              required
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="doctor">Select Doctor:</label>
            <select
              id="doctor"
              name="doctor"
              required
              value={selectedDoctor}
              onChange={handleDoctorChange}
            >
              <option value="">Select a doctor</option>
              {doctorOptions}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="speciality">Speciality:</label>
            <select
              id="speciality"
              name="speciality"
              required
              value={speciality}
              onChange={(e) => setSpeciality(e.target.value)}
            >
              <option value="">Select a speciality</option>
              {specialities.map((speciality) => (
                <option key={speciality} value={speciality}>
                  {speciality}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewAppointment;
