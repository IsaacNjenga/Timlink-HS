import React from "react";
import { Tabs, Typography } from "antd";
import { useSearchParams } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import Profile from "./Profile";
import Security from "./Security";
import PageTitle from "../../components/PageTitle";

const { Text } = Typography;

const menuConfig = [
  {
    key: "profile",
    label: "My Profile",
    icon: UserOutlined,
    content: <Profile />,
  },
  {
    key: "security",
    label: "Security",
    icon: LockOutlined,
    content: <Security />,
  },
];

function Settings() {
  const [searchParams, setSearchParams] = useSearchParams();

  const activeKey = searchParams.get("tab") || "0";

  const antMenuItems = menuConfig.map((item) => {
    const iconEl = React.createElement(item.icon, {
      style: { fontSize: 14, color: "rgba(255,255,255,0.75)", flexShrink: 0 },
    });

    return {
      key: item.key,
      icon: iconEl,
      label: (
        <Text
          style={{
            fontFamily: "'Outfit', sans-serif",
            fontSize: 12,
            fontWeight: 500,
            color: "rgba(255,255,255,0.85)",
            textDecoration: "none",
          }}
        >
          {item.label}
        </Text>
      ),
      children: (
        <div
          style={{
            margin: "20 0px",
          }}
        >
          {item.content}
        </div>
      ),
    };
  });

  return (
    <>
      <div
        style={{
          margin: "0 20px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <div>
          <PageTitle
            title="Settings"
            subtitle="Manage & configure your settings."
          />
        </div>
      </div>

      {/* <Divider /> */}
      <Tabs
        activeKey={activeKey}
        onChange={(key) => {
          setSearchParams({ tab: key });
        }}
        tabPlacement={"left"}
        style={{ height: "auto", borderTop: "1px solid #162c29" }}
        items={antMenuItems}
      />
    </>
  );
}

export default Settings;
