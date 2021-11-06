import React from 'react';
import "./column.scss";
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { Menu, Dropdown } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Task from './Task';

export default function Column(props) {

  const menu = (
    <Menu>
      <Menu.Item key="1" icon={<EditOutlined />}>
        Edit Name
      </Menu.Item>
      <Menu.Item key="2" icon={<DeleteOutlined />}>
        Delete Column
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <div className="column-wrapper">
        <div className="column-content">
          <div className="column-header">
            <div className="column-title">{props.name}</div>
            <div className="column-icons">
              <Dropdown overlay={menu} placement="bottomRight">
                <EllipsisOutlined style={{ fontSize: '125%', padding: '0 5px'}}/>
              </Dropdown>
              <PlusOutlined style={{ fontSize: '125%', padding: '0 5px'}}/>
            </div>
          </div>
          <div className="task-wrapper">
            {props.tasks.filter((task) => { return props.taskIdList.includes(task.id) }).map((task) => {
                return (
                  <Task key={task.id} name={task.name} progression={task.progression} deadline={task.deadline} /> 
                )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
