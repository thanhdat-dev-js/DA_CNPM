import DBTask from './DBTask';
import './listtask.scss';
import { Row, Col } from 'antd';

export default function ListTasks(props) {
    return (
        <div>
            <div className="list-task-contain">
                <div className="list-title">{props.name}</div>
                <div className="tasks-contain">
                    <Row gutter={[16, 8]}>
                    {props.list.map((task) => {
                        if (task.workspace === props.id)
                        return (
                            <Col key={task.id} span={6} className="gutter-row">
                                <DBTask 
                                    key={task.id} 
                                    id={task.id}
                                    task={task} 
                                    name={task.name} 
                                    progression={task.progression} 
                                    deadline={task.deadline} 
                                    priority={task.priority}
                                    tags={task.tag}
                                    memberIdList={task.memberIdList}
                                />
                            </Col>
                        )
                    })}
                    </Row>
                </div>
            </div>
        </div>
    )
}