import React, { useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { AppContext } from '../../context/AppProvider';
import { Avatar, Tooltip, Button, Modal, Input, Dropdown, Menu } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { editDocumentById, deleteDocumentById } from '../../firebase/service';

import './header.scss';

export default function Header() {

  const { user } = React.useContext(AuthContext);
  const { selectWorkspace, memberList, memberIdList, setAddMemberVisible, tasks } = React.useContext(AppContext);
  const [deletePerson, setDeletePerson] = useState('');

  const [modalDelete, setModalDelete] = useState({
    isModalVisible: false,
    input: '',
    type: 'delete'
  })

  const handleOkDelete = () => {
    //deleteDocumentById('workspace', selectWorkspace.memberIdList.map((it) => it === item.uid));
    //const temp = selectWorkspace.memberIdList.map((it) => it !== ID);
    // console.log('ád');
    tasks.forEach(task => {
      if (task.createdBy == deletePerson) {
        deleteDocumentById('task', task.id);
      }
      if (task.memberIdList.includes(deletePerson)) {
        editDocumentById('task', task.id, {
          memberIdList: [...task.memberIdList.filter(value => value !== deletePerson)]
        })
      }
    })
    editDocumentById('workspace', selectWorkspace.id, {
      memberIdList: [...selectWorkspace.memberIdList.filter(it => it !== deletePerson)]
    });
    setModalDelete({
      ...modalDelete,
      isModalVisible: false
    })
  }
  const handleCancelDelete = () => {
    setModalDelete({
      ...modalDelete,
      isModalVisible: false
    })
  }

  function check(memberuid) {
    if (selectWorkspace) {
      if (selectWorkspace.createdById) {
        if (selectWorkspace.createdById[0] == user.uid) {
          if (memberuid == user.uid) {
            return false;
          }
          else
            return true;
        }
      }
    }
    return false;
  }

  return (
    <div className="header">
      <div className="header-left">
        <h1>{selectWorkspace.name}</h1>
      </div>
      <div className="header-center">
        <Avatar.Group maxCount={4} size="large" maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
          {memberList.map((member) => {
            return (
              <Tooltip key={member.uid} title={member.name} placement="top">
                <Avatar key={member.uid} src={member.avaURL} />
              </Tooltip>
            )
          })}
        </Avatar.Group>
        <Dropdown overlay={(
          <Menu>
            <Menu.Item>
              <Button onClick={setAddMemberVisible}>
                +  New Member
              </Button>
            </Menu.Item>
            {memberList.map((member) => {
              return (
                <Menu.Item key={member.uid}>
                  <div className="row">
                    <div className="col">
                      <Avatar size="medium" key={member.uid} src={member.avaURL} />
                      <span style={{ marginLeft: "10px" }}>{member.name}</span>
                    </div>
                    <div className="col col-2" >
                      <div>
                        {check(member.uid) &&
                          <Button
                            onClick={async () => {
                              setDeletePerson(member.uid);
                              setModalDelete({
                                ...modalDelete,
                                isModalVisible: true,
                                type: 'delete'
                              })
                            }}
                            icon={<CloseOutlined />}
                            style={{ marginRight: "35px" }}
                          />
                        }
                      </div>
                    </div>
                  </div>
                </Menu.Item>
              )
            })}
          </Menu>
        )} trigger={['click']}>
          <Button type="dashed">Edit Member</Button>
        </Dropdown>
        <Modal visible={modalDelete.isModalVisible} onOk={handleOkDelete} onCancel={handleCancelDelete}>
          <strong>
            <p>
              Do you want to delete member?
            </p>
          </strong>
        </Modal>
      </div>
      <div className="header-right">
        <Tooltip title={user.displayName} placement="top">
          <Avatar size="large" style={{ color: '#f56a00', backgroundColor: '#fde3cf', marginLeft: "10px" }} key={user.uid} src={user.photoURL} />
        </Tooltip>
      </div>
    </div>
  )
}
