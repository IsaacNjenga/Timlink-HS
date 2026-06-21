import React, { useMemo, useState } from "react";
import PageTitle from "../../components/PageTitle";
import { PatientData as data } from "../../assets/data/patientData";

import { Button, Space, Tag, Flex, Tooltip } from "antd";
import TableComponent from "../../components/TableComponent";
import SearchComponent from "../../components/SearchComponent";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";

const columns = [
  {
    title: "Patient Name",
    dataIndex: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
  },
  {
    title: "Diagnosis",
    dataIndex: "diagnosis",
  },
  {
    title: "Referral",
    dataIndex: "referral",
  },
  {
    title: "Payment",
    dataIndex: "payment",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
  {
    title: "Date of Registration",
    dataIndex: "date",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    render: (_, record) => (
      <Space size="small">
        <Tooltip title="Edit Patient">
          <Button type="link" icon={<EditOutlined />} />
        </Tooltip>
        <Tooltip title="View Patient">
          <Button type="link" icon={<EyeOutlined />} />
        </Tooltip>
        <Tooltip title="Delete Patient">
          <Button type="link" icon={<DeleteOutlined />} />
        </Tooltip>
      </Space>
    ),
  },
];

const statusTags = [
  "All",
  "New Lead",
  "Under Review",
  "Matched",
  "Scheduled",
  "Completed",
  "Closed",
];

function Patient() {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return data.filter((item) => {
      const matchesStatus =
        selectedStatus === "All" || item.status === selectedStatus;
      const matchesSearch =
        !normalizedSearch ||
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(normalizedSearch),
        );

      return matchesStatus && matchesSearch;
    });
  }, [searchTerm, selectedStatus]);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <PageTitle
          title="Patient & Leads"
          subtitle="Manage patient intake, history and case progression."
        />
        <Button type="primary" style={{ marginTop: 10 }}>
          + Add New Patient
        </Button>
      </div>

      <div style={{ marginBottom: 20 }}>
        <div>
          <SearchComponent value={searchTerm} onChange={setSearchTerm} />
        </div>
        <div style={{ marginTop: 20 }}>
          <Flex gap="large" wrap align="center">
            {statusTags.map((status) => (
              <Tag.CheckableTag
                key={status}
                checked={selectedStatus === status}
                onChange={(checked) => {
                  if (checked) setSelectedStatus(status);
                }}
              >
                {status}
              </Tag.CheckableTag>
            ))}
          </Flex>
        </div>
      </div>

      {/* Patient Table */}
      <div>
        {searchTerm && (
          <div style={{ marginBottom: 10 }}>
            <Tag>
              Showing results for "<b>{searchTerm}</b>"
            </Tag>
          </div>
        )}
        <TableComponent columns={columns} data={filteredData} size="large" />
      </div>
    </>
  );
}

export default Patient;
