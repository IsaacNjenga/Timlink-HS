export const serviceJobs = [
  {
    _id: "1",
    jobId: "JOB-101",
    serviceType: "X-ray",
    clientType: "Patient",
    patientDetails: {
      patientId: "PT001",
      fullName: "John Otieno",
    },
    externalClientDetails: null,
    facilityLocation: "Radiology Department - Wing A",
    serviceDate: "2026-07-08T09:00:00.000Z",
    equipment: {
      name: "Mobile X-ray Unit A",
      code: "MH-1234",
    },
    serviceCost: 4500.0,
    status: "Completed",
    notes:
      "Chest X-ray (PA view) performed routinely. Images successfully routed to PACs server. No technical anomalies logged with Unit A during processing.",
  },
  {
    _id: "2",
    jobId: "JOB-102",
    serviceType: "Ultrasound",
    clientType: "Patient",
    patientDetails: {
      patientId: "PT002",
      fullName: "Grace Wanjiku",
    },
    externalClientDetails: null,
    facilityLocation: "Maternal & Child Health Clinic",
    serviceDate: "2026-07-09T11:30:00.000Z",
    equipment: {
      name: "Portable Ultrasound Unit B",
      code: "MH-5678",
    },
    serviceCost: 6000.0,
    status: "Scheduled",
    notes:
      "Scheduled pelvic scan profile. Patient advised to maintain a full bladder prior to arrival window at the unit.",
  },
  {
    _id: "3",
    jobId: "JOB-103",
    serviceType: "X-ray",
    clientType: "External",
    patientDetails: null,
    externalClientDetails: {
      organizationName: "MediCross Outpost Clinic",
      referralRef: "REF-9921",
      walkInName: "Fatuma Abdallah",
    },
    facilityLocation: "Emergency Diagnostics Sub-Station",
    serviceDate: "2026-07-08T14:15:00.000Z",
    equipment: {
      name: "Mobile X-ray Unit A",
      code: "MH-1234",
    },
    serviceCost: 5200.0,
    status: "Cancelled",
    notes:
      "Order cancelled due to bilateral duplicate referral tracking error. Swapped to alternative specialized imaging tier pipeline.",
  },
  {
    _id: "4",
    jobId: "JOB-104",
    serviceType: "Ultrasound",
    clientType: "Patient",
    patientDetails: {
      patientId: "PT003",
      fullName: "David Mwangi",
    },
    externalClientDetails: null,
    facilityLocation: "Main Campus - Imaging Suite 2",
    serviceDate: "2026-07-08T08:00:00.000Z",
    equipment: {
      name: "Portable Ultrasound Unit B",
      code: "MH-5678",
    },
    serviceCost: 6000.0,
    status: "Completed",
    notes:
      "Abdominal Doppler scan complete. High clarity tracking achieved. Archival backup logged safely onto structural server.",
  },
  {
    _id: "5",
    jobId: "JOB-105",
    serviceType: "X-ray",
    clientType: "Patient",
    patientDetails: {
      patientId: "PT005",
      fullName: "Samuel Kipkoech",
    },
    externalClientDetails: null,
    facilityLocation: "Orthopedic Outpatient Cabinets",
    serviceDate: "2026-07-10T10:00:00.000Z",
    equipment: {
      name: "Mobile X-ray Unit A",
      code: "MH-1234",
    },
    serviceCost: 4500.0,
    status: "Scheduled",
    notes:
      "Post-op alignment verification sequence. Requires ortho coordinator attendance on-site.",
  },
];
