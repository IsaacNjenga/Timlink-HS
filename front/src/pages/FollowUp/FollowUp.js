import React, { useMemo, useState } from "react";
import PageTitle from "../../components/PageTitle";
import {
  Button,
  Tag,
  Flex,
  Avatar,
  Typography,
  Row,
  Statistic,
  Col,
  Card,
  Tooltip,
  Space,
} from "antd";
import SearchComponent from "../../components/SearchComponent";
import TableComponent from "../../components/TableComponent";
import ViewFollowUp from "./ViewFollowUp";
import { FollowUpData as data } from "../../assets/data/followUpData";
import { format } from "date-fns";
import CountUpComponent from "../../components/CountUpComponent";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  PushpinOutlined,
} from "@ant-design/icons";
import AddFollowUp from "./AddFollowUp";
import EditFollowUp from "./EditFollowUp";
import { usePop } from "../../contexts/popContext";
import DeleteConfirm from "../../components/DeleteConfirm";

const { Text } = Typography;

const statusTags = ["All", "Active", "Pending", "Completed"];

function FollowUp() {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const { setOpenConfirm } = usePop();
  const [searchTerm, setSearchTerm] = useState("");
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openAddForm, setOpenAddForm] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const activeValue = data.filter(
    (d) => d.clinicalAssessment.status === "Active",
  );
  const pendingValue = data.filter(
    (d) => d.clinicalAssessment.status === "Pending",
  );
  const completedValue = data.filter(
    (d) => d.clinicalAssessment.status === "Completed",
  );

  const viewSchedule = (schedule) => {
    setLoading(true);
    setContent(schedule);
    setOpenModal(true);
    setTimeout(() => setLoading(false), 100);
  };

  const filteredData = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return data.filter((item) => {
      const matchesStatus =
        selectedStatus === "All" ||
        item.clinicalAssessment.status === selectedStatus;
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
      dataIndex: "patientDetails",
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
              {record.patientDetails.fullName?.charAt(0)}
            </Avatar>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontWeight: "bold", fontSize: 16, marginBottom: 0 }}>
              {record.patientDetails.fullName}
            </div>

            <div>
              <Text type="secondary">{record.patientDetails.contactPhone}</Text>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Case",
      dataIndex: "caseDetails",
      render: (_, record) => (
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Text>{record.caseDetails.procedureName}</Text>
          <Text type="secondary">Code: {record.caseDetails.caseCode}</Text>
          <Text type="secondary">
            D.O.S:{" "}
            {format(new Date(record.caseDetails.surgeryDate), "dd-MM-yyyy")}
          </Text>
        </div>
      ),
    },
    {
      title: "Frequency",
      dataIndex: "followUpSchedule",
      render: (_, record) => (
        <div>
          <Text>{record.followUpSchedule.frequency}</Text>
        </div>
      ),
    },
    {
      title: "Due Date",
      dataIndex: "followUpSchedule",
      render: (_, record) => (
        <div>
          <Text>
            {format(new Date(record.followUpSchedule.dueDate), "dd-MM-yyyy")}
          </Text>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "clinicalAssessment",
      render: (_, record) => {
        let color;
        switch (record.clinicalAssessment.status) {
          case "Pending":
            color = "orange";
            break;
          case "Active":
            color = "green";
            break;

          case "Completed":
            color = "cyan";
            break;

          default:
            color = "default";
        }
        return <Tag color={color}>{record.clinicalAssessment.status}</Tag>;
      },
    },
    {
      title: "Action",
      dataIndex: "actions",
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Edit Patient">
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                setOpenForm(true);
                setContent(record);
              }}
            />
          </Tooltip>
          <Tooltip title="Delete Patient">
            <DeleteConfirm
              recordId={record._id}
              title="Are you sure?"
              source="table"
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
          title=" Follow-up & Reviews"
          subtitle="Track post-surgery follow-ups and clinic reviews."
        />
        <Button
          type="primary"
          style={{ marginTop: 10 }}
          onClick={() => setOpenAddForm(true)}
        >
          + Schedule Follow Up
        </Button>
      </div>

      {/* statistics cards */}
      <div style={{ marginBottom: 16 }}>
        <Row gutter={[24, 16]}>
          <Col span={6}>
            <Card variant="borderless">
              <Statistic
                title={<span style={{ color: "whitesnow" }}>All</span>}
                value={data.length}
                formatter={(value) => <CountUpComponent value={data.length} />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card variant="borderless">
              <Statistic
                title={
                  <span style={{ color: "green" }}>
                    Active <PushpinOutlined />
                  </span>
                }
                value={activeValue.length}
                formatter={(value) => (
                  <CountUpComponent value={activeValue.length} />
                )}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card variant="borderless">
              <Statistic
                title={
                  <span style={{ color: "cyan" }}>
                    Completed <CheckCircleOutlined />
                  </span>
                }
                value={completedValue.length}
                formatter={(value) => (
                  <CountUpComponent value={completedValue.length} />
                )}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card variant="borderless">
              <Statistic
                title={
                  <span style={{ color: "orange" }}>
                    Pending <ClockCircleOutlined />
                  </span>
                }
                value={pendingValue.length}
                formatter={(value) => (
                  <CountUpComponent value={pendingValue.length} />
                )}
              />
            </Card>
          </Col>
        </Row>
      </div>

      {/* <Divider /> */}

      <div style={{ marginBottom: 20 }}>
        <div>
          <SearchComponent value={searchTerm} onChange={setSearchTerm} />
        </div>

        <div style={{ marginTop: 16 }}>
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

      {/* Follow-up Table */}
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
          viewRecord={viewSchedule}
        />
      </div>

      <ViewFollowUp
        content={content}
        loading={loading}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />

      <AddFollowUp setOpenForm={setOpenAddForm} openForm={openAddForm} />

      <EditFollowUp
        setOpenForm={setOpenForm}
        openForm={openForm}
        schedule={content}
      />
    </>
  );
}

export default FollowUp;
