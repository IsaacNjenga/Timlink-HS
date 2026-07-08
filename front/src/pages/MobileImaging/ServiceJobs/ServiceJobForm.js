import React from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Button,
  Row,
  Col,
  Card,
  theme,
} from "antd";
import {
  SettingOutlined,
  UserOutlined,
  CalendarOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;

function ServiceJobForm({ form, formType, handleSubmit, loading }) {
  const { token } = theme.useToken();

  // Watch the dynamic clientType selection to render conditions natively
  const clientType = Form.useWatch("clientType", form);

  // Mock structures matching options provided in previous datasets
  const patientOptions = [
    { id: "PT001", label: "John Otieno (PT001)" },
    { id: "PT002", label: "Grace Wanjiku (PT002)" },
    { id: "PT003", label: "David Mwangi (PT003)" },
    { id: "PT004", label: "Fatuma Abdallah (PT004)" },
    { id: "PT005", label: "Samuel Kipkoech (PT005)" },
  ];

  const equipmentOptions = [
    {
      code: "MH-1234",
      label: "Mobile X-ray Unit A (MH-1234)",
      name: "Mobile X-ray Unit A",
    },
    {
      code: "MH-5678",
      label: "Portable Ultrasound Unit B (MH-5678)",
      name: "Portable Ultrasound Unit B",
    },
  ];

  const serviceTypes = ["X-ray", "Ultrasound"];
  const clientTypes = ["Patient", "External"];
  const statusOptions = ["Scheduled", "Completed", "Cancelled"];

  // Injects human-readable secondary labels into the hidden payload schema
  const handlePatientSelection = (value) => {
    const matched = patientOptions.find((p) => p.id === value);
    if (matched) {
      // Split display labels to isolate raw name
      const cleanName = matched.label.split(" (")[0];
      form.setFieldsValue({
        patientDetails: { fullName: cleanName },
      });
    }
  };

  const handleEquipmentSelection = (value) => {
    const matched = equipmentOptions.find((e) => e.code === value);
    if (matched) {
      form.setFieldsValue({
        equipment: { name: matched.name },
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
      {/* Hidden Fields to back-populate unstructured schema text records */}
      <Form.Item name={["patientDetails", "fullName"]} hidden>
        <Input />
      </Form.Item>
      <Form.Item name={["equipment", "name"]} hidden>
        <Input />
      </Form.Item>

      {/* CARD 1: Client Classification Setup */}
      <Card
        title={
          <span>
            <UserOutlined
              style={{ marginRight: 8, color: token.colorPrimary }}
            />{" "}
            Client Demographics
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
              label="Client Classification"
              name="clientType"
              rules={[
                {
                  required: true,
                  message: "Please specify client source classification",
                },
              ]}
              initialValue="Patient"
            >
              <Select placeholder="Choose type" size="large">
                {clientTypes.map((type) => (
                  <Option key={type} value={type}>
                    {type}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          {/* Conditional Rendering logic powered by form path watches */}
          {clientType === "Patient" ? (
            <Col xs={24} sm={12}>
              <Form.Item
                label="Target Active Patient"
                name={["patientDetails", "patientId"]}
                rules={[
                  {
                    required: true,
                    message: "Please select matching clinical patient profile",
                  },
                ]}
              >
                <Select
                  placeholder="-- Select Patient --"
                  size="large"
                  showSearch
                  onChange={handlePatientSelection}
                  optionFilterProp="children"
                >
                  {patientOptions.map((p) => (
                    <Option key={p.id} value={p.id}>
                      {p.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          ) : (
            <>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Referral Walk-in Full Name"
                  name={["externalClientDetails", "walkInName"]}
                  rules={[
                    {
                      required: true,
                      message: "Input external individual name description",
                    },
                  ]}
                >
                  <Input placeholder="e.g., Jane Doe" size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Originating Health Center / Facility"
                  name={["externalClientDetails", "organizationName"]}
                  rules={[
                    {
                      required: true,
                      message: "Input source clinic institution",
                    },
                  ]}
                >
                  <Input
                    placeholder="e.g., MediCross Outpost Clinic"
                    size="large"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Referral Track Reference ID"
                  name={["externalClientDetails", "referralRef"]}
                  rules={[
                    {
                      required: true,
                      message: "Track code reference is missing",
                    },
                  ]}
                >
                  <Input placeholder="e.g., REF-9921" size="large" />
                </Form.Item>
              </Col>
            </>
          )}
        </Row>
      </Card>

      {/* CARD 2: Service & Diagnostics Mapping */}
      <Card
        title={
          <span>
            <SettingOutlined
              style={{ marginRight: 8, color: token.colorPrimary }}
            />{" "}
            Service Specification & Assets
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
              label="Requested Service Modality"
              name="serviceType"
              rules={[
                {
                  required: true,
                  message: "Specify operational diagnostic type",
                },
              ]}
            >
              <Select placeholder="Select diagnostic type" size="large">
                {serviceTypes.map((st) => (
                  <Option key={st} value={st}>
                    {st}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Assigned Machinery / Hardware"
              name={["equipment", "code"]}
              rules={[
                {
                  required: true,
                  message: "Please associate unit hardware profile",
                },
              ]}
            >
              <Select
                placeholder="-- Select Equipment --"
                size="large"
                onChange={handleEquipmentSelection}
              >
                {equipmentOptions.map((eq) => (
                  <Option key={eq.code} value={eq.code}>
                    {eq.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              label="Facility Operational Assignment Location"
              name="facilityLocation"
              rules={[
                {
                  required: true,
                  message: "Log physical target delivery wing location",
                },
              ]}
            >
              <Input
                placeholder="e.g., Radiology Department - Wing A"
                size="large"
              />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      {/* CARD 3: Scheduling & Cost Matrix */}
      <Card
        title={
          <span>
            <CalendarOutlined
              style={{ marginRight: 8, color: token.colorPrimary }}
            />{" "}
            Logistics & Financial Metadata
          </span>
        }
        style={{
          marginBottom: "24px",
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.02)",
        }}
      >
        <Row gutter={24}>
          <Col xs={24} sm={8}>
            <Form.Item
              label="Service Booking Date"
              name="serviceDate"
              rules={[
                { required: true, message: "Timeline assignment date missing" },
              ]}
            >
              <DatePicker
                style={{ width: "100%" }}
                size="large"
                showTime
                format="DD/MM/YYYY HH:mm"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item
              label="Execution Status"
              name="status"
              initialValue="Scheduled"
              rules={[
                { required: true, message: "Define track position state" },
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
          <Col xs={24} sm={8}>
            <Form.Item
              label="Service Unit Billing Cost (KES)"
              name="serviceCost"
              rules={[
                { required: true, message: "Log structural processing fee" },
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

      {/* CARD 4: Encounter Notes */}
      <Card
        title={
          <span>
            <FileTextOutlined
              style={{ marginRight: 8, color: token.colorPrimary }}
            />{" "}
            Clinical Diagnostics Remarks
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
              label="Session Observations & Technician Notes"
              name="notes"
              rules={[
                {
                  required: true,
                  message: "Session baseline documentation is mandatory",
                },
              ]}
            >
              <TextArea
                rows={4}
                placeholder="Log physical alignment markers, processing server status pipelines, or structural technical details..."
              />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      {/* Submission Actions Footer */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          loading={loading}
          style={{
            minWidth: "200px",
            height: "46px",
            borderRadius: "4px",
            fontSize: "15px",
          }}
        >
          {loading
            ? "Processing Entry..."
            : formType === "create"
              ? "Initialize Service Job"
              : "Save Changes"}
        </Button>
      </div>
    </Form>
  );
}

export default ServiceJobForm;
