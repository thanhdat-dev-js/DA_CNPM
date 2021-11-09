import { useState } from 'react';
import { Checkbox, Menu, Dropdown, Switch } from 'antd';
import "./subbar.scss";

const defaultFields = [
  {
    id: 'name',
    name: 'Name',
    active: true,
  }, {
    id: 'deadline',
    name: 'Due date',
    active: true,
  }, {
    id: 'progression',
    name: 'Progress',
    active: true,
  }, {
    id: 'priority',
    name: 'Priority',
    active: true,
  }, {
    id: 'memberIdList',
    name: 'Assignee',
    active: true,
  } 
]

function ToggleItem({ name, isActive, handleChange }) {
  const onChange = (newState) => {
    console.log('item onchange called');
    handleChange(name, newState);
  }
  return (
    <div className="container">
      <div className="row justify-content-between">
        <div className="col flex-grow-1">{name}</div>
        <div className="col-auto">
          <Switch checked={isActive} onChange={onChange} />
        </div>
      </div>
    </div>
  );
}

function PropsMenu() {
  const [fields, setFields] = useState(defaultFields);
  const handleChange = (victimName, newState) => {
    setFields(fields.map(f => {
      if (f.name === victimName)
        f.active = newState;
      return f;
    }));
  }

  return (
    <div className='container'>
      <Menu>
        {fields.map(f => (
          <Menu.Item key={f.name} >
            <ToggleItem
              name={f.name}
              isActive={f.active}
              handleChange={handleChange}
            />
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
}


// function propertiesMenu() {
//   return null;
//   return (<>
//     <Card title="Show in board" style={{ width: 300 }}
//       extra={<a href='./'>Show all</a>}
//     >
//       <Select
//         name = {'display'}
//         mode='multiple'
//         style={{ width: '100%' }}
//         placeholder="Select person/people to assign"
//         // value={AA}
//         optionLabelProp="label"
//         // onChange = {handleAA}
//         style={{minWidth: '150px'}}
//       >
//       </Select>
//         {defaultFields.map(field => {
//             return (<Option key={field.name} value={field.name}>
//               {field.name}
//             </Option>);
//         })}
//     </Card>
//   </>);
// }

// container subbar bg-light rounded-top rounded-3

export default function Subbar() {
  // return (<h1>THis is a subbar</h1>);
  return (
    <div className="subbar fluid-container d-flex">
      <div className="left w-50">
        <div className="subbar-title">#By Status</div>
      </div>
      <div className="right w-25 d-flex justify-content-between">
        <Dropdown overlay={<PropsMenu />} placement='bottomCenter'>
          <div className="subbar-title"
            onClick={e => e.preventDefault()}>
            Properties
          </div>
        </Dropdown>
        <Dropdown overlay={<PropsMenu />} placement='bottomCenter'>
          <div className="subbar-title"
            onClick={e => e.preventDefault()}>
            Sort
          </div>
        </Dropdown>
        <Dropdown overlay={<PropsMenu />}>
          <div className="subbar-title"
            onClick={e => e.preventDefault()}>
            Filter
          </div>
        </Dropdown>
      </div>
    </div>
  )
}
