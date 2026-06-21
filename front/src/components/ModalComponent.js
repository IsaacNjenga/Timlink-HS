import { CloseOutlined } from "@ant-design/icons";
import { Modal, theme } from "antd";
import React from "react";

function ModalComponent({
  children,
  openModal,
  setOpenModal,
  loading,
  title,
  width,
}) {
  const { token } = theme.useToken();

  return (
    <Modal
      footer={null}
      open={openModal}
      title={title}
      onCancel={() => setOpenModal(false)}
      confirmLoading={loading}
      width={width}
      closeIcon={
        <CloseOutlined
          style={{
            fontSize: 24,
            color: "#fff",
            background: "rgba(0,0,0,0.5)",
            padding: 8,
            borderRadius: "50%",
          }}
        />
      }
      bodyStyle={{
        padding: 0,
        background: token.colorBgContainer,
        borderRadius: 16,
        overflow: "hidden",
      }}
      style={{ top: 20 }}
      styles={{
        body: {
          maxHeight: "85vh",
          overflowY: "auto",
        },
      }}
    >
      {children}
    </Modal>
  );
}

export default ModalComponent;
