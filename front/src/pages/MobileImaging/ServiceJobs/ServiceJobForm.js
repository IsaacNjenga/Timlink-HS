import React, { useMemo } from "react";
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
import { useNavigate } from "react-router-dom";
import { useFetchPatients } from "../../../hooks/Patient/fetchAllPatients";
import { useFetchInventory } from "../../../hooks/Inventory/fetchAllInventory";
import Loader from "../../../components/Loader";

const { TextArea } = Input;
const { Option } = Select;

const serviceTypes = ["X-ray", "Ultrasound"];
const clientTypes = ["Patient", "External"];
const statusOptions = ["Scheduled", "Completed", "Cancelled"];

function ServiceJobForm({ form, formType, handleSubmit, loading }) {
  const navigate = useNavigate();
  const { token } = theme.useToken();
  const { patients, loading: patientsLoading } = useFetchPatients();
  const { inventory, loading: inventoryLoading } = useFetchInventory();

  // Dynamically watch the clientType field for re-renders
  const clientType = Form.useWatch("clientType", form) || "Patient";

  const patientOptions = useMemo(() => {
    if (!patients) return [];
    return patients.map((patient) => ({
      label: `${patient.firstName} ${patient.lastName} - ${patient.diagnosis}`,
      value: patient._id,
    }));
  }, [patients]);

  const inventoryOptions = useMemo(() => {
    if (!inventory) return [];
    return inventory
      .filter((i) => i.status === "Available")
      .map((inv) => ({
        label: `${inv.equipmentName} - ${inv.category}`,
        value: inv._id,
      }));
  }, [inventory]);

  if (patientsLoading || inventoryLoading) {
    return <Loader size={"small"} />;
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      requiredMark={false}
      initialValues={{ clientType: "Patient", status: "Scheduled" }}
    >
     

      {/* CARD 1: Client Classification Setup */}
      <Card
        title={
          <span>
            <UserOutlined
              style={{ marginRight: 8, color: token.colorPrimary }}
            />
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
              label="Client Type"
              name="clientType"
              rules={[
                {
                  required: true,
                  message: "Please specify client source classification",
                },
              ]}
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

          {/* Conditional Rendering based on reactive clientType */}
          {clientType === "Patient" ? (
            <Col xs={24} sm={12}>
              <Form.Item
                label="Patient"
                name="patient"
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
                  optionFilterProp="children"
                  options={patientOptions}
                />
              </Form.Item>
            </Col>
          ) : (
            <>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Patient Full Name"
                  name={["externalPatient", "walkInName"]}
                  rules={[
                    {
                      required: true,
                      message: "Input full name",
                    },
                  ]}
                >
                  <Input placeholder="e.g., Jane Doe" size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Health Center/Facility"
                  name={["externalPatient", "organizationName"]}
                  rules={[
                    {
                      required: true,
                      message: "Input source clinic institution",
                    },
                  ]}
                >
                  <Input placeholder="e.g., MediCross Clinic" size="large" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12}>
                <Form.Item
                  label="Referral Reference ID"
                  name={["externalPatient", "referralRef"]}
                  rules={[
                    {
                      required: true,
                      message: "Reference is missing",
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
            />
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
              label="Service Type"
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
              label="Service Machinery / Hardware"
              name="equipment"
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
                options={inventoryOptions}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={24}>
            <Form.Item
              label="Facility Location"
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
            />
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
              label="Service Date"
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
              label="Status"
              name="status"
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
              label="Service Cost (KES)"
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
            />
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
              label="Notes"
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
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
        <Button
          danger
          size="large"
          loading={loading}
          onClick={() => navigate("/mobile-imaging?tab=1")}
          style={{
            minWidth: "200px",
            height: "46px",
            borderRadius: "4px",
            fontSize: "15px",
          }}
        >
          Cancel
        </Button>
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
