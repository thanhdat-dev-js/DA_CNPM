import { Modal, Comment, Avatar, Button, Input } from 'antd';
import { EnterOutlined, ExclamationCircleOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { timeSince } from './Utils'

const { TextArea } = Input;
const { confirm } = Modal;

function showConfirm(okCallback, cancelCallback) {
  confirm({
    title: 'Do you want to delete this comment?',
    icon: <ExclamationCircleOutlined />,
    onCancel() {
      if (cancelCallback)
        cancelCallback()
    },
    onOk() {
      if (okCallback)
        okCallback();
    }
  });
}

export default function CommentItem({comment, mutable, onDelete, onModify}) {
  const [tempValue, setTempValue] = useState("");
  const [active, setActive] = useState(false);
  const [editMode, setEditMode] = useState(false);
  
  const onDeleteClick = () => {
    showConfirm(() => onDelete(comment));
  }
  const handleEditClick = () => {
    setTempValue(comment.content);
    setEditMode(true);
  }
  const handleChange = (e) => {
    setTempValue(e.target.value);
  }
  const handleSubmit = () => {
    if (!tempValue)
      return;
    onModify(comment, tempValue);
    setEditMode(false);
  }
  const handleCancel = () => {
    setEditMode(false);
  }
  
  const editModeParams = {
    content: <div>
      <TextArea 
        value={tempValue}
        onChange={handleChange}
        onPressEnter={handleSubmit}
        autoSize={{ minRows: 2, maxRows: 5 }}
        placeholder='Edit comment'
        className='my-1'
      />
      <Button 
        onClick={handleCancel} 
        htmlType="submit" type='default'
        className='me-1'>
        Cancel
      </Button>
      <Button
        // loading={false} TODO:
        onClick={handleSubmit} 
        htmlType="submit" type="primary">
        Save <EnterOutlined />
      </Button>
    </div>
  } 
  
  const displayModeParams = {
    author: <h4 className='text-secondary'>{comment.person.name}</h4>,
    datetime: <span className='text-secondary'>{timeSince(new Date(comment.timestamp)) + " ago"}</span>,
    content: <p>{comment.content}</p>,
  }

  return (
    <div className={"container-fluid position-relative " + (
      active? "bg bg-dark": "bg bg-light")}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onMouseOver={() => setActive(true)}
    >
      <Comment
        avatar={<Avatar src={comment.person.avaUrl} alt=""/>}
        {...(editMode? editModeParams: displayModeParams)}
      >
      </Comment>
      <div className={"position-absolute top-0 end-0 translate-middle " + (
        (active && mutable)? "": "d-none")}>
        <Button
          onClick={onDeleteClick}
          icon={<DeleteOutlined />}
        />
        <Button
          onClick={handleEditClick}
          icon={<EditOutlined />}
        />
      </div>
    </div>
  );
}