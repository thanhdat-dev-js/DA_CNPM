import { Button } from 'antd';
import React from 'react';
import { Calendar } from 'antd';
import { Row, Col } from 'antd';
import "./dashboard.scss";
import Task from '../main/Task';
import "../main/task.scss";

const tasks = [
  {
    id: '1',
    name: "Do homework with some other things",
    deadline: "20/4/2021",
    progression: 20,
  },
  {
    id: '2',
    name: "Do exercise",
    deadline: "23/7/2021",
    progression: 50,
  },
  {
    id: '3',
    name: "Go to bed",
    deadline: "4/11/2021",
    progression: 60,
  },
  {
    id: '4',
    name: "Do homework with some other things",
    deadline: "20/4/2021",
    progression: 35,
  },
  {
    id: '5',
    name: "Do exercise",
    deadline: "23/7/2021",
    progression: 100,
  },
  {
    id: '6',
    name: "Go to bed",
    deadline: "4/11/2021",
    progression: 95,
  },
  {
    id: '5',
    name: "Do exercise",
    deadline: "23/7/2021",
    progression: 100,
  },
  {
    id: '6',
    name: "Go to bed",
    deadline: "4/11/2021",
    progression: 95,
  }
  , {
    id: '5',
    name: "Do exercise",
    deadline: "23/7/2021",
    progression: 100,
  },
  {
    id: '6',
    name: "Go to bed",
    deadline: "4/11/2021",
    progression: 95,
  }, {
    id: '5',
    name: "Do exercise",
    deadline: "23/7/2021",
    progression: 100,
  },
  {
    id: '6',
    name: "Go to bed",
    deadline: "4/11/2021",
    progression: 95,
  }
]


// export default function Dashboard() {
//   return (
//     <div className="dashboard">
//       <div >
//         <h1>This is a header</h1>
//       </div>
//       <div className="wrapper">
//         <div className="content">
//           <Row gutter={[16, 12]}>
//             {tasks.map((task) => {
//               return (
//                 <Col span={8}>
//                   <div className="task-wrapper">
//                     <Task key={task.id} name={task.name} progression={task.progression} deadline={task.deadline} />
//                   </div>
//                 </Col>
//               )
//             })}
//           </Row>
//         </div>
//         <div className="site-calendar">
//           <Calendar fullscreen={false} />
//         </div>
//       </div>
//     </div>
//   )
// }
export default function Dashboard({ openCTV, openVTV }) {
  return (
    <div className="dashboard">
      <h1>This is a dashboard</h1>
      <Button onClick={openCTV}>Create Task</Button>
      <Button onClick={openVTV}>View Task</Button>
      <br />
    </div>
  )
}

