import React, { useState, useEffect } from 'react';
import useFirebase from '../hook/useFirebase';
import { AuthContext } from './AuthProvider';

export const AppContext = React.createContext();

export default function AppProvider({ children }) {
  const [status, setStatus] = useState('dashboard');
  // status = {
  //   name: "asd",
  //   workspaceId : "asdasdas"
  // }
  const [memberList, setMemberList] = useState([]);
  // memberList = [
  //   {
  //     avaURL: "asdas",
  //     name: "asda",
  //     uid: "asdasd"
  //   }, {
  //     avaURL: "asdas",
  //     name: "asda",
  //     uid: "asdasd"
  //   }
  // ]



  // Tat ca state cua app duoc luu o day
  // useEffect 
  const {
    user: { uid },
  } = React.useContext(AuthContext);

  const workspaceCondition = React.useMemo(() => {
    return {
      fieldName: "memberIdList",
      operator: "array-contains",
      compareValue: uid
    }
  }, [uid]);

  const workspaceList = useFirebase('workspace', workspaceCondition, (doc) => ({
    name: doc.data().name,
    workspaceId: doc.id
  }));

  return (
    <AppContext.Provider
      value={{
        status,
        workspaceList,
        setStatus
      }}>
      {children}
    </AppContext.Provider>
  )
}
