import React from "react";
import DrawerComponent from "../../components/DrawerComponent";
import { Descriptions, Tag, Divider, Typography, theme, Alert } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  HeartOutlined,
  FileTextOutlined,
  PhoneOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

function ViewFollowUp({ content, loading, openModal, setOpenModal }) {
  const { token } = theme.useToken();

  // Color mappings for operational status
  const getStatusTagColor = (status) => {
    const colors = {
      Pending: "warning",
      Active: "processing",
      Completed: "success",
    };
    return colors[status] || "default";
  };

  // Color mappings for clinical risk categories
  const getRiskTagColor = (risk) => {
    const colors = {
      Low: "success",
      Medium: "warning",
      High: "error",
    };
    return colors[risk] || "default";
  };

  // Helper to format ISO dates or standard $date objects safely inside the view drawer
  const displayDate = (dateField) => {
    if (!dateField) return "—";
    const rawDate = dateField.$date ? dateField.$date : dateField;
    try {
      return new Date(rawDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
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
        content?.patientDetails?.fullName
          ? `Follow-up Profile: ${content.patientDetails.fullName}`
          : "Follow-up Details View"
      }
      contentLoading={loading}
      recordId={content._id}
      editPath={null}
    >
      {content ? (
        <>
          {/* High-Alert Banner if Patient is high risk */}
          {content.clinicalAssessment?.complicationRiskScore === "High" && (
            <Alert
              message="High Complication Risk Asset"
              description="This patient requires strict check-in adherence. Ensure the assigned care coordinator reviews physical updates immediately."
              type="error"
              showIcon
              style={{ marginBottom: "20px", borderRadius: "6px" }}
            />
          )}

          {/* SECTION 1: Case & Patient Details */}
          <Divider orientation="left" style={{ marginTop: 0 }}>
            <span style={{ color: token.colorPrimary }}>
              <UserOutlined /> Linked Profile
            </span>
          </Divider>
          <Descriptions column={{ xs: 1, sm: 2 }} bordered size="small">
            <Descriptions.Item label="Patient Name">
              <Text strong>{content.patientDetails?.fullName || "—"}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Patient Code">
              <Tag color="purple">
                {content.patientDetails?.patientCode || "—"}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Case Association">
              <Text strong>{content.caseDetails?.caseCode || "—"}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Surgical Procedure">
              <Text italic>{content.caseDetails?.procedureName || "—"}</Text>
            </Descriptions.Item>
          </Descriptions>

          {/* SECTION 2: Schedule & Channels */}
          <Divider orientation="left">
            <span style={{ color: token.colorPrimary }}>
              <CalendarOutlined /> Timeline & Cadence
            </span>
          </Divider>
          <Descriptions column={{ xs: 1, sm: 2 }} bordered size="small">
            <Descriptions.Item label="Frequency Interval">
              <Text strong>{content.followUpSchedule?.frequency || "—"}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Preferred Channel">
              <span>
                <PhoneOutlined
                  style={{ marginRight: 6, color: token.colorTextDescription }}
                />
                {content.patientDetails?.preferredChannel || "—"}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="Last Evaluated">
              {displayDate(content.followUpSchedule?.lastFollowUpDate)}
            </Descriptions.Item>
            <Descriptions.Item
              label="Next Due Date"
              style={{ background: token.colorWarningBgSimple }}
            >
              <Text strong style={{ color: token.colorWarningText }}>
                {displayDate(content.followUpSchedule?.dueDate)}
              </Text>
            </Descriptions.Item>
          </Descriptions>

          {/* SECTION 3: Clinical Metrics */}
          <Divider orientation="left">
            <span style={{ color: token.colorPrimary }}>
              <HeartOutlined /> Clinical Assessment
            </span>
          </Divider>
          <Descriptions column={{ xs: 1, sm: 2 }} bordered size="small">
            <Descriptions.Item label="Workflow Status">
              <Tag
                color={getStatusTagColor(content.clinicalAssessment?.status)}
              >
                {content.clinicalAssessment?.status
                  ? content.clinicalAssessment.status.toUpperCase()
                  : "UNKNOWN"}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Complication Risk">
              <Tag
                color={getRiskTagColor(
                  content.clinicalAssessment?.complicationRiskScore,
                )}
              >
                {content.clinicalAssessment?.complicationRiskScore
                  ? content.clinicalAssessment.complicationRiskScore.toUpperCase()
                  : "LOW"}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Assigned Coordinator" span={2}>
              <Text strong>
                {content.clinicalAssessment?.assignedCareCoordinator || "—"}
              </Text>
            </Descriptions.Item>
          </Descriptions>

          {/* SECTION 4: Encounter Notes */}
          <Divider orientation="left">
            <span style={{ color: token.colorPrimary }}>
              <FileTextOutlined /> Encounter Logs
            </span>
          </Divider>
          <div
            style={{
              padding: "12px 16px",
              background: token.colorBgLayout,
              borderRadius: token.borderRadiusSM,
              borderLeft: `4px solid ${token.colorPrimary}`,
              minHeight: "80px",
            }}
          >
            {content.notes ? (
              <Text style={{ whiteSpace: "pre-wrap", display: "block" }}>
                {content.notes}
              </Text>
            ) : (
              <Text type="secondary" italic>
                No tracking parameters or observation records logged for this
                session.
              </Text>
            )}
          </div>
        </>
      ) : (
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <Text type="secondary">
            No follow-up records map onto this view instance.
          </Text>
        </div>
      )}
    </DrawerComponent>
  );
}

export default ViewFollowUp;
