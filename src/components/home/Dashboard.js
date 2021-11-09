import { Button } from 'antd';
import React from 'react';

export default function Dashboard({openCTV, openVTV}) {
  return (
    <div className="dashboard">
      <h1>This is a dashboard</h1>
      <Button onClick={openCTV}>Create Task</Button>
      <Button onClick={openVTV}>View Task</Button>
      <br />
    </div>
  )
}
