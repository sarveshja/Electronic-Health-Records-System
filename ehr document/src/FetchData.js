import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { firestore } from './firebase';

export const fetchData = async (tablename) => {
  try {
    const querySnapshot = await getDocs(collection(firestore, tablename));
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Include the document ID as a property
      ...doc.data(),
    }));
    return documents;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export const updateData = async (tablename, docId, updatedData) => {
  try {
    const appointmentRef = doc(firestore, tablename, docId);
    await updateDoc(appointmentRef, updatedData);
    console.log('Appointment updated successfully:', docId);
  } catch (error) {
    console.error('Error updating appointment:', error);
  }
};

// export const updateDataVitalSigns = async (tablename, docId, updatedData) => {
//   try {
//     const appointmentRef = doc(firestore, tablename, docId);
//     await updateDoc(appointmentRef, {
//       ...updatedData,
//       vitalSigns: arrayUnion(updatedData.vitalSigns)
//     });
//     console.log('Appointment updated successfully:', docId);
//   } catch (error) {
//     console.error('Error updating appointment:', error);
//   }
// };
