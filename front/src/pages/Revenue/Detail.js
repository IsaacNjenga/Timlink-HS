import React, { useState } from "react";
import TableComponent from "../../components/TableComponent";
import { DetailData as data } from "../../assets/data/RevenueData";
import { Tag, Typography } from "antd";

const { Text } = Typography;

function Detail() {
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "Case",
      dataIndex: "case",
      render: (_, record) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div>
            <Text type="primary">{record.case}</Text>
          </div>
          <div>
            <Text type="secondary">{record.invoiceNumber}</Text>
          </div>
        </div>
      ),
    },
    {
      title: "Patient",
      dataIndex: "patient",
      render: (_, record) => <div>{record.patient}</div>,
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
      title: "Agency Fee",
      dataIndex: "agencyFee",
      render: (_, record) => (
        <div style={{ color: "purple" }}>
          KES. {record.agencyFee.toLocaleString()}
        </div>
      ),
    },
    {
      title: "Surgeon Fee",
      dataIndex: "surgeonFee",
      render: (_, record) => (
        <div style={{ color: "lightblue" }}>
          KES. {record.surgeonFee.toLocaleString()}
        </div>
      ),
    },
    {
      title: "Ref. Admin",
      dataIndex: "refAdmin",
      render: (_, record) => (
        <div style={{ color: "red" }}>
          KES. {record.refAdmin.toLocaleString()}
        </div>
      ),
    },
    {
      title: "Net Revenue",
      dataIndex: "netRevenue",
      render: (_, record) => (
        <div style={{ color: "yellow" }}>
          KES. {record.netRevenue.toLocaleString()}
        </div>
      ),
    },
    {
      title: "Received",
      dataIndex: "received",
      render: (_, record) => (
        <div style={{ color: "green" }}>
          KES. {record.received.toLocaleString()}
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

export default Detail;
