import { fetchData } from "../FetchData";
import React, { useEffect, useState } from "react";
// import { collection, doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import { collection, doc, setDoc, updateDoc } from "firebase/firestore";


const dosages = ["2.5ml", "5ml", "7.5ml", "10ml"];
const daysOptions = Array.from({ length: 90 }, (_, index) => index + 1);

function Prescription(props) {
  const [drugsData, setDrugsData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMedication, setSelectedMedication] = useState(null);
  const [addedDrugs, setAddedDrugs] = useState([]);
  const [submitStatus, setSubmitStatus] = useState("");

  useEffect(() => {
    const fetchDrugsData = async () => {
      const data = await fetchData("Drugs");
      setDrugsData(data);
    };

    fetchDrugsData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddMedication = (medication) => {
    const initialFrequency = {
      morning: false,
      afternoon: false,
      night: false,
    };
    const initialDosage = dosages[0];
    const initialDays = 1;

    const newMedication = {
      ...medication,
      frequency: initialFrequency,
      dosage: initialDosage,
      days: initialDays,
    };

    setAddedDrugs([...addedDrugs, newMedication]);
  };

  const handleAddToTable = () => {
    if (selectedMedication) {
      setAddedDrugs([...addedDrugs, selectedMedication]);
      setSelectedMedication(null);
    }
  };

  const handleRemoveFromTable = (medication) => {
    const updatedDrugs = addedDrugs.filter(
      (drug) => drug["Name"] !== medication["Name"]
    );
    setAddedDrugs(updatedDrugs);
  };

  const handleFrequencyChange = (medication, timeOfDay) => {
    const updatedDrugs = addedDrugs.map((drug) => {
      if (drug["Name"] === medication["Name"]) {
        return {
          ...drug,
          frequency: {
            ...drug.frequency,
            [timeOfDay]: !drug.frequency[timeOfDay],
          },
        };
      }
      return drug;
    });
    setAddedDrugs(updatedDrugs);
  };

  const handleDosageChange = (medication, value) => {
    const updatedDrugs = addedDrugs.map((drug) => {
      if (drug["Name"] === medication["Name"]) {
        return {
          ...drug,
          dosage: value,
        };
      }
      return drug;
    });
    setAddedDrugs(updatedDrugs);
  };

  const handleDaysChange = (medication, value) => {
    const updatedDrugs = addedDrugs.map((drug) => {
      if (drug["Name"] === medication["Name"]) {
        return {
          ...drug,
          days: value,
        };
      }
      return drug;
    });
    setAddedDrugs(updatedDrugs);
  };

  const handleSubmit = async () => {
    try {
      const prescriptionCollectionRef = collection(firestore, "Prescription");
      const appointmentId = props.appointment.appointmentId; // Update to use the appointmentId from props
      const prescriptionDocRef = doc(prescriptionCollectionRef, appointmentId);
  
      // Update the document with the added medication information
      await setDoc(prescriptionDocRef, { addedDrugs, appointmentId, }); // Include appointmentId in the prescription data
  
      // Update the appointment status in the "Appointments" collection
      const appointmentsCollectionRef = collection(firestore, "Appointments");
    const appointmentRef = doc(appointmentsCollectionRef, props.appointment.id);
    await updateDoc(appointmentRef, {
      appointmentStatus: "Prescription given",
    });
  
      setSubmitStatus("Medication added successfully");
    } catch (error) {
      console.error("Error adding medication to Firebase:", error);
      setSubmitStatus("Failed to add medication");
    }
  };
  
  

  const filteredDrugsData = drugsData.filter((drug) =>
    drug["Name"].toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: "1" }}>
        <h1>{props.selectedDoctor}</h1>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search medication"
        />

        {filteredDrugsData.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Medication</th>
                <th>Manufacturer</th>
                <th>Add</th>
              </tr>
            </thead>
            <tbody>
              {filteredDrugsData.map((drug, index) => (
                <tr key={index}>
                  <td>{drug["Name"]}</td>
                  <td>{drug["Manufacturer"]}</td>
                  <td>
                    <button onClick={() => handleAddMedication(drug)}>
                      Add
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No medications found.</p>
        )}
      </div>

      <div style={{ flex: "1" }}>
        <h2>Added Medications</h2>
        {addedDrugs.length > 0 ? (
          <div>
            <table>
              <thead>
                <tr>
                  <th>Medication</th>
                  <th>Manufacturer</th>
                  <th>Frequency</th>
                  <th>Dosage</th>
                  <th>No of Days</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {addedDrugs.map((drug, index) => (
                  <tr key={index}>
                    <td>{drug["Name"]}</td>
                    <td>{drug["Manufacturer"]}</td>
                    <td>
                      <div>
                        <label>
                          <input
                            type="checkbox"
                            checked={drug.frequency.morning}
                            onChange={() =>
                              handleFrequencyChange(drug, "morning")
                            }
                          />
                          Morning
                        </label>
                        <br />
                        <label>
                          <input
                            type="checkbox"
                            checked={drug.frequency.afternoon}
                            onChange={() =>
                              handleFrequencyChange(drug, "afternoon")
                            }
                          />
                          Afternoon
                        </label>
                        <br />
                        <label>
                          <input
                            type="checkbox"
                            checked={drug.frequency.night}
                            onChange={() =>
                              handleFrequencyChange(drug, "night")
                            }
                          />
                          Night
                        </label>
                      </div>
                    </td>
                    <td>
                      <select
                        value={drug.dosage}
                        onChange={(e) =>
                          handleDosageChange(drug, e.target.value)
                        }
                      >
                        <option value="">Select Dosage</option>
                        {dosages.map((dosage, index) => (
                          <option key={index} value={dosage}>
                            {dosage}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <select
                        value={drug.days}
                        onChange={(e) =>
                          handleDaysChange(drug, parseInt(e.target.value))
                        }
                      >
                        {daysOptions.map((days, index) => (
                          <option key={index} value={days}>
                            {days}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <button onClick={() => handleRemoveFromTable(drug)}>
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No medications added.</p>
        )}
      </div>
      {/* <button onClick={handleAddToTable}>Add Selected Medication</button> */}
      <button onClick={handleSubmit}>Submit</button>
      {submitStatus && <p>{submitStatus}</p>}
    </div>
  );
}

export default Prescription;
