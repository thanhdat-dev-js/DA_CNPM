import React from 'react';
import Header from './Header';
import Main from '../main/index';
import Subbar from './subbar/index';

export default function Workspace() {
  console.log('rerender')
  return (
    <div style={{
      paddingRight: '16px'
    }}>
      <Header></Header>
      <Subbar></Subbar>
      <Main></Main>
    </div >
  )
}
