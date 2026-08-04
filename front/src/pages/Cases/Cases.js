import React, { useMemo, useState } from "react";
import PageTitle from "../../components/PageTitle";
import { useNavigate } from "react-router-dom";
import { Button, Space, Tag, Flex, Tooltip, Avatar, Typography } from "antd";
import SearchComponent from "../../components/SearchComponent";
import TableComponent from "../../components/TableComponent";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
// import { CasesData as data } from "../../assets/data/casesData";
import ViewCase from "./ViewCase";
import DeleteConfirm from "../../components/DeleteConfirm";
import { usePop } from "../../contexts/popContext";
import { useDeleteCase } from "../../hooks/Case/deleteCase";
import { useFetchCases } from "../../hooks/Case/fetchAllCases";
import { format } from "date-fns";

const { Text } = Typography;

const statusTags = ["All", "Paid", "Partial", "Pending"];

function Cases() {
  const navigate = useNavigate();
  const { setOpenConfirm } = usePop();
  const { cases, loading: casesLoading, totalCases, refresh } = useFetchCases();
  const { deleteCase } = useDeleteCase();
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

    return cases.filter((item) => {
      const matchesStatus =
        selectedStatus === "All" || item.paymentStatus === selectedStatus;
      const matchesSearch =
        !normalizedSearch ||
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(normalizedSearch),
        );

      return matchesStatus && matchesSearch;
    });
  }, [searchTerm, selectedStatus, cases]);

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
              {record.patient?.firstName?.charAt(0)}{" "}
              {record.patient?.lastName?.charAt(0)}
            </Avatar>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontWeight: "bold", fontSize: 16, marginBottom: 0 }}>
              {record.patient?.firstName} {record.patient?.lastName}
            </div>
            <div>
              <Text type="secondary">{record.patient?.email || "N/A"}</Text>
            </div>
            <div>
              <Text type="secondary">{record.patient?.phone || "N/A"}</Text>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Surgery Info",
      dataIndex: "surgeryType",
      render: (_, record) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontWeight: "bold", fontSize: 16, marginBottom: 0 }}>
            {record.surgeryType}
          </div>
          <div>
            <Text type="secondary">
              {format(new Date(record.surgeryDate), "PPP")}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: "Surgeon & Hospital",
      dataIndex: "surgeon",
      render: (_, record) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontWeight: "bold", fontSize: 16, marginBottom: 0 }}>
            {record.doctor?.firstName} {record.doctor?.lastName}
          </div>
          <div>
            <Text type="secondary">{record.hospital?.hospitalName}</Text>
          </div>
        </div>
      ),
    },

    {
      title: "Billing Info",
      dataIndex: "financials",
      render: (_, record) => {
        let color;
        switch (record.paymentStatus) {
          case "Pending":
            color = "red";
            break;
          case "Partially Paid":
            color = "orange";
            break;
          case "Paid":
            color = "green";
            break;

          default:
            color = "default";
        }
        return (
          <div
            style={{
              display: "flex",
              padding: 4,
              borderRadius: 8,
              flexDirection: "column",
              gap: 4,
            }}
          >
            <div>
              <Text>
                KES.{record.financials.finalBilledKsh.toLocaleString()}
              </Text>
            </div>
            <div>
              <Tag color={color}>{record.paymentStatus}</Tag>
            </div>
          </div>
        );
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
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/cases&surgery/edit-case/${record._id}`);
              }}
            />
          </Tooltip>
          <Tooltip title="Delete Case">
            <DeleteConfirm
              recordId={record._id}
              source="table"
              title="Are you sure?"
              description="This action cannot be undone!"
              onConfirmSuccess={(id) => {
                deleteCase(id);
                refresh();
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

        <div
          style={{
            marginTop: 20,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Flex gap="small" wrap align="center">
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
          <Flex>
            <Tooltip title="Refresh">
              <Button
                icon={<ReloadOutlined />}
                onClick={refresh}
                style={{
                  borderRadius: 8,
                  borderColor: "rgba(133,74,154,0.2)",
                  fontFamily: "'Outfit', sans-serif",
                }}
              />
            </Tooltip>
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
          size="small"
          loading={loading || casesLoading}
          viewRecord={viewCase}
        />
        <div style={{ marginTop: 10 }}>
          <Text type="secondary">Total Cases: {totalCases}</Text>
        </div>
      </div>

      <ViewCase
        content={content}
        loading={loading}
        openModal={openModal}
        setOpenModal={setOpenModal}
        refresh={refresh}
      />
    </>
  );
}

export default Cases;
