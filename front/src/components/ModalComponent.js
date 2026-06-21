import { CloseOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import React from "react";

function ModalComponent({ content, openModal, setOpenModal, loading }) {
  return (
    <Modal
      footer={null}
      open={openModal}
      onCancel={() => setOpenModal(false)}
      confirmLoading={loading}
      width="95%"
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
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        borderRadius: 16,
        overflow: "hidden",
      }}
      style={{ top: 20 }}
      styles={{
        body: {
          maxHeight: "90vh",
          overflowY: "auto",
        },
      }}
    >
      {content}
    </Modal>
  );
}

export default ModalComponent;
