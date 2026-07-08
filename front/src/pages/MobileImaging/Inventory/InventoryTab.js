import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Space, Tag, Flex, Tooltip, Typography } from "antd";
import TableComponent from "../../../components/TableComponent";
import SearchComponent from "../../../components/SearchComponent";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import DeleteConfirm from "../../../components/DeleteConfirm";
import { usePop } from "../../../contexts/popContext";
import { InventoryData as data } from "../../../assets/data/inventoryData";
import ViewInventory from "./ViewInventory";

const { Text } = Typography;

const statusTags = ["All", "Available", "In Service", "Maintenance"];

function InventoryTab() {
  const navigate = useNavigate();
  const { setOpenConfirm } = usePop();
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const viewInventory = (inventory) => {
    setLoading(true);
    setContent(inventory);
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
      title: "Equipment",
      dataIndex: "equipment",
      render: (_, record) => (
        <div>
          <div>
            <Text strong>{record.equipmentName}</Text>
          </div>
          <div>
            <Text type="secondary">Code: {record.equipmentId}</Text>
          </div>
        </div>
      ),
    },

    {
      title: "Category",
      dataIndex: "category",
      render: (_, record) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontWeight: "bold", fontSize: 16, marginBottom: 0 }}>
            <Text strong>{record.category}</Text>
          </div>
        </div>
      ),
    },
    {
      title: "Location",
      dataIndex: "location",
      render: (_, record) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontWeight: "bold", fontSize: 16, marginBottom: 0 }}>
            <Text strong>{record.location}</Text>
          </div>
        </div>
      ),
    },

    {
      title: "Status",
      dataIndex: "status",
      render: (status) => {
        let color;
        switch (status) {
          case "Available":
            color = "green";
            break;
          case "In Service":
            color = "orange";
            break;
          case "Maintenance":
            color = "red";
            break;
          default:
            color = "default";
        }
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Rate",
      dataIndex: "rate",
      render: (cost) => <Text>KES. {cost.toLocaleString()}</Text>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Edit Record">
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/mobile-imaging/edit-inventory-item/${record._id}`);
              }}
            />
          </Tooltip>
          <Tooltip title="Delete Record">
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
        <TableComponent
          rowKey="_id"
          columns={columns}
          data={filteredData}
          size="small"
          loading={loading}
          viewRecord={viewInventory}
        />
      </div>
      <ViewInventory
        content={content}
        loading={loading}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
}

export default InventoryTab;
