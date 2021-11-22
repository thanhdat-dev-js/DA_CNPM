import React from 'react';
import Header from './Header';
import Main from '../main/index';
import Subbar from './subbar/index';
import CreateTask from '../task/CreateTask';
import ViewTask from '../task/ViewTask';
import { AppContext } from '../../context/AppProvider';

export default function Workspace() {
  const { workspaceList, visibleTask } = React.useContext(AppContext);

  return (
    <div style={{
      paddingRight: '16px'
    }}>
      <Header></Header>
      <Subbar></Subbar>
      {workspaceList.length !== 0 &&
        <Main></Main>
      }
      <CreateTask></CreateTask>
      {visibleTask && <ViewTask></ViewTask>}
    </div >
  )
}
