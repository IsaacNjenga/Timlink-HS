import React from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Row,
  Col,
  Card,
  InputNumber,
} from "antd";
import {
  UserOutlined,
  ContactsOutlined,
  SolutionOutlined,
} from "@ant-design/icons";

const { Option } = Select;

function DoctorForm({ form, formType, handleSubmit, loading }) {
  // System configurations matching drop-down parameters
  const specialtyOptions = [
    "Orthopedics",
    "Cardiology",
    "General Surgery",
    "Neurosurgery",
    "Urology",
    "Oncology",
    "Obstetrics",
    "Pediatrics",
  ];

  const hospitalOptions = [
    "Nairobi Hospital",
    "Aga Khan University Hospital",
    "MP Shah Hospital",
    "Mater Hospital",
  ];

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      requiredMark={false}
    >
      {/* CARD 1: Personal Profile */}
      <Card
        title={
          <span>
            <UserOutlined style={{ marginRight: 8 }} /> Personal Profile
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
              label="First Name"
              name="firstName"
              rules={[{ required: true, message: "Please enter first name" }]}
            >
              <Input placeholder="John" size="large" />
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[{ required: true, message: "Please enter last name" }]}
            >
              <Input placeholder="Doe" size="large" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Date of Birth"
              name="dob"
              rules={[
                { required: true, message: "Please select date of birth" },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                size="large"
                format="DD/MM/YYYY"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Gender"
              name="gender"
              rules={[{ required: true, message: "Please select gender" }]}
            >
              <Select placeholder="Select gender" size="large">
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
                <Option value="Other">Other</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Card>

      {/* CARD 2: Contact Information */}
      <Card
        title={
          <span>
            <ContactsOutlined style={{ marginRight: 8 }} /> Contact Information
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
              label="Contact Details (Phone)"
              name="contact"
              rules={[
                { required: true, message: "Please enter contact number" },
              ]}
            >
              <Input placeholder="+254 700 000000" size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Email Address"
              name="email"
              rules={[
                { type: "email", message: "Please enter a valid email" },
                { required: true, message: "Please enter email address" },
              ]}
            >
              <Input placeholder="johndoe@example.com" size="large" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              label="Physical Address"
              name="address"
              rules={[{ required: true, message: "Please enter address" }]}
            >
              <Input
                placeholder="Suite 4B, Kilimani, Nairobi, Kenya"
                size="large"
              />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      {/* NEW CARD 3: Professional & Practice Configuration */}
      <Card
        title={
          <span>
            <SolutionOutlined style={{ marginRight: 8 }} /> Practice
            Configuration
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
              label="Medical Specialty"
              name="specialty"
              rules={[
                { required: true, message: "Please select specialty mapping" },
              ]}
            >
              <Select
                placeholder="-- Select Specialty --"
                size="large"
                showSearch
              >
                {specialtyOptions.map((spec) => (
                  <Option key={spec} value={spec}>
                    {spec}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Operational Status"
              name="status"
              rules={[
                { required: true, message: "Please specify active status" },
              ]}
              initialValue="Active"
            >
              <Select placeholder="Select operational status" size="large">
                <Option value="Active">Active</Option>
                <Option value="Inactive">Inactive</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Agreed Fee Split (%)"
              name="agreedFeePercent"
              rules={[{ required: true, message: "Please enter fee margin" }]}
            >
              <InputNumber
                style={{ width: "100%" }}
                size="large"
                min={0}
                max={100}
                placeholder="70.0"
                addonAfter="%"
                step={0.5}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Partner Admitting Hospitals"
              name="partnerHospitals"
              rules={[
                {
                  required: true,
                  message: "Please select at least one admitting partner",
                },
              ]}
            >
              <Select
                mode="multiple"
                allowClear
                placeholder="-- Select Hospitals --"
                size="large"
                style={{ width: "100%" }}
                maxTagCount="responsive"
              >
                {hospitalOptions.map((hosp) => (
                  <Option key={hosp} value={hosp}>
                    {hosp}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Card>

      {/* Form Submission Actions */}
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
              ? "Submit Doctor Details"
              : "Update Doctor Details"}
        </Button>
      </div>
    </Form>
  );
}

export default DoctorForm;
