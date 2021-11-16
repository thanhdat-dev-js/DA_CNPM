import React from 'react';
import { Input, Avatar, Tooltip } from 'antd';
import "./dashboard.scss";
import { AuthContext } from '../../context/AuthProvider';
import "../main/task.scss";

export default function Dashboard() {
  const { user } = React.useContext(AuthContext);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <Input.Search
          style={{ width: 200 }}
          placeholder="Search"
        />
        <Tooltip title={user.displayName} placement="top">
          <Avatar size="large" style={{ color: '#f56a00', backgroundColor: '#fde3cf', marginLeft: "10px" }} key={user.uid} src={user.photoURL} />
        </Tooltip>
      </div>
    </div>
  )
}
