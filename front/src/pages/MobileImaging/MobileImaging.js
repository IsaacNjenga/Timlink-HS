import React from "react";
import PageTitle from "../../components/PageTitle";
import { Button } from "antd";

function MobileImaging() {
  return (
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
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <Button
          type="primary"
          style={{ marginTop: 10 }}
          // onClick={() => navigate("/patient&leads/add-patient")}
        >
          + New Service Job
        </Button>
        <Button>+ New Equipment</Button>
      </div>
    </div>
  );
}

export default MobileImaging;
