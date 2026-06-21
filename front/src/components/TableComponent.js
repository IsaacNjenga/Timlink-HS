import React from "react";
import { Table } from "antd";

function TableComponent({ columns, data, size, loading, rowKey, viewRecord }) {
  return (
    <Table
      columns={columns}
      loading={loading}
      dataSource={data}
      rowKey={rowKey}
      size={size}
      rowHoverable
      onRow={(record) => ({
        onClick: () => {
          viewRecord(record);
        },
      })}
    />
  );
}

export default TableComponent;
