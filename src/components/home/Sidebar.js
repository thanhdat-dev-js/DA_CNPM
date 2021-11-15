import React, { useContext, useState } from 'react'
import { Collapse, Typography, Button } from 'antd';
import { AppstoreTwoTone, EditTwoTone } from '@ant-design/icons';
import { AppContext } from '../../context/AppProvider';
import { Input } from 'antd';
import { Modal } from 'antd';
import { addDocument } from '../../firebase/service';
import { serverTimestamp } from 'firebase/firestore';
import { AuthContext } from '../../context/AuthProvider';
import { Menu, Dropdown } from 'antd';
import { deleteDocumentById, editDocumentById } from '../../firebase/service';
import { getAuth, signOut } from '@firebase/auth';
import './sidebar.scss';

const { Panel } = Collapse;

export default function Sidebar() {
  const { status, setStatus, workspaceList } = useContext(AppContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [input, setInput] = useState('');
  const [modalMenu, setModalMenu] = useState({
    isModalVisible: false,
    input: '',
    type: 'delete'
  })
  const { user:
    { uid } } =
    React.useContext(AuthContext);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = () => {
    if (input == '') return;
    addDocument('workspace', {
      name: input,
      memberIdList: [uid],
      createdById: [uid],
      createdAt: serverTimestamp(),
      columnIdList: []
    })
    setIsModalVisible(false);
    setInput('');
  };

  const handleCancel = () => {
    setInput('');
    setIsModalVisible(false);
  };

  const handleOkMenu = () => {
    if (modalMenu.type === 'delete') {
      deleteDocumentById('workspace', status);
    }
    else {
      editDocumentById('workspace', status, {
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
  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => setStatus('dashboard')} className={(status === 'dashboard') ? "active-border" : ""}>
          <AppstoreTwoTone className="icon" />
          <Typography.Link >DashBoard</Typography.Link>
        </li>
        <li>
          <Collapse ghost >
            <Panel header="Workspace" >
              {workspaceList?.map(item => (
                <Typography.Link
                  style={{ width: "100%" }}
                  className={(status === item.id) ? "active-border" : ""}
                  key={item.id}
                  onClick={() => setStatus(item.id)}
                > {item.name}
                  <Dropdown overlay={(
                    <Menu>
                      <Menu.Item key="0" value='edit'
                        onClick={() => setModalMenu({
                          ...modalMenu,
                          isModalVisible: true,
                          type: 'edit'
                        })}>
                        Edit name
                      </Menu.Item>
                      <Menu.Item key="1" value='delete'
                        onClick={() => setModalMenu({
                          ...modalMenu,
                          isModalVisible: true,
                          type: 'delete'
                        })}>
                        Delete
                      </Menu.Item>
                    </Menu>
                  )} trigger={['click']}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                      <EditTwoTone />
                    </a>
                  </Dropdown>
                </Typography.Link>
              ))}
              <Button type="dashed" onClick={showModal}  >+  Create workspace</Button>
            </Panel>
          </Collapse>
          <Modal title="Create new workspace" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Input placeholder="Enter workspace name" value={input} onChange={(e) => setInput(e.target.value)} />
          </Modal>
          <Modal title={modalMenu.type === 'delete' ? 'Delete workspace' : 'Change workspace name'} visible={modalMenu.isModalVisible} onOk={handleOkMenu} onCancel={handleCancelMenu}>
            {
              modalMenu.type === 'edit' &&
              <Input placeholder="Enter new workspace name" value={modalMenu.input} onChange={(e) => setModalMenu({
                ...modalMenu,
                input: e.target.value
              })} />
            }
            {modalMenu.type === 'delete' &&
              <strong>
                <p>
                  Do you want to delete this workspace?
                </p>
              </strong>
            }
          </Modal>
        </li>
      </ul>
      <Button type="primary" onClick={() => signOut(getAuth())} >Log out</Button>
    </div>
  )
}
