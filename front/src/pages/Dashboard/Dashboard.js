import React, { useMemo, useState } from "react";
import PageTitle from "../../components/PageTitle";
import {
  Row,
  Statistic,
  Col,
  Card,
  Typography,
  Progress,
  Tag,
  Avatar,
  Divider,
} from "antd";
import CountUpComponent from "../../components/CountUpComponent";
import {
  AlertFilled,
  CreditCardFilled,
  FundFilled,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { PatientData } from "../../assets/data/patientData";
import TableComponent from "../../components/TableComponent";
import { formatDistanceToNowStrict } from "date-fns";

const { Text, Title } = Typography;

const CardData = [
  {
    key: "totalLeads",
    title: "Total Leads",
    subtitle: "All time patients",
    value: 4297924,
    color: "lightblue",
    icon: UsergroupAddOutlined,
    prefix: false,
    suffix: false,
    suffixValue: "%",
  },
  {
    key: "conversionRate",
    title: "Conversion Rate",
    subtitle: "3 cases from 5 leads",
    value: 60,
    color: "gold",
    icon: FundFilled,
    prefix: false,
    suffix: true,
    suffixValue: "%",
  },
  {
    key: "feesEarned",
    title: "Fees Earned",
    subtitle: "Agency revenue",
    value: 140569,
    color: "green",
    icon: CreditCardFilled,
    prefix: true,
    suffix: false,
    suffixValue: "%",
  },
  {
    key: "outstanding",
    title: "Outstanding Fees",
    subtitle: "Pending collection",
    value: 247400,
    color: "orange",
    icon: AlertFilled,
    prefix: true,
    suffix: false,
    suffixValue: "%",
  },
];

const summaryData = [
  { label: "Total Billed", value: 45923 },
  { label: "Agency Fees", value: 17538 },
  { label: "Outstanding", value: 23383 },
  { label: "Net Revenue", value: 68658 },
];

const colorMatch = (status) => {
  let color = "";
  switch (status) {
    case "New Lead":
      color = "purple";
      break;
    case "Under Review":
      color = "orange";
      break;
    case "Matched":
      color = "green";
      break;
    case "Scheduled":
      color = "gold";
      break;
    case "Completed":
      color = "cyan";
      break;
    case "Closed":
      color = "red";
      break;
    default:
      color = "green";
      break;
  }

  return color;
};

const columns = [
  {
    title: "Patient",
    dataIndex: "name",
    render: (_, record) => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          alignContent: "center",
          padding: 4,
          borderRadius: 8,
        }}
      >
        <div style={{ marginRight: 12, display: "flex", alignItems: "center" }}>
          <Avatar
            size="medium"
            style={{ backgroundColor: "#f56a00", verticalAlign: "middle" }}
          >
            {record.firstName?.charAt(0)} {record.lastName?.charAt(0)}
          </Avatar>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontWeight: "bold", fontSize: 16, marginBottom: 0 }}>
            {record.firstName} {record.lastName}
          </div>

          <div>
            <Text type="secondary">
              {formatDistanceToNowStrict(new Date(record.dob), {
                addSuffix: false,
              })}
            </Text>
          </div>
        </div>
      </div>
    ),
  },

  {
    title: "Diagnosis",
    dataIndex: "diagnosis",
  },
  {
    title: "Referral",
    dataIndex: "referral",
    render: (_, record) =>
      record.referral || (
        <Text>
          {record.referral === "referral doctor"
            ? record.referringDoctor
            : record.referral}
        </Text>
      ),
  },
  {
    title: "Payment",
    dataIndex: "payment",
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (status) => {
      let color;
      switch (status) {
        case "New Lead":
          color = "blue";
          break;
        case "Under Review":
          color = "orange";
          break;
        case "Matched":
          color = "green";
          break;
        case "Scheduled":
          color = "purple";
          break;
        case "Completed":
          color = "cyan";
          break;
        case "Closed":
          color = "red";
          break;
        default:
          color = "default";
      }
      return <Tag color={color}>{status}</Tag>;
    },
  },
  {
    title: "Date of Registration",
    dataIndex: "date",
  },
];

