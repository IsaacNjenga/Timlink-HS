import React from "react";
import DrawerComponent from "../../../components/DrawerComponent";
import { Descriptions, Tag, Divider, Typography, theme } from "antd";
import {
  FileTextOutlined,
  UserOutlined,
  SettingOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

function ViewService({ content, loading, openModal, setOpenModal }) {
  const { token } = theme.useToken();

  // Status style mapping selector
  const getStatusTagColor = (status) => {
    switch (status) {
      case "Completed":
        return "success";
      case "Scheduled":
        return "processing";
      case "Cancelled":
        return "error";
      default:
        return "default";
    }
  };

  // Helper to format ISO dates or $date objects safely
  const displayDate = (dateField) => {
    if (!dateField) return "—";
    const rawDate = dateField.$date ? dateField.$date : dateField;
    try {
      return new Date(rawDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "—";
    }
  };

  return (
    <DrawerComponent
      openModal={openModal}
      setOpenModal={setOpenModal}
      width={650}
      title={
        content?.jobId
          ? `Service Session Profile: ${content.jobId}`
          : "Service Job Details"
      }
      contentLoading={loading}
      recordId={content?._id}
      editPath={`/doctor-portfolio/edit-doctor/${content?._id}`}
    >
      {content ? (
        <div style={{ padding: "4px 8px" }}>
          {/* SECTION 1: Client Ownership details */}
          <Divider orientation="left" style={{ marginTop: 0 }}>
            <span style={{ color: token.colorPrimary }}>
              <UserOutlined /> Client Identification
            </span>
          </Divider>

          <Descriptions
            column={{ xs: 1, sm: 2 }}
            bordered
            size="small"
            style={{ marginBottom: "16px" }}
          >
            <Descriptions.Item label="Client Classification">
              <Tag
                color={content.clientType === "Patient" ? "blue" : "magenta"}
              >
                {content.clientType?.toUpperCase() || "—"}
              </Tag>
            </Descriptions.Item>

            {/* Conditional Fields based on Client Classification Type */}
            {content.clientType === "Patient" ? (
              <>
                <Descriptions.Item label="Patient Name">
                  <Text strong>{content.patientDetails?.fullName || "—"}</Text>
                </Descriptions.Item>
                <Descriptions.Item label="Patient ID Mapping" span={2}>
                  <Tag color="purple">
                    {content.patientDetails?.patientId || "—"}
                  </Tag>
                </Descriptions.Item>
              </>
            ) : (
              <>
                <Descriptions.Item label="Referral Name">
                  <Text strong>
                    {content.externalClientDetails?.walkInName || "—"}
                  </Text>
                </Descriptions.Item>
                <Descriptions.Item label="Originating Facility">
                  <Text>
                    {content.externalClientDetails?.organizationName || "—"}
                  </Text>
                </Descriptions.Item>
                <Descriptions.Item label="Referral Reference ID">
                  <Tag color="cyan">
                    {content.externalClientDetails?.referralRef || "—"}
                  </Tag>
                </Descriptions.Item>
              </>
            )}
          </Descriptions>

          {/* SECTION 2: Service Allocation & Hardware */}
          <Divider orientation="left">
            <span style={{ color: token.colorPrimary }}>
              <SettingOutlined /> Service Assignment & Infrastructure
            </span>
          </Divider>

          <Descriptions
            column={{ xs: 1, sm: 2 }}
            bordered
            size="small"
            style={{ marginBottom: "16px" }}
          >
            <Descriptions.Item label="Service Requested">
              <Text strong>{content.serviceType || "—"}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Target Equipment">
              <Text>{content.equipment?.name || "—"}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Equipment Code">
              <Tag color="geekblue">{content.equipment?.code || "—"}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Facility / Location">
              <Text type="secondary">{content.facilityLocation || "—"}</Text>
            </Descriptions.Item>
          </Descriptions>

          {/* SECTION 3: Operations Timeline & Cost metrics */}
          <Divider orientation="left">
            <span style={{ color: token.colorPrimary }}>
              <CalendarOutlined /> Logistics & Operational Billing
            </span>
          </Divider>

          <Descriptions
            column={{ xs: 1, sm: 2 }}
            bordered
            size="small"
            style={{ marginBottom: "16px" }}
          >
            <Descriptions.Item label="Service Date & Time">
              {displayDate(content.serviceDate)}
            </Descriptions.Item>
            <Descriptions.Item label="Workflow Status">
              <Tag color={getStatusTagColor(content.status)}>
                {content.status ? content.status.toUpperCase() : "UNKNOWN"}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Service Base Cost" span={2}>
              <Text
                strong
                style={{ color: token.colorSuccess, fontSize: "15px" }}
              >
                KES{" "}
                {content.serviceCost
                  ? content.serviceCost.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })
                  : "0.00"}
              </Text>
            </Descriptions.Item>
          </Descriptions>

          {/* SECTION 4: Context Observations / Notes block */}
          <Divider orientation="left">
            <span style={{ color: token.colorPrimary }}>
              <FileTextOutlined /> Service Documentation Notes
            </span>
          </Divider>

          <div
            style={{
              padding: "12px 16px",
              background: token.colorBgLayout,
              borderRadius: token.borderRadiusSM,
              borderLeft: `4px solid ${token.colorPrimary}`,
              minHeight: "70px",
            }}
          >
            {content.notes ? (
              <Text style={{ whiteSpace: "pre-wrap", display: "block" }}>
                {content.notes}
              </Text>
            ) : (
              <Text type="secondary" italic>
                No functional parameters, clinical observations, or technicians'
                remarks logs recorded.
              </Text>
            )}
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <Text type="secondary">No data available to display.</Text>
        </div>
      )}
    </DrawerComponent>
  );
}

export default ViewService;
