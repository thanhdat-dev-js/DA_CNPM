import React, { useState } from 'react';

export const ViewContext = React.createContext();

/**
 * Enum type used for view context
 */
export const Field = { // sth
  NAME: 'name',
  CREATED_AT: 'createdAt',
  CREATED_BY: 'createdBy',
  DEADLINE: 'deadline',
  PRIORITY: 'priority',
  PROGRESS: 'progression',
  MEMBER: 'memberIdList',
}
Object.freeze(Field);

export default function ViewProvider({ children }) {
  const defaultState = () => {
    return [
      { visible: true, fieldName: Field.NAME, displayName: "Name"},
      { visible: true, fieldName: Field.CREATED_AT, displayName: "Created at"},
      { visible: true, fieldName: Field.CREATED_BY, displayName: "Created by"},
      { visible: true, fieldName: Field.DEADLINE, displayName: "Due date"},
      { visible: true, fieldName: Field.PRIORITY, displayName: "Priority"},
      { visible: true, fieldName: Field.PROGRESS, displayName: "Progress"},
      { visible: true, fieldName: Field.MEMBER, displayName: "Assignees"},
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

  return (
    <ViewContext.Provider
      value={{ 
        state,
        setFieldVisible,
        isFieldVisible,
    }}>
      {children}
    </ViewContext.Provider>
  );
}