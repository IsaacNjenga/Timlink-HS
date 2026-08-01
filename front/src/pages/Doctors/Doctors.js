import React, { useMemo, useState } from "react";
import PageTitle from "../../components/PageTitle";
import { useNavigate } from "react-router-dom";
import { Button, Space, Tag, Tooltip, Avatar, Typography, Flex } from "antd";
import TableComponent from "../../components/TableComponent";
import SearchComponent from "../../components/SearchComponent";
import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
// import { DoctorData as data } from "../../assets/data/doctorData";
import ViewDoctor from "./ViewDoctor";
import { usePop } from "../../contexts/popContext";
import DeleteConfirm from "../../components/DeleteConfirm";
import { useDeleteDoctor } from "../../hooks/Doctor/deleteDoctor";
import { useFetchDoctors } from "../../hooks/Doctor/fetchAllDoctors";

const { Text } = Typography;

function Doctors() {
  const navigate = useNavigate();
  const { setOpenConfirm } = usePop();
  const {
    doctors,
    loading: doctorsLoading,
    totalDoctors,
    refresh,
  } = useFetchDoctors();
  const { deleteDoctor } = useDeleteDoctor();
  const [searchTerm, setSearchTerm] = useState("");
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  console.log(doctors);

  const viewDoctor = (doctor) => {
    setLoading(true);
    setContent(doctor);
    setOpenModal(true);
    setTimeout(() => setLoading(false), 100);
  };

  const filteredData = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return doctors.filter((item) => {
      const matchesSearch =
        !normalizedSearch ||
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(normalizedSearch),
        );

      return matchesSearch;
    });
  }, [searchTerm, doctors]);

  const columns = [
    {
      title: "Patient",
      dataIndex: "name",
      key: "name",
      width: 320,
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
              style={{ backgroundColor: "#f53100", verticalAlign: "middle" }}
            >
              {record?.firstName?.charAt(0)} {record?.lastName?.charAt(0)}
            </Avatar>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontWeight: "bold", fontSize: 16, marginBottom: 0 }}>
              {record?.firstName} {record?.lastName}
            </div>
            <div>
              <Text type="secondary">{record?.email}</Text>
            </div>
            <div>
              <Text type="secondary">{record?.phone}</Text>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Specialty",
      dataIndex: "specialty",
      key: "specialty",
    },
    {
      title: "Fee (%)",
      dataIndex: "agreedFeePercent",
      key: "agreedFeePercent",
    },
    {
      title: "Revenue",
      dataIndex: "totalRevenue",
      key: "totalRevenue",
      render: (_, record) => (
        <Text style={{ color: "green" }}>
          Ksh {record?.totalRevenue?.toLocaleString()}
        </Text>
      ),
    },

    {
      title: "Partner Hospitals",
      dataIndex: "partnerHospitals",
      key: "partnerHospitals",
      render: (_, record) => (
        <div>
          {record?.partnerHospitals?.map((hospital, index) => (
            <div>
              <Tag key={index}>{hospital.hospitalName}</Tag>
            </div>
          ))}
        </div>
      ),
    },

    {
      title: "Actions",
      dataIndex: "actions",
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Edit Doctor">
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/doctor-portfolio/edit-doctor/${record._id}`);
              }}
            />
          </Tooltip>
          <Tooltip title="Delete Doctor">
            <DeleteConfirm
              recordId={record._id}
              title="Are you sure?"
              source="table"
              description="This action cannot be undone!"
              onConfirmSuccess={(id) => {
                deleteDoctor(id);
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
      {" "}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <PageTitle
          title="Doctors' Portfolio"
          subtitle="Surgeon profiles, fee agreements, and performance summaries."
        />
        <Button
          type="primary"
          style={{ marginTop: 10 }}
          onClick={() => navigate("/doctor-portfolio/add-doctor")}
        >
          + Add Doctor
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
          <Flex gap="small" wrap align="center"></Flex>
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
          loading={loading || doctorsLoading}
          viewRecord={viewDoctor}
        />
        <div style={{ marginTop: 10 }}>
          <Text type="secondary">Total Doctors: {totalDoctors}</Text>
        </div>
      </div>
      <ViewDoctor
        content={content}
        loading={loading}
        openModal={openModal}
        setOpenModal={setOpenModal}
        refresh={refresh}
      />
    </>
  );
}

export default Doctors;
