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
  const showModalMenu = () => {
    setModalMenu({
      ...modalMenu,
      isModalVisible: true
    })
  }
  const handleOk = () => {
    addDocument('workspace', {
      name: input,
      leaderIdList: [uid],
      memberIdList: [uid],
      createdById: [uid],
      createdAt: serverTimestamp(),
      status: "on"
    })
    setIsModalVisible(false);
    setInput('');
  };

  const handleCancel = () => {
    setInput('');
    setIsModalVisible(false);
  };

  const handleOkMenu = () => {

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
                  className={(status === item.workspaceId) ? "active-border" : ""}
                  key={item.workspaceId}
                  onClick={() => setStatus(item.workspaceId)}
                > {item.name}
                  <Dropdown overlay={(
                    <Menu>
                      <Menu.Item key="0" value='edit'
                        onClick={() => setModalMenu({
                          ...modalMenu,
                          isModalVisible: true,
                          type: 'edit'
                        })}>
                        Chỉnh sửa tên
                      </Menu.Item>
                      <Menu.Item key="1" value='delete'
                        onClick={() => setModalMenu({
                          ...modalMenu,
                          isModalVisible: true,
                          type: 'delete'
                        })}>
                        Xóa
                      </Menu.Item>
                    </Menu>
                  )} trigger={['click']}>
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                      <EditTwoTone />
                    </a>
                  </Dropdown>
                </Typography.Link>
              ))}
              <Button type="dashed" onClick={showModal}  >+  Tạo workspace</Button>
            </Panel>
          </Collapse>
          <Modal title="Tạo workspace mới" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Input placeholder="Nhập tên workspace" value={input} onChange={(e) => setInput(e.target.value)} />
          </Modal>
          <Modal title={modalMenu.type === 'delete' ? 'Xóa workspace' : 'Chỉnh sửa tên workspace'} visible={modalMenu.isModalVisible} onOk={handleOkMenu} onCancel={handleCancelMenu}>
            {
              modalMenu.type === 'edit' &&
              <Input placeholder="Nhập tên workspace" value={modalMenu.input} onChange={(e) => setModalMenu({
                ...modalMenu,
                input: e.target.value
              })} />
            }
            {modalMenu.type === 'delete' &&
              <strong>
                <p>
                  Bạn có chắc chắc xóa workspace này
                </p>
              </strong>
            }
          </Modal>
        </li>
      </ul>
    </div>
  )
}
