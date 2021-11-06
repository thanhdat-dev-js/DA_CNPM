import React, { useContext, useEffect, useState } from 'react'
import Workspace from './Workspace';
import DashBoard from './Dashboard';
import Sidebar from './Sidebar';
import { documentId } from '@firebase/firestore';
import './index.scss';
import { Row, Col } from "antd";
import { getAuth, signOut } from '@firebase/auth';
import { AppContext } from '../../context/AppProvider';

export default function Home() {
  const { status } = useContext(AppContext);
  return (
    <div className="app">
      <Sidebar />
      <div className="home-container">
        {status === 'dashboard' && <DashBoard />}
        {status !== 'dashboard' && <Workspace />}
      </div>
    </div>
  )
}
