import React from 'react';
import "./task.scss";
import { Card, Avatar, Progress, Tag } from 'antd';
import { AppContext } from '../../context/AppProvider';
import { ViewContext, Field } from '../../context/ViewProvider';
import { useContext } from 'react';

const ColorPallet = ["#f0f8ef", "#f4f8af","#f0f8ef", "#f0f8ef"];

export default function Task(props) {
  const {isFieldVisible} = useContext(ViewContext);
  const { curTask, setCurTask, setVisibleTask, memberList, memberDashboard, status } = React.useContext(AppContext);
  return (
    <div className="task-card-container">
      <Card
        hoverable
        bordered={true}
        style={{ cursor: 'pointer', borderRadius: '5px',
        borderRight: (!isFieldVisible(Field.PRIORITY)) ? '' : props.priority === 'Low' ? '6px solid green' : ( props.priority === 'Medium' ? '6px solid orange' : '6px solid red')  }}
        bodyStyle={{ padding: '4%', minheight: '150px'}}
        onClick={async () => {
          await setCurTask({ ...props.task });
          setVisibleTask(true);
        }}
      >
        {console.log(status)}
        <div style={{ display: 'flex' }}>
          <p className="title">{props.name}</p>
          {(isFieldVisible(Field.MEMBER)) && 
          <Avatar.Group style={{ marginLeft: 'auto', marginRight: 0 }}>
            {status === 'dashboard' ? memberDashboard.map((member) => {
              if (props.memberIdList.includes(member.uid))
                return (
                  <Avatar key={member.uid} src={member.avaURL} />
                )
            }) : 
            memberList.map((member) => {
              if (props.memberIdList.includes(member.uid))
                return (
                  <Avatar key={member.uid} src={member.avaURL} />
                )
            })}
          </Avatar.Group>
          }
        </div>
        {isFieldVisible(Field.PROGRESS) &&
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
        }
        {
          isFieldVisible(Field.DEADLINE) && 
          props.deadline !== "" &&
          <div style={{ marginTop: '5px'}}>
            <p className="date">{props.deadline}</p>
          </div>
        }
        
        <div style={{ marginTop: '0px', float: 'right'  }}>
          {props.tags.map((T, idx) => {
            return(
              <Tag color={ColorPallet[idx]} style={{ color: '#60B158', fontFamily: 'arial', fontWeight: 'bold', fontSize: '14px' }}>{T.length > 7 ? T.slice(0, 7) + '...' : T}</Tag>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
