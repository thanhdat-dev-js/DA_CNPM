import { useState } from "react";
import { Menu, Checkbox, Button } from "antd";

export default function PropsMenu({ dataFields, setDataFields }) {
  const [fields, setFields] = [dataFields, setDataFields];
  const handleChange = (victimName, newState) => {
    setFields(
      fields.map((f) => {
        if (f.name === victimName) f.active = newState;
        return f;
      })
    );
  };
  const handleChangeAll = (newState) => {
    setFields(
      fields.map((f) => {
        f.active = newState;
        return f;
      })
    );
  };

  return (
    <div className="container">
      <Menu>
        <Menu.Item key="hello-sa">
          <ToggleAllItem onChange={handleChangeAll} />
        </Menu.Item>
        {fields.map((f) => (
          <Menu.Item key={f.name}>
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

function CustomSwitch({ checked, onChange }) {
  const handleChange = (e) => {
    onChange(e.target.checked);
  };
  return (<>
    <Checkbox checked={checked} onChange={handleChange}/>
  </>);
}

function ToggleItem({ name, isActive, handleChange }) {
  const onChange = (newState) => {
    console.log("item onchange called");
    handleChange(name, newState);
  };
  const handleClick = () => {
    handleChange(name, !isActive);
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-9" onClick={handleClick}>{name}</div>
        <div className="col-3">
          <CustomSwitch checked={isActive} onChange={onChange} />
        </div>
      </div>
    </div>
  );
}

function ToggleAllItem({ onChange }) {
  const [checked, setChecked] = useState();
  const handleClick = () => {
    if (checked === undefined) setChecked(true);
    else setChecked(!checked);
    onChange(!checked);
  };

  return (
    <div className="fluid-container">
      <div className="row">
        <div className="col">Show in board</div>
        <div className="col">
          <Button
            onClick={handleClick}
            type="text" size="small" className="fix-width"
          >
            {checked === true ? "Hide all" : "Show all"}
          </Button>
        </div>
      </div>
    </div>
  );
}
