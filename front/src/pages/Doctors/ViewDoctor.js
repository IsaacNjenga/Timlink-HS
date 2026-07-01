import React from "react";
import DrawerComponent from "../../components/DrawerComponent";
import { Descriptions, Tag, Divider, Typography, theme, List } from "antd";
import {
  UserOutlined,
  ContactsOutlined,
  MedicineBoxOutlined,
  BankOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

function ViewDoctor({ content, loading, openModal, setOpenModal }) {
  const { token } = theme.useToken();

  // Color-coding for Operational Status
  const getStatusColor = (status) => {
    return status === "Active" ? "success" : "error";
  };

  // Safe formatting for Kenyan Shilling values
  const formatCurrency = (amount) => {
    if (amount === undefined || amount === null) return "KES 0.00";
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
    }).format(amount);
  };

  return (
    <DrawerComponent
      openModal={openModal}
      setOpenModal={setOpenModal}
      width={700}
      title={
        content
          ? `Dr. ${content.firstName} ${content.lastName}`
          : "Doctor Profile View"
      }
      contentLoading={loading}
      recordId={content._id}
      editPath={`/doctor-portfolio/edit-doctor/${content._id}`}
    >
      {content ? (
        <>
          {/* SECTION 1: Professional Demographics */}
          <Divider orientation="left" style={{ marginTop: 0 }}>
            <span style={{ color: token.colorPrimary }}>
              <UserOutlined /> Professional Profile
            </span>
          </Divider>
          <Descriptions column={{ xs: 1, sm: 2 }} bordered size="small">
            <Descriptions.Item label="Full Name">
              <Text strong>
                Dr. {content.firstName} {content.lastName}
              </Text>
            </Descriptions.Item>
            <Descriptions.Item label="Specialty">
              <Tag color="blue">{content.specialty}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color={getStatusColor(content.status)}>
                {content.status ? content.status.toUpperCase() : "UNKNOWN"}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Agreed Fee Split">
              <Text strong color={token.colorInfoText}>
                {content.agreedFeePercent || 0}%
              </Text>
            </Descriptions.Item>
          </Descriptions>

          {/* SECTION 2: Financial Metrics */}
          <Divider orientation="left">
            <span style={{ color: token.colorPrimary }}>
              <MedicineBoxOutlined /> Financial Metrics
            </span>
          </Divider>
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item
              label="Total Revenue Generated"
              style={{ background: token.colorSuccessBgSimple }}
            >
              <Text
                strong
                style={{ fontSize: "15px", color: token.colorSuccessText }}
              >
                {formatCurrency(content.totalRevenue)}
              </Text>
            </Descriptions.Item>
          </Descriptions>

          {/* SECTION 3: Contact Channels */}
          <Divider orientation="left">
            <span style={{ color: token.colorPrimary }}>
              <ContactsOutlined /> Contact Channels
            </span>
          </Divider>
          <Descriptions column={{ xs: 1, sm: 2 }} bordered size="small">
            <Descriptions.Item label="Phone Line">
              {content.contact?.phone || "—"}
            </Descriptions.Item>
            <Descriptions.Item label="Email Address">
              {content.contact?.email ? (
                <Text copyable>{content.contact.email}</Text>
              ) : (
                "—"
              )}
            </Descriptions.Item>
          </Descriptions>

          {/* SECTION 4: Admitting Affiliations */}
          <Divider orientation="left">
            <span style={{ color: token.colorPrimary }}>
              <BankOutlined /> Partner Admitting Hospitals
            </span>
          </Divider>
          {content.partnerHospitals && content.partnerHospitals.length > 0 ? (
            <List
              size="small"
              bordered
              dataSource={content.partnerHospitals}
              renderItem={(hospital) => (
                <List.Item style={{ paddingLeft: "16px" }}>
                  <Text>
                    <BankOutlined
                      style={{
                        marginRight: 8,
                        color: token.colorTextDescription,
                      }}
                    />{" "}
                    {hospital}
                  </Text>
                </List.Item>
              )}
              style={{
                background: token.colorBgLayout,
                borderRadius: token.borderRadiusSM,
              }}
            />
          ) : (
            <Text type="secondary" italic>
              No partner admitting facilities assigned to this provider.
            </Text>
          )}
        </>
      ) : (
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <Text type="secondary">No doctor data available to display.</Text>
        </div>
      )}
    </DrawerComponent>
  );
}

export default ViewDoctor;
