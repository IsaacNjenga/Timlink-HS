import React from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Row,
  Col,
  Card,
  InputNumber,
  theme,
} from "antd";
import {
  BankOutlined,
  EnvironmentOutlined,
  ContactsOutlined,
  ClusterOutlined,
  SafetyCertificateOutlined,
} from "@ant-design/icons";

const { Option } = Select;

function HospitalForm({ form, formType, handleSubmit, loading }) {
  const { token } = theme.useToken();

  // Tier categories common within the Kenyan healthcare ecosystem
  const tierOptions = [
    "Level 6 Tertiary",
    "Level 5 Referral",
    "Level 4 District Hospital",
    "Private Comprehensive Care",
  ];

  // Standard corporate insurance panels available for operational selection
  const insurancePanelOptions = [
    "NHIF",
    "AON Minet",
    "Jubilee Insurance",
    "UAP Old Mutual",
    "CIC Insurance",
    "Britam",
    "Sanlam",
    "Madison Insurance",
    "APA Insurance",
    "AIG",
  ];

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      requiredMark={false}
    >
      {/* CARD 1: Identity & Classification */}
      <Card
        title={
          <span>
            <BankOutlined
              style={{ marginRight: 8, color: token.colorPrimary }}
            />{" "}
            Hospital Profile
          </span>
        }
        style={{
          marginBottom: "24px",
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.03)",
        }}
      >
        <Row gutter={24}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Hospital Name"
              name="hospitalName"
              rules={[
                { required: true, message: "Please enter hospital name" },
              ]}
            >
              <Input placeholder="e.g., Nairobi Hospital" size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={6}>
            <Form.Item
              label="Facility Code"
              name="code"
              rules={[
                { required: true, message: "Please enter facility code" },
              ]}
            >
              <Input placeholder="e.g., HOSP-001" size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={6}>
            <Form.Item
              label="Facility Status"
              name="status"
              initialValue="Active"
              rules={[{ required: true, message: "Select status" }]}
            >
              <Select size="large">
                <Option value="Active">Active</Option>
                <Option value="Inactive">Inactive</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              label="Hospital Classification / Tier"
              name="tier"
              rules={[
                {
                  required: true,
                  message: "Please select hospital classification tier",
                },
              ]}
            >
              <Select
                placeholder="-- Select Operational Classification Tier --"
                size="large"
              >
                {tierOptions.map((tier) => (
                  <Option key={tier} value={tier}>
                    {tier}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Card>

      {/* CARD 2: Physical Location Mapping */}
      <Card
        title={
          <span>
            <EnvironmentOutlined
              style={{ marginRight: 8, color: token.colorPrimary }}
            />{" "}
            Location Details
          </span>
        }
        style={{
          marginBottom: "24px",
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.03)",
        }}
      >
        <Row gutter={24}>
          <Col xs={24} sm={16}>
            <Form.Item
              label="Physical Address"
              name={["location", "address"]}
              rules={[
                { required: true, message: "Please enter physical address" },
              ]}
            >
              <Input
                placeholder="e.g., Argwings Kodhek Road, Upper Hill"
                size="large"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item
              label="City"
              name={["location", "city"]}
              initialValue="Nairobi"
              rules={[{ required: true, message: "Please specify city" }]}
            >
              <Input placeholder="Nairobi" size="large" />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      {/* CARD 3: Administrative Contacts */}
      <Card
        title={
          <span>
            <ContactsOutlined
              style={{ marginRight: 8, color: token.colorPrimary }}
            />{" "}
            Communication & Contact
          </span>
        }
        style={{
          marginBottom: "24px",
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.03)",
        }}
      >
        <Row gutter={24}>
          <Col xs={24} sm={8}>
            <Form.Item
              label="Primary Phone Lines"
              name={["contact", "phone"]}
              rules={[
                {
                  required: true,
                  message: "Please enter primary contact numbers",
                },
              ]}
            >
              <Input placeholder="e.g., +254 703 082000" size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item
              label="Official Email Address"
              name={["contact", "email"]}
              rules={[
                { type: "email", message: "Please enter a valid email format" },
                { required: true, message: "Please enter official email" },
              ]}
            >
              <Input placeholder="e.g., info@hospital.org" size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item
              label="Emergency Extensions / Hotlines"
              name={["contact", "emergencyExt"]}
            >
              <Input placeholder="e.g., 999 / 222" size="large" />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      {/* CARD 4: Bed Capacity & Resources */}
      <Card
        title={
          <span>
            <ClusterOutlined
              style={{ marginRight: 8, color: token.colorPrimary }}
            />{" "}
            Operational Resource Capacity
          </span>
        }
        style={{
          marginBottom: "24px",
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.03)",
        }}
      >
        <Row gutter={24}>
          <Col xs={24} sm={8}>
            <Form.Item
              label="Total Bed Capacity"
              name={["operationalCapacity", "totalBeds"]}
            >
              <InputNumber
                style={{ width: "100%" }}
                size="large"
                min={0}
                placeholder="e.g., 200"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item
              label="ICU Bed Availability"
              name={["operationalCapacity", "icuBeds"]}
            >
              <InputNumber
                style={{ width: "100%" }}
                size="large"
                min={0}
                placeholder="e.g., 15"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item
              label="Active Surgical Theatres"
              name={["operationalCapacity", "theatres"]}
            >
              <InputNumber
                style={{ width: "100%" }}
                size="large"
                min={0}
                placeholder="e.g., 4"
              />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      {/* CARD 5: Insurance Panels */}
      <Card
        title={
          <span>
            <SafetyCertificateOutlined
              style={{ marginRight: 8, color: token.colorPrimary }}
            />{" "}
            Accredited Insurance Panels
          </span>
        }
        style={{
          marginBottom: "24px",
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.03)",
        }}
      >
        <Row>
          <Col span={24}>
            <Form.Item
              label="Corporate Insurance Panels Accepted"
              name="insurancePanels"
              rules={[
                {
                  required: true,
                  message:
                    "Please select at least one corporate insurance panel",
                },
              ]}
            >
              <Select
                mode="multiple"
                allowClear
                placeholder="-- Select Accredited Insurers --"
                size="large"
                style={{ width: "100%" }}
                maxTagCount="responsive"
              >
                {insurancePanelOptions.map((panel) => (
                  <Option key={panel} value={panel}>
                    {panel}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Card>

      {/* Submit Actions */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          loading={loading}
          style={{
            minWidth: "200px",
            height: "48px",
            fontSize: "16px",
            borderRadius: "6px",
          }}
        >
          {loading
            ? "Submitting..."
            : formType === "create"
              ? "Submit Hospital Record"
              : "Update Hospital Record"}
        </Button>
      </div>
    </Form>
  );
}

export default HospitalForm;
