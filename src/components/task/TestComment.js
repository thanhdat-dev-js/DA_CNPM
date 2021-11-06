import { useState } from 'react';
import { Collapse } from 'antd';
import CommentItem, { Editor } from './CommentItem';

const { Panel } = Collapse;

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
    setTimeout(() => {
      setSubmitting(false);
    }, 500);

    console.log("Submitting to server: " + value);
    setComments([...comments, newComment]);

    setValue("");
    setSubmitting(true);
  }

  return (<>
    <div className="fluid-container">
      <Collapse defaultActiveKey={['0']}>
        <Panel header={comments.length + " bình luận"} key="1">
          {comments.map((acomment) => <CommentItem
            key={acomment.commentId}
            comment={acomment}
            onDelete={handleDelete}
            onModify={handleModify}
            mutable={isAuthorized(user, acomment)}
          />)}

          <Editor
            placeholder="Bình luận ..."
            prompt="Gửi"
            autoSize={{ minRows: 2, maxRows: 5 }}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onPressEnter={handleSubmit}
            submitting={submitting}
            value={value}
          />
        </Panel>
      </Collapse>
    </div>
  </>);
}