import React, { useRef, useState } from 'react';
import { useParams } from 'react-router';
import { useHistory, Route, Link, Switch } from "react-router-dom";
import { signOut, getAuth } from 'firebase/auth';
import { Input, Col, Row, Button, Modal } from 'antd';
import { DatePicker, Menu, Dropdown, message, Tag, Slider, Select } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import moment from 'moment';
import './index.scss';
import TestComment from './TestComment';

const dateFormat = 'DD/MM/YYYY';

let Members = [
    {name:"Hoang Lam", id: "a1"},
    {name:"Hoang Phuc", id: "a2"},
    {name:"Thanh Dat", id: "a3"},
    {name:"Dieu Ai", id: "a4"},
    {name:"Phuc Thinh", id: "a5"}
]

// Data got from DB
const initTitle = 'Hello';
const CreateDate = '2/12/2021';
const Deadline = '4/12/2021';
const Name = "Dieu Ai";
const initPrio = "Medium"
const initTag = ['OS', 'Assignment'];
const AssignA = ['a1', 'a3']; 
const initProg = 40;
const initDesc = 'Sample Text Sample Text Sample Text Sample Text Sample Text';

export default function ViewTask() {
    const nameForm = useRef(null);
    const { taskID } = useParams();
    const history = useHistory();
    const { TextArea } = Input;
    const { Option } = Select;

    const [PrevTitle, setPT] = useState(initTitle);
    const [title, setTitle] = useState(initTitle);

    const [prevDl, setPDL] = useState(Deadline);
    const [dl, setDl] = useState(Deadline);

    const [prevPrio, setPP] = useState(initPrio);
    const [priority, setPriority] = useState(initPrio);

    const [prevT, setPTag] = useState(initTag);
    const [tags, setTags] = useState(initTag);
    const [visibleTagInput, setVisibleTagInput] = useState(false);
    
    const [prevAA, setPAA] = useState(AssignA);
    const [AA, setAA] = useState(AssignA);
    
    const [prevProg, setPProg] = useState(initProg);
    const [prog, setProg] = useState(initProg);

    const [visibleDBox, setVisibleDBox] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const [prevDesc, setPDesc] = useState(initDesc);
    const [desc, setDesc] = useState(initDesc);

    const p = (
        <Menu onClick={(e) => {setPriority(e.key)}}>
          <Menu.Item key="Low">Low</Menu.Item>
          <Menu.Item key="Medium">Medium</Menu.Item>
          <Menu.Item key="High">High</Menu.Item>
        </Menu>
    );

    // Change Input Method
    function getData(){
        const form = nameForm.current;
        if (form['task-name'].value === ''){
            message.error('Please enter task name');
        }
        console.log(`Task Name: ${form['task-name'].value}`);
        console.log(`Task Create Date: ${CreateDate}`);
        console.log(`Task Deadline: ${form['ddate'].value}`);
        if(AA === []){
            message.error('Please choose the assignee(s)');
        }
        console.log(AA);
        console.log(`Task Priority: ${priority}`);
        console.log(`Task Desc: ${form['task-desc'].value}`);
    }

    function titleChange(event) {    
        setTitle(event.target.value);
    }

    function dateChange(date, dateString) {
        setDl(dateString);
    }

    function tagClose (removedTag) {
        setVisibleTagInput(false);
        const ttags = tags.filter(tag => tag !== removedTag);
        setTags(ttags);

    };

    function showTagInput(){
        setVisibleTagInput(true);
    };

    function handleInputConfirm(e){ 
        if(e.target.value !== "" && !tags.includes(e.target.value)){
            const ttags = [...tags,e.target.value]
            setTags(ttags);
        }
        setVisibleTagInput(false);       
    };

    function handleAA (value){
        setAA(value);
    }

    function changeProg(value){
        setProg(value);
    }

    function descChange(event) {    
        setDesc(event.target.value);
    }

    //Save and Cancel
    function saveChange(e){
        setPT(title);
        setPDL(dl);
        setPP(priority);
        setPTag(tags);
        setPAA(AA);
        setPProg(prog);
        setPDesc(desc);
        setEditMode(false);
    }

    function cancelChange(e){
        setTitle(PrevTitle);
        setDl(prevDl);
        setPriority(prevPrio);
        setTags(prevT);
        setAA(prevAA);
        setProg(prevProg);
        setDesc(prevDesc);
        setEditMode(false);   
    }


    return (
        <form className="task-container" ref={nameForm} >
            {/* Title */}
            <Row style={{marginTop: '10px', marginBottom: '10px'}} align={'middle'}>
                <Col span={15}>
                    <Input disabled={!editMode} value={title} name={'task-name'} onChange={titleChange} placeholder="Title" size="large" bordered={false} style={{paddingLeft: 0, fontSize: '25px', fontWeight:'bold'}} />
                </Col>
                {(!editMode &&
                (<Col style={{marginLeft: '130px', marginRight: '10px'}} >
                    <Button onClick={() => {setEditMode(true)}}><EditOutlined /></Button>
                </Col>))}
                {!editMode &&
                (<Col style={{marginLeft: '10px'}}>
                    <Button onClick={() => setVisibleDBox(true)}><DeleteOutlined /></Button>
                </Col>)}
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
                    <DatePicker disabled= {true} name={'cdate'} defaultValue={moment(CreateDate, dateFormat)} format={dateFormat} />
                </Col>
                <Col span={4} style={{marginLeft: '20px'}}>Deadline:</Col>
                <Col span={5}>
                    {!editMode 
                    ? <DatePicker disabled= {true} name={'ddate'} value={moment(dl, dateFormat)}  format={dateFormat}/>
                    : <DatePicker name={'ddate'} defaultValue={moment(dl, dateFormat)} onChange={dateChange} format={dateFormat}/>
                    }
                </Col>
            </Row>

            {/* Creator & Priority */}
            <Row style={{marginTop: '10px', marginBottom: '10px' }}>
                <Col span={4}>Create By:</Col>
                <Col span={5}><Input value={Name} disabled={true}/></Col>  
                <Col span={4} style={{marginLeft: '20px'}}>Priority:</Col>
                <Col span={5}>
                    <Dropdown disabled= {!editMode} overlay={p}>
                        <Button> {priority} </Button>
                    </Dropdown>
                </Col>
            </Row>

            {/* Tag */}
            <Row style={{marginTop: '10px', marginBottom: '10px' }}>
                <Col span={4}>Tag:</Col>
                    {tags.map((tag) => {
                    const isLongTag = tag.length > 7;
                    const tagElem = (
                    <Tag
                        className="edit-tag"
                        key={tag}
                        closable = {editMode}
                        disabled={!editMode}
                        onClose = {() => tagClose(tag)}
                    >
                    <span> {isLongTag ? `${tag.slice(0, 7)}...` : tag} </span>
                    </Tag>
                    );
                    return tagElem;
                    })}
                {editMode && <Col>
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
                </Col>}
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
                        value={AA}
                        optionLabelProp="label"
                        onChange = {handleAA}
                        disabled= {!editMode}
                        style={{minWidth: '100px'}}
                    >
                        {Members.map(member => {
                            return <Option key={member.id} value={member.id}>{member.name}</Option>
                        })}
                    </Select>
                </Col>
            </Row>

            {/* Progression */}
            <Row style={{marginTop: '10px', marginBottom: '10px' }}>
                <Col span={4}>Progression:</Col>
                <Col span={8}>
                    <Slider disabled= {!editMode} value={prog} onChange={changeProg}  />
                </Col>
                <Col span={3}>
                    <Input disabled= {!editMode} value={prog} suffix="%"/>
                </Col>
            </Row>

            {/* Description */}
            <Row style={{marginTop: '10px', marginBottom: '10px' }}>
                Description:
            </Row>
            
            {/* DescTextArea */}
            <Row style={{marginTop: '10px', marginBottom: '10px' }}>
                <TextArea disabled={!editMode} name={'task-desc'} value={desc} onChange={descChange} placeholder="Description" autoSize={{ minRows: 5, maxRows: 10 }} />
            </Row>
            <TestComment />
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                { editMode ? <Button type="primary" onClick={saveChange}>Save</Button> : <Button type="primary">Comment</Button> }      
                { editMode ? <Button type="secondary"  style={{marginLeft: '30px'}} onClick={cancelChange}>Cancel</Button> : <Button type="secondary"  style={{marginLeft: '30px'}}><Link to={`/`}>Cancel</Link></Button>}
                
            </div>
        </form>
    )
}