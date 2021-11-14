import { documentId } from '@firebase/firestore';
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
  }, [uid]);
  const workspaceList = useFirebase('workspace', workspaceCondition);
  const selectWorkspace = React.useMemo(
    () => workspaceList.find(item => item.id == status) || {}
    , [workspaceList, status]);
  const memberListCondition = React.useMemo(() => (
    {
      fieldName: "uid",
      operator: "in",
      compareValue: selectWorkspace.memberIdList
    }
  ),
    [selectWorkspace.memberIdList]);
  const memberList = useFirebase('person', memberListCondition);
  const columnsCondition = React.useMemo(() => (
    {
      fieldName: documentId(),
      operator: "in",
      compareValue: selectWorkspace.columnIdList
    }
  ),
    [selectWorkspace.columnIdList]);
  const columns = useFirebase('column', columnsCondition);
  const taskIdList = React.useMemo(
    () => columns.reduce((prev, cur) => (prev.concat(cur.taskIdList)), [])
    , [columns]);
  const tasksCondition = React.useMemo(
    () => ({
      fieldName: documentId(),
      operator: "in",
      compareValue: taskIdList
    })
    , [taskIdList])
  const tasks = useFirebase('task', tasksCondition);
  const [visible, setVisible] = useState(false);
  const [curColumn, setCurColumn] = useState('');
  const [curTask, setCurTask] = useState({});
  const [visibleTask, setVisibleTask] = useState(false);
  return (
    <AppContext.Provider
      value={{
        status,
        workspaceList,
        setStatus,
        memberList,
        selectWorkspace,
        tasks,
        columns,
        visible,
        setVisible,
        curColumn,
        setCurColumn,
        curTask,
        setCurTask,
        visibleTask,
        setVisibleTask
      }}>
      {children}
    </AppContext.Provider>
  )
}
