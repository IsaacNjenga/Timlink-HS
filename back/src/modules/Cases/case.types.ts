export type PaymentStatus = "Pending" | "Paid" | "Partially Paid";

export type CaseListResponse = {
  cases: Case[];
  totalCases: number;
  currentPage: number;
  totalPages: number;
};

export interface Financials {
  estimatedCostKsh: number;
  finalBilledKsh: number;
  amountReceivedKsh: number;
  invoiceNo: string;
}

export interface CommissionFees {
  agencyFeePercent: number;
  surgeonFeePercent: number;
  refereeAdminFeePercent: number;
}

export interface Case {
  _id: string;
  patient: string;
  surgeryType: string;
  surgeon: string;
  hospital: string;
  surgeryDate: Date;
  paymentStatus: PaymentStatus;
  paymentMode: string;
  financials: Financials;
  commissionFees: CommissionFees;
  notes: string;
}

export interface CreateCaseDTO {
  patient: string;
  surgeryType: string;
  surgeon: string;
  hospital: string;
  surgeryDate: Date;
  paymentStatus: PaymentStatus;
  paymentMode: string;
  financials: Financials;
  commissionFees: CommissionFees;
  notes?: string;
}

export interface UpdateCaseDTO {
  patient?: string;
  surgeryType?: string;
  surgeon?: string;
  hospital?: string;
  surgeryDate?: Date;
  paymentStatus?: PaymentStatus;
  paymentMode?: string;
  financials?: Financials;
  commissionFees?: CommissionFees;
  notes?: string;
}
