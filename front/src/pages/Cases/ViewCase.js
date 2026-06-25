import React from "react";
import ModalComponent from "../../components/ModalComponent";
import { Descriptions, Tag, Divider, Typography, theme } from "antd";
import {
  FileTextOutlined,
  DollarCircleOutlined,
  PercentageOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

const { Text } = Typography;

function ViewCase({ content, loading, openModal, setOpenModal }) {
  const { token } = theme.useToken();

  // Color mapping based on paymentStatus parameters
  const getPaymentStatusColor = (status) => {
    const colors = {
      Paid: "success",
      Partial: "warning",
      Pending: "processing",
      Unpaid: "error",
    };
    return colors[status] || "default";
  };

  // Safe currency and number formatting for KES
  const formatCurrency = (amount) => {
    if (amount === undefined || amount === null) return "KES 0.00";
    return new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
    }).format(amount);
  };

  // Safe date formatting for ISODate strings
  const formatDate = (dateObj) => {
    if (!dateObj) return "—";
    const dateStr = dateObj.$date || dateObj;
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <ModalComponent
      openModal={openModal}
      setOpenModal={setOpenModal}
      title={
        content
          ? `Case Details: ${content.financials?.invoiceNo || "N/A"}`
          : "Case File View"
      }
      width={750}
      contentLoading={loading}
      recordId={content._id}
      editPath={`/cases&surgery/edit-case/${content._id}`}
    >
      {content ? (
        <>
          {/* SECTION 1: Case & Admission Data */}
          <Divider orientation="left" style={{ marginTop: 0 }}>
            <span style={{ color: token.colorPrimary }}>
              <FileTextOutlined /> Admission & Surgical Profile
            </span>
          </Divider>
          <Descriptions column={{ xs: 1, sm: 2 }} bordered size="small">
            <Descriptions.Item label="Patient Name">
              <Text strong>{content.patient?.name}</Text>{" "}
              {content.patient?.patientCode &&
                `(${content.patient.patientCode})`}
            </Descriptions.Item>
            <Descriptions.Item label="Surgery Type">
              {content.surgeryType}
            </Descriptions.Item>
            <Descriptions.Item label="Assigned Surgeon">
              {content.surgeon?.name || "Unassigned"}
            </Descriptions.Item>
            <Descriptions.Item label="Admitting Hospital">
              {content.hospital}
            </Descriptions.Item>
            <Descriptions.Item label="Surgery Date" span={2}>
              <CalendarOutlined
                style={{ marginRight: 6, color: token.colorTextDescription }}
              />
              {formatDate(content.surgeryDate)}
            </Descriptions.Item>
          </Descriptions>

          {/* SECTION 2: Financial Ledger */}
          <Divider orientation="left">
            <span style={{ color: token.colorPrimary }}>
              <DollarCircleOutlined /> Financial Ledger
            </span>
          </Divider>
          <Descriptions column={{ xs: 1, sm: 2 }} bordered size="small">
            <Descriptions.Item label="Invoice Number">
              <Text copyable>{content.financials?.invoiceNo || "—"}</Text>
            </Descriptions.Item>
            <Descriptions.Item label="Payment Status">
              <Tag
                color={getPaymentStatusColor(content.financials?.paymentStatus)}
              >
                {content.financials?.paymentStatus
                  ? content.financials.paymentStatus.toUpperCase()
                  : "UNKNOWN"}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Payment Mode">
              {content.paymentMode}
            </Descriptions.Item>
            <Descriptions.Item label="Estimated Cost">
              {formatCurrency(content.financials?.estimatedCostKsh)}
            </Descriptions.Item>
            <Descriptions.Item
              label="Final Billed Amount"
              style={{ background: token.colorWarningBgSimple }}
            >
              <Text strong>
                {formatCurrency(content.financials?.finalBilledKsh)}
              </Text>
            </Descriptions.Item>
            <Descriptions.Item
              label="Amount Received"
              style={{ background: token.colorSuccessBgSimple }}
            >
              <Text
                strong
                type={
                  content.financials?.amountReceivedKsh > 0
                    ? "success"
                    : "danger"
                }
              >
                {formatCurrency(content.financials?.amountReceivedKsh)}
              </Text>
            </Descriptions.Item>
          </Descriptions>

          {/* SECTION 3: Splits & Margins Allocation */}
          <Divider orientation="left">
            <span style={{ color: token.colorPrimary }}>
              <PercentageOutlined /> Split Allocation Margins
            </span>
          </Divider>
          <Descriptions column={{ xs: 1, sm: 3 }} bordered size="small">
            <Descriptions.Item label="Agency Fee">
              {content.commissionFees?.agencyFeePercent || 0}%
            </Descriptions.Item>
            <Descriptions.Item label="Surgeon Fee">
              {content.commissionFees?.surgeonFeePercent || 0}%
            </Descriptions.Item>
            <Descriptions.Item label="Referee Admin Fee">
              {content.commissionFees?.refereeAdminFeePercent || 0}%
            </Descriptions.Item>
          </Descriptions>

          {/* SECTION 4: File Processing Notes */}
          <Divider orientation="left">
            <span>File Documentation Notes</span>
          </Divider>
          <div
            style={{
              padding: "12px",
              background: token.colorBgLayout,
              borderRadius: token.borderRadiusSM,
              border: `1px solid ${token.colorBorderSecondary}`,
              minHeight: "50px",
              whiteSpace: "pre-wrap",
            }}
          >
            <Text
              type={content.notes ? "default" : "secondary"}
              italic={!content.notes}
            >
              {content.notes ||
                "No special case or clearance comments recorded against this billing workflow entry."}
            </Text>
          </div>
        </>
      ) : (
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <Text type="secondary">No case data available to view.</Text>
        </div>
      )}
    </ModalComponent>
  );
}

export default ViewCase;
