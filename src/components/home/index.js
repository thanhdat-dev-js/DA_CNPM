import React, { useContext } from 'react'
import Workspace from './Workspace';
import DashBoard from './Dashboard';
import Sidebar from './Sidebar';
import './index.scss';
import { Row, Col } from "antd";
import { AppContext } from '../../context/AppProvider';

export default function Home() {
  const { status } = useContext(AppContext);
  return (
    <div className="app">
      <Sidebar />
      <Row style={{ flex: "1" }}>
        <Col span={24}>
          {status === 'dashboard' && <DashBoard />}
          {status !== 'dashboard' && <Workspace />}
        </Col>
      </Row>
    </div>
  )
}
