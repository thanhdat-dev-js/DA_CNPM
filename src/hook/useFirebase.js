import { useState, useEffect } from 'react'
import { collection, getFirestore, query, where, onSnapshot } from "firebase/firestore";

export default function useFirebase(collectionParam, condition) {
  const [document, setDocument] = useState([]);
  const db = getFirestore();
  useEffect(() => {
    let collectionRef = collection(db, collectionParam);
    if (!condition) {
      if (!condition.compareValue || condition.compareValue.length)
        setDocument([]);
      return;
    }
    var q = [];
    try {
      q = query(collectionRef, where(condition.fieldName, condition.operator, condition.compareValue));
    } catch (error) {
      setDocument([]);
      // console.log(error);
      return;
    }
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const documents = [];
      querySnapshot.forEach(doc => {
        documents.push({
          ...doc.data(),
          id: doc.id
        })
      })
      documents.sort((item1, item2) => item1.createdAt - item2.createdAt);
      setDocument(documents);
    });
    return () => {
      unsubscribe();
    }
  }, [collectionParam, condition])
  return document;
}
