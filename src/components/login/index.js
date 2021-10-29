import React from 'react';
import { Row, Col, Typography, Button } from 'antd';
import { signInWithPopup, GoogleAuthProvider, getAuth, FacebookAuthProvider, getAdditionalUserInfo } from "firebase/auth";
import { addDocument } from '../../firebase/service';
import { serverTimestamp } from 'firebase/firestore';

const ggProvider = new GoogleAuthProvider();
// const fbProvider = new FacebookAuthProvider();

const { Title } = Typography;

export default function Login() {
  const auth = getAuth();
  const handleGgLogin = () => {
    try {
      signInWithPopup(auth, ggProvider)
        .then(data => {
          if (getAdditionalUserInfo(data).isNewUser) {
            addDocument("person", {
              email: data.user.email,
              name: data.user.displayName,
              avaURL: data.user.photoURL,
              workSpaceIdList: [],
              taskIdList: [],
              createdAt: serverTimestamp()
            })
          }
        })
    }
    catch (err) {
      console.log(err)
    }
  }
  // const handleFbLogin = () => {
  //   signInWithPopup(auth, fbProvider)
  //     .then(data => {
  //       console.log(data);
  //     })
  // }
  return (
    <div>
      <Row justify="center" style={{ height: '100vh' }}>
        <Col span={8}>
          <Title style={{ textAlign: "center" }} level={3} >DACNPM</Title>
          <Button style={{ width: "100%", marginBottom: 5 }}
            onClick={handleGgLogin}>
            Đăng nhập bằng Google</Button>
          {/* <Button style={{ width: "100%", marginBottom: 5 }}
            onClick={handleFbLogin}>
            Đăng nhập bằng Facebook</Button> */}
        </Col>
      </Row>
    </div>
  )
}
