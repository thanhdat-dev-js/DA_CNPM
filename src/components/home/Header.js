import React, { useState } from 'react';
import { getAuth, signOut } from '@firebase/auth';
import { Avatar, Image, Divider, Tooltip, Button, Modal, Form, Input, Radio } from 'antd';
import { SearchOutlined, UserOutlined, AntDesignOutlined, ExportOutlined } from '@ant-design/icons';

import './header.scss';

export default function Header({ name }) {

  let Members = [
    { name: "Hoang Lam", key: "L" },
    { name: "Hoang Phuc", key: "P" },
    { name: "Thanh Dat", key: "D" },
    { name: "Dieu Ai", key: "A" },
    { name: "Phuc Thinh", key: "T" }
  ]

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  return (
    <div className="header">
      <div className="header-left">
        <h1>Team 1</h1>
      </div>
      <div className="header-center">
        <Avatar.Group maxCount={2} size="large" maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
          {
            Members.map((item) => (
              <Tooltip key={item.name} title={item.name} placement="top">
                <Avatar style={{ backgroundColor: '#1890ff' }} >{item.key}</Avatar>
              </Tooltip>
            )
            )

          }
        </Avatar.Group>

        <Button type="dashed" onClick={showModal}>
          +  New Member
        </Button>

        <Modal title="Add New Member" visible={isModalVisible} width="400px" onOk={handleOk} onCancel={handleCancel}>
          <Input
            placeholder="@Username"
          />
        </Modal>
      </div>

      <div className="header-right">
        <Avatar size="large" style={{ color: '#f56a00', backgroundColor: '#fde3cf', marginLeft: "10px" }}>A</Avatar>
      </div>
    </div>
  )
}
