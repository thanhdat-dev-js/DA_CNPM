import React, { useState, useContext } from 'react';
import { Button, Input } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, SendOutlined } from '@ant-design/icons';
import CommentItem from './CommentItem';
import { AppContext } from '../../context/AppProvider';
import { AuthContext } from '../../context/AuthProvider';
import { addDocument, deleteDocumentById, editDocumentById } from '../../firebase/service';
import { serverTimestamp } from 'firebase/firestore';
import useFirebase from '../../hook/useFirebase';

const { TextArea } = Input;

// const comment = { // Expected data model 
//   id, content, timestamp, uid, tid, 
//   person: { uid, name, avaUrl },
// }

function isAuthorized(auser, acomment) {
  return auser.uid === acomment.uid;
}

export default function TestComment() {
  const { curTask, memberList } = useContext(AppContext);

  // TODO: fetch current User
  const {user : userInfo } = useContext(AuthContext);
  const {displayName: name, photoURL: avaUrl, uid} = userInfo;
  const user = {name, avaUrl, uid};
  
  // TODO: get live comments
  const commentListCondition = React.useMemo(() => (
    {
      fieldName: "tid",
      operator: "==",
      compareValue: curTask.id
    }
  ), [curTask.id]);
  const commentList = useFirebase('comment', commentListCondition);
  
  const commentAdapter = (acomment) => {
    const author = memberList.find((member) => member.uid === acomment.uid) || {}
    author.avaUrl = author.avaURL;
    return {
      ...acomment,
      person: author,
    };
  }
  const comments = commentList.map(commentAdapter).sort((a, b) => a.timestamp - b.timestamp);

  // TODO: Presentation layer
  const [value, setValue] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [collapse, setCollapse] = useState(true);
  const handleChange = (e) => {
    setValue(e.target.value);
  }
  
  // TODO: Controller
  const handleDelete = (victim) => {
    if (victim.uid !== user.uid) // TODO: delete from DB
      return;
    deleteDocumentById('comment', victim.id);
  }
  const handleModify = (victim, newContent) => {
    if (victim.uid !== user.uid) // TODO: update DB
      return;
    const newComment = commentList.find(c => c.id === victim.id) || {};
    newComment.content = newContent;
    editDocumentById('comment', victim.id, newComment);
  }
  const handleSubmit = async () => {
    if (!value)
      return;
    setSubmitting(true);
    await addDocument('comment', {
      content: value,
      timestamp: serverTimestamp(),
      uid: user.uid,
      person: user,
      tid: curTask.id
    });
    setSubmitting(false);
    setValue("");
  }

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
          {comments.map((acomment, index) => <CommentItem
            key={acomment.id}
            comment={acomment}
            index={index}
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