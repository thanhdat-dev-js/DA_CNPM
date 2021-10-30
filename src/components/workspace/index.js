import React, { useEffect, useState } from 'react'
import { signOut, getAuth } from 'firebase/auth';
import Workspace from './Workspace';
import DashBoard from './Dashboard';
import Setting from './Setting';
import Sidebar from './Sidebar';
import './index.scss';
import { Row, Col } from "antd";

export default function Home() {
  const [state, setState] = useState('dashboard');
  const [workspaceIdList, setworkspaceIdList] = useState(
    [
      {
        name: 'Team 1',
        workspaceId: '123312'
      },
      {
        name: 'Team 2',
        workspaceId: '3453534512312'
      },
      {
        name: 'Team 3',
        workspaceId: '78686782312312'
      },
      {
        name: 'Team 4',
        workspaceId: '312312312'
      }
    ]
  );
  const auth = getAuth();
  const handleSwitchState = (state) => {
    setState(state);
    console.log(state)
  }
  return (
    <div className="app">
      <Sidebar handleSwitchState={handleSwitchState}
        workspaceIdList={workspaceIdList} />
      <Row style={{ flex: "1" }}>
        <Col span={24}>
          {state === 'dashboard' && <DashBoard />}
          {state !== 'dashboard' && state !== "setting" &&
            <Workspace workspaceId={state} />}
          {state === 'setting' && <Setting />}
        </Col>
      </Row>
    </div>
  )
}

{/* <button onClick={() => signOut(auth)}>Dang xuat</button> */ }