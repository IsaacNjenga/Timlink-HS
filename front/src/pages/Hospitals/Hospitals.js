import React, { useMemo, useState } from "react";
import PageTitle from "../../components/PageTitle";
import { HospitalData as data } from "../../assets/data/hospitalData";
import { useNavigate } from "react-router-dom";
import { Button, Space, Tag, Flex, Tooltip, Avatar, Typography } from "antd";
import TableComponent from "../../components/TableComponent";
import SearchComponent from "../../components/SearchComponent";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ViewHospital from "./ViewHospital";
import { usePop } from "../../contexts/popContext";
import DeleteConfirm from "../../components/DeleteConfirm";

const { Text } = Typography;

const statusTags = ["All", "Active", "Inactive"];

function Hospitals() {
  const navigate = useNavigate();
  const { setOpenConfirm } = usePop();
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const viewHospital = (hospital) => {
    setLoading(true);
    setContent(hospital);
    setOpenModal(true);
    setTimeout(() => setLoading(false), 100);
  };

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
      title: "Hospital",
      dataIndex: "hospitalName",
      key: "hospitalName",
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
              {record.hospitalName?.charAt(0)}
            </Avatar>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontWeight: "bold", fontSize: 16, marginBottom: 0 }}>
              <Text type="primary">{record.hospitalName}</Text>
            </div>
            <div style={{ fontSize: 12 }}>
              <Text type="secondary">{record.code}</Text>
            </div>
          </div>
        </div>
      ),
    },
    { title: "Tier", dataIndex: "tier", key: "tier" },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (_, record) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontWeight: "bold", fontSize: 16, marginBottom: 0 }}>
            <Text type="primary">{record.location.address}</Text>
          </div>
          <div style={{ fontSize: 12 }}>
            <Text type="secondary">
              {record.location.city}, {record.location.country}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: "Contact Info",
      dataIndex: "contact",
      key: "contact",
      render: (_, record) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontWeight: "bold", fontSize: 16, marginBottom: 0 }}>
            <Text type="primary">{record.contact.phone}</Text>
          </div>
          <div style={{ fontSize: 12 }}>
            <Text type="secondary">{record.contact.email}</Text>
          </div>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => {
        let color;
        switch (status) {
          case "Active":
            color = "green";
            break;
          case "Inactive":
            color = "red";
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
          <Tooltip title="Edit Hospital">
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/hospitals/edit-hospital/${record._id}`);
              }}
            />
          </Tooltip>
          <Tooltip title="Delete Hospital Record">
            <DeleteConfirm
              recordId={record._id}
              source="table"
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
                  setOpenConfirm({
                    id: record._id,
                    source: "table",
                  });
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
          title="Hospitals"
          subtitle="Manage hospital information and details."
        />
        <Button
          type="primary"
          style={{ marginTop: 10 }}
          onClick={() => navigate("/hospitals/add-hospital")}
        >
          + Add New Hospital
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

      {/* Data Table */}
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
          viewRecord={viewHospital}
        />
      </div>

      <ViewHospital
        content={content}
        loading={loading}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
}

export default Hospitals;
