import React from 'react';
import "./task.scss";
import { Card, Avatar, Progress, Tag } from 'antd';
import { AppContext } from '../../context/AppProvider';
import { ViewContext, Field } from '../../context/ViewProvider';
import { useContext } from 'react';

const ColorPallete = ['6px solid green', '6px solid orange', '6px solid red'];

export default function Task(props) {
  const { isFieldVisible } = useContext(ViewContext);
  const { curTask, setCurTask, setVisibleTask, memberList, DBmemberList, status } = React.useContext(AppContext);
  return (
    <div className="task-card-container">
      <Card
        hoverable
        bordered={true}
        style={{
          cursor: 'pointer', borderRadius: '5px',
          borderRight: (!isFieldVisible(Field.PRIORITY)) ? '' : props.priority === 'Low' ? ColorPallete[0] : (props.priority === 'Medium' ? ColorPallete[1] : ColorPallete[2])
        }}
        bodyStyle={{ padding: '4%', minheight: '150px' }}
        onClick={async () => {
          await setCurTask({ ...props.task });
          setVisibleTask(true);
        }}
      >
        {/* {console.log(status)} */}
        <div style={{ display: 'flex' }}>
          <p className="title">{props.name}</p>
          {(isFieldVisible(Field.MEMBER)) &&
            <Avatar.Group style={{ marginLeft: 'auto', marginRight: 0 }}>
              {memberList.map((member) => {
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
          <div style={{ marginTop: '5px' }}>
            <p className="date">{props.deadline}</p>
          </div>
        }

        <div style={{ marginTop: '0px', float: 'right' }}>
          {props.tags.map((T, idx) => {
            return (

              <Tag style={{ fontFamily: 'arial', fontWeight: 'bold', fontSize: '14px' }}>{T.length > 7 ? T.slice(0, 7) + '...' : T}</Tag>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
