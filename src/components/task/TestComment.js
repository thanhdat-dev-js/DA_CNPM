import { useState } from 'react';
import { Button, Input } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, SendOutlined } from '@ant-design/icons';
import CommentItem from './CommentItem';

const { TextArea } = Input;

// TODO: remove default value

// const comment = { // Expected data model
//   id,
//   content,
//   timestamp,
//   uid,
//   person { 
//     uid,
//     name,
//     avaUrl
//   }
// }

function isAuthorized(auser, acomment) {
  return true;
  return auser.uid === acomment.uid;
}

export default function TestComment() {
  const defaultUser = {
    uid: 119,
    avaUrl: "https://picsum.photos/300",
    name: "Sa"
  }

  const defaultComment = {
    person: {
      uid: 911,
      avaUrl: "https://picsum.photos/200",
      name: "Nguyễn Hữu Phúc"
    },
    id: 123,
    content: "Làm lẹ cho xong cái comment đi",
    uid: 911,
    timestamp: "Fri Nov 05 2021 15:00:33 GMT+0700 (Indochina Time)"
  }
  
  // TODO: fetch current User
  const user = defaultUser;
  const [value, setValue] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [comments, setComments] = useState([defaultComment]);

  const newComment = {
    person: user,
    id: Date.now(),
    uid: user.uid,
    content: value,
    timestamp: Date(),
  }

  const handleDelete = (victim) => {
    if (victim.uid !== user.uid) // TODO: delete from DB
      return;
    setComments(comments.filter(c => c.id !== victim.id))
    console.log("Delete " + victim);
  }
  const handleModify = (victim, newContent) => {
    if (victim.uid !== user.uid) // TODO: update DB
      return;
    setComments(comments.map(c =>
      (c.id === victim.id) ? Object.assign(c, { content: newContent }) : c
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
      setSubmitting(false);
    }, 500);
  }

  const [collapse, setCollapse] = useState(true);
  return (<>
    <div className="container-fluid comment-section">
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
            key={acomment.id}
            comment={acomment}
            onDelete={handleDelete}
            onModify={handleModify}
            mutable={isAuthorized(user, acomment)}
          />)}
        </div>
        <div className='d-flex'>
          <TextArea className='flex-grow-1 mb-1 me-1'
            value={value}
            onChange={handleChange} 
            onSubmit={handleSubmit}
            onPressEnter={handleSubmit}
            autoSize={{ minRows: 1, maxRows: 5 }}
            placeholder="Comment..."
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