import React from "react";
import PageTitle from "../../components/PageTitle";
import { Button, Tabs } from "antd";
import RevenueTab from "./Revenue/RevenueTab";
import ServiceTab from "./ServiceJobs/ServiceTab";
import InventoryTab from "./Inventory/InventoryTab";
import { useNavigate, useSearchParams } from "react-router-dom";

const itemsData = [
  { name: "Revenue", content: <RevenueTab /> },
  { name: "Service Jobs", content: <ServiceTab /> },
  { name: "Inventory", content: <InventoryTab /> },
];

function MobileImaging() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeKey = searchParams.get("tab") || "0";

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
            onClick={() => navigate("/mobile-imaging/add-service-job")}
          >
            + New Service Job
          </Button>
          <Button
            type="primary"
            onClick={() => navigate("/mobile-imaging/add-inventory-item")}
          >
            + New Equipment
          </Button>
        </div>
      </div>

      <div>
        <Tabs
          activeKey={activeKey}
          onChange={(key) => {
            setSearchParams({ tab: key });
          }}
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
