import { useState } from "react";
import { Dropdown, Button, Input } from "antd";
import "./subbar.scss";
import SortMenu from "./SortMenu";
import PropsMenu from "./PropsMenu";
import FilterMenu from "./FilterMenu";

export default function Subbar() {
  const [keyword, setKeyword] = useState("");
  const handleInputChange = (e) => {
    setKeyword(e.target.value);
  }

  return (
    <div className="subbar container">
      <div className="row d-flex justify-content-between align-items-center">
        <div className="col-auto ps-3">
          <div>#By Status</div>
        </div>
        <div className="col-auto col-md-8 col-xl-6">
          <div className="d-flex spacing">
            <Dropdown overlay={<PropsMenu/>}>
              <Button>Properties</Button>
            </Dropdown>
            <Dropdown overlay={<SortMenu />}>
              <Button>Sort</Button>
            </Dropdown>
            <Dropdown overlay={<FilterMenu />}>
              <Button>Filter</Button>
            </Dropdown>
            <Input
              value={keyword}
              onChange={handleInputChange}
              style={{ width: 200 }}
              placeholder="Search"
            />
          </div>
        </div>
      </div>
    </div>
  );
}