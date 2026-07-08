import React from "react";
import {
  Form,
  Input,
  Select,
  InputNumber,
  Button,
  Row,
  Col,
  Card,
  theme,
} from "antd";
import {
  SettingOutlined,
  CarOutlined,
  DollarOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;

function InventoryForm({ form, formType, handleSubmit, loading }) {
  const { token } = theme.useToken();

  const categories = ["X-ray", "Ultrasound"];
  const statusOptions = ["Available", "In Service", "Maintenance"];

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      requiredMark={false}
    >
      {/* CARD 1: Core Specifications */}
      <Card
        title={
          <span>
            <SettingOutlined
              style={{ marginRight: 8, color: token.colorPrimary }}
            />{" "}
            Technical Specifications
          </span>
        }
        style={{
          marginBottom: "24px",
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.02)",
        }}
      >
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item
              label="Equipment Designation Name"
              name="equipmentName"
              rules={[
                {
                  required: true,
                  message: "Please enter standard hardware profile name",
                },
              ]}
            >
              <Input
                placeholder="e.g., Mobile Field X-Ray Unit Alpha"
                size="large"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Category Stream"
              name="category"
              rules={[
                {
                  required: true,
                  message: "Please assign device modality division category",
                },
              ]}
            >
              <Select placeholder="Select category type" size="large">
                {categories.map((cat) => (
                  <Option key={cat} value={cat}>
                    {cat}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Serial / Model Number String"
              name="serialModel"
              rules={[
                {
                  required: true,
                  message:
                    "Unique model or serial asset code identifier missing",
                },
              ]}
            >
              <Input placeholder="e.g., MXR-990-DR" size="large" />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      {/* CARD 2: Fleet Mapping & Logistics */}
      <Card
        title={
          <span>
            <CarOutlined
              style={{ marginRight: 8, color: token.colorPrimary }}
            />{" "}
            Fleet Allocation & Location Tracking
          </span>
        }
        style={{
          marginBottom: "24px",
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.02)",
        }}
      >
        <Row gutter={24}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Assigned Vehicle Plate Code"
              name="vehiclePlate"
              rules={[
                {
                  required: true,
                  message: "Log regional vehicle transport assignment",
                },
              ]}
            >
              <Input
                placeholder="e.g., KDK 412X"
                size="large"
                style={{ textTransform: "uppercase" }}
                onChange={(e) => {
                  form.setFieldsValue({
                    vehiclePlate: e.target.value.toUpperCase(),
                  });
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Asset Lifecycle Status"
              name="status"
              initialValue="Available"
              rules={[
                {
                  required: true,
                  message: "Please update internal deployment condition status",
                },
              ]}
            >
              <Select size="large">
                {statusOptions.map((status) => (
                  <Option key={status} value={status}>
                    {status}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              label="Current Inventory Location Deposition"
              name="location"
              rules={[
                {
                  required: true,
                  message:
                    "Please specify the structural storage base location",
                },
              ]}
            >
              <Input
                placeholder="e.g., Radiology Dispatch - Bay 1"
                size="large"
              />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      {/* CARD 3: Financial Parameters */}
      <Card
        title={
          <span>
            <DollarOutlined
              style={{ marginRight: 8, color: token.colorPrimary }}
            />{" "}
            Operational Commercialization Tiers
          </span>
        }
        style={{
          marginBottom: "24px",
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.02)",
        }}
      >
        <Row>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Rate / Job Run Cost (KES)"
              name="rate"
              rules={[
                {
                  required: true,
                  message: "Base operational cost field value missing",
                },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                size="large"
                min={0}
                precision={2}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                placeholder="0.00"
              />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      {/* CARD 4: Additional Documentation Logs */}
      <Card
        title={
          <span>
            <FileTextOutlined
              style={{ marginRight: 8, color: token.colorPrimary }}
            />{" "}
            Condition Evaluation & Inventory Notes
          </span>
        }
        style={{
          marginBottom: "24px",
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.02)",
        }}
      >
        <Row>
          <Col span={24}>
            <Form.Item
              label="Asset Description Remarks"
              name="notes"
              rules={[{ required: false }]}
            >
              <TextArea
                rows={4}
                placeholder="Log physical chassis compliance updates, damage checks, transducer calibrations, or baseline hardware metrics..."
              />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      {/* Action Footer Button Drawer */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          loading={loading}
          style={{
            minWidth: "220px",
            height: "46px",
            borderRadius: "4px",
            fontSize: "15px",
          }}
        >
          {loading
            ? "Saving Inventory Data..."
            : formType === "create"
              ? "Register Asset Record"
              : "Save Asset Modifications"}
        </Button>
      </div>
    </Form>
  );
}

export default InventoryForm;
