import React, { useMemo, useState } from "react";
import PageTitle from "../../components/PageTitle";
import { useNavigate } from "react-router-dom";
import { Button, Space, Tag, Flex, Tooltip, Avatar, Typography } from "antd";
import TableComponent from "../../components/TableComponent";
import SearchComponent from "../../components/SearchComponent";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { formatDistanceToNowStrict } from "date-fns";
import { DoctorData as data } from "../../assets/data/doctorData";

const { Text } = Typography;

function Doctors() {
  const navigate = useNavigate();
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

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

  const columns=[
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Specialty",
      dataIndex: "specialty",
      key: "specialty",
    },
    {
      title: "Fee",
      dataIndex: "fee",
      key: "fee",
    },
  ]

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
          // viewRecord={viewPatient}
        />
      </div>

    </>
  );
}

export default Doctors;
