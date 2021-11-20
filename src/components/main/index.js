import React, { useState } from 'react';
import "./main.scss";
import Column from './Column';
import { Modal, Button, Input } from 'antd';
import { AppContext } from '../../context/AppProvider';
import { addDocument, editDocumentById } from '../../firebase/service';
import { serverTimestamp } from 'firebase/firestore';
import { ViewContext } from '../../context/ViewProvider';

export default function Main() {
  const { columns, tasks } = React.useContext(AppContext);
  const {sortedTasks} = React.useContext(ViewContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [input, setInput] = useState('');
  const { selectWorkspace } = React.useContext(AppContext);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = async () => {
    const id = await addDocument('column', {
      name: input,
      taskIdList: [],
      createdAt: serverTimestamp()
    })
    if (id) {
      console.log(selectWorkspace.columnIdList)
      if (selectWorkspace.columnIdList === undefined || selectWorkspace.columnIdList === []) {
        editDocumentById('workspace', selectWorkspace.id, {
          columnIdList: [id]
        })
      }
      else {
        editDocumentById('workspace', selectWorkspace.id, {
          columnIdList: [...selectWorkspace.columnIdList, id]
        })
      }
    }
    setInput('');
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div className="main">
      {columns.map((column) => {
        return (
          <Column key={column.id} id={column.id} name={column.name} taskIdList={column.taskIdList} tasks={sortedTasks} />
        )
      })}
      <div className="button-wrapper">
        <Button type="dashed" size="large" onClick={showModal} style={{color: "#1890ff"}}> + Create Column</Button>
      </div>
      <Modal title="Create new column" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Input value={input} placeholder="Enter column name" onChange={(e) => setInput(e.target.value)} />
      </Modal>
    </div>

  )
}
