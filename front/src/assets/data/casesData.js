export const casesData = [
  {
    _id: "6677af4c8b2d4c5e9a112233",
    patient: {
      patientId: { $oid: "6677a23b8b2d4c5e9a110001" },
      patientCode: "PT001",
      name: "John Otieno",
    },
    surgeryType: "Laparoscopic Cholecystectomy",
    surgeon: {
      surgeonId: { $oid: "6677a5fa8b2d4c5e9a110501" },
      name: "Dr. James Mutua",
    },
    hospital: "Nairobi Hospital",
    surgeryDate: "2026-06-01",
    paymentStatus: "Paid",
    paymentMode: "Insurance",
    financials: {
      estimatedCostKsh: 350000,
      finalBilledKsh: 385000,
      amountReceivedKsh: 385000,
      paymentStatus: "Paid",
      invoiceNo: "INV-2026-0001",
    },
    commissionFees: {
      agencyFeePercent: 15,
      surgeonFeePercent: 70,
      refereeAdminFeePercent: 5,
    },
    notes: "Cleared by corporate insurance cover fully.",
    createdAt: { $date: "2026-05-28T09:00:00.000Z" },
  },
];
