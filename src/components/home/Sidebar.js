import React, { useContext, useState } from 'react'
import { Collapse, Typography, Button } from 'antd';
import { AppstoreTwoTone } from '@ant-design/icons';
import { AppContext } from '../../context/AppProvider';
import { Input } from 'antd';
import { Modal } from 'antd';
import { addDocument } from '../../firebase/service';
import { serverTimestamp } from 'firebase/firestore';
import { AuthContext } from '../../context/AuthProvider';
import './sidebar.scss';

const { Panel } = Collapse;

export default function Sidebar() {
  const { setStatus, workspaceIdList } = useContext(AppContext);
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
        <li onClick={() => setStatus('dashboard')}>
          <AppstoreTwoTone className="icon" />
          <Typography.Link>DashBoard</Typography.Link>
        </li>
        <li>
          <Collapse ghost >
            <Panel header="Workspace" className="workspace">
              {workspaceIdList?.map(item => (
                <Typography.Link
                  key={item.workspaceId}
                  onClick={() => setStatus(item.workspaceId)}
                ># {item.name}</Typography.Link>
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
