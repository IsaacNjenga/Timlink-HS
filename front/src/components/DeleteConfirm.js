import React from "react";
import { Popconfirm } from "antd";
import { usePop } from "../contexts/popContext";

function DeleteConfirm({
  title,
  description,
  recordId,
  onConfirmSuccess,
  children,
}) {
  const { openConfirm, setOpenConfirm, confirmLoading, setConfirmLoading } =
    usePop();

  const isOpen = openConfirm === recordId;

  const handleOk = async (e) => {
    e.stopPropagation();
    setConfirmLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (onConfirmSuccess) {
        onConfirmSuccess(recordId);
      }

      setOpenConfirm(null);
    } catch (error) {
      console.error(error);
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    setOpenConfirm(null);
  };

  return (
    <Popconfirm
      title={title}
      description={description}
      open={isOpen}
      onConfirm={handleOk}
      okButtonProps={{ loading: confirmLoading }}
      onCancel={handleCancel}
    >
      {children}
    </Popconfirm>
  );
}

export default DeleteConfirm;
