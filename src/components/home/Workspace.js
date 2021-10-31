import React from 'react';
import Header from './Header';
import Main from '../main/index';
import Subbar from './Subbar';

export default function Workspace() {
  return (
    <>
      <Header></Header>
      <Subbar></Subbar>
      <Main></Main>
    </>
  )
}
