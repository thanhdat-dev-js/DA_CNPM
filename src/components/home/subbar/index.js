import { useState, useCallback, useContext } from "react";
import { Dropdown, Button, Input } from "antd";
import "./subbar.scss";
import SortMenu from "./SortMenu";
import PropsMenu from "./PropsMenu";
import FilterMenu from "./FilterMenu";
import { ViewContext } from "../../../context/ViewProvider";
import { debounce } from "lodash";

const TIMEOUT = 300;
export default function Subbar() {
  const {setSearchString} = useContext(ViewContext);
  const [keyword, setKeyword] = useState("");
  const debounceFilter = useCallback(debounce((nextValue) => setSearchString(nextValue), TIMEOUT), [])
  const handleInputChange = (e) => {
    const nextValue = e.target.value;
    setKeyword(nextValue);
    debounceFilter(nextValue);
  }

  return (
    <div className="subbar container-fluid">
      <div className="row d-flex justify-content-between align-items-center">
        <div className="col-auto ps-3">
          <div>#By Status</div>
        </div>
        <div className="col-auto col-md-8 col-xl-6">
          <div className="d-flex justify-content-evenly">
            <Dropdown overlay={<PropsMenu/>}>
              <Button>Properties</Button>
            </Dropdown>
            <Dropdown overlay={<SortMenu />}>
              <Button>Sort</Button>
            </Dropdown>
            <Input
              value={keyword}
              onChange={handleInputChange}
              style={{ width: '10rem' }}
              placeholder="Search"
            />
          </div>
        </div>
      </div>
    </div>
  );
}