import { collection, addDoc, getFirestore } from "firebase/firestore";

const db = getFirestore();

export const addDocument = async (collectionParam, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionParam), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
