import React from "react";
import ModalComponent from "../../components/ModalComponent";
import { Descriptions, Tag, Divider, Typography, theme } from "antd";
import {
  UserOutlined,
  ContactsOutlined,
  TeamOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { format } from "date-fns";
import { useDeletePatient } from "../../hooks/Patient/deletePatient";

const { Text } = Typography;

function ViewPatient({ content, loading, openModal, setOpenModal, refresh }) {
  const { deletePatient } = useDeletePatient();
  const { token } = theme.useToken();

  // Helper to color-code case status tags beautifully
  const getStatusTagColor = (status) => {
    const colors = {
      "New Lead": "blue",
      "Under Review": "orange",
      Matched: "cyan",
      Scheduled: "purple",
      Completed: "success",
      Closed: "error",
    };
    return colors[status] || "default";
  };

  return (
    <ModalComponent
      openModal={openModal}
      setOpenModal={setOpenModal}
      width={750}
      title={"Patient File"}
      contentLoading={loading}
      recordId={content._id}
      editPath={`/patient&leads/edit-patient/${content._id}`}
      deleteRecord={deletePatient}
      refresh={refresh}
    >
      {content ? (
        <>
          {/* SECTION 1: Personal Profile */}
          <Divider orientation="left" style={{ marginTop: 0 }}>
            <span style={{ color: token.colorPrimary }}>
              <UserOutlined /> Personal Profile
            </span>
          </Divider>
          <Descriptions column={{ xs: 1, sm: 2 }} bordered size="small">
            <Descriptions.Item label="First Name">
              {content.firstName}
            </Descriptions.Item>
            <Descriptions.Item label="Last Name">
              {content.lastName}
            </Descriptions.Item>
            <Descriptions.Item label="Date of Birth">
              {content.dateOfBirth
                ? format(new Date(content.dateOfBirth), "PPPP")
                : null}
            </Descriptions.Item>
            <Descriptions.Item label="Gender">
              {content.gender}
            </Descriptions.Item>
          </Descriptions>

          {/* SECTION 2: Contact Information */}
          <Divider orientation="left">
            <span style={{ color: token.colorPrimary }}>
              <ContactsOutlined /> Contact Information
            </span>
          </Divider>
          <Descriptions column={{ xs: 1, sm: 2 }} bordered size="small">
            <Descriptions.Item label="Phone Number">
              {content.phone}
            </Descriptions.Item>
            <Descriptions.Item label="Email Address">
              {content.email || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Physical Address" span={2}>
              {content.address}
            </Descriptions.Item>
          </Descriptions>

          {/* SECTION 3: Next of Kin Details */}
          <Divider orientation="left">
            <span style={{ color: token.colorPrimary }}>
              <TeamOutlined /> Next of Kin Details
            </span>
          </Divider>
          {content.nextOfKin ? (
            <Descriptions column={{ xs: 1, sm: 2 }} bordered size="small">
              <Descriptions.Item label="Kin Name">
                {content.nextOfKin[0].name}
              </Descriptions.Item>
              <Descriptions.Item label="Relationship">
                {content.nextOfKin[0].relation}
              </Descriptions.Item>
              <Descriptions.Item label="Primary Phone">
                {content.nextOfKin[0].contact}
              </Descriptions.Item>
              <Descriptions.Item label="Email Address">
                {content.nextOfKin[0].email || "—"}
              </Descriptions.Item>
            </Descriptions>
          ) : (
            <Text type="secondary" italic>
              No Next of Kin details provided.
            </Text>
          )}

          {/* SECTION 4: Case & Intake Details */}
          <Divider orientation="left">
            <span style={{ color: token.colorPrimary }}>
              <SolutionOutlined /> Case & Clinical Details
            </span>
          </Divider>
          <Descriptions column={{ xs: 1, sm: 2 }} bordered size="small">
            <Descriptions.Item label="Case Status">
              <Tag color={getStatusTagColor(content.status)}>
                {content.status ? content.status.toUpperCase() : "UNKNOWN"}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Payment Mode">
              {content.paymentMode}
            </Descriptions.Item>
            <Descriptions.Item label="Date of Registration">
              {content.dateOfRegistration
                ? format(new Date(content?.dateOfRegistration), "PPPP")
                : null}
            </Descriptions.Item>
            <Descriptions.Item
              label="Referral Source"
              span={content.referralType === "referral doctor" ? 1 : 2}
            >
              <span style={{ textTransform: "capitalize" }}>
                {content.referralType}
              </span>
            </Descriptions.Item>
            {content.referralType === "referral doctor" && (
              <Descriptions.Item label="Referring Physician">
                {content.referringDoctor || "Unassigned"}
              </Descriptions.Item>
            )}
            <Descriptions.Item label="Diagnosis" span={2}>
              {content.diagnosis}
            </Descriptions.Item>
            <Descriptions.Item label="Notes / Comments" span={2}>
              <div
                style={{
                  whiteSpace: "pre-wrap",
                  color: token.colorTextSecondary,
                  minHeight: "40px",
                }}
              >
                {content.notes ||
                  "No historical notes appended to this profile."}
              </div>
            </Descriptions.Item>
          </Descriptions>
        </>
      ) : (
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <Text type="secondary">No patient data available to view.</Text>
        </div>
      )}
    </ModalComponent>
  );
}

export default ViewPatient;
