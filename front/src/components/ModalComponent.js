import { CloseOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Modal, Spin, theme, Tooltip } from "antd";
import React from "react";
import DeleteConfirm from "./DeleteConfirm";
import { usePop } from "../contexts/popContext";
import { useNavigate } from "react-router-dom";

function ModalComponent({
  children,
  openModal,
  setOpenModal,
  loading,
  contentLoading,
  title,
  width,
  recordId,
  editPath,
}) {
  const navigate = useNavigate();
  const { token } = theme.useToken();
  const { setOpenConfirm } = usePop();

  return (
    <Modal
      open={openModal}
      title={title}
      onCancel={() => setOpenModal(false)}
      confirmLoading={loading}
      width={width}
      closeIcon={
        <CloseOutlined
          style={{
            fontSize: 12,
            color: "#fff",
            background: "rgba(0,0,0,0.5)",
            padding: 4,
            borderRadius: "50%",
          }}
        />
      }
      bodyStyle={{
        padding: 0,
        background: token.colorBgContainer,
        borderRadius: 4,
        overflow: "hidden",
      }}
      style={{ top: 0 }}
      styles={{
        body: {
          maxHeight: "80vh",
          overflowY: "auto",
        },
      }}
      footer={[
        <Tooltip title="Edit">
          <Button
            key="edit"
            type="primary"
            icon={<EditOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              navigate(editPath);
            }}
          />
        </Tooltip>,
        <Tooltip title="Delete">
          <DeleteConfirm
            recordId={recordId}
            title="Are you sure?"
            description="This action cannot be undone!"
            onConfirmSuccess={(id) => {
              console.log(`Successfully deleted ${id}`);
            }}
          >
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                setOpenConfirm(recordId);
              }}
            />
          </DeleteConfirm>
        </Tooltip>,
      ]}
    >
      {contentLoading ? (
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
          <Spin size="large" tip="Loading..." />
        </div>
      ) : (
        <div
          style={{
            padding: "10px 12px",
            background: token.colorBgContainer,
            color: token.colorText,
          }}
        >
          {children}
        </div>
      )}
    </Modal>
  );
}

export default ModalComponent;
