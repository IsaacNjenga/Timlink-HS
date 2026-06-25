import React, { useMemo, useState } from "react";
import PageTitle from "../../components/PageTitle";
import { useNavigate } from "react-router-dom";
import { Button, Space, Tag, Flex, Tooltip, Avatar, Typography } from "antd";
import SearchComponent from "../../components/SearchComponent";
import TableComponent from "../../components/TableComponent";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { CasesData as data } from "../../assets/data/casesData";
import ViewCase from "./ViewCase";
import DeleteConfirm from "../../components/DeleteConfirm";
import { usePop } from "../../contexts/popContext";

const { Text } = Typography;

const statusTags = ["All", "Paid", "Partial", "Pending"];

function Cases() {
  const navigate = useNavigate();
  const { setOpenConfirm } = usePop();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const viewCase = (caseItem) => {
    setLoading(true);
    setContent(caseItem);
    setOpenModal(true);
    setTimeout(() => setLoading(false), 100);
  };

  const filteredData = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return data.filter((item) => {
      const matchesStatus =
        selectedStatus === "All" || item.paymentStatus === selectedStatus;
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
      dataIndex: "patient",
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
              {record.patient.name
                .split(" ")
                .map((n) => n.charAt(0))
                .join("")}
            </Avatar>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontWeight: "bold", fontSize: 16, marginBottom: 0 }}>
              {record.patient.name}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Surgery Type & Date",
      dataIndex: "surgeryType",
      render: (_, record) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontWeight: "bold", fontSize: 16, marginBottom: 0 }}>
            {record.surgeryType}
          </div>
          <div>
            <Text type="secondary">{record.surgeryDate}</Text>
          </div>
        </div>
      ),
    },
    {
      title: "Surgeon",
      dataIndex: "surgeon",
      render: (_, record) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontWeight: "bold", fontSize: 16, marginBottom: 0 }}>
            {record.surgeon.name}
          </div>
        </div>
      ),
    },
    {
      title: "Hospital",
      dataIndex: "hospital",
    },
    {
      title: "Billed Amount",
      dataIndex: "financials",
      render: (_, record) => (
        <Text>KES.{record.financials.finalBilledKsh.toLocaleString()}</Text>
      ),
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      render: (status) => {
        let color;
        switch (status) {
          case "Pending":
            color = "red";
            break;
          case "Partial":
            color = "orange";
            break;
          case "Paid":
            color = "green";
            break;

          default:
            color = "default";
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Edit Case Details">
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={(e) => {e.stopPropagation();
                navigate(`/cases&surgery/edit-case/${record._id}`);
              }}
            />
          </Tooltip>
          <Tooltip title="Delete Case">
            <DeleteConfirm
              recordId={record._id}
              title="Are you sure?"
              description="This action cannot be undone!"
              onConfirmSuccess={(id) => {
                console.log(`Successfully deleted ${id}`);
              }}
            >
              <Button
                type="link"
                icon={<DeleteOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenConfirm(record._id);
                }}
              />
            </DeleteConfirm>
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
          title="Cases & Surgery Tracking"
          subtitle="Log surgeries, assign surgeons, track billing and payments."
        />
        <Button
          type="primary"
          style={{ marginTop: 10 }}
          onClick={() => navigate("/cases&surgery/add-case")}
        >
          + New Case
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

      {/* cases table */}
      <div>
        {searchTerm && (
          <div style={{ marginBottom: 10 }}>
            <Tag>
              Showing results for "<b>{searchTerm}</b>"
            </Tag>
          </div>
        )}
        <TableComponent
          rowKey="_id"
          columns={columns}
          data={filteredData}
          size="large"
          loading={loading}
          viewRecord={viewCase}
        />
      </div>

      <ViewCase
        content={content}
        loading={loading}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
}

export default Cases;
