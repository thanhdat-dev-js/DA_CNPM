import React from 'react';
import { Link } from 'react-router-dom';
export default function Dashboard() {
  return (
    <div className="dashboard">
      <h1>This is a dashboard</h1>
      <Link to={`/newtask`}>Create New Task</Link>
      <br />
      <Link to={`/A12`}>View Task</Link>
    </div>
  )
}
