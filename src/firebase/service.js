import { collection, addDoc, doc, getFirestore, deleteDoc, updateDoc } from "firebase/firestore";

const db = getFirestore();

export const addDocument = async (collectionParam, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionParam), data);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
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


export const generateKeywords = (displayName) => {

  const name = displayName.split(' ').filter((word) => word);

  const length = name.length;
  let flagArray = [];
  let result = [];
  let stringArray = [];

  /**
   * khoi tao mang flag false
   * dung de danh dau xem gia tri
   * tai vi tri nay da duoc su dung
   * hay chua
   **/
  for (let i = 0; i < length; i++) {
    flagArray[i] = false;
  }

  const createKeywords = (name) => {
    const arrName = [];
    let curName = '';
    name.split('').forEach((letter) => {
      curName += letter;
      arrName.push(curName);
    });
    return arrName;
  };

  function findPermutation(k) {
    for (let i = 0; i < length; i++) {
      if (!flagArray[i]) {
        flagArray[i] = true;
        result[k] = name[i];

        if (k === length - 1) {
          stringArray.push(result.join(' '));
        }

        findPermutation(k + 1);
        flagArray[i] = false;
      }
    }
  }

  findPermutation(0);

  const keywords = stringArray.reduce((acc, cur) => {
    const words = createKeywords(cur);
    return [...acc, ...words];
  }, []);

  return keywords;
};