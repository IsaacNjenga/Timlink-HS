import React, { useState } from "react";
import { Form, Typography } from "antd";
import HospitalForm from "./HospitalForm";
import axios from "axios";
import { useNotification } from "../../contexts/notificationContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

const { Title, Text } = Typography;

function AddHospital() {
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
      // console.log("Formatted Values:", formattedValues); // Log the formatted values for debugging
      const response = await axios.post(
        "hospitals/create-hospital",
        formattedValues,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const { success, message } = response.data;

      if (success) {
        openNotification("success", message, "Success!");
        setTimeout(() => navigate("/hospitals"), 800);
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
