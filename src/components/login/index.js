import React from 'react';
import { Button } from 'antd';
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import { signInWithPopup, GoogleAuthProvider, getAuth, FacebookAuthProvider, getAdditionalUserInfo } from "firebase/auth";
import { addDocument, generateKeywords } from '../../firebase/service';
import { serverTimestamp } from 'firebase/firestore';
import logo from './logoDelta.png';
import './index.scss';

const auth = getAuth();
const ggProvider = new GoogleAuthProvider();
const fbProvider = new FacebookAuthProvider();

export default function Login() {
  const handleGgLogin = () => {
    try {
      signInWithPopup(auth, ggProvider)
        .then(data => {
          if (getAdditionalUserInfo(data).isNewUser) {
            addDocument("person", {
              email: data.user.email,
              name: data.user.displayName,
              avaURL: data.user.photoURL,
              createdAt: serverTimestamp(),
              uid: data.user.uid,
              keywords: generateKeywords(data.user.displayName?.toLowerCase()),
            })
          }
        })
        .catch(err => console.log(err));
    }
    catch (err) {
      console.log(err)
    }
  }
  const handleFbLogin = () => {
    signInWithPopup(auth, fbProvider)
      .then(data => {
        if (getAdditionalUserInfo(data).isNewUser) {
          addDocument("person", {
            email: data.user.email,
            name: data.user.displayName,
            avaURL: data.user.photoURL,
            createdAt: serverTimestamp(),
            uid: data.user.uid,
            keywords: generateKeywords(data.user.displayName?.toLowerCase()),
          })
        }
      })
      .catch(err => console.log(err));
  }
  return (
    <div className="wrapper">
      <div className="login-wrapper">
        <div className="image-wrapper">
          <img
            src={logo} alt=""
            style={{
              borderRadius: '50%',
              width: '200px',
              height: '200px',
              border: '5px solid #1890ff'
            }}
          />
        </div>

        <div className="btn-wrapper">
          <Button
            style={{
              width: "350px",
              height: "40px",
              marginBottom: 7,
              background: '#4285f4',
              color: 'white',
              fontSize: '16px'
            }}
            onClick={handleGgLogin}
          >
            <GoogleOutlined style={{ fontSize: '18px' }} />Đăng nhập bằng Google
          </Button>
        </div>

        <div className="btn-wrapper">
          <Button
            style={{
              width: "350px",
              marginBottom: 7,
              height: "40px",
              background: '#3b5998',
              color: 'white',
              fontSize: '16px'
            }}
            onClick={handleFbLogin}
          >
            <FacebookOutlined style={{ fontSize: '18px' }} />Đăng nhập bằng Facebook
          </Button>
        </div>
      </div>
    </div>
  )
}
