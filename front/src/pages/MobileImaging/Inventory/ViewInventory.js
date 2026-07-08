import React from "react";
import { Descriptions, Tag, Divider, Typography, theme } from "antd";
import {
  SettingOutlined,
  CarOutlined,
  EnvironmentOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import DrawerComponent from "../../../components/DrawerComponent";

const { Text } = Typography;

function ViewInventory({ content, loading, openModal, setOpenModal }) {
  const { token } = theme.useToken();

  // Status mapping matching configuration presets
  const getStatusTagColor = (status) => {
    switch (status) {
      case "Available":
        return "success";
      case "In Service":
        return "processing";
      case "Maintenance":
        return "warning";
      default:
        return "default";
    }
  };

  return (
    <DrawerComponent
      openModal={openModal}
      setOpenModal={setOpenModal}
      width={650}
      title={
        content?.equipmentName
          ? `Asset Profile: ${content.equipmentName}`
          : "Asset Equipment View"
      }
      contentLoading={loading}
      recordId={content?._id}
      editPath={`/mobile-imaging/edit-inventory-item/${content?._id}`}
    >
      {content ? (
        <div style={{ padding: "4px 8px" }}>
          {/* SECTION 1: Hardware Specifications */}
          <Divider orientation="left" style={{ marginTop: 0 }}>
            <span style={{ color: token.colorPrimary }}>
              <SettingOutlined /> Asset Specifications
            </span>
          </Divider>

          <Descriptions
            column={{ xs: 1, sm: 2 }}
            bordered
            size="small"
            style={{ marginBottom: "16px" }}
          >
            <Descriptions.Item label="Equipment Name" span={2}>
              <Text strong>{content.equipmentName || "—"}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Category Classification">
              <Tag color={content.category === "X-ray" ? "geekblue" : "purple"}>
                {content.category || "—"}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Serial / Model Num">
              <Text code>{content.serialModel || "—"}</Text>
            </Descriptions.Item>
          </Descriptions>

          {/* SECTION 2: Logistics & Tracking */}
          <Divider orientation="left">
            <span style={{ color: token.colorPrimary }}>
              <CarOutlined /> Logistics & Fleet Assignment
            </span>
          </Divider>

          <Descriptions
            column={{ xs: 1, sm: 2 }}
            bordered
            size="small"
            style={{ marginBottom: "16px" }}
          >
            <Descriptions.Item label="Vehicle Plate Registration">
              <span
                style={{
                  borderRadius: "4px",
                  fontWeight: "bold",
                  letterSpacing: "0.5px",
                }}
              >
                {content.vehiclePlate || "NOT MOUNTED"}
              </span>
            </Descriptions.Item>
            <Descriptions.Item label="Operational Status">
              <Tag color={getStatusTagColor(content.status)}>
                {content.status ? content.status.toUpperCase() : "UNKNOWN"}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Current Deposition / Location" span={2}>
              <Text>
                <EnvironmentOutlined
                  style={{ color: token.colorTextSecondary }}
                />{" "}
                {content.location || "—"}
              </Text>
            </Descriptions.Item>
          </Descriptions>

          {/* SECTION 3: Rate Pricing Tier */}
          <Divider orientation="left">
            <span style={{ color: token.colorPrimary }}>
              <FileTextOutlined /> Financial Metrics
            </span>
          </Divider>

          <Descriptions
            column={1}
            bordered
            size="small"
            style={{ marginBottom: "16px" }}
          >
            <Descriptions.Item label="Rate / Job (Base Unit)">
              <Text
                strong
                style={{ color: token.colorSuccess, fontSize: "16px" }}
              >
                KES{" "}
                {content.rate
                  ? content.rate.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                    })
                  : "0.00"}
              </Text>
            </Descriptions.Item>
          </Descriptions>

          {/* SECTION 4: Condition and Asset Logs */}
          <Divider orientation="left">
            <span style={{ color: token.colorPrimary }}>
              <FileTextOutlined /> Maintenance Logs & Notes
            </span>
          </Divider>

          <div
            style={{
              padding: "12px 16px",
              background: token.colorBgLayout,
              borderRadius: token.borderRadiusSM,
              borderLeft: `4px solid ${content.status === "Maintenance" ? token.colorWarning : token.colorPrimary}`,
              minHeight: "70px",
            }}
          >
            {content.notes ? (
              <Text style={{ whiteSpace: "pre-wrap", display: "block" }}>
                {content.notes}
              </Text>
            ) : (
              <Text type="secondary" italic>
                No historical damage, deployment criteria rules, or calibration
                cycle notes logged for this hardware block.
              </Text>
            )}
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <Text type="secondary">
            No equipment inventory data available to display.
          </Text>
        </div>
      )}
    </DrawerComponent>
  );
}

export default ViewInventory;
