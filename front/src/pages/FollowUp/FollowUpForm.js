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
  theme,
} from "antd";
import {
  FileTextOutlined,
  CalendarOutlined,
  HeartOutlined,
  UserOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;

function FollowUpForm({ form, formType, handleSubmit, loading }) {
  const { token } = theme.useToken();

  // Mock list mirroring the decoupled case options
  const caseOptions = [
    {
      caseId: "667a2a1b8b2d4c5e9a1100aa",
      caseCode: "CS001",
      patientId: "6677a23b8b2d4c5e9a110001",
      patientCode: "PT001",
      fullName: "John Otieno",
      procedureName: "ACL Reconstruction",
    },
    {
      caseId: "667a2a1b8b2d4c5e9a1100bb",
      caseCode: "CS002",
      patientId: "6677a23b8b2d4c5e9a110002",
      patientCode: "PT002",
      fullName: "Grace Wanjiku",
      procedureName: "Laparoscopic Cholecystectomy",
    },
    {
      caseId: "667a2a1b8b2d4c5e9a1100cc",
      caseCode: "CS003",
      patientId: "6677a23b8b2d4c5e9a110003",
      patientCode: "PT003",
      fullName: "David Mwangi",
      procedureName: "Coronary Bypass",
    },
  ];

  const frequencyOptions = ["Daily", "Weekly", "Bi-Weekly", "Monthly"];
  const riskOptions = ["Low", "Medium", "High"];
  const channelOptions = ["Phone Call", "WhatsApp", "In-Clinic Visit"];
  const statusOptions = ["Pending", "Active", "Completed"];

  // Updates hidden contextual fields whenever a unique case is chosen
  const handleCaseChange = (value) => {
    const selected = caseOptions.find((c) => c.caseId === value);
    if (selected) {
      form.setFieldsValue({
        caseDetails: {
          caseCode: selected.caseCode,
          procedureName: selected.procedureName,
        },
        patientDetails: {
          patientId: selected.patientId,
          patientCode: selected.patientCode,
          fullName: selected.fullName,
        },
      });
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      requiredMark={false}
    >
      {/* Hidden Relational Mapping Fields */}
      <Form.Item name={["caseDetails", "caseCode"]} hidden>
        <Input />
      </Form.Item>
      <Form.Item name={["caseDetails", "procedureName"]} hidden>
        <Input />
      </Form.Item>
      <Form.Item name={["patientDetails", "patientId"]} hidden>
        <Input />
      </Form.Item>
      <Form.Item name={["patientDetails", "patientCode"]} hidden>
        <Input />
      </Form.Item>
      <Form.Item name={["patientDetails", "fullName"]} hidden>
        <Input />
      </Form.Item>

      {/* CARD 1: Case & Patient Assignment */}
      <Card
        title={
          <span>
            <UserOutlined
              style={{ marginRight: 8, color: token.colorPrimary }}
            />{" "}
            Case & Patient Linkage
          </span>
        }
        style={{
          marginBottom: "24px",
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.03)",
        }}
      >
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              label="Select Target Surgical Case"
              name={["caseDetails", "caseId"]}
              rules={[
                {
                  required: true,
                  message: "Please associate a surgical case record",
                },
              ]}
            >
              <Select
                placeholder="-- Select Active Post-Op Case --"
                size="large"
                showSearch
                onChange={handleCaseChange}
                optionFilterProp="children"
              >
                {caseOptions.map((item) => (
                  <Option key={item.caseId} value={item.caseId}>
                    {item.caseCode} — {item.fullName} ({item.procedureName})
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Card>

      {/* CARD 2: Scheduling & Communication Cadence */}
      <Card
        title={
          <span>
            <CalendarOutlined
              style={{ marginRight: 8, color: token.colorPrimary }}
            />{" "}
            Follow-up Schedule
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
              label="Follow-up Frequency"
              name={["followUpSchedule", "frequency"]}
              rules={[
                {
                  required: true,
                  message: "Please select monitoring frequency",
                },
              ]}
            >
              <Select placeholder="Select interval" size="large">
                {frequencyOptions.map((freq) => (
                  <Option key={freq} value={freq}>
                    {freq}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Preferred Contact Method"
              name={["patientDetails", "preferredChannel"]}
              rules={[
                {
                  required: true,
                  message: "Please choose communication method",
                },
              ]}
            >
              <Select placeholder="Select preferred channel" size="large">
                {channelOptions.map((chan) => (
                  <Option key={chan} value={chan}>
                    {chan}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Last Follow-up Date"
              name={["followUpSchedule", "lastFollowUpDate"]}
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
              label="Next Review Due Date"
              name={["followUpSchedule", "dueDate"]}
              rules={[
                {
                  required: true,
                  message: "Please select next target timeline date",
                },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                size="large"
                format="DD/MM/YYYY"
              />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      {/* CARD 3: Clinical Triage & Records */}
      <Card
        title={
          <span>
            <HeartOutlined
              style={{ marginRight: 8, color: token.colorPrimary }}
            />{" "}
            Clinical Assessment
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
              label="Complication Risk Tier"
              name={["clinicalAssessment", "complicationRiskScore"]}
              initialValue="Low"
              rules={[
                { required: true, message: "Assign triage risk category" },
              ]}
            >
              <Select size="large">
                {riskOptions.map((risk) => (
                  <Option key={risk} value={risk}>
                    {risk}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Workflow Tracking Status"
              name={["clinicalAssessment", "status"]}
              initialValue="Pending"
              rules={[
                { required: true, message: "Specify tracking workflow state" },
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
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              label="Assigned Clinical Coordinator"
              name={["clinicalAssessment", "assignedCareCoordinator"]}
              rules={[
                { required: true, message: "Please assign an coordinator" },
              ]}
            >
              <Input placeholder="e.g., Nurse Sarah Kamau" size="large" />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      {/* CARD 4: Clinical Notes Progress Summary */}
      <Card
        title={
          <span>
            <FileTextOutlined
              style={{ marginRight: 8, color: token.colorPrimary }}
            />{" "}
            Clinical Progression Notes
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
              label="Encounter Observations & Notes"
              name="notes"
              rules={[
                {
                  required: true,
                  message: "Please document current monitoring summary notes",
                },
              ]}
            >
              <TextArea
                rows={4}
                placeholder="Document localized symptom variations, healing milestones, or physical therapy progress markers..."
              />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      {/* Action Controls Group */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          loading={loading}
          style={{
            minWidth: "220px",
            height: "48px",
            fontSize: "16px",
            borderRadius: "6px",
          }}
        >
          {loading
            ? "Saving Changes..."
            : formType === "create"
              ? "Schedule Follow-up Task"
              : "Update Follow-up Record"}
        </Button>
      </div>
    </Form>
  );
}

export default FollowUpForm;
