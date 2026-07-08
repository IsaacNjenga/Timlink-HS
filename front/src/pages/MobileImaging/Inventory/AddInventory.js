import React, { useState } from "react";
import { Form, Typography } from "antd";
import InventoryForm from "./InventoryForm";

const { Title, Text } = Typography;

function AddInventory() {
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
