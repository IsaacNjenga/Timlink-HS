import React, { useEffect, useMemo, useState } from "react";
import { Form, Typography } from "antd";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { DoctorData } from "../../assets/data/doctorData";
import DoctorForm from "./DoctorForm";

const { Title, Text } = Typography;

const formatDateValue = (dateValue) => {
  if (!dateValue) return undefined;
  return dayjs.isDayjs(dateValue) ? dateValue.format("YYYY-MM-DD") : dateValue;
};

function EditDoctor() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const doctor = useMemo(
    () => DoctorData.find((item) => item._id === id),
    [id],
  );

  useEffect(() => {
    if (!doctor) return;

    form.setFieldsValue({
      ...doctor,
      dob: doctor.dob ? dayjs(doctor.dob) : undefined,
    });
  }, [doctor, form]);

  const handleSubmit = (values) => {
    setLoading(true);
    try {
      const formattedValues = {
        ...values,
        dob: formatDateValue(values.dob),
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
