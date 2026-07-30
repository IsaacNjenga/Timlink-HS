import React, { useEffect, useState } from "react";
import { Form, Typography } from "antd";
import { useParams } from "react-router-dom";
// import { HospitalData } from "../../assets/data/hospitalData";
import HospitalForm from "./HospitalForm";
import axios from "axios";
import { useNotification } from "../../contexts/notificationContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { useFetchHospital } from "../../hooks/Hospital/fetchHospital";
import Loader from "../../components/Loader";

const { Title, Text } = Typography;

function EditHospital() {
  const { id } = useParams();
  const { token } = useAuth();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const openNotification = useNotification();
  const {
    hospital,
    loading: hospitalLoading,
    fetchHospital,
  } = useFetchHospital();

  useEffect(() => {
    fetchHospital(id);
  }, [fetchHospital, id]);

  useEffect(() => {
    if (hospital) {
      form.setFieldsValue({
        ...hospital,
      });
    }
  }, [hospital, form]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const formattedValues = {
        ...values,
      };
      const response = await axios.put(
        `hospitals/update-hospital/${id}`,
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

  
    if (hospitalLoading) return <Loader size={"large"} />;
    
  return (
    <div style={{ maxWidth: "850px", margin: "40px auto", padding: "0 16px" }}>
      {/* Page Header */}
      <div style={{ marginBottom: "32px", textAlign: "center" }}>
        <Title level={2} style={{ margin: 0 }}>
          Edit Form
        </Title>
        <Text type="secondary">Edit this hospital's record</Text>
      </div>

      <HospitalForm
        form={form}
        formType="update"
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}

export default EditHospital;
