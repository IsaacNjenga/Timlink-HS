import React, { useEffect, useState } from "react";
import { Form, Typography } from "antd";
import dayjs from "dayjs";
import DrawerComponent from "../../components/DrawerComponent";
import FollowUpForm from "./FollowUpForm";

const { Title, Text } = Typography;

const formatDateValue = (dateValue) => {
  if (!dateValue) return undefined;
  return dayjs.isDayjs(dateValue) ? dateValue.format("YYYY-MM-DD") : dateValue;
};

function EditFollowUp({ openForm, setOpenForm, schedule }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!schedule) return;

    form.setFieldsValue({
      ...schedule,
      followUpSchedule: {
        ...schedule.followUpSchedule,
        dueDate: schedule.followUpSchedule?.dueDate
          ? dayjs(schedule.followUpSchedule.dueDate)
          : undefined,
        lastFollowUpDate: schedule.followUpSchedule?.lastFollowUpDate
          ? dayjs(schedule.followUpSchedule.lastFollowUpDate)
          : undefined,
      },
    });
  }, [schedule, form]);

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
      title={
        <span>
          <Text>
            {`${schedule?.patientDetails?.fullName} | ${schedule?.patientDetails?.patientCode} ` ||
              "Edit Patient Follow-Up Details"}
          </Text>
          <Text type="secondary" style={{ display: "block", fontSize: "14px" }}>
            Update the follow-up information for the patient.
          </Text>
        </span>
      }
      width={650}
    >
      <div style={{ maxWidth: "850px", margin: "0px auto", padding: "0px" }}>
        {/* Page Header */}
        <div style={{ marginBottom: "32px", textAlign: "center" }}>
          <Title level={2} style={{ margin: 0 }}>
            Patient Follow-Up Form
          </Title>
          <Text type="secondary">Update the follow-up details</Text>
        </div>

        <FollowUpForm
          form={form}
          formType="update"
          handleSubmit={handleSubmit}
          loading={loading}
        />
      </div>
    </DrawerComponent>
  );
}

export default EditFollowUp;
