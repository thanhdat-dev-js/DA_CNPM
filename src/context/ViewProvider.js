import React, { useState, useContext, useMemo, useEffect } from 'react';
import { AppContext } from '../context/AppProvider';
import { cmpNAME, cmpPRIORITY, cmpDEADLINE, cmpPROGRESS } from './customFunction';

export const ViewContext = React.createContext();

const _Field = { // collectionParam in firebase
  NAME: 'name',
  CREATED_AT: 'createdAt',
  CREATED_BY: 'createdBy',
  DEADLINE: 'deadline',
  PRIORITY: 'priority',
  PROGRESS: 'progression',
  MEMBER: 'memberIdList',
}
export const Field = { // Used for display
  NAME: 'Title',
  CREATED_AT: 'Created at',
  CREATED_BY: 'Created by',
  MEMBER: 'Assignees',
  DEADLINE: 'Due date',
  PRIORITY: 'Priority',
  PROGRESS: 'Progress',
}
export const Sort = {
  ASC: 'Ascending',
  DESC: 'Descending',
}
Object.freeze(_Field);
Object.freeze(Field);
Object.freeze(Sort);

function applySortOption (tasks, sortOption) {
  const res = [...tasks];
  res.sort(FuncFactory(sortOption.id, sortOption.value));
  return res;
}

function FuncFactory (aField, aSort) {
  const func = (task1, task2) => {
    const factor = aSort === Sort.ASC ? 1 : -1;
    switch (aField) {
      case Field.NAME:
        return factor * cmpNAME(task1[_Field.NAME], task2[_Field.NAME]) || 0;
      case Field.PRIORITY:
        return factor * cmpPRIORITY(task1[_Field.PRIORITY], task2[_Field.PRIORITY]) || 0;
      case Field.DEADLINE:
        return factor * cmpDEADLINE(task1[_Field.DEADLINE], task2[_Field.DEADLINE]) || 0;
      case Field.PROGRESS:
        return factor * cmpPROGRESS(task1[_Field.PROGRESS], task2[_Field.PROGRESS]) || 0;
      default:
        throw "Not yet handled";
    }
  }
  // console.log("I have a func now");
  return func;
}


export default function ViewProvider({ children }) {
  // To Show/hide stuff in task
  const defaultState = () => {
    return [
      { visible: true, fieldName: Field.NAME },
      { visible: true, fieldName: Field.CREATED_AT },
      { visible: true, fieldName: Field.CREATED_BY },
      { visible: true, fieldName: Field.DEADLINE },
      { visible: true, fieldName: Field.PRIORITY },
      { visible: true, fieldName: Field.PROGRESS },
      { visible: true, fieldName: Field.MEMBER },
    ];
  }
  const [state, setState] = useState(defaultState());
  
  const _field = (field) => {
    const ref = state.find(f => f.fieldName === field);
    if (!ref) {
      throw 'Invalid field. Use Field enum type instead';
    }
    return ref;
  }

  const setFieldVisible = (field, value) => {
    _field(field).visible = value;
    setState([...state]); // make sure ref to state will be changed 
  }

  const isFieldVisible = (field) => {
    return _field(field).visible;
  }

  // To sort task in workspace
  // { id: Field.DEADLINE, value: Sort.ASC },
  // { id: Field.PRIORITY, value: Sort.ASC },
  // { id: Field.PROGRESS, value: Sort.ASC },
  const [sortOptions, setSortOptions] = useState([]);
  const {tasks} = useContext(AppContext); 
  const sortedTasks = useMemo(() => {
    let taskList = [...tasks];
    for (let i = 0; i < sortOptions.length; i++) {
      taskList = applySortOption(taskList, sortOptions[i]);
    }
    return taskList;
  }, [tasks, sortOptions]);
  
  return (
    <ViewContext.Provider
      value={{ 
        setFieldVisible,
        isFieldVisible,
        sortOptions,
        setSortOptions,
        sortedTasks,
    }}>
      {children}
    </ViewContext.Provider>
  );
}