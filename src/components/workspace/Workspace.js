import React from 'react';
import Header from './Header';
import Main from '../main/index';
import Subbar from './Subbar';
import { Row, Col } from 'antd';

export default function Workspace({ workspaceId }) {
  return (
    <>
      <h1>workspaceId:{workspaceId}</h1>
      <Header></Header>
      <Subbar></Subbar>
      <Main></Main>
    </>

  )
}
