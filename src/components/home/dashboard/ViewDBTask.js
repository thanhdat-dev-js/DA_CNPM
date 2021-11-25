import React, { useState } from 'react';
import { Input, Col, Row, Modal } from 'antd';
import { Menu, Tag } from 'antd';
import './task.scss';
import { AppContext } from '../../../context/AppProvider';

const dateFormat = 'DD/MM/YYYY';

// Data got from DB

// const TaskInfo = {
//     taskID: "123683",
//     title: 'Hello',
//     createDate: "2/12/2021",
//     deadline: "4/12/2021",
//     Name: "Dieu Ai",
//     priority: "Medium",
//     tag: ['OS', 'Assignment'],
//     assignTo: ['a1', 'a3'],
//     progress: 40,
//     desc: "Sample Text Sample Text Sample Text Sample Text Sample Text"
// }

const { TextArea } = Input;

export default function ViewDBTask() {
    const { visibleDBTask, setVisibleDBTask, curDBTask, DBmemberList } = React.useContext(AppContext);
    const title  = curDBTask.name;

    const createDate = curDBTask.createDate;

    const dl = curDBTask.deadline;

    const priority = curDBTask.priority;

    const tags = curDBTask.tag;

    const AA = curDBTask.memberIdList;

    const prog = curDBTask.progression;

    const desc = curDBTask.description;


    const p = (
        <Menu>
            <Menu.Item key="Low">Low</Menu.Item>
            <Menu.Item key="Medium">Medium</Menu.Item>
            <Menu.Item key="High">High</Menu.Item>
        </Menu>
    );

    function convertIDtoName(uid) {
        return DBmemberList.find(o => o.uid === uid).name;
    }

    async function closeModal() {
        await setVisibleDBTask(false);
    }

    return (
        <Modal className="TaskModal" visible={visibleDBTask} width={700} onCancel={closeModal} onOk={closeModal} footer={null}>
            {/* Title */}
            <Row className="title-row">
                <Col span={15}>
                    <Input value={title} placeholder="Title" size="large" bordered={false} readOnly={true} />
                </Col>
            </Row>

            {/* Date & Deadline */}
            <Row className="normal-row">
                <Col span={5} className="element-text">Create Date:</Col>
                <Col span={7}>
                    <input type="text" size={20} value={createDate} readOnly />
                </Col>
                <Col span={5} className="element-text align-pair">Due Date:</Col>
                <Col span={5}>
                    <input type="text" size={15} value={dl === "" ? "None" : dl} readOnly />
                </Col>
            </Row>

            {/* Creator & Priority */}
            <Row className="normal-row">
                <Col span={5} className='element-text'>Priority:</Col>
                <Col span={5}>
                    <input type="text" size={10} value={priority} readOnly />
                </Col>
            </Row>

            {/* Tag */}
            <Row className="normal-row">
                <Col span={5} className="element-text">Tag:</Col>
                {tags?.map((tag) => {
                    const isLongTag = tag.length > 7;
                    const tagElem = (
                        <Tag
                            key={tag}
                            closable={false}
                        >
                            <span style={{fontSize: '14px'}}> {isLongTag ? `${tag.slice(0, 7)}...` : tag} </span>
                        </Tag>
                    );
                    return tagElem;
                })}
            </Row>


            {/* Assigns */}
            <Row className="normal-row">
                <Col span={5} className="element-text">Assign to:</Col>
            </Row>

            <Row className="normal-row">
                <div>
                    {AA.map((memberID) => {
                        const memElem = (
                            <Tag
                                key={memberID}
                                closable={false}
                            >
                                {convertIDtoName(memberID)}
                            </Tag>
                        );
                        return memElem;
                    })}
                </div>
            </Row>

            {/* Progression */}
            <Row className="normal-row">
                <Col span={5} className="element-text">Progression:</Col>
                <Col span={4}>
                   <input type="text" size={10} value={prog + " %"} readOnly />
                </Col>
            </Row>

            {/* Description */}
            <Row className="normal-row">
                <h1 className="element-text">Description:</h1>
            </Row>

            {/* DescTextArea */}
            <Row className="desc-row">
                <TextArea readOnly={true} value={desc} placeholder="Description" autoSize={{ minRows: 5, maxRows: 10 }} />
            </Row>
        </Modal>
    )
}