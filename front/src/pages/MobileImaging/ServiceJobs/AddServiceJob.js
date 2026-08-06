import React, { useState } from "react";
import { Form, Typography } from "antd";
import ServiceJobForm from "./ServiceJobForm";
import dayjs from "dayjs";
import { useAuth } from "../../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../../contexts/notificationContext";
import axios from "axios";

const { Title, Text } = Typography;

const formatDateValue = (dateValue) => {
  if (!dateValue) return undefined;
  return dayjs.isDayjs(dateValue)
    ? dateValue.format("YYYY-MM-DD HH:mm")
    : dateValue;
};

function AddServiceJob() {
  const [form] = Form.useForm();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const openNotification = useNotification();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const formattedValues = {
        ...values,
        serviceDate: formatDateValue(values.serviceDate),
      };

      const response = await axios.post(
        "service-jobs/create-service-job",
        formattedValues,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const { success, message } = response.data;

      if (success) {
        openNotification("success", message, "Success!");
        setTimeout(() => navigate("/mobile-imaging?tab=1"), 800);
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
          Service Job Registration Form
        </Title>
        <Text type="secondary">
          Register a new service job record and details
        </Text>
      </div>

      <ServiceJobForm
        form={form}
        formType="create"
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}

export default AddServiceJob;
