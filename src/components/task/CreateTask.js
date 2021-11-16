import React, { useState } from 'react';
import { Input, Col, Row, Button } from 'antd';
import { DatePicker, Menu, Dropdown, message, Tag, Select, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons'
import moment from 'moment';
import './index.scss';
import { AppContext } from '../../context/AppProvider';
import { AuthContext } from "../../context/AuthProvider";
import { addDocument, editDocumentById } from '../../firebase/service';
import { serverTimestamp } from "firebase/firestore";

const dateFormat = 'DD/MM/YYYY';

function getDay() {
    let newDate = new Date()
    let date_raw = newDate.getDate();
    let month_raw = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    return date_raw + "/" + month_raw + "/" + year
}

const { TextArea } = Input;
const { Option } = Select;

export default function CreateTask({ children }) {
    // For saving input
    const { visible, setVisible, memberList, curColumn, columns } = React.useContext(AppContext);
    const { user: { uid, displayName } } = React.useContext(AuthContext);
    const [title, setTitle] = useState('');
    const CreateDate = getDay();
    const [dl, setDl] = useState('');
    const [priority, setPriority] = useState("Low");
    const [tags, setTags] = useState([]);
    const [AA, setAA] = useState([]);
    const [desc, setDesc] = useState('');

    //Variable for make visible
    const [visibleTagInput, setVisibleTagInput] = useState(false);
    function tagClose(removedTag) {
        setVisibleTagInput(false);
        const ttags = tags.filter(tag => tag !== removedTag);
        setTags(ttags);
    };

    function showTagInput() {
        setVisibleTagInput(true);
    };

    function handleInputConfirm(e) {
        if (e.target.value !== "" && !tags.includes(e.target.value)) {
            tags.push(e.target.value);
        }
        setVisibleTagInput(false);
    };

    const p = (
        <Menu onClick={(e) => { setPriority(e.key) }}>
            <Menu.Item key="Low">Low</Menu.Item>
            <Menu.Item key="Medium">Medium</Menu.Item>
            <Menu.Item key="High">High</Menu.Item>
        </Menu>
    );

    function titleChange(event) {
        setTitle(event.target.value);
    }

    function dateChange(date, dateString) {
        setDl(dateString);
    }

    function handleAA(value) {
        setAA(value);
    }

    function descChange(event) {
        setDesc(event.target.value);
    }

    function resetInput() {
        setTitle('');
        setDl('');
        setPriority('Low');
        setTags([]);
        setAA([]);
        setDesc('');
    }

    // Push Data to DB
    async function queryData() {
        if (title === '' ) {
            message.error('Please enter the name for this task !');
            return;
        }
        else if(AA.length === 0){
            message.error('Please assign this task to at least 1 person !');
            return;
        }
        else {
            const id = await addDocument('task', {
                name: title,
                description: desc,
                priority: priority,
                deadline: dl,
                memberIdList: AA,
                progression: 0,
                tag: tags,
                createdBy: uid,
                createDate: getDay(),
                createdAt: serverTimestamp()
            });
            console.log(AA);
            columns.map(item => {
                if (item.id === curColumn) {
                    if (Array.isArray(item.taskIdList)) {
                        editDocumentById('column', curColumn, {
                            taskIdList: [...item.taskIdList, id]
                        })
                    }
                    else {
                        editDocumentById('column', curColumn, {
                            taskIdList: [id]
                        })
                    }
                }
                return null;
            })
            resetInput();
            setVisible(false);
        }
    }

    return (
        <>
            <Modal className="TaskModal" visible={visible} width={700} onCancel={() => { resetInput(); setVisible(false) }}
                footer={
                    <div>
                        <Button type="primary" onClick={queryData}>Create</Button>
                    </div>
                }>
                {/* Title */}
                <Row className="title-row">
                    <Col span={15}>
                        <Input value={title} onChange={titleChange}
                            placeholder="Title" size="large" bordered={false} />
                    </Col>
                </Row>

                {/* Date & Deadline */}
                <Row className="normal-row">
                    <Col span={5} className='element-text'>Create Date:</Col>
                    <Col span={7}>
                        <input type="text" size={20} value={CreateDate} readOnly />
                    </Col>
                    <Col span={5} className='element-text align-pair' >Due Date:</Col>
                    <Col span={5}>
                        <DatePicker value={dl !== "" ? moment(dl, dateFormat) : null} onChange={dateChange} format={dateFormat} />
                    </Col>
                </Row>

                {/* Creator & Priority */}
                <Row className="normal-row">
                    <Col span={5} className='element-text'>Create By:</Col>
                    <Col span={7}>
                        <input type="text" size={20} value={displayName} readOnly />
                    </Col>
                    <Col span={5} className='element-text align-pair'>Priority:</Col>
                    <Col span={5}>
                        <Dropdown overlay={p}>
                            <Button> {priority} </Button>
                        </Dropdown>
                    </Col>
                </Row>

                {/* Tag */}
                <Row className="normal-row">
                    <Col span={5} className='element-text'>Tag:</Col>
                    {tags.map((tag) => {
                        const isLongTag = tag.length > 7;
                        const tagElem = (
                            <Tag
                                key={tag}
                                closable={true}
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
                                placeholder='Enter @Tag'
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
                <Row className="normal-row">
                    <Col span={5} className="element-text">Assign to:</Col>
                </Row>

                <Row className="normal-row">
                    <Select
                        mode="multiple"
                        style={{ width: '100%', minWidth: '150px' }}
                        placeholder="Select person/people to assign"
                        value={AA}
                        optionLabelProp="label"
                        onChange={handleAA}
                    >
                        {memberList?.map(member => {
                            return <Option key={member.id} value={member.id} label={member.name}>{member.name}</Option>
                        })}
                    </Select>
                </Row>

                {/* Progression */}
                <Row className="normal-row">
                    <Col span={5} className="element-text">Progression:</Col>
                    <Col span={5}>
                        <input type="text" size={10} value={0 + " %"} readOnly />
                    </Col>
                </Row>

                {/* Description */}
                <Row className="normal-row">
                    <h1 className="element-text">Description:</h1>
                </Row>

                {/* DescTextArea */}
                <Row className="desc-row">
                    <TextArea value={desc} onChange={descChange} placeholder="Description" autoSize={{ minRows: 5, maxRows: 10 }} />
                </Row>
            </Modal>
            {children}
        </>
    )
}