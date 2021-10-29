import React, { useEffect, useState } from 'react'
import { signOut, getAuth } from 'firebase/auth';
import Workspace from './Workspace';
import DashBoard from './Dashboard';
import Setting from './Setting';
import Sidebar from './Sidebar';
import './index.scss';

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
      <div className="main">
        {state === 'dashboard' && <DashBoard />}
        {state !== 'dashboard' && state !== "setting" &&
          <Workspace workspaceId={state} />}
        {state === 'setting' && <Setting />}
      </div>
    </div>
  )
}

{/* <button onClick={() => signOut(auth)}>Dang xuat</button> */ }