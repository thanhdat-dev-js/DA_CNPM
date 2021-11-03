import React, { useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useHistory, Route, Link, Switch } from "react-router-dom";
import { signOut, getAuth } from 'firebase/auth';
import { Input, Col, Row, Button, Modal } from 'antd';
import { DatePicker, Menu, Dropdown, message, Tag, Slider, Select } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import moment from 'moment';
import UpdateTask from './UpdateTask';
import './index.scss';

const dateFormat = 'DD/MM/YYYY';

let Members = [
    {name:"Hoang Lam", id: "a1"},
    {name:"Hoang Phuc", id: "a2"},
    {name:"Thanh Dat", id: "a3"},
    {name:"Dieu Ai", id: "a4"},
    {name:"Phuc Thinh", id: "a5"}
]

const Title = 'Hello';

const CreateDate = '2/12/2021';
const Deadline = '4/12/2021';
const Name = "Dieu Ai";
const initPrio = "Medium"
const initTag = ['OS', 'Assignment'];
let AA = ['Hoang Phuc', 'Hoang Lam']; 
const initProg = 40;
const initDesc = 'Sample Text Sample Text Sample Text Sample Text Sample Text';

export default function ViewTask() {
    const nameForm = useRef(null);
    const {taskID} = useParams();
    const history = useHistory();
    const { TextArea } = Input;
    const { Option } = Select;
    const [priority, setPriority] = useState(initPrio);
    const [tags, setTags] = useState(initTag);
    const [visibleDBox, setVisibleDBox] = useState(false);

    function handleAA (value){
        AA = value;
    }

    return (
        <form className="task-container" ref={nameForm} >
            {/* Title */}
            <Row style={{marginTop: '10px', marginBottom: '10px'}} align={'middle'}>
                <Col span={15}>
                    <Input disabled={true} defaultValue={Title} name={'task-name'} placeholder="Title" size="large" bordered={false} style={{paddingLeft: 0, fontSize: '25px', fontWeight:'bold'}} />
                </Col>
                <Col style={{marginLeft: '130px', marginRight: '10px'}} >
                    <Button><Link to={`/${taskID}/u`}><EditOutlined /></Link></Button>
                </Col>
                <Col style={{marginLeft: '10px'}}>
                    <Button onClick={() => setVisibleDBox(true)}><DeleteOutlined /></Button>
                </Col>
            </Row>

            <Modal
                title="Delete Task"
                centered
                visible={visibleDBox}
                onOk={() => {
                    setVisibleDBox(false);
                    history.replace("/");
                }}
                onCancel={() => setVisibleDBox(false)}
            >
                <h1>Do you want to delete this Task</h1>
            </Modal>

            {/* Date & Deadline */}
            <Row style={{marginTop: '10px', marginBottom: '10px' }}>
                <Col span={4}>Create Date:</Col>
                <Col span={5}>
                    <DatePicker name={'cdate'} defaultValue={moment(CreateDate, dateFormat)} format={dateFormat} disabled= {true}/>
                </Col>
                <Col span={4} style={{marginLeft: '20px'}}>Deadline:</Col>
                <Col span={5}>
                    <DatePicker name={'ddate'} defaultValue={moment(Deadline, dateFormat)} format={dateFormat} disabled= {true}/>
                </Col>
            </Row>

            {/* Creator & Priority */}
            <Row style={{marginTop: '10px', marginBottom: '10px' }}>
                <Col span={4}>Create By:</Col>
                <Col span={5}><Input disabled='true' value={Name}/></Col>  
                <Col span={4} style={{marginLeft: '20px'}}>Priority:</Col>
                <Col span={5}>
                    <Dropdown disabled={true}>
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
                        disabled={true}
                    >
                    <span> {isLongTag ? `${tag.slice(0, 7)}...` : tag} </span>
                    </Tag>
                    );
                    return tagElem;
                    })}
            </Row>

            {/* Assigns */}
            <Row style={{marginTop: '10px', marginBottom: '10px' }}>
                <Col span={4}>Assign to:</Col>
                <Col >
                    <Select
                        name = {'assign'}
                        mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="Select person/people to assign"
                        defaultValue={AA}
                        optionLabelProp="label"
                        onChange = {handleAA}
                        disabled={true}
                        style={{minWidth: '100px'}}
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
                <TextArea disabled={true} defaultValue={initDesc} placeholder="Description" autoSize={{ minRows: 5, maxRows: 10 }} name={'task-desc'}/>
            </Row>
                
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button type="primary">Comment</Button>
                <Button type="secondary"  style={{marginLeft: '30px'}}><Link to={`/`}>Cancel</Link></Button>
            </div>
        </form>
    )
}