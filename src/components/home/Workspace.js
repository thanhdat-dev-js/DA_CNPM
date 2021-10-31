import React from 'react';
import Header from './Header';
import Main from '../main/index';
import Subbar from './Subbar';

export default function Workspace({ workspaceId }) {
  return (
    <>
      <Header></Header>
      <Subbar></Subbar>
      <Main></Main>
    </>
  )
}
