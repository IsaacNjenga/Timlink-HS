import React, { useState } from "react";
import { Form, Typography } from "antd";
import dayjs from "dayjs";
import DrawerComponent from "../../components/DrawerComponent";
import FollowUpForm from "./FollowUpForm";

const { Title, Text } = Typography;

const formatDateValue = (dateValue) => {
  if (!dateValue) return undefined;
  return dayjs.isDayjs(dateValue) ? dateValue.format("YYYY-MM-DD") : dateValue;
};

function AddFollowUp({ openForm, setOpenForm }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values) => {
    setLoading(true);
    try {
      const formattedValues = {
        ...values,
        followUpSchedule: {
          ...values.followUpSchedule,
          dueDate: values.followUpSchedule?.dueDate
            ? formatDateValue(values.followUpSchedule.dueDate)
            : undefined,
          lastFollowUpDate: values.followUpSchedule?.lastFollowUpDate
            ? formatDateValue(values.followUpSchedule.lastFollowUpDate)
            : undefined,
        },
      };
      console.log("Form values:", formattedValues);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <DrawerComponent
      openModal={openForm}
      setOpenModal={setOpenForm}
      loading={loading}
      title={""}
      width={650}
    >
      <div style={{ maxWidth: "850px", margin: "0px auto", padding: "0px" }}>
        {/* Page Header */}
        <div style={{ marginBottom: "32px", textAlign: "center" }}>
          <Title level={2} style={{ margin: 0 }}>
            Patient Follow-Up Form
          </Title>
          <Text type="secondary">Fill in the follow-up details</Text>
        </div>

        <FollowUpForm
          form={form}
          formType="create"
          handleSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </DrawerComponent>
  );
}

export default AddFollowUp;
