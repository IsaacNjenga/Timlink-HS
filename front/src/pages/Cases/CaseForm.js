import React from "react";
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
import dayjs from "dayjs";

const { TextArea } = Input;

const formatDateValue = (dateValue) => {
  if (!dateValue) return undefined;
  return dayjs.isDayjs(dateValue) ? dateValue.format("YYYY-MM-DD") : dateValue;
};

function CaseForm({ form, formType, handleSubmit, loading }) {
  const patientOptions = [
    {
      value: "PT001",
      label: "John Otieno (PT001)",
      name: "John Otieno",
      id: "6677a23b8b2d4c5e9a110001",
    },
    {
      value: "PT002",
      label: "Grace Wanjiku (PT002)",
      name: "Grace Wanjiku",
      id: "6677a23b8b2d4c5e9a110002",
    },
    {
      value: "PT003",
      label: "David Mwangi (PT003)",
      name: "David Mwangi",
      id: "6677a23b8b2d4c5e9a110003",
    },
    {
      value: "PT004",
      label: "Fatuma Abdallah (PT004)",
      name: "Fatuma Abdallah",
      id: "6677a23b8b2d4c5e9a110004",
    },
    {
      value: "PT005",
      label: "Samuel Kipkoech (PT005)",
      name: "Samuel Kipkoech",
      id: "6677a23b8b2d4c5e9a110005",
    },
  ];

  const surgeonOptions = [
    { value: "6677a5fa8b2d4c5e9a110501", label: "Dr. James Mutua" },
    { value: "6677a5fa8b2d4c5e9a110502", label: "Dr. Amina Odhiambo" },
    { value: "6677a5fa8b2d4c5e9a110503", label: "Dr. Peter Kamau" },
    { value: "6677a5fa8b2d4c5e9a110504", label: "Dr. Sarah Njoroge" },
  ];

  const hospitalOptions = [
    { value: "Nairobi Hospital", label: "Nairobi Hospital" },
    {
      value: "Aga Khan University Hospital",
      label: "Aga Khan University Hospital",
    },
    { value: "MP Shah Hospital", label: "MP Shah Hospital" },
    { value: "Mater Hospital", label: "Mater Hospital" },
  ];

  const onFinishHandler = (values) => {
    const selectedPatient = patientOptions.find(
      (p) => p.value === values.patientCodeRaw,
    );
    const selectedSurgeon = surgeonOptions.find(
      (s) => s.value === values.surgeonIdRaw,
    );

    const formattedPayload = {
      ...values,
      patient: selectedPatient
        ? {
            patientId: selectedPatient.id,
            patientCode: selectedPatient.value,
            name: selectedPatient.name,
          }
        : undefined,
      surgeon: selectedSurgeon
        ? {
            surgeonId: selectedSurgeon.value,
            name: selectedSurgeon.label,
          }
        : undefined,
      surgeryDate: formatDateValue(values.surgeryDate),
    };

    handleSubmit(formattedPayload);
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinishHandler}
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
              name="patientCodeRaw"
              rules={[{ required: true, message: "Please select a patient" }]}
            >
              <Select
                placeholder="-- Select Patient --"
                options={patientOptions}
                showSearch
                optionFilterProp="label"
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
              label="Surgeon"
              name="surgeonIdRaw"
              rules={[{ required: true, message: "Please select a surgeon" }]}
            >
              <Select
                placeholder="-- Select Surgeon --"
                options={surgeonOptions}
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
              name={["financials", "paymentStatus"]}
              rules={[
                { required: true, message: "Please select payment status" },
              ]}
            >
              <Select placeholder="Select Status">
                <Select.Option value="Pending">Pending</Select.Option>
                <Select.Option value="Partial">Partial</Select.Option>
                <Select.Option value="Paid">Paid</Select.Option>
                <Select.Option value="Unpaid">Unpaid</Select.Option>
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
        }}
      >
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
