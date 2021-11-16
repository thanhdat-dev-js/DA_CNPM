import { useState } from "react";
import { Menu, Select } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
const { Option } = Select;

// TODO: 
const defaultSortRules = [
  { id: "deadline", name: "Due date", value: null },
  { id: "priority", name: "Priority", value: null },
  { id: "progress", name: "Progress", value: null },
];

const OptionList = (
  <>
    {defaultSortRules.map((option) => (
      <Option key={option.id} value={option.id}>
        {option.name}
      </Option>
    ))}
  </>
);

export default function SortMenu() {
  const [sortRules, setSortRules] = useState(defaultSortRules);

  const handleChange = (victimId, value) => {
    const temp = [...sortRules].map((rule) => {
      if (rule.id === victimId) rule.value = value;
      return rule;
    });
    console.log(sortRules.map((f) => (f.value ? f.name + ": " + f.value : null)));
    setSortRules(temp);
  };
  const handleRemoveRule = (victimId) => {
    const temp = [...sortRules].map((rule) => {
      if (rule.id === victimId) rule.value = null;
      return rule;
    });
    setSortRules(temp);
  };
  const handleAddRule = () => {
    const temp = [...sortRules];
    for (let i = 0; i < temp.length; i++) {
      if (temp[i].value === null) {
        temp[i].value = "ascending";
        break;
      }
    }
    setSortRules(temp);
  };

  return (
    <Menu className="my-menu">
      {sortRules.map((sortRule) =>
        sortRule.value === null ? null : (
          <Menu.Item key={sortRule.id}>
            <div className="row">
              <div className="col">
                <Select
                  defaultValue={sortRule.name}
                  style={{ width: "7rem" }}
                  // onChange={(e) => handleChange(sortRule.id, value)} // TODO: handle change
                >
                  {OptionList}
                </Select>{' '}
                <Select
                  defaultValue={sortRule.value}
                  style={{ width: "8rem" }}
                  onChange={(value) => handleChange(sortRule.id, value)}
                >
                  <Option value="ascending">Ascending</Option>
                  <Option value="descending">Descending</Option>
                </Select>
              </div>
              <div className="col">
                <CloseOutlined size={1} onClick={() => handleRemoveRule(sortRule.id)} />
              </div>
            </div>
          </Menu.Item>
        )
      )}
      <Menu.Item key="_addsort">
        <div onClick={handleAddRule}>
          <PlusOutlined /> Add a sort
        </div>
      </Menu.Item>
    </Menu>
  );
}