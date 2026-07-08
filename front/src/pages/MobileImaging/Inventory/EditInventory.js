import React, { useEffect, useMemo, useState } from "react";
import { Form, Typography } from "antd";
import { useParams } from "react-router-dom";
import { InventoryData } from "../../../assets/data/inventoryData";
import InventoryForm from "./InventoryForm";

const { Title, Text } = Typography;

function EditInventory() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const inventory = useMemo(
    () => InventoryData.find((item) => item._id === id),
    [id],
  );

  useEffect(() => {
    if (!inventory) return;

    form.setFieldsValue({
      ...inventory,
    });
  }, [inventory, form]);

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
          Edit Form
        </Title>
        <Text type="secondary">Edit this asset equipment record</Text>
      </div>

      <InventoryForm
        form={form}
        formType="update"
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}

export default EditInventory;
