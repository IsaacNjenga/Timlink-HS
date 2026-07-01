import React, { useMemo, useState } from "react";
import PageTitle from "../../components/PageTitle";
import { useNavigate } from "react-router-dom";
import { Button, Space, Tag, Tooltip, Avatar, Typography } from "antd";
import TableComponent from "../../components/TableComponent";
import SearchComponent from "../../components/SearchComponent";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { DoctorData as data } from "../../assets/data/doctorData";
import ViewDoctor from "./ViewDoctor";
import { usePop } from "../../contexts/popContext";
import DeleteConfirm from "../../components/DeleteConfirm";

const { Text } = Typography;

function Doctors() {
  const navigate = useNavigate();
  const { setOpenConfirm } = usePop();
  const [searchTerm, setSearchTerm] = useState("");
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const viewDoctor = (doctor) => {
    setLoading(true);
    setContent(doctor);
    setOpenModal(true);
    setTimeout(() => setLoading(false), 100);
  };

  const filteredData = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return data.filter((item) => {
      const matchesSearch =
        !normalizedSearch ||
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(normalizedSearch),
        );

      return matchesSearch;
    });
  }, [searchTerm]);

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
              {record.firstName?.charAt(0)} {record.lastName?.charAt(0)}
            </Avatar>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontWeight: "bold", fontSize: 16, marginBottom: 0 }}>
              {record.firstName} {record.lastName}
            </div>
            <div>
              <Text type="secondary">{record.contact.email}</Text>
            </div>
            <div>
              <Text type="secondary">{record.contact.phone}</Text>
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
          Ksh {record.totalRevenue.toLocaleString()}
        </Text>
      ),
    },

    {
      title: "Partner Hospitals",
      dataIndex: "partnerHospitals",
      key: "partnerHospitals",
      render: (_, record) => (
        <div>
          {record.partnerHospitals.map((hospital, index) => (
            <div>
              <Tag key={index}>{hospital}</Tag>
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
                console.log(`Successfully deleted ${id}`);
              }}
            >
              <Button
                type="link"
                icon={<DeleteOutlined />}
                onClick={(e) => {
                  e.stopPropagation();  setOpenConfirm({
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
          size="large"
          loading={loading}
          viewRecord={viewDoctor}
        />
      </div>
      <ViewDoctor
        content={content}
        loading={loading}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </>
  );
}

export default Doctors;
