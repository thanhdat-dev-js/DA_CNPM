import React, { useEffect, useRef, useState } from 'react';
import { signOut, getAuth } from 'firebase/auth';
import { Input, Col, Row, Button } from 'antd';
import { DatePicker, Menu, Dropdown, message, Tag, Tooltip, Slider, Select } from 'antd';
import { Link } from 'react-router-dom';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import moment from 'moment';
import './index.scss';

const dateFormat = 'DD/MM/YYYY';

function getDay(){
    let newDate = new Date()
    let date_raw = newDate.getDate();
    let month_raw = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return date_raw  + "/" + month_raw +  "/" + year
}

let Members = [
    {name:"Hoang Lam", id: "a1"},
    {name:"Hoang Phuc", id: "a2"},
    {name:"Thanh Dat", id: "a3"},
    {name:"Dieu Ai", id: "a4"},
    {name:"Phuc Thinh", id: "a5"}
]


const Title = '';
const CreateDate = getDay();
const Name = "Dieu Ai";
const initPrio = "Low"
const initTag = [];
let AA = []; 
const initProg = 0;
const initDesc = '';

export default function CreateTask() {
    const nameForm = useRef(null);
    const { TextArea } = Input;
    const { Option } = Select;
    const [priority, setPriority] = useState(initPrio);
    const [tags, setTags] = useState(initTag);
    const [visibleTagInput, setVisibleTagInput] = useState(false);

    function tagClose (removedTag) {
        setVisibleTagInput(false);
        const ttags = tags.filter(tag => tag !== removedTag);
        setTags(ttags);
    };

    function showTagInput(){
        setVisibleTagInput(true);
    };
    
    function handleInputConfirm(e){
        if(e.target.value != "" && !tags.includes(e.target.value)){
            tags.push(e.target.value);
        }
        setVisibleTagInput(false);       
    };

    function handleAA (value){
        AA = value;
    }

    const p = (
        <Menu onClick={(e) => {setPriority(e.key)}}>
          <Menu.Item key="Low">Low</Menu.Item>
          <Menu.Item key="Medium">Medium</Menu.Item>
          <Menu.Item key="High">High</Menu.Item>
        </Menu>
    );

    function getData(){
        const form = nameForm.current;
        if (form['task-name'].value == ''){
            message.error('Please enter task name');
        }
        console.log(`Task Name: ${form['task-name'].value}`);
        console.log(`Task Create Date: ${CreateDate}`);
        console.log(`Task Deadline: ${form['ddate'].value}`);
        if(AA == []){
            message.error('Please choose the assignee(s)');
        }
        console.log(AA);
        console.log(`Task Priority: ${priority}`);
        console.log(`Task Desc: ${form['task-desc'].value}`);
        
    }

    return (
        <form className="task-container" ref={nameForm} >
            {/* Title */}
            <Row style={{marginTop: '10px', marginBottom: '10px' }}>
                <Col span={15}>
                    <Input  defaultValue={Title} name={'task-name'} 
                            placeholder="Title" size="large" bordered={false}  
                            style={{paddingLeft: 0, fontSize: '25px', fontWeight:'bold'}}/>
                </Col>
            </Row>

            {/* Date & Deadline */}
            <Row style={{marginTop: '10px', marginBottom: '10px' }}>
                <Col span={4}>Create Date:</Col>
                <Col span={5}>
                    <DatePicker name={'cdate'} defaultValue={moment(CreateDate, dateFormat)} format={dateFormat} disabled= {true}/>
                </Col>
                <Col span={4} style={{marginLeft: '20px'}}>Deadline:</Col>
                <Col span={5}>
                    <DatePicker name={'ddate'} format={dateFormat} />
                </Col>
            </Row>

            {/* Creator & Priority */}
            <Row style={{marginTop: '10px', marginBottom: '10px' }}>
                <Col span={4}>Create By:</Col>
                <Col span={5}><Input disabled='true' value={Name}/></Col>  
                <Col span={4} style={{marginLeft: '20px'}}>Priority:</Col>
                <Col span={5}>
                    <Dropdown overlay={p}>
                        <Button> {priority} </Button>
                    </Dropdown>
                </Col>
            </Row>

            {/* Tag */}
            <Row style={{marginTop: '10px', marginBottom: '10px' }}>
                <Col span={4}>Tag:</Col>
                    {tags.map((tag) => {
                    const isLongTag = tag.length > 10;
                    const tagElem = (
                    <Tag
                        className="edit-tag"
                        key={tag}
                        closable= 'true'
                        onClose={() => tagClose(tag)}
                    >
                    <span> {isLongTag ? `${tag.slice(0, 7)}...` : tag} </span>
                    </Tag>
                    );
                    return tagElem;
                    })}
                <Col>
                    {(visibleTagInput && tags.length < 4) ? (
                        <Input
                            type="text"
                            size="small"
                            className="tag-input"
                            onBlur={(e) => handleInputConfirm(e)}
                            onPressEnter={(e) => handleInputConfirm(e)}
                            placeholder = 'Enter @Tag'
                        />
                    ) 
                    :
                    (
                        (tags.length < 4 &&
                        <Tag className="site-tag-plus" onClick={showTagInput}>
                            <PlusOutlined /> New Tag
                        </Tag>)
                    )}
                </Col>
            </Row>

            {/* Assigns */}
            <Row style={{marginTop: '10px', marginBottom: '10px' }}>
                <Col span={4}>Assign to:</Col>
                <Col span={15}>
                    <Select
                        name = {'assign'}
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Select person/people to assign"
                        defaultValue={AA}
                        optionLabelProp="label"
                        onChange = {handleAA}
                    >
                        {Members.map(member => {
                            return <Option value={member.name}>{member.name}</Option>
                        })}
                    </Select>
                </Col>
            </Row>

            {/* Progression */}
            <Row style={{marginTop: '10px', marginBottom: '10px' }}>
                <Col span={4}>Progression:</Col>
                <Col span={8}>
                    <Slider defaultValue={initProg} disabled='true' />
                </Col>
                <Col span={3}>
                    <Input defaultValue={initProg} disabled='true' suffix="%"/>
                </Col>
                
            </Row>

            {/* Description */}
            <Row style={{marginTop: '10px', marginBottom: '10px' }}>
                Description:
            </Row>
            
            {/* DescTextArea */}
            <Row style={{marginTop: '10px', marginBottom: '10px' }}>
                <TextArea defaultValue={initDesc} placeholder="Description" autoSize={{ minRows: 5, maxRows: 10 }} name={'task-desc'}/>
            </Row>
                
            <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '10px'}}>
                <Button type="primary" onClick={getData}>Create</Button>
                <Button type="secondary" href='/' style={{marginLeft: '30px'}}>Cancel</Button>
            </div>
        </form>
    )
}