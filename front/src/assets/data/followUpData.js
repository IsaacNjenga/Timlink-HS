export const FollowUpData = [
  {
    _id: "667ebd1b8b2d4c5e9a440001",
    caseDetails: {
      caseId: { $oid: "667a2a1b8b2d4c5e9a1100aa" },
      caseCode: "CS001",
      procedureName: "ACL Reconstruction",
      surgeryDate: "2026-06-12T06:00:00.000Z",
    },
    patientDetails: {
      patientId: { $oid: "6677a23b8b2d4c5e9a110001" },
      patientCode: "PT001",
      fullName: "John Otieno",
      contactPhone: "+254 711 222333",
      preferredChannel: "Phone Call",
    },
    followUpSchedule: {
      frequency: "Weekly",
      currentSequenceCount: 2,
      lastFollowUpDate: "2026-06-26T09:15:00.000Z",
      dueDate: "2026-07-03T17:00:00.000Z",
    },
    clinicalAssessment: {
      status: "Pending",
      complicationRiskScore: "Low",
      assignedCareCoordinator: "Nurse Sarah Kamau",
    },
    notes:
      "Patient is transitioning out of the knee immobilizer splint this week. Focus next check-in on extension range of motion limits and adherence to the formal physiotherapy routine. Report any localized swelling variations.",
    createdAt: { $date: "2026-06-12T08:00:00.000Z" },
    updatedAt: { $date: "2026-06-26T09:20:00.000Z" },
  },
  {
    _id: "667ebd1b8b2d4c5e9a440002",
    caseDetails: {
      caseId: { $oid: "667a2a1b8b2d4c5e9a1100bb" },
      caseCode: "CS002",
      procedureName: "Laparoscopic Cholecystectomy",
      surgeryDate: "2026-06-24T07:30:00.000Z",
    },
    patientDetails: {
      patientId: { $oid: "6677a23b8b2d4c5e9a110002" },
      patientCode: "PT002",
      fullName: "Grace Wanjiku",
      contactPhone: "+254 722 555666",
      preferredChannel: "WhatsApp",
    },
    followUpSchedule: {
      frequency: "Daily",
      currentSequenceCount: 4,
      lastFollowUpDate: "2026-06-28T08:30:00.000Z",
      dueDate: "2026-06-29T10:00:00.000Z",
    },
    clinicalAssessment: {
      status: "Active",
      complicationRiskScore: "Medium",
      assignedCareCoordinator: "Dr. Alex Kiprop",
    },
    notes:
      "Monitoring pain metrics and dietary tolerance transitions following gallbladder removal. Patient reports mild bloating but is walking comfortably. Ensure ports show clean scabbing with zero active drainage issues.",
    createdAt: { $date: "2026-06-24T14:20:00.000Z" },
    updatedAt: { $date: "2026-06-28T08:35:00.000Z" },
  },
  {
    _id: "667ebd1b8b2d4c5e9a440003",
    caseDetails: {
      caseId: { $oid: "667a2a1b8b2d4c5e9a1100cc" },
      caseCode: "CS003",
      procedureName: "Coronary Bypass",
      surgeryDate: "2026-06-19T05:00:00.000Z",
    },
    patientDetails: {
      patientId: { $oid: "6677a23b8b2d4c5e9a110003" },
      patientCode: "PT003",
      fullName: "David Mwangi",
      contactPhone: "+254 733 777888",
      preferredChannel: "Phone Call",
    },
    followUpSchedule: {
      frequency: "Bi-Weekly",
      currentSequenceCount: 1,
      lastFollowUpDate: "2026-06-26T11:00:00.000Z",
      dueDate: "2026-07-10T12:00:00.000Z",
    },
    clinicalAssessment: {
      status: "Completed",
      complicationRiskScore: "Low",
      assignedCareCoordinator: "Nurse Sarah Kamau",
    },
    notes:
      "Sternal wound line is fully intact and healing cleanly without rub. Vital signs are tracking normal; resting blood pressure is stable at 118/74. Medication adherence confirmed for antiplatelet and beta-blocker lines.",
    createdAt: { $date: "2026-06-19T07:10:00.000Z" },
    updatedAt: { $date: "2026-06-26T11:15:00.000Z" },
  },
];
