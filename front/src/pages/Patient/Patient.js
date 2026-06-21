import React, { useMemo, useState } from "react";
import PageTitle from "../../components/PageTitle";
import { PatientData as data } from "../../assets/data/patientData";
import { useNavigate } from "react-router-dom";
import { Button, Space, Tag, Flex, Tooltip, Avatar, Typography } from "antd";
import TableComponent from "../../components/TableComponent";
import SearchComponent from "../../components/SearchComponent";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { formatDistanceToNowStrict } from "date-fns";

const { Text } = Typography;

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
  const navigate = useNavigate();
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

  const columns = [
    {
      title: "Patient",
      dataIndex: "name",
      render: (_, record) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            padding: 4,
            borderRadius: 8,
          }}
        >
          <div
            style={{ marginRight: 12, display: "flex", alignItems: "center" }}
          >
            <Avatar
              size="medium"
              style={{ backgroundColor: "#f56a00", verticalAlign: "middle" }}
            >
              {record.firstName?.charAt(0)} {record.lastName?.charAt(0)}
            </Avatar>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontWeight: "bold", fontSize: 16, marginBottom: 0 }}>
              {record.firstName} {record.lastName}
            </div>

            <div>
              <Text type="secondary">
                {formatDistanceToNowStrict(new Date(record.dob), {
                  addSuffix: false,
                })}
              </Text>
            </div>
          </div>
        </div>
      ),
    },

    {
      title: "Diagnosis",
      dataIndex: "diagnosis",
    },
    {
      title: "Referral",
      dataIndex: "referral",
      render: (_, record) =>
        record.referral || (
          <Text>
            {record.referral === "referral doctor"
              ? record.referringDoctor
              : record.referral}
          </Text>
        ),
    },
    {
      title: "Payment",
      dataIndex: "payment",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        let color;
        switch (status) {
          case "New Lead":
            color = "blue";
            break;
          case "Under Review":
            color = "orange";
            break;
          case "Matched":
            color = "green";
            break;
          case "Scheduled":
            color = "purple";
            break;
          case "Completed":
            color = "cyan";
            break;
          case "Closed":
            color = "red";
            break;
          default:
            color = "default";
        }
        return <Tag color={color}>{status}</Tag>;
      },
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
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => {
                navigate(`/patient&leads/edit-patient/${record._id}`);
              }}
            />
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
        <Button
          type="primary"
          style={{ marginTop: 10 }}
          onClick={() => navigate("/patient&leads/add-patient")}
        >
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
