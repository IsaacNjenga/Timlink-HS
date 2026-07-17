import React from "react";
import { Input, Space } from "antd";

const { Search } = Input;

function SearchComponent({ value = "", onChange }) {
  const handleSearch = (event) => {
    onChange?.(event.target.value);
  };

  return (
    <Space.Compact>
      <Search
        placeholder="Search..."
        allowClear
        value={value}
        onChange={handleSearch}
        size="large"
        enterButton
        style={{ width: 600, height: 40 }}
      />
    </Space.Compact>
  );
}

export default SearchComponent;
