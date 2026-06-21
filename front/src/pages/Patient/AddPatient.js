import React, { useState } from "react";
import { Form, Typography } from "antd";
import PatientForm from "./PatientForm";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const formatDateValue = (dateValue) => {
  if (!dateValue) return undefined;
  return dayjs.isDayjs(dateValue) ? dateValue.format("YYYY-MM-DD") : dateValue;
};

function AddPatient() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values) => {
    setLoading(true);
    try {
      const formattedValues = {
        ...values,
        dob: formatDateValue(values.dob),
      };
      console.log("Form values:", formattedValues);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "850px", margin: "40px auto", padding: "0 16px" }}>
      {/* Page Header */}
      <div style={{ marginBottom: "32px", textAlign: "center" }}>
        <Title level={2} style={{ margin: 0 }}>
          Patient Intake Form
        </Title>
        <Text type="secondary">
          Register a new patient record and assign tracking details
        </Text>
      </div>

      <PatientForm
        form={form}
        formType="create"
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}

export default AddPatient;
