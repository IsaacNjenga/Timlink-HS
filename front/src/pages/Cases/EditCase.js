import React, { useEffect, useMemo, useState } from "react";
import { Form, Typography } from "antd";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { CasesData } from "../../assets/data/casesData";
import CaseForm from "./CaseForm";

const { Title, Text } = Typography;

function EditCase() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const currentCase = useMemo(
    () => CasesData.find((item) => item._id === id),
    [id],
  );

  useEffect(() => {
    if (!currentCase) return;

    form.setFieldsValue({
      ...currentCase,
      surgeryDate: currentCase.surgeryDate
        ? dayjs(currentCase.surgeryDate)
        : undefined,
    });
  }, [currentCase, form]);

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
