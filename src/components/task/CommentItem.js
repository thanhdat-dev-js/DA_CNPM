import { useState } from 'react';
import { Modal, Comment, Avatar, Form, Button, Input as TextArea } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {timeSince} from './Utils'

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

export const Editor = ({ onChange, onSubmit, onCancel, submitting, value, placeholder, prompt }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} onPressEnter={onSubmit} placeholder={placeholder}/>
    </Form.Item>
    <Form.Item>
      { onSubmit &&
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
          {prompt}
        </Button>
      }{ onCancel &&
        <Button htmlType="submit" loading={submitting} onClick={onCancel} type="secondary">
          Cancel
        </Button>
      }
    </Form.Item>
  </>
);

export default function CommentItem({comment, mutable=false, onDelete, onModify}) {
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
    content: <Editor
      autoSize={{ minRows: 2, maxRows: 5 }}
      placeholder="Edit comment..."
      prompt="Save changes"
      value={tempValue}
      onChange={handleChange}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      onPressEnter={handleSubmit}
    />
  } 

  const displayModeParams = {
    author: <a className="font-weight-bold">{comment.person.name}</a>,
    datetime: timeSince(new Date(comment.timestamp)) + " ago",
    content: <p>{comment.content}</p>,
  }

  return (
    <div className={"container-fluid position-relative " + (
      active? "bg bg-secondary": "bg bg-light")}
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
        (active && mutable)? "": "d-none")}
      >
        <Button onClick={onDeleteClick}>Xoá</Button>
        <Button onClick={handleEditClick}>Sửa</Button>
      </div>
    </div>
  );
}