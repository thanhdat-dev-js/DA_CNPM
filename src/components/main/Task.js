import React from 'react';
import "./task.scss";
import { Card, Avatar, Progress, Tag } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { AppContext } from '../../context/AppProvider';

export default function Task(props) {
  const { curTask, setCurTask, setVisibleTask } = React.useContext(AppContext);
  return (
    <div className="task-card-container">
      <Card
        hoverable
        bordered={true}
        style={{ cursor: 'pointer', borderRadius: '5px' }}
        bodyStyle={{ padding: '4%', height: '133px' }}
        onClick={async () => {
          await setCurTask({ ...props.task });
          console.log(curTask);
          setVisibleTask(true);
        }}
      >
        <div style={{ display: 'flex' }}>
          <p className="title">{props.name}</p>
          <Avatar.Group style={{ marginLeft: 'auto', marginRight: 0 }}>
            <Avatar src="https://joeschmoe.io/api/v1/random" />
            <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
            <Avatar style={{ backgroundColor: '#1890ff' }} icon={<UserOutlined />} />
          </Avatar.Group>
        </div>
        <div style={{ marginTop: '-15px' }}>
          <Progress
            percent={props.progression}
            status="active"
            showInfo={false}
            strokeColor="#805454"
            trailColor="#c4c4c4"
            style={{ width: '65%' }}
          />
          <p className="date">{props.deadline}</p>
        </div>
        <div style={{ marginTop: '-20px', float: 'right' }}>
          <Tag color="#f0f8ef" style={{ color: '#60B158', fontFamily: 'arial', fontWeight: 'bold', fontSize: '14px' }}>IOS APP</Tag>
          <Tag color="#E6F2FF" style={{ color: '#007AFF', fontFamily: 'arial', fontWeight: 'bold', fontSize: '14px' }}>UX/UI</Tag>
        </div>
      </Card>
    </div>
  )
}
