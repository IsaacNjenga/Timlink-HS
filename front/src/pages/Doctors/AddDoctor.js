import React, { useState } from "react";
import { Form, Typography } from "antd";
import DoctorForm from "./DoctorForm";
import { useAuth } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../contexts/notificationContext";
import axios from "axios";

const { Title, Text } = Typography;

function AddDoctor() {
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
      };

      const response = await axios.post(
        "doctors/create-doctor",
        formattedValues,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const { success, message } = response.data;

      if (success) {
        openNotification("success", message, "Success!");
        setTimeout(() => navigate("/doctor-portfolio"), 800);
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
          Doctor & Surgeon Portfolio Form
        </Title>
        <Text type="secondary">
          Register a new doctor or surgeon record and details
        </Text>
      </div>

      <DoctorForm
        form={form}
        formType="create"
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}

export default AddDoctor;
