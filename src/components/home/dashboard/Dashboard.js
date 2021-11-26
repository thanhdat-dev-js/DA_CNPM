import React, { useState, useContext } from 'react';
import { Checkbox, Typography, Avatar, Tooltip } from 'antd';
import "./dashboard.scss";
import { AuthContext } from '../../../context/AuthProvider';
import "../../main/task.scss";
import { Field, ViewContext } from "../../../context/ViewProvider";
import { AppContext } from '../../../context/AppProvider';
import ListTask from './ListTasks';
import { useEffect } from 'react';
import ViewDBTask from './ViewDBTask';

const { Title } = Typography;

export default function Dashboard() {
  const { user } = React.useContext(AuthContext);
  const { DBmemberList, dashboardTask, workspaceList, visibleDBTask } = useContext(AppContext);

  useEffect(() => {
    console.log(dashboardTask);
  }, [dashboardTask]);
  
  // Checklist
  const { setFieldVisible, isFieldVisible } = useContext(ViewContext);
  const selectedFields = [
    { id: Field.PRIORITY, name: "Priority" },
    { id: Field.MEMBER, name: "Assignee" },
    { id: Field.DEADLINE, name: "Due-date" },
    { id: Field.PROGRESS, name: "Progress" },
  ];
  const fields = selectedFields.map(f => ({ 
    id: f.id,
    name: f.name,
    active: isFieldVisible(f.id),
  }));

  const handleChange = (victimId, newState) => {
    setFieldVisible(victimId, newState);
    console.log({fields});
  };

  function CustomSwitch({ checked, onChange }) {
    const handleChange = (e) => {
      onChange(e.target.checked);
    };
    return (<>
      <Checkbox checked={checked} onChange={handleChange}/>
    </>);
  }
  
  function ToggleItem({ id, name, isActive, handleChange }) {
    const onChange = (newState) => {
      handleChange(id, newState);
    };
    const handleClick = () => {
      handleChange(id, !isActive);
    };
    return (
      <div className="container">
        <div className="row">
          <div className="col-1">
            <CustomSwitch checked={isActive} onChange={onChange} />
          </div>
          <div className="col-9" style={{wordBreak: "keep-all"}} onClick={handleClick}>{name}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="dashboard-subbar">
            <Title level={4}>Your Dash Board</Title>
        </div>
        <div className='flex'>
            {fields.map((f) => (
                <ToggleItem
                  key={f.id}
                  id={f.id}
                  name={f.name}
                  isActive={f.active}
                  handleChange={handleChange}
                />
            ))}
            <div className='Avatar'>
            <Tooltip title={user.displayName} placement="top">
              <Avatar className='img' size="large" style={{ color: '#f56a00', backgroundColor: '#fde3cf', marginLeft: "10px" }} key={user.uid} src={user.photoURL} />
            </Tooltip>
            </div>
        </div>
      </div>
      {visibleDBTask && <ViewDBTask></ViewDBTask>}
      {workspaceList.map((item) => {
        for (let i = 0; i < dashboardTask.length; i++) {
          if (dashboardTask[i].workspace === item.id) {
            return (
              <ListTask key={item.id} id={item.id} name={item.name} list={dashboardTask} />
            )
          }
        }
      })}
    </div>
  )
}
