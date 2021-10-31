// import React, { useState } from 'react';
// import useFirebase from '../hook/useFirebase';
// import { AuthContext } from './AuthProvider';

// export const AppContext = React.createContext();

// export default function AppProvider({ children }) {
//   const {
//     user: { email }
//   } = React.useContext(AuthContext);

//   const personId = useFirebase('person', {
//     fieldName: "",
//     operator: "",
//     compareValue: ""
//   }, (doc) => ({

//   }))


//   return (
//     <div>

//     </div>
//   )
// }

import React, { useState, useEffect } from 'react';
import useFirebase from '../hook/useFirebase';
import { AuthContext } from './AuthProvider';

export const AppContext = React.createContext();

export default function AppProvider({ children }) {
  const [status, setStatus] = useState('dashboard');
  const {
    user: { uid },
  } = React.useContext(AuthContext);
  const workspaceCondition = React.useMemo(() => {
    return {
      fieldName: "memberIdList",
      operator: "array-contains",
      compareValue: uid
    }
  }, [uid])
  const workspaceIdList = useFirebase('workspace', workspaceCondition, (doc) => ({
    name: doc.data().name,
    workspaceId: doc.id
  }))
  // const workspaceIdList = [];
  console.log(workspaceIdList)

  return (
    <AppContext.Provider
      value={{
        status,
        workspaceIdList,
        setStatus
      }}>
      {children}
    </AppContext.Provider>
  )
}
