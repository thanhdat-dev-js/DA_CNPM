import React, { useState } from 'react';
import "./column.scss";
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Modal, Input } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Task from './Task';
import { deleteDocumentById, editDocumentById } from "../../firebase/service";
import { AppContext } from '../../context/AppProvider';
export default function Column(props) {
  const [modalMenu, setModalMenu] = useState({
    isModalVisible: false,
    input: '',
    type: 'delete'
  });
  const { selectWorkspace, setVisible, setCurColumn } = React.useContext(AppContext);
  const handleOkMenu = () => {
    if (modalMenu.type === 'delete') {
      props.taskIdList.forEach(taskID => {
        deleteDocumentById('task', taskID);
      });
      deleteDocumentById('column', props.id);
      const temp = selectWorkspace.columnIdList.filter((item) => item !== props.id);
      editDocumentById('workspace', selectWorkspace.id, {
        columnIdList: [...temp]
      })
    }
    else {
      editDocumentById('column', props.id, {
        name: modalMenu.input
      })
    }
    setModalMenu({
      ...modalMenu,
      isModalVisible: false
    })
  }
  const handleCancelMenu = () => {
    setModalMenu({
      ...modalMenu,
      isModalVisible: false
    })
  }
  const menu = (
    <Menu>
      <Menu.Item key="1"
        onClick={() => setModalMenu({
          ...modalMenu,
          isModalVisible: true,
          type: 'edit'
        })} icon={<EditOutlined />}>
        Edit Name
      </Menu.Item>
      <Menu.Item key="2"
        onClick={() => setModalMenu({
          ...modalMenu,
          isModalVisible: true,
          type: 'delete'
        })}
        icon={<DeleteOutlined />}>
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
                <EllipsisOutlined style={{ fontSize: '125%', padding: '0 5px' }} />
              </Dropdown>
              <PlusOutlined style={{ fontSize: '125%', padding: '0 5px' }}
                onClick={() => {
                  setVisible(true);
                  setCurColumn(props.id);
                }} />
            </div>
          </div>
          <div className="task-wrapper">
            {props.tasks.map((task) => {
              if (props.taskIdList.includes(task.id))
                return (
                  <Task 
                    key={task.id} 
                    task={task} 
                    name={task.name} 
                    progression={task.progression} 
                    deadline={task.deadline} 
                    priority={task.priority}
                    tags={task.tag}
                    memberIdList={task.memberIdList}
                  />
                )
              else
                  return null;
            })}
          </div>
        </div>
      </div>
      <Modal title={modalMenu.type === 'delete' ? 'Delete column' : 'Change column name'} visible={modalMenu.isModalVisible} onOk={handleOkMenu} onCancel={handleCancelMenu}>
        {
          modalMenu.type === 'edit' &&
          <Input placeholder="Enter new column name" value={modalMenu.input} onChange={(e) => setModalMenu({
            ...modalMenu,
            input: e.target.value
          })} />
        }
        {modalMenu.type === 'delete' &&
          <strong>
            <p>
              Do you want to delete this column?
            </p>
          </strong>
        }
      </Modal>
    </div>
  )
}
