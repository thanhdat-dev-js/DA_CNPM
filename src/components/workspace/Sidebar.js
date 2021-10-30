import React, { useEffect } from 'react'
import { Collapse, Typography, Button } from 'antd';
import { AppstoreTwoTone, SettingTwoTone } from '@ant-design/icons';
import './sidebar.scss';

const { Panel } = Collapse;

export default function Sidebar({ workspaceIdList, handleSwitchState }) {
  useEffect(() => {
    console.log(workspaceIdList)
    return () => {
    }
  })
  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => handleSwitchState('dashboard')}>
          <AppstoreTwoTone className="icon" />
          <Typography.Link>DashBoard</Typography.Link>
        </li>
        <li>
          <Collapse ghost >
            <Panel header="Workspace" className="workspace">
              {workspaceIdList?.map(item => (
                <Typography.Link
                  key={item.workspaceId}
                  onClick={() => handleSwitchState(item.workspaceId)}
                ># {item.name}</Typography.Link>
              ))}
              <Button type="dashed" >+  New Workspace</Button>
            </Panel>
          </Collapse>
        </li>
        <li onClick={() => handleSwitchState('setting')}>
          <SettingTwoTone className="icon icon-large" />
          <Typography.Link>Setting</Typography.Link>
        </li>
      </ul>
    </div>
  )
}
