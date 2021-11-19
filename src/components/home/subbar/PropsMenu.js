import { useState, useContext } from "react";
import { Menu, Checkbox, Button } from "antd";
import { Field, ViewContext } from "../../../context/ViewProvider";

export default function PropsMenu() {
  const { setFieldVisible, isFieldVisible } = useContext(ViewContext);
  const selectedFields = [
    // { id: Field.NAME, name: "Name" },
    { id: Field.PRIORITY, name: "Priority" },
    { id: Field.MEMBER, name: "Assignee" },
    { id: Field.DEADLINE, name: "Due date" },
    { id: Field.PROGRESS, name: "Progress" },
  ];
  const fields = selectedFields.map(f => ({ 
    id: f.id,
    name: f.name,
    active: isFieldVisible(f.id),
  }));

  // useEffect(() => {
  //   console.log("state changed");
  // }, [state]);

  const handleChange = (victimId, newState) => {
    setFieldVisible(victimId, newState);
    console.log({fields});
  };
  const handleChangeAll = (newState) => {
    fields.forEach(field => {
      setFieldVisible(field.id, newState);
    })
  };

  return (
    <div className="container props-menu">
      <Menu className="my-menu">
        <Menu.Item key="hello-sa">
          <ToggleAllItem onChange={handleChangeAll} />
        </Menu.Item>
        {fields.map((f) => (
          <Menu.Item key={f.id}>
            <ToggleItem
              id={f.id}
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

function ToggleItem({ id, name, isActive, handleChange }) {
  const onChange = (newState) => {
    handleChange(id, newState);
  };
  const handleClick = () => {
    handleChange(id, !isActive);
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
