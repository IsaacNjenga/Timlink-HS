import React from "react";
import { Empty, Table } from "antd";

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
      locale={{
        emptyText: <Empty description="No Data" />,
      }}
    />
  );
}

export default TableComponent;
