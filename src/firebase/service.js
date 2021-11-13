import { collection, addDoc, doc, getFirestore, deleteDoc, updateDoc } from "firebase/firestore";

const db = getFirestore();

export const addDocument = async (collectionParam, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionParam), data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export const deleteDocumentById = async (collectionParam, id) => {
  try {
    await deleteDoc(doc(db, collectionParam, id));
    console.log("delete id: ", id);
  } catch (e) {
    console.error("Error delete: ", e);
  }
}

export const editDocumentById = async (collectionParam, id, data) => {
  try {
    await updateDoc(doc(db, collectionParam, id), data);
    console.log("update doc: ", id);
  } catch (e) {
    console.error("Error update: ", e);
  }
}