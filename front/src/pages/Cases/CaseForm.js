import React, { useMemo } from "react";
import {
  Form,
  Button,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Radio,
  Row,
  Col,
  Card,
} from "antd";
import {
  FileTextOutlined,
  DollarCircleOutlined,
  PercentageOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import { useFetchPatients } from "../../hooks/Patient/fetchAllPatients";
import { useFetchDoctors } from "../../hooks/Doctor/fetchAllDoctors";
import { useFetchHospitals } from "../../hooks/Hospital/fetchAllHospitals";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

function CaseForm({ form, formType, handleSubmit, loading }) {
  const { patients, loading: patientsLoading } = useFetchPatients();
  const { doctors, loading: doctorsLoading } = useFetchDoctors();
  const { hospitals, loading: hospitalsLoading } = useFetchHospitals();
  const navigate = useNavigate();

  const hospitalOptions = useMemo(() => {
    if (!hospitals) return [];
    return hospitals.map((hospital) => ({
      label: hospital.hospitalName + " - " + hospital.code,
      value: hospital._id,
    }));
  }, [hospitals]);

  const doctorOptions = useMemo(() => {
    if (!doctors) return [];
    return doctors.map((doctor) => ({
      label:
        doctor.firstName + " " + doctor.lastName + " - " + doctor.specialty,
      value: doctor._id,
    }));
  }, [doctors]);

  const patientOptions = useMemo(() => {
    if (!patients) return [];
    return patients.map((patient) => ({
      label:
        patient.firstName + " " + patient.lastName + " - " + patient.diagnosis,
      value: patient._id,
    }));
  }, [patients]);

  if (hospitalsLoading || doctorsLoading || patientsLoading) {
    return <Loader size={"small"} />;
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      requiredMark={true}
    >
      {/* SECTION 1: Admission & Surgical Profile */}
      <Card
        title={
          <span>
            <FileTextOutlined style={{ marginRight: 8 }} /> Admission Details
          </span>
        }
        style={{
          marginBottom: "32px",
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.03)",
        }}
      >
        <Row gutter={[16, 0]}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Patient"
              name="patient"
              rules={[{ required: true, message: "Please select a patient" }]}
            >
              <Select
                placeholder="-- Select Patient --"
                options={patientOptions}
                showSearch
                optionFilterProp="label"
                allowClear
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Surgery Type"
              name="surgeryType"
              rules={[
                { required: true, message: "Please input the surgery type" },
              ]}
            >
              <Input placeholder="e.g., Laparoscopic Cholecystectomy" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Doctor"
              name="doctor"
              rules={[{ required: true, message: "Please select a doctor" }]}
            >
              <Select
                placeholder="-- Select Doctor --"
                options={doctorOptions}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Hospital"
              name="hospital"
              rules={[{ required: true, message: "Please select a hospital" }]}
            >
              <Select
                placeholder="-- Select Hospital --"
                options={hospitalOptions}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Surgery Date"
              name="surgeryDate"
              rules={[
                { required: true, message: "Please select the surgery date" },
              ]}
            >
              <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Payment Mode"
              name="paymentMode"
              rules={[
                { required: true, message: "Please select a payment mode" },
              ]}
            >
              <Radio.Group optionType="button" buttonStyle="solid">
                <Radio value="Cash">Cash</Radio>
                <Radio value="M-Pesa">M-Pesa</Radio>
                <Radio value="Insurance">Insurance</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
      </Card>

      {/* SECTION 2: Financial Ledger */}
      <Card
        title={
          <span>
            <DollarCircleOutlined style={{ marginRight: 8 }} /> Financial Ledger
          </span>
        }
        style={{
          marginBottom: "32px",
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.03)",
        }}
      >
        <Row gutter={[16, 0]}>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Invoice No"
              name={["financials", "invoiceNo"]}
              rules={[
                { required: true, message: "Please enter the invoice number" },
              ]}
            >
              <Input placeholder="e.g., INV-2026-0042" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              label="Payment Status"
              name={"paymentStatus"}
              rules={[
                { required: true, message: "Please select payment status" },
              ]}
            >
              <Select placeholder="Select Status">
                <Select.Option value="Pending">Pending</Select.Option>
                <Select.Option value="Partially Paid">Partial</Select.Option>
                <Select.Option value="Paid">Paid</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item
              label="Estimated Cost (KES)"
              name={["financials", "estimatedCostKsh"]}
            >
              <InputNumber
                style={{ width: "100%" }}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                min={0}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item
              label="Final Billed (KES)"
              name={["financials", "finalBilledKsh"]}
              rules={[
                { required: true, message: "Please enter final billed amount" },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                min={0}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item
              label="Amount Received (KES)"
              name={["financials", "amountReceivedKsh"]}
              rules={[
                { required: true, message: "Please enter amount received" },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                formatter={(value) =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                }
                parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                min={0}
              />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      {/* SECTION 3: Split Allocations */}
      <Card
        title={
          <span>
            <PercentageOutlined style={{ marginRight: 8 }} /> Split Allocation
            Margins
          </span>
        }
        style={{
          marginBottom: "32px",
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.03)",
        }}
      >
        <Row gutter={[16, 0]}>
          <Col xs={24} sm={8}>
            <Form.Item
              label="Agency Fee %"
              name={["commissionFees", "agencyFeePercent"]}
            >
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                max={100}
                addonAfter="%"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item
              label="Surgeon Fee %"
              name={["commissionFees", "surgeonFeePercent"]}
            >
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                max={100}
                addonAfter="%"
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={8}>
            <Form.Item
              label="Referee Admin Fee %"
              name={["commissionFees", "refereeAdminFeePercent"]}
            >
              <InputNumber
                style={{ width: "100%" }}
                min={0}
                max={100}
                addonAfter="%"
              />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      {/* SECTION 4: Notes */}
      <Card
        title={
          <span>
            <CommentOutlined style={{ marginRight: 8 }} /> Additional Overview
          </span>
        }
        style={{
          marginBottom: "32px",
          boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.03)",
        }}
      >
        <Row>
          <Col span={24}>
            <Form.Item label="Case Notes" name="notes">
              <TextArea
                rows={4}
                placeholder="Input clinical tracking parameters or insurance clearance delays..."
              />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      {/* Submit Actions */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "20px",
          gap: 8,
        }}
      >
        {" "}
        <Button
          type="primary"
          size="large"
          loading={loading}
          danger
          style={{
            minWidth: "200px",
            height: "48px",
            fontSize: "16px",
            borderRadius: "6px",
          }}
          onClick={() => navigate("/cases&surgery")}
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
            height: "48px",
            fontSize: "16px",
            borderRadius: "6px",
          }}
        >
          {loading
            ? "Submitting..."
            : formType === "create"
              ? "Submit Case Record"
              : "Update Case Record"}
        </Button>
      </div>
    </Form>
  );
}

export default CaseForm;
