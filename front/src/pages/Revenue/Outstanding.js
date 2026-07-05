import React, { useState } from "react";
import TableComponent from "../../components/TableComponent";
import { DetailData as data } from "../../assets/data/RevenueData";
import { Tag } from "antd";

function Outstanding() {
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "Case",
      dataIndex: "case",
      render: (_, record) => <div>{record.case}</div>,
    },
    {
      title: "Patient",
      dataIndex: "patient",
      render: (_, record) => <div>{record.patient}</div>,
    },
    {
      title: "Invoice No.",
      dataIndex: "invoiceNumber",
      render: (_, record) => <div>{record.invoiceNumber}</div>,
    },
    {
      title: "Billed",
      dataIndex: "billed",
      render: (_, record) => (
        <div style={{ color: "orange" }}>
          KES. {record.billed.toLocaleString()}
        </div>
      ),
    },

    {
      title: "Received",
      dataIndex: "received",
      render: (_, record) => (
        <div style={{ color: "green" }}>
          KES. {record.surgeonFee.toLocaleString()}
        </div>
      ),
    },
    {
      title: "Balance",
      dataIndex: "balance",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.balance - b.balance,
      render: (_, record) => (
        <div style={{ color: "red" }}>
          KES. {record.agencyFee.toLocaleString()}
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        let color;
        switch (status) {
          case "Pending":
            color = "orange";
            break;
          case "Paid":
            color = "green";
            break;
          case "Partial":
            color = "cyan";
            break;
          default:
            color = "default";
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
  ];
  return (
    <TableComponent
      rowKey="_id"
      columns={columns}
      data={data}
      size="small"
      loading={loading}
    />
  );
}

export default Outstanding;
