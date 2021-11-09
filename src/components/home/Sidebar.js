import React, { useContext, useState } from 'react'
import { Collapse, Typography, Button } from 'antd';
import { AppstoreTwoTone, EditTwoTone } from '@ant-design/icons';
import { AppContext } from '../../context/AppProvider';
import { Input } from 'antd';
import { Modal } from 'antd';
import { addDocument } from '../../firebase/service';
import { serverTimestamp } from 'firebase/firestore';
import { AuthContext } from '../../context/AuthProvider';
import './sidebar.scss';

const { Panel } = Collapse;

export default function Sidebar() {
  const { status, setStatus, workspaceList } = useContext(AppContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [input, setInput] = useState('');
  const { user:
    { uid } } =
    React.useContext(AuthContext);
  const showModal = () => {
    setIsModalVisible(true);
  };

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
  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => setStatus('dashboard')} className={status === 'dashboard' && "active-border"}>
          <AppstoreTwoTone className="icon" />
          <Typography.Link >DashBoard</Typography.Link>
        </li>
        <li>
          <Collapse ghost >
            <Panel header="Workspace" >
              {workspaceList?.map(item => (
                <Typography.Link
                  className={status === item.workspaceId && "active-border"}
                  key={item.workspaceId}
                  onClick={() => setStatus(item.workspaceId)}
                > {item.name}<EditTwoTone /></Typography.Link>
              ))}
              <Button type="dashed" onClick={showModal}  >+  New Workspace</Button>
            </Panel>
          </Collapse>
          <Modal title="Create new workspace" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <Input placeholder="Enter workspace name" value={input} onChange={(e) => setInput(e.target.value)} />
          </Modal>
        </li>
      </ul>
    </div>
  )
}
