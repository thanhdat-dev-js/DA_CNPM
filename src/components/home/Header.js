import React, { useState } from 'react';
import { Avatar, Image, Divider, Tooltip, Button, Modal, Form, Input, Radio } from 'antd';
import { SearchOutlined , UserOutlined, AntDesignOutlined } from '@ant-design/icons';

import './header.scss';

export default function Header( {name} ) {

  let Members = [
    {name:"Hoang Lam", key: "L"},
    {name:"Hoang Phuc", key: "P"},
    {name:"Thanh Dat", key: "D"},
    {name:"Dieu Ai", key: "A"},
    {name:"Phuc Thinh", key: "T"}
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

  const [keyword, setKeyword] = useState('');
    
    function handleInputChange(e) {
        setKeyword(e.target.value)
    }


  return (
    <div className="header">
        <div className="header-left">
          <h1> {name}</h1>
        </div>

        <div className="header-center">
            <Avatar.Group maxCount={3} size="large" maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                 {
                    Members.map((item) => (
                    <Tooltip title={item.name} placement="top">  
                      <Avatar style={{ backgroundColor: '#1890ff' }} >{item.key}</Avatar>
                    </Tooltip>
                      )
                    )
                
                 }
            </Avatar.Group>

            <Button type="dashed" onClick={showModal}>
            +  New Workspace
            </Button>

            <Modal title="Add New Member" visible={isModalVisible} width="400px" onOk={handleOk} onCancel={handleCancel}>
            <Input
            value={keyword}
            onChange={handleInputChange}
            placeholder="@Username"
            />
            </Modal>
        </div>
        
        <div className="header-right">
          <div> 
          <Input.Search
            value={keyword}
            onChange={handleInputChange}
            style={{ width: 200 }}
            placeholder="Search"
            />
          
          </div>
          <Avatar size="large" style={{ color: '#f56a00', backgroundColor: '#fde3cf', marginRight: "5px"}}>A</Avatar>
        </div>
    </div>
  )
}
