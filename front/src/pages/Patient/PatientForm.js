import React from "react";
import { Form, Input, Select, DatePicker, Button, Row, Col, Card } from "antd";
import {
  UserOutlined,
  ContactsOutlined,
  SolutionOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;

function PatientForm({ form, formType, handleSubmit, loading }) {
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      requiredMark={false}
    >
      {/* SECTION 1: Personal Profile */}
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
          {" "}
          <Col xs={24} sm={12}>
            <Form.Item
              label="Date of Birth"
              name="dob"
              rules={[
                { required: true, message: "Please select date of birth" },
              ]}
            >
              <DatePicker style={{ width: "100%" }} size="large" />
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

      {/* SECTION 2: Contact Information */}
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
                { required: false, message: "Please enter email address" },
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

      {/* SECTION 3: Next of Kin Details */}
      <Card
        title={
          <span>
            <TeamOutlined style={{ marginRight: 8 }} /> Next of Kin Details
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
              label="Next of Kin Name"
              name={["nextOfKin", "name"]}
              rules={[
                { required: true, message: "Please enter next of kin name" },
              ]}
            >
              <Input placeholder="Mary Doe" size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Relationship to Patient"
              name={["nextOfKin", "relationship"]}
              rules={[
                { required: true, message: "Please select relationship" },
              ]}
            >
              <Select placeholder="Select relationship" size="large">
                <Option value="Spouse">Spouse</Option>
                <Option value="Parent">Parent</Option>
                <Option value="Child">Child</Option>
                <Option value="Sibling">Sibling</Option>
                <Option value="Guardian">Guardian</Option>
                <Option value="Other">Other</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Primary Contact Number"
              name={["nextOfKin", "phone"]}
              rules={[
                { required: true, message: "Please enter contact number" },
              ]}
            >
              <Input placeholder="+254 711 000000" size="large" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Alternative Contact Number"
              name={["nextOfKin", "altPhone"]}
            >
              <Input placeholder="+254 722 000000 (Optional)" size="large" />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      {/* SECTION 4: Case & Intake Details */}
      <Card
        title={
          <span>
            <SolutionOutlined style={{ marginRight: 8 }} /> Case & Intake
            Details
          </span>
        }
        style={{
          marginBottom: "32px",
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.03)",
        }}
      >
        <Row gutter={24}>
          <Col xs={24} sm={12}>
            {/* Wrapped in a flex box to accommodate the dynamic sub-input perfectly */}
            <Form.Item
              label="Referral Source"
              name="referral"
              rules={[
                {
                  required: true,
                  message: "Please select referral source",
                },
              ]}
              style={{ marginBottom: 0 }}
            >
              <Select placeholder="Select referral source" size="large">
                <Option value="walk-in">Walk-in</Option>
                <Option value="social media">Social Media</Option>
                <Option value="facebook">Facebook</Option>
                <Option value="website">Website</Option>
                <Option value="referral doctor">Referral Doctor</Option>
              </Select>
            </Form.Item>
          </Col>
          {/* Conditional Doctor Selection Field */}

          <Col xs={24} sm={12}>
            <Form.Item dependencies={["referral"]}>
              {({ getFieldValue }) =>
                getFieldValue("referral") === "referral doctor" ? (
                  <Form.Item
                    label="Select Referring Doctor"
                    name="referringDoctor"
                    rules={[
                      {
                        required: true,
                        message: "Please select the doctor",
                      },
                    ]}
                    style={{ marginBottom: 0 }}
                  >
                    <Select placeholder="Choose doctor" size="large">
                      <Option value="Dr. Smith">Dr. Smith</Option>
                      <Option value="Dr. Patel">Dr. Patel</Option>
                      <Option value="Dr. Omwamba">Dr. Omwamba</Option>
                      <Option value="Dr. Ndwiga">Dr. Ndwiga</Option>
                    </Select>
                  </Form.Item>
                ) : null
              }
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24} style={{ marginTop: "16px" }}>
          <Col xs={24}>
            <Form.Item
              label="Diagnosis"
              name="diagnosis"
              rules={[{ required: true, message: "Please enter diagnosis" }]}
            >
              <Input placeholder="Hypertension" size="large" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24} style={{ marginTop: "16px" }}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Payment Mode (KES)"
              name="payment"
              rules={[
                { required: true, message: "Please enter payment amount" },
              ]}
            >
              <Select placeholder="Choose mode" size="large">
                <Option value="Cash">Cash</Option>
                <Option value="Insurance">Insurance</Option>
                <Option value="Credit Card">Credit Card</Option>
                <Option value="Bank Transfer">Bank Transfer</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} sm={12}>
            <Form.Item
              label="Case Status"
              name="status"
              rules={[{ required: true, message: "Please select status" }]}
            >
              <Select placeholder="Select status" size="large">
                <Option value="New Lead">New Lead</Option>
                <Option value="Under Review">Under Review</Option>
                <Option value="Matched">Matched</Option>
                <Option value="Scheduled">Scheduled</Option>
                <Option value="Completed">Completed</Option>
                <Option value="Closed">Closed</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              label="Notes / Comments"
              name="notes"
              style={{ marginTop: "8px" }}
            >
              <TextArea
                rows={4}
                placeholder="Add any additional patient history, specific requirements, or case notes here..."
              />
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
          {formType === "create"
            ? "Submit Patient Record"
            : "Update Patient Record"}
        </Button>
      </div>
    </Form>
  );
}

export default PatientForm;
