import React, { useMemo, useState } from "react";
import PageTitle from "../../components/PageTitle";
// import { PatientData as data } from "../../assets/data/patientData";
import { useNavigate } from "react-router-dom";
import { Button, Space, Tag, Flex, Tooltip, Avatar, Typography } from "antd";
import TableComponent from "../../components/TableComponent";
import SearchComponent from "../../components/SearchComponent";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { format, formatDistanceToNowStrict } from "date-fns";
import ViewPatient from "./ViewPatient";
import DeleteConfirm from "../../components/DeleteConfirm";
import { usePop } from "../../contexts/popContext";
import { useFetchPatients } from "../../hooks/Patient/fetchAllPatients";

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
  const { setOpenConfirm } = usePop();
  const {
    patients,
    loading: patientsLoading,
    refresh,
    totalPages,
    totalPatients,
    currentPage,
  } = useFetchPatients();
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const viewPatient = (patient) => {
    setLoading(true);
    setContent(patient);
    setOpenModal(true);
    setTimeout(() => setLoading(false), 100);
  };

  const filteredData = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return patients.filter((item) => {
      const matchesStatus =
        selectedStatus === "All" || item.status === selectedStatus;
      const matchesSearch =
        !normalizedSearch ||
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(normalizedSearch),
        );

      return matchesStatus && matchesSearch;
    });
  }, [searchTerm, selectedStatus, patients]);

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
                {formatDistanceToNowStrict(new Date(record?.dateOfBirth), {
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
      dataIndex: "referralType",
      render: (_, record) =>
        record.referralType || (
          <Text>
            {record.referralType === "referral doctor"
              ? record.referringDoctor
              : record.referralType}
          </Text>
        ),
    },
    {
      title: "Payment Mode",
      dataIndex: "paymentMode",
      render: (_, record) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: 4,
            borderRadius: 8,
          }}
        >
          <div>
            <Text>{record.paymentMode}</Text>
          </div>
          <div>
            <Text type="secondary">
              D.O.R: {format(new Date(record.dateOfRegistration), "dd-MM-yyyy")}
            </Text>
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
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Edit Patient">
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/patient&leads/edit-patient/${record._id}`);
              }}
            />
          </Tooltip>
          <Tooltip title="Delete Patient">
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
        <TableComponent
          rowKey="_id"
          columns={columns}
          data={filteredData}
          size="medium"
          loading={loading || patientsLoading}
          viewRecord={viewPatient}
        />
      </div>

      <ViewPatient
        content={content}
        loading={loading}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
}

export default Patient;
