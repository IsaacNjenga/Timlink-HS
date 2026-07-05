import React from "react";
import { Card, Typography, Divider } from "antd";

const { Title, Text } = Typography;

function PL() {
  // Line item layout helper to ensure consistent alignment
  const LineItem = ({ label, value, isNegative, isTotal }) => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "8px 0",
        fontWeight: isTotal ? "600" : "normal",
      }}
    >
      <Text strong={isTotal} type={isTotal ? undefined : "secondary"}>
        {label}
      </Text>
      <Text
        strong={isTotal}
        style={{
          fontSize: isTotal ? "16px" : "14px",
          color: isNegative ? "#ff4d4f" : isTotal ? "#1890ff" : "#262626",
        }}
      >
        {isNegative ? `(KES ${value})` : `KES ${value}`}
      </Text>
    </div>
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        title={
          <Title level={4} style={{ margin: 0, textAlign: "center" }}>
            Profit & Loss Statement
          </Title>
        }
        style={{
          width: "100%",
          maxWidth: "480px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        {/* --- INCOME SECTION --- */}
        <div style={{ marginBottom: "16px" }}>
          <Title
            level={5}
            style={{
              color: "#8c8c8c",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: "12px",
            }}
          >
            Income
          </Title>
          <LineItem label="Gross Billings" value="575,000" />
          <LineItem label="Less: Surgeon Fees" value="182,250" isNegative />
          <Divider style={{ margin: "8px 0" }} />
          <LineItem label="Agency Revenue (Gross)" value="86,250" isTotal />
        </div>

        {/* --- EXPENSES SECTION --- */}
        <div style={{ marginBottom: "16px", marginTop: "24px" }}>
          <Title
            level={5}
            style={{
              color: "#8c8c8c",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              marginBottom: "12px",
            }}
          >
            Expenses
          </Title>
          <LineItem label="Referee Admin Fees" value="28,750" isNegative />
        </div>

        <Divider style={{ margin: "16px 0", borderTop: "2px solid #f0f0f0" }} />

        {/* --- SUMMARY SECTION --- */}
        <div
          style={{
            border: "1px solid #e6f7ff",
            padding: "12px 16px",
            borderRadius: "6px",
            marginBottom: "12px",
          }}
        >
          <LineItem label="Net Revenue" value="57,500" isTotal />
        </div>

        <div
          style={{
            background: "#fffbe619",
            padding: "12px 16px",
            borderRadius: "6px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <Text type="secondary">Outstanding (not yet received)</Text>
            </div>
            <div>
              <Text strong>KES 95,000</Text>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default PL;
