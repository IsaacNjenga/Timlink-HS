import React from "react";
import { Typography } from "antd";

const { Title, Text } = Typography;

function PageTitle({ title, subtitle }) {
  return (
    <div style={{ marginTop: 0, marginBottom: 10 }}>
      <Title level={2} style={{ marginBottom: 0 }}>
        {title}
      </Title>
      <Text type="secondary">{subtitle}</Text>
    </div>
  );
}

export default PageTitle;
