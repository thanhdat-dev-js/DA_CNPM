import React from 'react';
import { Input, Avatar, Row, Col, Button, Tooltip } from 'antd';
import "./dashboard.scss";
import Task from '../main/Task';
import { UserOutlined } from '@ant-design/icons';
import { AuthContext } from '../../context/AuthProvider';
import "../main/task.scss";

const tasks = [
  {
    id: '1',
    name: "Do homework with some other things",
    deadline: "20/4/2021",
    progression: 20,
  },
  {
    id: '2',
    name: "Do exercise",
    deadline: "23/7/2021",
    progression: 50,
  },
  {
    id: '3',
    name: "Go to bed",
    deadline: "4/11/2021",
    progression: 60,
  },
  {
    id: '4',
    name: "Do homework with some other things",
    deadline: "20/4/2021",
    progression: 35,
  },
  {
    id: '5',
    name: "Do exercise",
    deadline: "23/7/2021",
    progression: 100,
  },
  {
    id: '6',
    name: "Go to bed",
    deadline: "4/11/2021",
    progression: 95,
  },
  {
    id: '5',
    name: "Do exercise",
    deadline: "23/7/2021",
    progression: 100,
  },
  {
    id: '6',
    name: "Go to bed",
    deadline: "4/11/2021",
    progression: 95,
  }
  , {
    id: '5',
    name: "Do exercise",
    deadline: "23/7/2021",
    progression: 100,
  },
  {
    id: '6',
    name: "Go to bed",
    deadline: "4/11/2021",
    progression: 95,
  }, {
    id: '5',
    name: "Do exercise",
    deadline: "23/7/2021",
    progression: 100,
  },
  {
    id: '6',
    name: "Go to bed",
    deadline: "4/11/2021",
    progression: 95,
  }
]

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
        <Avatar size="large" style={{ color: '#f56a00', backgroundColor: '#fde3cf', marginLeft: "10px" }} key={user.uid} src={user.photoURL}/>
      </Tooltip>
      </div>
      <div className="dashboard-wrapper">
        <div className="content">
          {tasks.map((task, idx) => {
            return (
              <div className="task-wrapper" key={idx}>
                <Task name={task.name} progression={task.progression} deadline={task.deadline} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
