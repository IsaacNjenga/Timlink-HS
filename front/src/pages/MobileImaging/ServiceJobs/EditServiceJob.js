import React, { useEffect, useState } from "react";
import { Form, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
// import { serviceJobs } from "../../../assets/data/serviceJobs";
import ServiceJobForm from "./ServiceJobForm";
import { useFetchServiceJob } from "../../../hooks/ServiceJobs/fetchServiceJob";
import { useAuth } from "../../../contexts/authContext";
import { useNotification } from "../../../contexts/notificationContext";
import axios from "axios";
import Loader from "../../../components/Loader";

const { Title, Text } = Typography;

const formatDateValue = (dateValue) => {
  if (!dateValue) return undefined;
  return dayjs.isDayjs(dateValue)
    ? dateValue.format("YYYY-MM-DD HH:mm")
    : dateValue;
};

function EditServiceJob() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const openNotification = useNotification();
  const {
    serviceJob,
    loading: serviceJobLoading,
    fetchServiceJob,
  } = useFetchServiceJob();

  useEffect(() => {
    fetchServiceJob(id);
  }, [fetchServiceJob, id]);

  useEffect(() => {
    if (serviceJob) {
      form.setFieldsValue({
        ...serviceJob,
        patient: serviceJob.patient ? serviceJob.patient : null,
        equipment: serviceJob.equipment,
        serviceDate: serviceJob.serviceDate
          ? dayjs(serviceJob.serviceDate)
          : undefined,
      });
    }
  }, [serviceJob, form]);

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

  if (serviceJobLoading) return <Loader size={"large"} />;

  return (
    <div style={{ maxWidth: "850px", margin: "40px auto", padding: "0 16px" }}>
      {/* Page Header */}
      <div style={{ marginBottom: "32px", textAlign: "center" }}>
        <Title level={2} style={{ margin: 0 }}>
          Edit Form
        </Title>
        <Text type="secondary">Edit this service job record</Text>
      </div>

      <ServiceJobForm
        form={form}
        formType="update"
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}

export default EditServiceJob;
