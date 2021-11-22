import { documentId } from '@firebase/firestore';
import React, { useState } from 'react';
import useFirebase from '../hook/useFirebase';
import { AuthContext } from './AuthProvider';

export const AppContext = React.createContext();

export default function AppProvider({ children }) {
  const [status, setStatus] = useState('dashboard');
  const [visible, setVisible] = useState(false);
  const [curColumn, setCurColumn] = useState('');
  const [curTask, setCurTask] = useState({});
  const [visibleTask, setVisibleTask] = useState(false);
  const { user: { uid }, } = React.useContext(AuthContext);

  // Condition 1: Take workspace has memberIdList has that person
  const workspaceCondition = React.useMemo(() => {
    return {
      fieldName: "memberIdList",
      operator: "array-contains",
      compareValue: uid
    }
  }, [uid]);
  // Get workspaceList from workspace with Condition 1

  const workspaceList = useFirebase('workspace', workspaceCondition);

  // Get the selected Workspace
  const selectWorkspace = React.useMemo
  (() => workspaceList.find(item => item.id === status) || {}, [workspaceList, status]);
  
  // Condition 2: Take all people listed in memberIDList 
  const memberListCondition = React.useMemo(() => (
    {
      fieldName: "uid",
      operator: "in",
      compareValue: selectWorkspace.memberIdList
    }
  ), [selectWorkspace.memberIdList]);

  // Get memberList from person with Condition 2
  const memberList = useFirebase('person', memberListCondition);

  // Condition 3: Take columns listed in workspaceIDList
  const columnsCondition = React.useMemo(() => (
    {
      fieldName: documentId(),
      operator: "in",
      compareValue: selectWorkspace.columnIdList
    }
  ), [selectWorkspace.columnIdList]);

  // Get columns from columns with Condition 3
  const columns = useFirebase('column', columnsCondition);

  // Concat all task List in all columns into a single List
  const taskIdList = React.useMemo(() => columns.reduce((prev, cur) => (prev.concat(cur.taskIdList)), []), [columns]);
  
  // Condition 4: Take all task listed in Task ID list
  const tasksCondition = React.useMemo(
  () => ({
    fieldName: documentId(),
    operator: "in",
    compareValue: taskIdList
  })
  , [taskIdList]);

  // Get tasks from task with Condition 4
  const tasks = useFirebase('task', tasksCondition);

  const dashboardTaskCondition = React.useMemo(() => (
    {
      fieldName: "memberIdList",
      operator: "array-contains",
      compareValue: uid
    }
  ), [tasks]);
  const dashboardTask = useFirebase('task', dashboardTaskCondition);

  return (
    <AppContext.Provider
      value={{
        status,
        workspaceList,
        setStatus,
        memberList,
        dashboardTask,
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
        setVisibleTask,
      }}>
      {children}
    </AppContext.Provider>
  )
}
