import Task from '../../main/Task';
import './listtask.scss';
import { Row, Col } from 'antd';

export default function ListTasks(props) {
    return (
        <div>
            <div className="list-task-contain">
                <h1>{props.name}</h1>
                <div className="tasks-contain">
                    {props.list.map((task) => {
                        if (task.workspace === props.id)
                        return (
                            <Col span={6}>
                                <Task 
                                    key={task.id} 
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
                </div>
            </div>
        </div>
    )
}