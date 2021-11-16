import React from 'react';
import "./task.scss";
import { Card, Avatar, Progress, Tag } from 'antd';
import { AppContext } from '../../context/AppProvider';

const ColorPallet = ["#f0f8ef", "#f4f8af","#f0f8ef", "#f0f8ef"];

export default function Task(props) {
  const { curTask, setCurTask, setVisibleTask, memberList } = React.useContext(AppContext);
  return (
    <div className="task-card-container">
      <Card
        hoverable
        bordered={true}
        style={{ cursor: 'pointer', borderRadius: '5px',
        borderRight: props.priority === 'Low' ? '6px solid green' : ( props.priority === 'Medium' ? '6px solid orange' : '6px solid red')  }}
        bodyStyle={{ padding: '4%', height: '150px'}}
        onClick={async () => {
          await setCurTask({ ...props.task });
          console.log(curTask);
          setVisibleTask(true);
        }}
      >
        <div style={{ display: 'flex' }}>
          <p className="title">{props.name}</p>
          <Avatar.Group style={{ marginLeft: 'auto', marginRight: 0 }}>
            {memberList.map((member) => {
              return (
                <Avatar key={member.uid} src={member.avaURL} />
              )
            })}
          </Avatar.Group>
        </div>
        <div style={{ marginTop: '-15px' }}>
          <Progress
            percent={props.progression}
            status="active"
            showInfo={false}
            strokeColor="#805454"
            trailColor="#c4c4c4"
            style={{ width: '100%' }}
          />
        </div>
        {
          props.deadline !== "" &&
          <div style={{ marginTop: '5px'}}>
            <p className="date">{props.deadline}</p>
          </div>
        }
        
        <div style={{ marginTop: '-10px', float: 'right' }}>
          {props.tags.map((T, idx) => {
            return(
              <Tag color={ColorPallet[idx]} style={{ color: '#60B158', fontFamily: 'arial', fontWeight: 'bold', fontSize: '14px' }}>{T}</Tag>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
