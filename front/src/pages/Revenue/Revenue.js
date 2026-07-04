import React, { useState } from "react";
import PageTitle from "../../components/PageTitle";
import { Row, Statistic, Col, Card, Tabs, Tag } from "antd";
import CountUpComponent from "../../components/CountUpComponent";
import {
  FileAddOutlined,
  FileDoneOutlined,
  FileExclamationOutlined,
  FileProtectOutlined,
} from "@ant-design/icons";
import Summary from "./Summary";
import Outstanding from "./Outstanding";
import Detail from "./Detail";
import PL from "./P&L";

const itemsData = [
  { name: "Summary", content: <Summary /> },
  { name: "Detail", content: <Detail /> },
  { name: "Outstanding", content: <Outstanding /> },
  { name: "P&L", content: <PL /> },
];

const CardData = [
  {
    key: "totalBilled",
    title: "Total Billed",
    value: 1000000,
    color: "orange",
    icon: FileAddOutlined,
  },
  {
    key: "totalReceived",
    title: "Total Received",
    value: 800000,
    color: "green",
    icon: FileProtectOutlined,
  },
  {
    key: "agencyFeesEarned",
    title: "Agency Fees Earned",
    value: 200000,
    color: "purple",
    icon: FileDoneOutlined,
  },
  {
    key: "OutstandingBalance",
    title: "Outstanding Balance",
    value: 100000,
    color: "red",
    icon: FileExclamationOutlined,
  },
];

function Revenue() {
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
        <PageTitle
          title="Revenue & Case Management Fees"
          subtitle="Financial overview, fee breakdowns and payment tracking."
        />
      </div>

      {/* statistics cards */}
      <div style={{ marginBottom: 16 }}>
        <Row gutter={[24, 16]}>
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
                      <span style={{ fontSize: 17 }}>KES. </span>
                      <span>{<CountUpComponent value={card.value} />}</span>
                    </span>
                  )}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <Tabs
        activeKey={activeKey}
        onChange={(key) => setActiveKey(key)}
        items={itemsData.map((item, index) => ({
          label: item.name,
          key: String(index),
          children: <div>{item.content}</div>,
        }))}
        // renderTabBar={(props, DefaultTabBar) => (
        //   <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        //     {props?.panes?.map((pane) => {
        //       const isActive = pane.key === activeKey;
        //       return (
        //         <Tag
        //           key={pane.key}
        //           color={isActive ? "blue" : "default"}
        //           style={{
        //             cursor: "pointer",
        //             padding: "4px 12px",
        //             fontSize: "14px",
        //             border: isActive ? "none" : "1px solid #d9d9d9",
        //             fontWeight: isActive ? 600 : 400,
        //           }}
        //           onClick={() => setActiveKey(pane.key)}
        //         >
        //           {pane.props.tab}
        //         </Tag>
        //       );
        //     })}
        //   </div>
        // )}
      />
    </>
  );
}

export default Revenue;
