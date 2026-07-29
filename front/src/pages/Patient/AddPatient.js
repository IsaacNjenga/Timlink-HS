import React, { useState } from "react";
import { Form, Typography } from "antd";
import PatientForm from "./PatientForm";
import dayjs from "dayjs";
import axios from "axios";
import { useAuth } from "../../contexts/authContext";
import { useNotification } from "../../contexts/notificationContext";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const formatDateValue = (dateValue) => {
  if (!dateValue) return undefined;
  return dayjs.isDayjs(dateValue) ? dateValue.format("YYYY-MM-DD") : dateValue;
};

function AddPatient() {
  const { token } = useAuth();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const openNotification = useNotification();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const formattedValues = {
        ...values,
        dateOfBirth: formatDateValue(values.dateOfBirth),
        dateOfRegistration: formatDateValue(values.dateOfRegistration),
      };

      const response = await axios.post(
        "patients/create-patient",
        formattedValues,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const { success, message } = response.data;

      if (success) {
        openNotification("success", message, "Success!");
        setTimeout(() => navigate("/patient&leads"), 800);
      } else {
        openNotification("error", message, "Something went wrong...");
      }
    } catch (error) {
      console.error(error);
      openNotification("error", error.message, "Something went wrong...");
    } finally {
      setLoading(false);
      form.resetFields();
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
