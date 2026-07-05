import { Card, Col, Divider, Row, Tag, Typography } from "antd";
import React from "react";

const { Text } = Typography;

const feeData = [
  { fee: "Total Billed", amount: 575000, color: "blue" },
  { fee: "Agency Fee", amount: 86250, color: "green" },
  { fee: "Surgeon Fees", amount: 182250, color: "orange" },
  { fee: "Referee Admin Fees", amount: 28750, color: "red" },
  { fee: "Net Revenue (Agency)", amount: 57500, color: "purple" },
];

const paymentStatusData = [
  { status: "Paid", amount: 100000, color: "green", cases: 10 },
  { status: "Pending", amount: 50000, color: "orange", cases: 5 },
  { status: "Overdue", amount: 25000, color: "red", cases: 2 },
];

function Summary() {
  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card title="Fee Breakdown">
            {feeData.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <span>{item.fee}</span>
                <Tag color={item.color}>
                  KES. {item.amount.toLocaleString()}
                </Tag>
              </div>
            ))}
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Payment Status Summary">
            {paymentStatusData.map((item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                }}
              >
                <div>
                  <Text type="primary" style={{ color: item.color }}>
                    {item.status}
                  </Text>
                  <Divider type="vertical" />
                  <Text type="secondary">{item.cases} cases</Text>
                </div>
                <div>
                  <Tag color={item.color}>
                    KES. {item.amount.toLocaleString()}
                  </Tag>
                </div>
              </div>
            ))}
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Summary;
