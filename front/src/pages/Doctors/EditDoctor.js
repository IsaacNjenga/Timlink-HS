import React, { useEffect, useState } from "react";
import { Form, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import DoctorForm from "./DoctorForm";
import { useAuth } from "../../contexts/authContext";
import { useNotification } from "../../contexts/notificationContext";
import { useFetchDoctor } from "../../hooks/Doctor/fetchDoctor";
import Loader from "../../components/Loader";
import axios from "axios";

const { Title, Text } = Typography;

function EditDoctor() {
  const { id } = useParams();
  const { token } = useAuth();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const openNotification = useNotification();
  const { doctor, loading: doctorLoading, fetchDoctor } = useFetchDoctor();

  useEffect(() => {
    fetchDoctor(id);
  }, [fetchDoctor, id]);

  useEffect(() => {
    if (doctor) {
      const selectedHospitalIds =
        doctor.partnerHospitals?.map((item) => {
          if (typeof item.hospital === "object" && item.hospital !== null) {
            return item.hospital._id;
          }
          return item.hospitalName;
        }) || [];

      form.setFieldsValue({
        ...doctor,
        partnerHospitals: selectedHospitalIds,
      });
    }
  }, [doctor, form]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const formattedValues = {
        ...values,
      };

      // console.log(formattedValues);
      const response = await axios.put(
        `doctors/update-doctor/${id}`,
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

  if (doctorLoading) return <Loader size={"large"} />;

  return (
    <div style={{ maxWidth: "850px", margin: "40px auto", padding: "0 16px" }}>
      {/* Page Header */}
      <div style={{ marginBottom: "32px", textAlign: "center" }}>
        <Title level={2} style={{ margin: 0 }}>
          Edit Form
        </Title>
        <Text type="secondary">Edit this doctor's record</Text>
      </div>

      <DoctorForm
        form={form}
        formType="update"
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}

export default EditDoctor;
