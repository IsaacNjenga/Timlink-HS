import React, { useState } from "react";
import PageTitle from "../../components/PageTitle";
import { Button, Tabs } from "antd";
import RevenueTab from "./RevenueTab";
import ServiceTab from "./ServiceTab";
import InventoryTab from "./InventoryTab";

const itemsData = [
  { name: "Revenue", content: <RevenueTab /> },
  { name: "Service Jobs", content: <ServiceTab /> },
  { name: "Inventory", content: <InventoryTab /> },
];

function MobileImaging() {
  const [activeKey, setActiveKey] = useState("0");
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <PageTitle
            title="Mobile Imaging & Services"
            subtitle="Manage the mobile X-ray and ultrasound fleet,
      service bookings, and revenue from external work."
          />
        </div>
        <div style={{ display: "flex", flexDirection: "row", gap: 8 }}>
          <Button
            type="primary"
            // onClick={() => navigate("/patient&leads/add-patient")}
          >
            + New Service Job
          </Button>
          <Button type="primary">+ New Equipment</Button>
        </div>
      </div>

      <div>
        <Tabs
          activeKey={activeKey}
          onChange={(key) => setActiveKey(key)}
          items={itemsData.map((item, index) => ({
            label: item.name,
            key: String(index),
            children: <div style={{ padding: "12px" }}>{item.content}</div>,
          }))}
        />
      </div>
    </>
  );
}

export default MobileImaging;
