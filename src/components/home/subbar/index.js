import { useState } from "react";
import { Menu, Dropdown, Input } from "antd";
import PropsMenu from "./PropsMenu";
import "./subbar.scss";

import { Select, Button } from 'antd';
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
const { Option } = Select;

const defaultSortRules = [
  { id: 'name', name: 'Name', value: 'ascending' },
  { id: 'deadline', name: 'Due date', value: null },
];

const OptionList = (<>
  {defaultSortRules.map(option => (
    <Option value={option.id}>{option.name}</Option>
  ))}
</>)

function SortMenu() {
  const [sortRules, setSortRules] = useState(defaultSortRules);

  const handleChange = (victimId, value) => {
    const temp = [...sortRules].map(rule => {
      if (rule.id === victimId)
        rule.value = value;
      return rule;
    });
    setSortRules(temp);
  }

  const handleRemoveRule = (victimId) => {
    console.log('called');
    const temp = [...sortRules].map(rule => {
      if (rule.id === victimId)
        rule.value = null;
      return rule;
    });
    setSortRules(temp);
  }

  const handleAddRule = () => {
    const temp = [...sortRules];
    for (let i = 0; i < temp.length; i++) {
      if ((temp[i].value) === null) {
        temp[i].value = 'ascending';
        break;
      }
    }
    setSortRules(temp);
  }

  console.log(sortRules.map((f) => (f.value ? (f.name + ': ' + f.value) : null)));
  return (<Menu>
    {sortRules.map(sortRule => (sortRule.value === null) ? null :
      <Menu.Item key={sortRule.id}>
        <div className="row">
          <div className="col">
            <Select
              defaultValue={sortRule.name} style={{ width: '7rem' }}
            // onChange={(e) => handleChange(sortRule.id, value)} // TODO: handle change
            >
              {OptionList}
            </Select>
            <Select defaultValue={sortRule.value} style={{ width: '8rem' }}
              onChange={(value) => handleChange(sortRule.id, value)}
            >
              <Option value="ascending">Ascending</Option>
              <Option value="descending">Descending</Option>
            </Select>
          </div>
          <div className="col">
            <CloseOutlined onClick={() => handleRemoveRule(sortRule.id)} />
          </div>
        </div>
      </Menu.Item>)}
    <Menu.Item key='_addsort'>
      <div onClick={handleAddRule}>
        <PlusOutlined /> Add a sort
      </div>
    </Menu.Item>
  </Menu>);
}

// TODO: useContext instead
const defaultFields = [
  {
    id: "deadline",
    name: "Due date",
    active: true,
  },
  {
    id: "progression",
    name: "Progress",
    active: true,
  },
  {
    id: "priority",
    name: "Priority",
    active: true,
  },
  {
    id: "memberIdList",
    name: "Assignee",
    active: true,
  },
];

export default function Subbar() {
  const [dataFields, setDataFields] = useState(defaultFields);
  const [keyword, setKeyword] = useState('');
  function handleInputChange(e) {
    setKeyword(e.target.value)
  }

  return (
    <div className="subbar fluid-container">
      <div className="row d-flex justify-content between">
        <div className="left col">
          <div className="subbar-title">#By Status</div>
        </div>
        <div className="right col d-flex justify-content-between">
          <Dropdown placement="bottomCenter" destroyPopupOnHide
            overlay={<PropsMenu dataFields={dataFields} setDataFields={setDataFields} />}
          >
            <div className="subbar-title" onClick={(e) => e.preventDefault()}>
              Properties
            </div>
          </Dropdown>
          <Dropdown overlay={<SortMenu />} placement="bottomCenter" destroyPopupOnHide>
            <div className="subbar-title" onClick={(e) => e.preventDefault()}>
              Sort
            </div>
          </Dropdown>
          <Dropdown overlay={<FilterMenu />} destroyPopupOnHide>
            <div className="subbar-title" onClick={(e) => e.preventDefault()}>
              Filter
            </div>
          </Dropdown>
          <Input.Search
            value={keyword}
            onChange={handleInputChange}
            style={{ width: 200 }}
            placeholder="Search"
          />
        </div>
      </div>
    </div>
  );
}

function FilterMenu() {
  return (<Menu>
    <Menu.Item key="another life">
      <h1>Filter menu</h1>
    </Menu.Item>
  </Menu>);
}