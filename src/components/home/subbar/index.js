import { useState } from "react";
import { Dropdown, Input } from "antd";
import PropsMenu from "./PropsMenu";
import "./subbar.scss";

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

  console.log(dataFields.map((f) => (f.active ? f.name : null)));
  return (
    <div className="subbar fluid-container">
      <div className="row d-flex justify-content between">
        <div className="left col">
          <div className="subbar-title">#By Status</div>
        </div>
        <div className="right col d-flex justify-content-between">
          <Dropdown overlay={<PropsMenu dataFields={dataFields} setDataFields={setDataFields}/>} placement="bottomCenter">
            <div className="subbar-title" onClick={(e) => e.preventDefault()}>
              Properties
            </div>
          </Dropdown>
          <Dropdown overlay={<PropsMenu />} placement="bottomCenter">
            <div className="subbar-title" onClick={(e) => e.preventDefault()}>
              Sort
            </div>
          </Dropdown>
          <Dropdown overlay={<PropsMenu />}>
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