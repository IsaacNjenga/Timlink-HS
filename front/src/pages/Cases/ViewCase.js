import React from "react";
import ModalComponent from "../../components/ModalComponent";
import { Spin, Typography, theme } from "antd";

const { Text } = Typography;

function ViewCase({ content, loading, openModal, setOpenModal }) {
  const { token } = theme.useToken();

  return (
    <ModalComponent
      openModal={openModal}
      setOpenModal={setOpenModal}
      width={700}
    >
      {loading ? (
        <div style={{ textAlign: "center", padding: "40px 20px" }}>
          <Spin size="large" tip="Loading profile..." />
        </div>
      ) : content ? (
        <div
          style={{
            padding: "10px 12px",
            background: token.colorBgContainer,
            color: token.colorText,
          }}
        >
          <pre>{JSON.stringify(content, null, 2)}</pre>
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <Text type="secondary">No case data available to view.</Text>
        </div>
      )}
    </ModalComponent>
  );
}

export default ViewCase;
