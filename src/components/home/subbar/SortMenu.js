import { useState, useContext } from "react";
import { Menu, Select } from "antd";
import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { ViewContext, Field, Sort } from "../../../context/ViewProvider";

const { Option } = Select;


export default function SortMenu() {
  const {sortOptions, setSortOptions} = useContext(ViewContext);
  const [allowedOptions, setAllowedOptions] = useState([
    { id: Field.NAME, value: Sort.ASC },
    { id: Field.DEADLINE, value: Sort.ASC },
    { id: Field.PRIORITY, value: Sort.ASC },
    { id: Field.PROGRESS, value: Sort.ASC },
  ]);
  const [selectedOptions, setSelectedOptions] = [sortOptions, setSortOptions];
  const [flush, setFlush] = useState(false);

  console.log(selectedOptions.map((f) => (f.id + ": " + f.value )));
  const handleChange = (victimId, candidate) => {
    const ref1 = selectedOptions.find(f => f.id === victimId);
    const ref2 = allowedOptions.find(f => f.id === candidate);
    const temp = ref1.id;
    ref1.id = ref2.id;
    ref2.id = temp;
    setSelectedOptions(selectedOptions);
    setAllowedOptions(allowedOptions);
    setFlush(!flush);
  };
  const handleChangeValue = (rule, newValue) => {
    rule.value = newValue;
    setAllowedOptions(allowedOptions);
    setSelectedOptions([...selectedOptions]);
    setFlush(!flush);
  }
  const handleRemoveRule = (victimId) => {
    const pos = selectedOptions.findIndex(f => f.id === victimId);
    const victim = selectedOptions.splice(pos, 1)[0];
    setSelectedOptions(selectedOptions);
    setAllowedOptions([...allowedOptions, victim]);
  };
  const handleAddRule = () => {
    if (!allowedOptions || allowedOptions.length === 0) {
      return;
    }
    const victim = allowedOptions.pop();
    setAllowedOptions(allowedOptions);
    setSelectedOptions([...selectedOptions, victim]);
  };
  
  return (
    <Menu className="my-menu">
      {selectedOptions.map((sortRule) =>
        sortRule.value === null ? null : (
          <Menu.Item key={sortRule.id}>
            <div className="row">
              <div className="col">
                <Select
                  defaultValue={sortRule.id}
                  style={{ width: "7rem" }}
                  onChange={(candidate) => handleChange(sortRule.id, candidate)}
                >
                {allowedOptions.map((option) => (
                  <Option label={option.id} key={option.id} value={option.id}>
                    {option.id}
                  </Option>
                ))}
                </Select>{' '}
                <Select
                  defaultValue={sortRule.value}
                  style={{ width: "8rem" }}
                  onChange={(value) => handleChangeValue(sortRule, value)} // TODO
                >
                  <Option value={Sort.ASC}>{Sort.ASC}</Option>
                  <Option value={Sort.DESC}>{Sort.DESC}</Option>
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