import React from "react";
import { Table } from "antd";

function TableComponent({ columns, data, size }) {
  return <Table columns={columns} dataSource={data} rowKey="_id" size={size} />;
}

export default TableComponent;
