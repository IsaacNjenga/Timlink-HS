import React, { useState } from "react";
import { Form, Typography } from "antd";
import InventoryForm from "./InventoryForm";
import axios from "axios";
import { useNotification } from "../../../contexts/notificationContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/authContext";

const { Title, Text } = Typography;

function AddInventory() {
  const [form] = Form.useForm();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const openNotification = useNotification();

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const formattedValues = { ...values };
      // console.log("Form values:", formattedValues);
      
      const response = await axios.post(
        "inventory/create-inventory",
        formattedValues,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const { success, message } = response.data;

      if (success) {
        openNotification("success", message, "Success!");
        setTimeout(() => navigate("/mobile-imaging?tab=2"), 800);
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
          Asset Equipment Registration Form
        </Title>
        <Text type="secondary">
          Register a new asset equipment record and details
        </Text>
      </div>

      <InventoryForm
        form={form}
        formType="create"
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}

export default AddInventory;
