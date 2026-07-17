import React from "react";
import {
  Typography,
  Row,
  Statistic,
  Col,
  Card,
  Button,
  Flex,
  Progress,
  Divider,
} from "antd";
import {
  CreditCardOutlined,
  DownloadOutlined,
  FileDoneOutlined,
  FileExclamationOutlined,
  FileProtectOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import CountUpComponent from "../../../components/CountUpComponent";

const { Text, Title } = Typography;

const CardData = [
  {
    key: "totalRevenue",
    title: "Total Revenue",
    value: 4297924,
    color: "whitesmoke",
    icon: CreditCardOutlined,
    prefix: true,
  },
  {
    key: "allJobs",
    title: "Total Jobs",
    value: 23,
    color: "orange",
    icon: FileDoneOutlined,
    prefix: false,
  },
  {
    key: "completedJobs",
    title: "Completed Jobs",
    value: 17,
    color: "green",
    icon: FileProtectOutlined,
    prefix: false,
  },
  {
    key: "scheduledJobs",
    title: "Scheduled Jobs",
    value: 5,
    color: "gold",
    icon: FileExclamationOutlined,
    prefix: false,
  },
];

const progressData = [
  { percent: 30, text: "56% of mobile revenue", label: "X-ray", value: 15000 },
  {
    percent: 60,
    text: "44% of mobile revenue",
    label: "Ultrasound",
    value: 12000,
  },
];

function RevenueTab() {
  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Row gutter={[16, 16]}>
          {CardData.map((card) => (
            <Col span={6} key={card.key}>
              <Card variant="borderless">
                <Statistic
                  title={
                    <span style={{ color: card.color }}>
                      <span>
                        {card.icon && <card.icon style={{ fontSize: 20 }} />}
                      </span>{" "}
                      <span>{card.title}</span>
                    </span>
                  }
                  value={card.value}
                  formatter={(value) => (
                    <span style={{ color: "whitesmoke" }}>
                      {card.prefix && (
                        <span style={{ fontSize: 17 }}>
                          <strong>KES. </strong>
                        </span>
                      )}
                      <span>
                        <strong>
                          {<CountUpComponent value={card.value} />}
                        </strong>
                      </span>
                    </span>
                  )}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <div>
        <Card variant="borderless">
          <div>
            <Row gutter={[16, 16]} justify="space-between" align="middle">
              <Col span={12}>
                <div
                  style={{
                    textAlign: "left",
                    display: "flex",
                    flexDirection: "column",
                    // gap: 5,
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>Revenue Breakdown</Text>
                  <Text type="secondary">
                    Compare mobile X-ray and ultrasound income.
                  </Text>
                </div>
              </Col>
              <Col span={12}>
                <div
                  style={{
                    textAlign: "right",
                    display: "flex",
                    gap: 5,
                    justifyContent: "flex-end",
                  }}
                >
                  <Button type="primary">Export</Button>
                  <Button type="secondary">Print Summary</Button>
                </div>
              </Col>
            </Row>
          </div>

          <div
            style={{
              marginTop: 12,
              padding: 12,
              backgroundColor: "#353131",
              borderRadius: 12,
            }}
          >
            <Row gutter={[16, 10]}>
              <Col span={12} style={{ paddingRight: 12, paddingTop: 12 }}>
                {progressData.map((item, index) => (
                  <div key={index} style={{ marginBottom: 12 }}>
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "middle",
                        }}
                      >
                        <Text>{item.label}</Text>
                        <Text>KES {item.value.toLocaleString()}</Text>
                      </div>
                      <Progress percent={item.percent} />
                      <Text type="secondary">{item.text}</Text>
                    </div>
                  </div>
                ))}
              </Col>

              <div
                style={{ borderColor: "#696262", borderLeft: "1px solid" }}
              />

              <Col span={10} style={{ paddingLeft: 12, paddingTop: 12 }}>
                {/* Header Section */}
                <Flex align="center" gap="small" style={{ marginBottom: 16 }}>
                  <FileTextOutlined
                    style={{ fontSize: "18px", color: "#1677ff" }}
                  />
                  <Title level={5} style={{ margin: 0, color: "#ffffff" }}>
                    Export Summary
                  </Title>
                </Flex>

                {/* Grid of Key Metrics */}
                <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
                  <Col span={12}>
                    <Flex vertical>
                      <Text style={{ color: "#aaa", fontSize: "12px" }}>
                        TOTAL SERVICE JOBS
                      </Text>
                      <Text strong style={{ color: "#fff", fontSize: "18px" }}>
                        2
                      </Text>
                    </Flex>
                  </Col>
                  <Col span={12}>
                    <Flex vertical>
                      <Text style={{ color: "#aaa", fontSize: "12px" }}>
                        TOTAL INCOME
                      </Text>
                      <Text
                        strong
                        style={{ color: "#52c41a", fontSize: "18px" }}
                      >
                        KES 27,000
                      </Text>
                    </Flex>
                  </Col>
                  <Col span={8}>
                    <Flex vertical>
                      <Text style={{ color: "#aaa", fontSize: "12px" }}>
                        COMPLETED
                      </Text>
                      <Text strong style={{ color: "#fff" }}>
                        1
                      </Text>
                    </Flex>
                  </Col>
                  <Col span={8}>
                    <Flex vertical>
                      <Text style={{ color: "#aaa", fontSize: "12px" }}>
                        SCHEDULED
                      </Text>
                      <Text strong style={{ color: "#fff" }}>
                        1
                      </Text>
                    </Flex>
                  </Col>
                  <Col span={8}>
                    <Flex vertical>
                      <Text style={{ color: "#aaa", fontSize: "12px" }}>
                        PATIENT-LINKED
                      </Text>
                      <Text strong style={{ color: "#fff" }}>
                        1
                      </Text>
                    </Flex>
                  </Col>
                </Row>

                <Divider
                  style={{
                    borderColor: "#696262",
                    margin: "12px 0",
                  }}
                />

                {/* Helper Context/Description Footer */}
                <Flex gap="small" align="start">
                  <DownloadOutlined
                    style={{ color: "#1677ff", marginTop: 3 }}
                  />
                  <Text
                    style={{
                      color: "rgba(255, 255, 255, 0.75)",
                      fontSize: "13px",
                      lineHeight: "1.5",
                    }}
                  >
                    Use the export button to download a CSV of mobile service
                    jobs for external reporting, accounting, or invoice
                    reconciliation.
                  </Text>
                </Flex>
              </Col>
            </Row>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default RevenueTab;
