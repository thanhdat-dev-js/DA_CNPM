import { useState, useEffect } from 'react'
import { collection, getFirestore, query, where, onSnapshot } from "firebase/firestore";

export default function useFirebase(collectionParam, condition, convertFunc) {
  const [document, setDocument] = useState([]);
  const db = getFirestore();
  useEffect(() => {
    let collectionRef = collection(db, collectionParam);
    if (!condition) {
      if (!condition.compareValue || condition.compareValue.length)
        setDocument([]);
      return;
    }
    const q = query(collectionRef, where(condition.fieldName, condition.operator, condition.compareValue));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const documents = [];
      querySnapshot.forEach(doc => {
        var temp = convertFunc(doc);
        documents.push({
          ...temp
        })
      })
      setDocument(documents);
    });

    return () => {
      unsubscribe();
    }
  }, [collection, condition])
  return document;
}
