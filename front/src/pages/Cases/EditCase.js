import React, { useEffect, useState } from "react";
import { Form, Typography } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import CaseForm from "./CaseForm";
import { useFetchCase } from "../../hooks/Case/fetchCase";
import Loader from "../../components/Loader";
import { useNotification } from "../../contexts/notificationContext";
import axios from "axios";
import { useAuth } from "../../contexts/authContext";

const { Title, Text } = Typography;

const formatDateValue = (dateValue) => {
  if (!dateValue) return undefined;
  return dayjs.isDayjs(dateValue) ? dateValue.format("YYYY-MM-DD") : dateValue;
};

function EditCase() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const { token } = useAuth();
  const navigate = useNavigate();
  const openNotification = useNotification();
  const { caseData, loading: caseLoading, fetchCase } = useFetchCase();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCase(id);
  }, [fetchCase, id]);

  useEffect(() => {
    if (caseData) {
      form.setFieldsValue({
        ...caseData,
        patient: caseData.patient?._id,
        doctor: caseData.doctor?._id,
        hospital: caseData.hospital?._id,
        status: caseData.status,
        surgeryDate: caseData.surgeryDate
          ? dayjs(caseData?.surgeryDate)
          : undefined,
      });
    }
  }, [caseData, form]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const formattedValues = {
        ...values,
        surgeryDate: formatDateValue(values.surgeryDate),
      };

      console.log("Form values:", formattedValues);

      const response = await axios.put(
        `cases/update-case/${id}`,
        formattedValues,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const { success, message } = response.data;

      if (success) {
        openNotification("success", message, "Success!");
        setTimeout(() => navigate("/cases&surgery"), 800);
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

  if (caseLoading) return <Loader size={"large"} />;

  return (
    <div style={{ maxWidth: "850px", margin: "40px auto", padding: "0 16px" }}>
      <div style={{ marginBottom: "32px", textAlign: "center" }}>
        <Title level={2} style={{ margin: 0 }}>
          Edit Case Form
        </Title>
        <Text type="secondary">Update this case record and details</Text>
      </div>

      <CaseForm
        form={form}
        formType="update"
        handleSubmit={handleSubmit}
        loading={loading}
      />
    </div>
  );
}

export default EditCase;