function Dashboard() {
  const [loading, setLoading] = useState(false);

  const pipelineElements = useMemo(() => {
    if (!PatientData || PatientData.length === 0) return [];

    const totalPatients = PatientData.length;

    const statusCounts = PatientData.reduce((accumulator, patient) => {
      const status = patient.status || "Unknown";
      accumulator[status] = (accumulator[status] || 0) + 1;
      return accumulator;
    }, {});

    return Object.entries(statusCounts).map(([status, count]) => ({
      label: status,
      value: count,
      percent: parseFloat(((count / totalPatients) * 100).toFixed(0)),
      color: colorMatch(status),
    }));
  }, []);

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
        <PageTitle
          title="Dashboard"
          subtitle="Welcome back — here's what's happening at THS."
        />
      </div>

      {/* statistics cards */}
      <div style={{ marginBottom: 16 }}>
        <Row gutter={[16, 16]}>
          {CardData.map((card) => (
            <Col span={6} key={card.key}>
              <Card variant="borderless">
                <Statistic
                  title={
                    <span style={{ color: card.color, marginBottom: 0 }}>
                      <span>
                        {card.icon && <card.icon style={{ fontSize: 24 }} />}
                      </span>{" "}
                      <span>{card.title}</span>
                    </span>
                  }
                  value={card.value}
                  formatter={(value) => (
                    <div>
                      <div style={{ marginBottom: 0 }}>
                        <span style={{ color: "whitesmoke" }}>
                          {card.prefix && (
                            <span style={{ fontSize: 17 }}>
                              <strong>KES. </strong>
                            </span>
                          )}
                          <span>
                            <strong>
                              {<CountUpComponent value={card.value} />}{" "}
                              {card.suffix && (
                                <span style={{ fontSize: 17 }}>
                                  <strong>{card.suffixValue}</strong>
                                </span>
                              )}
                            </strong>
                          </span>
                        </span>
                      </div>
                      <div style={{ marginTop: 0 }}>
                        <span>
                          <Text type="secondary">{card.subtitle}</Text>
                        </span>
                      </div>
                    </div>
                  )}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* cases pipeline */}
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <div>
            <Card title="Case Pipeline" hoverable>
              {pipelineElements.map((item, index) => (
                <div
                  key={index}
                  style={{
                    marginBottom: 16.5,
                    display: "flex",
                    flexDirection: "row",
                    gap: 8,
                  }}
                >
                  <Tag color={item.color}>
                    {item.label} ({item.value.toLocaleString()})
                  </Tag>
                  <Progress
                    percent={item.percent}
                    style={{ color: "red" }}
                    strokeColor={item.color}
                  />
                </div>
              ))}
            </Card>
          </div>
        </Col>
        <Col span={12}>
          <div>
            <Card title="Payment Summary" hoverable>
              {summaryData.map((s, index) => (
                <div key={index}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <div>
                      <Text>{s.label}</Text>
                    </div>
                    <div>
                      <Text type="secondary">
                        KES. {s.value.toLocaleString()}
                      </Text>
                    </div>
                  </div>
                  <Divider style={{ margin: 17 }} />
                </div>
              ))}
            </Card>
          </div>
        </Col>
      </Row>

      {/* recent patients */}
      <div>
        <div>
          <Title type="secondary" level={3}>
            Recent Patients
          </Title>
        </div>
        <TableComponent
          rowKey="_id"
          columns={columns}
          data={[...PatientData]
            .sort((a, b) => b.date.localeCompare(a.date))
            .slice(0, 4)}
          size="small"
          loading={loading}
        />
      </div>
    </>
  );
}

export default Dashboard;
