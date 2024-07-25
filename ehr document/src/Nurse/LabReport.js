import React, { useEffect, useState } from "react";
import { collection, getDocs, where } from "firebase/firestore";
import { firestore } from "../firebase";

function PrescriptionTable({onBackClick , appointmentid}) {
  const [prescriptionData, setPrescriptionData] = useState([]);

  useEffect(() => {
    const fetchPrescriptionData = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(firestore, "Prescription"),
          where("appointmentId", "==", appointmentid)
        );
        const documents = querySnapshot.docs.map((doc) => doc.data());
        if (documents.length > 0) {
          const addedDrugs = documents[0].addedDrugs || [];
          setPrescriptionData(addedDrugs);
        } else {
          setPrescriptionData([]);
        }
      } catch (error) {
        console.error("Error fetching prescription data:", error);
        setPrescriptionData([]);
      }
    };

    fetchPrescriptionData();
  }, [appointmentid]);

  console.log("prescriptionData:", prescriptionData);

  return (
    <div>
        <button onClick={onBackClick}>Back</button>
      {prescriptionData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Manufacturer</th>
              <th>Dosage</th>
              <th>Days</th>
              <th>Frequency</th>
            </tr>
          </thead>
          <tbody>
            {prescriptionData.map((prescription, index) => (
              <tr key={index}>
                <td>{prescription["Name"]}</td>
                <td>{prescription["Manufacturer"]}</td>
                <td>{prescription["dosage"]}</td>
                <td>{prescription["days"]}</td>
                <td>
                  {prescription["frequency"] && (
                    <>
                      {prescription["frequency"]["morning"] && <span>Morning</span>}
                      {prescription["frequency"]["afternoon"] && <span> Afternoon</span>}
                      {prescription["frequency"]["night"] && <span> Night</span>}
                      {/* Display "None" if all frequency properties are false */}
                      {!prescription["frequency"]["morning"] &&
                        !prescription["frequency"]["afternoon"] &&
                        !prescription["frequency"]["night"] && <span>None</span>}
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No prescription data available.</p>
      )}
    </div>
  );
}

export default PrescriptionTable;
