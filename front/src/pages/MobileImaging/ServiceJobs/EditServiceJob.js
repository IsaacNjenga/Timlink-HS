import React, { useEffect, useMemo, useState } from "react";
import { Form, Typography } from "antd";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { serviceJobs } from "../../../assets/data/serviceJobs";
import ServiceJobForm from "./ServiceJobForm";

const { Title, Text } = Typography;

const formatDateValue = (dateValue) => {
  if (!dateValue) return undefined;
  return dayjs.isDayjs(dateValue) ? dateValue.format("YYYY-MM-DD") : dateValue;
};

function EditServiceJob() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const job = useMemo(() => serviceJobs.find((item) => item._id === id), [id]);

  useEffect(() => {
    if (!job) return;

    form.setFieldsValue({
      ...job,
      serviceDate: job.serviceDate ? dayjs(job.serviceDate) : undefined,
    });
  }, [job, form]);

  const handleSubmit = (values) => {
    setLoading(true);
    try {
      const formattedValues = {
        ...values,
        serviceDate: formatDateValue(values.serviceDate),
      };
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
