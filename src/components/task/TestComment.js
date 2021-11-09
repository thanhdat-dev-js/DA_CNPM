import { useState } from 'react';
import { Button, Input } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, SendOutlined } from '@ant-design/icons';
import CommentItem from './CommentItem';

const { TextArea } = Input;

// TODO: remove default value
const defaultUser = {
  personId: 119,
  avaUrl: "https://picsum.photos/300",
  name: "Sa"
}

const defaultComment = {
  person: {
    personId: 911,
    avaUrl: "https://picsum.photos/200",
    name: "Nguyễn Hữu Phúc"
  },
  commentId: 123,
  content: "Làm lẹ cho xong cái comment đi",
  personId: 911,
  timestamp: "Fri Nov 05 2021 15:00:33 GMT+0700 (Indochina Time)"
}

function isAuthorized(auser, acomment) {
  return auser.personId === acomment.personId;
}

export default function TestComment() {
  // TODO: fetch current User
  const user = defaultUser;
  const [value, setValue] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [comments, setComments] = useState([defaultComment]);

  const newComment = {
    person: user,
    commentId: Date.now(),
    personId: user.personId,
    content: value,
    timestamp: Date(),
  }

  const handleDelete = (victim) => {
    if (victim.personId !== user.personId) // recheck at serverside
      return;
    setComments(comments.filter(c => c.commentId !== victim.commentId))
    console.log("Delete " + victim);
  }
  const handleModify = (victim, newContent) => {
    if (victim.personId !== user.personId) // recheck at serverside
      return;
    setComments(comments.map(c =>
      (c.commentId === victim.commentId) ? Object.assign(c, { content: newContent }) : c
    ))
    console.log("Edit " + newContent);
  }
  const handleChange = (e) => {
    setValue(e.target.value);
  }
  const handleSubmit = () => {
    if (!value)
      return;
    // TODO: fetch comment from server
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      console.log("Submitting to server: " + value);
      setComments([...comments, newComment]);
      setValue("");
    }, 500);
  }

  const [collapse, setCollapse] = useState(true);
  return (<>
    <div className="container">
      <Button
        onClick={() => setCollapse(!collapse)}
        type="primary"
        className="mb-2"
      >
        Comment ({comments.length})
        {collapse ? <CaretDownOutlined /> : <CaretUpOutlined />}
      </Button>
      <br/>

      <div className={collapse ? "d-none" : ""}>
        <div className='mb-2'>
          {comments.map((acomment) => <CommentItem
            key={acomment.commentId}
            comment={acomment}
            onDelete={handleDelete}
            onModify={handleModify}
            mutable={isAuthorized(user, acomment)}
          />)}
        </div>
        <div className='d-flex'>
          <TextArea className='flex-grow-1'
            value={value}
            onChange={handleChange} 
            onSubmit={handleSubmit}
            onPressEnter={handleSubmit}
            autoSize={{ minRows: 1, maxRows: 5 }}
            placeholder="Comment..."
            className='mb-1 me-1'
          />
          <Button
            loading={submitting}
            onClick={handleSubmit}
            type="primary">
            <SendOutlined />
          </Button>
        </div>
      </div>
    </div>
  </>);
}