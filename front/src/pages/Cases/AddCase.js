import React, { useState } from "react";
import { Form, Typography } from "antd";
import CaseForm from "./CaseForm";

const { Title, Text } = Typography;

function AddCase() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values) => {
    setLoading(true);
    try {
      const formattedValues = { ...values };
      console.log("Form values:", formattedValues);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div style={{ maxWidth: "850px", margin: "40px auto", padding: "0 16px" }}>
      <div style={{ marginBottom: "32px", textAlign: "center" }}>
        <Title level={2} style={{ margin: 0 }}>
          Case Intake Form
        </Title>
        <Text type="secondary">Register a new case record and details</Text>
      </div>

      <CaseForm
        form={form}
        formType="create"
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}

export default AddCase;
