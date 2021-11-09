import React, { useContext, useEffect, useState } from 'react'
import Workspace from './Workspace';
import DashBoard from './Dashboard';
import Sidebar from './Sidebar';
import { documentId } from '@firebase/firestore';
import './index.scss';
import { Row, Col } from "antd";
import { getAuth, signOut } from '@firebase/auth';
import { AppContext } from '../../context/AppProvider';
import ViewTask from '../task/ViewTask';
import CreateTask from '../task/CreateTask';

export default function Home() {
  const { status } = useContext(AppContext);
  const [CTV, setCTV] = useState(false);
  const [VTV, setVTV] = useState(false);

  return (
    <div className="app">
      <Sidebar />
      <CreateTask visible={CTV} close={() => setCTV(false)}/>
      <ViewTask visible={VTV} close={() => setVTV(false)}/>
      <Row style={{ flex: "1" }}>
        <Col span={24}>
          {status === 'dashboard' && <DashBoard openCTV={() => setCTV(true)} openVTV={() => setVTV(true)}/>}
          {status !== 'dashboard' && <Workspace />}
        </Col>
      </Row>
      <button onClick={() => signOut(getAuth())}>Dang xuat </button>

    </div>
  )
}
