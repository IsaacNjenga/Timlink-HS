import React from "react";
import { usePop } from "../contexts/popContext";
import { CloseOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Drawer, Button, Spin, theme, Tooltip, Space } from "antd";
import DeleteConfirm from "./DeleteConfirm";
import { useNavigate } from "react-router-dom";

function DrawerComponent({
  children,
  openModal,
  setOpenModal,
  loading,
  title,
  width,
  contentLoading,
  recordId,
  editPath,
  extra,
}) {
  const navigate = useNavigate();
  const { token } = theme.useToken();
  const { setOpenConfirm } = usePop();

  return (
    <Drawer
      title={title}
      closable={{ "aria-label": "Close Button" }}
      onClose={() => setOpenModal(false)}
      open={openModal}
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
      extra={
        extra != null ? (
          <Space>
            {editPath !== null ? (
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
              </Tooltip>
            ) : null}

            <Tooltip title="Delete">
              <DeleteConfirm
                recordId={recordId}
                title="Are you sure?"
                source="modal"
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
                    setOpenConfirm({
                      id: recordId,
                      source: "modal",
                    });
                  }}
                />
              </DeleteConfirm>
            </Tooltip>
          </Space>
        ) : (
          null
        )
      }
    >
      {contentLoading ? (
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
          <Spin size="large" tip="Loading..." />
        </div>
      ) : (
        <div
          style={{
            padding: "10px 16px",
            background: token.colorBgContainer,
            color: token.colorText,
            borderRadius: 12,
          }}
        >
          {children}
        </div>
      )}
    </Drawer>
  );
}

export default DrawerComponent;
