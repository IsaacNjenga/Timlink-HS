import React from "react";
import DrawerComponent from "../../components/DrawerComponent";
import {
  Spin,
  Descriptions,
  Tag,
  Divider,
  Typography,
  theme,
  Row,
  Col,
  Card,
} from "antd";
import {
  BankOutlined,
  EnvironmentOutlined,
  ContactsOutlined,
  ClusterOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";

const { Text, Title } = Typography;

function ViewHospital({ content, loading, openModal, setOpenModal }) {
  const { token } = theme.useToken();

  const getStatusTagColor = (status) => {
    const colors = {
      Active: "success",
      Inactive: "error",
    };
    return colors[status] || "default";
  };

  return (
    <DrawerComponent
      openModal={openModal}
      setOpenModal={setOpenModal}
      width={650}
      title={content ? content.hospitalName : "Hospital Profile View"}
    >
      {loading ? (
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
          <Spin size="large" tip="Loading clinical profile..." />
        </div>
      ) : content ? (
        <div
          style={{
            padding: "4px 8px",
            background: token.colorBgContainer,
            color: token.colorText,
          }}
        >
          {/* SECTION 1: Base Core Profile */}
          <Divider orientation="left" style={{ marginTop: 0 }}>
            <span style={{ color: token.colorPrimary }}>
              <BankOutlined /> General Profile
            </span>
          </Divider>
          <Descriptions column={{ xs: 1, sm: 2 }} bordered size="small">
            <Descriptions.Item label="Hospital Name" span={{ xs: 1, sm: 2 }}>
              <Text strong style={{ fontSize: "15px" }}>
                {content.hospitalName}
              </Text>
            </Descriptions.Item>
            <Descriptions.Item label="Facility Code">
              <Tag color="blue">{content.code || "—"}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Operational Status">
              <Tag color={getStatusTagColor(content.status)}>
                {content.status ? content.status.toUpperCase() : "UNKNOWN"}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item
              label="Classification Tier"
              span={{ xs: 1, sm: 2 }}
            >
              <Text strong>{content.tier || "—"}</Text>
            </Descriptions.Item>
          </Descriptions>

          {/* SECTION 2: Physical Location Mapping */}
          <Divider orientation="left">
            <span style={{ color: token.colorPrimary }}>
              <EnvironmentOutlined /> Location Map
            </span>
          </Divider>
          <Descriptions column={{ xs: 1, sm: 2 }} bordered size="small">
            <Descriptions.Item label="Physical Address" span={{ xs: 1, sm: 2 }}>
              {content.location?.address || "—"}
            </Descriptions.Item>
            <Descriptions.Item label="City">
              {content.location?.city || "—"}
            </Descriptions.Item>
            <Descriptions.Item label="Country">
              {content.location?.country || "Kenya"}
            </Descriptions.Item>
          </Descriptions>

          {/* SECTION 3: Administrative Contacts */}
          <Divider orientation="left">
            <span style={{ color: token.colorPrimary }}>
              <ContactsOutlined /> Communication Contacts
            </span>
          </Divider>
          <Descriptions column={{ xs: 1, sm: 2 }} bordered size="small">
            <Descriptions.Item
              label="Primary Phone Line"
              span={{ xs: 1, sm: 2 }}
            >
              <Text strong>{content.contact?.phone || "—"}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Official Email" span={{ xs: 1, sm: 2 }}>
              {content.contact?.email ? (
                <Text copyable>{content.contact.email}</Text>
              ) : (
                "—"
              )}
            </Descriptions.Item>
            <Descriptions.Item
              label="Emergency Hotline"
              span={{ xs: 1, sm: 2 }}
            >
              <Text type="danger" strong>
                {content.contact?.emergencyExt || "—"}
              </Text>
            </Descriptions.Item>
          </Descriptions>

          {/* SECTION 4: Resource Capacities */}
          <Divider orientation="left">
            <span style={{ color: token.colorPrimary }}>
              <ClusterOutlined /> Operational Capacities
            </span>
          </Divider>
          <Row gutter={16}>
            <Col span={8}>
              <Card
                size="small"
                style={{ textAlign: "center", background: token.colorBgLayout }}
              >
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  Total Beds
                </Text>
                <Title level={4} style={{ margin: "4px 0 0 0" }}>
                  {content.operationalCapacity?.totalBeds ?? "—"}
                </Title>
              </Card>
            </Col>
            <Col span={8}>
              <Card
                size="small"
                style={{ textAlign: "center", background: token.colorBgLayout }}
              >
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  ICU Beds
                </Text>
                <Title
                  level={4}
                  style={{ margin: "4px 0 0 0" }}
                  type={
                    content.operationalCapacity?.icuBeds > 0 ? "warning" : ""
                  }
                >
                  {content.operationalCapacity?.icuBeds ?? "—"}
                </Title>
              </Card>
            </Col>
            <Col span={8}>
              <Card
                size="small"
                style={{ textAlign: "center", background: token.colorBgLayout }}
              >
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  Theatres
                </Text>
                <Title level={4} style={{ margin: "4px 0 0 0" }} type="success">
                  {content.operationalCapacity?.theatres ?? "—"}
                </Title>
              </Card>
            </Col>
          </Row>

          {/* SECTION 5: Accredited Insurance Panels */}
          <Divider orientation="left">
            <span style={{ color: token.colorPrimary }}>
              <SafetyCertificateOutlined /> Accredited Insurance Panels
            </span>
          </Divider>
          <div
            style={{
              padding: "12px",
              background: token.colorBgLayout,
              borderRadius: token.borderRadiusSM,
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            {content.insurancePanels && content.insurancePanels.length > 0 ? (
              content.insurancePanels.map((panel, idx) => (
                <Tag
                  key={idx}
                  color="purple"
                  style={{ margin: 0, padding: "2px 8px" }}
                >
                  {panel}
                </Tag>
              ))
            ) : (
              <Text type="secondary" italic>
                No insurance panel coverages map onto this facility
                configuration.
              </Text>
            )}
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <Text type="secondary">No hospital data available to display.</Text>
        </div>
      )}
    </DrawerComponent>
  );
}

export default ViewHospital;
