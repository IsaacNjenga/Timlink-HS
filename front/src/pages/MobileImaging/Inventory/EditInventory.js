import React, { useEffect, useState } from "react";
import { Form, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";
// import { InventoryData } from "../../../assets/data/inventoryData";
import InventoryForm from "./InventoryForm";
import { useAuth } from "../../../contexts/authContext";
import { useNotification } from "../../../contexts/notificationContext";
import { useFetchInventory } from "../../../hooks/Inventory/fetchInventory";
import axios from "axios";
import Loader from "../../../components/Loader";

const { Title, Text } = Typography;

function EditInventory() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const openNotification = useNotification();
  const [loading, setLoading] = useState(false);
  const {
    inventory,
    loading: inventoryLoading,
    fetchInventory,
  } = useFetchInventory();

  useEffect(() => {
    fetchInventory(id);
  }, [fetchInventory, id]);

  useEffect(() => {
    if (inventory) {
      form.setFieldsValue({
        ...inventory,
      });
    }
  }, [inventory, form]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const formattedValues = { ...values };
      console.log("Form values:", formattedValues);

      const response = await axios.put(
        `inventory/update-inventory/${id}`,
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

  if (inventoryLoading) return <Loader size={"large"} />;

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
