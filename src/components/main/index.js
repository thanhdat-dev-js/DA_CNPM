import React from 'react';
import "./main.scss";
import Column from './Column';
import { Button } from 'antd';
import { AppContext } from '../../context/AppProvider';
import { documentId } from '@firebase/firestore';
import useFirebase from '../../hook/useFirebase';

const columnmms = [
  {
    id: '1',
    name: "On Plan",
    taskIdList: ['1', '2'],
  },
  {
    id: '2',
    name: "On Progress",
    taskIdList: ['3'],
  },
  {
    id: '3',
    name: "On Finish",
    taskIdList: ['4', '5', '6'],
  },
];

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
  }
]

export default function Main() {
  const { columns, tasks } = React.useContext(AppContext);
  return (
    <div className="main">
      {columns.map((column) => {
        return (
          <Column key={column.id} name={column.name} taskIdList={column.taskIdList} tasks={tasks} />
        )
      })}
      <div className="button-wrapper">
        <Button type="dashed" size="large"> + Add Column</Button>
      </div>
    </div>
  )
}
