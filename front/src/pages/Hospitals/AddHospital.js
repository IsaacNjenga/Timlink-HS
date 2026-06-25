import React, { useState } from "react";
import { Form, Typography } from "antd";
import HospitalForm from "./HospitalForm";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const formatDateValue = (dateValue) => {
  if (!dateValue) return undefined;
  return dayjs.isDayjs(dateValue) ? dateValue.format("YYYY-MM-DD") : dateValue;
};

function AddHospital() {
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
          Hospital Portfolio Form
        </Title>
        <Text type="secondary">Register a new hospital record and details</Text>
      </div>

      <HospitalForm
        form={form}
        formType="create"
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}

export default AddHospital;
