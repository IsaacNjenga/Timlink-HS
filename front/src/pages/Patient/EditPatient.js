import React, { useEffect, useState } from "react";
import { Form, Typography } from "antd";
import PatientForm from "./PatientForm";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import { useFetchPatient } from "../../hooks/Patient/fetchPatient";
import Loader from "../../components/Loader";
import { useNotification } from "../../contexts/notificationContext";
import axios from "axios";
import { useAuth } from "../../contexts/authContext";

const { Title, Text } = Typography;

const formatDateValue = (dateValue) => {
  if (!dateValue) return undefined;
  return dayjs.isDayjs(dateValue) ? dateValue.format("YYYY-MM-DD") : dateValue;
};

function EditPatient() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const { token } = useAuth();
  const navigate = useNavigate();
  const { patient, loading: patientLoading, fetchPatient } = useFetchPatient();
  const [loading, setLoading] = useState(false);
  const openNotification = useNotification();

  useEffect(() => {
    fetchPatient(id);
  }, [fetchPatient, id]);

  useEffect(() => {
    if (patient) {
      form.setFieldsValue({
        ...patient,
        nextOfKin: patient.nextOfKin ? patient.nextOfKin[0] : null,
        dateOfBirth: patient.dateOfBirth
          ? dayjs(patient?.dateOfBirth)
          : undefined,
        dateOfRegistration: patient.dateOfRegistration
          ? dayjs(patient?.dateOfRegistration)
          : undefined,
      });
    }
  }, [patient, form]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const formattedValues = {
        ...values,
        dateOfBirth: formatDateValue(values.dateOfBirth),
        dateOfRegistration: formatDateValue(values.dateOfRegistration),
      };

      const response = await axios.put(
        `patients/update-patient/${id}`,
        formattedValues,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const { success, message } = response.data;

      if (success) {
        openNotification("success", message, "Success!");
        setTimeout(() => navigate("/patient&leads"), 1200);
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

  if (patientLoading) return <Loader size={"large"} />;

  return (
    <div style={{ maxWidth: "850px", margin: "40px auto", padding: "0 16px" }}>
      {/* Page Header */}
      <div style={{ marginBottom: "32px", textAlign: "center" }}>
        <Title level={2} style={{ margin: 0 }}>
          Edit Form
        </Title>
        <Text type="secondary">Edit this patient's record</Text>
      </div>

      <PatientForm
        form={form}
        formType="update"
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}

export default EditPatient;
