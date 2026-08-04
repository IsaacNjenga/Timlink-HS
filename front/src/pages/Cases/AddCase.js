import React, { useState } from "react";
import { Form, Typography } from "antd";
import CaseForm from "./CaseForm";
import { useAuth } from "../../contexts/authContext";
import { useNotification } from "../../contexts/notificationContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";

const { Title, Text } = Typography;

const formatDateValue = (dateValue) => {
  if (!dateValue) return undefined;
  return dayjs.isDayjs(dateValue) ? dateValue.format("YYYY-MM-DD") : dateValue;
};

function AddCase() {
  const [form] = Form.useForm();
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const openNotification = useNotification();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const formattedValues = {
        ...values,
        surgeryDate: formatDateValue(values.surgeryDate),
      };
      
      console.log("Form values:", formattedValues);
      const response = await axios.post("cases/create-case", formattedValues, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { success, message } = response.data;

      if (success) {
        openNotification("success", message, "Success!");
        setTimeout(() => navigate("/cases&surgery"), 800);
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
