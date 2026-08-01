export type HospitalStatus = "Inactive" | "Active";

export type HospitalListResponse = {
  hospitals: Hospital[];
  totalHospitals: number;
  currentPage: number;
  totalPages: number;
};

export interface Hospital {
  _id: string;
  hospitalName: string;
  code: string;
  tier: string;
  phone: string;
  email: string;
  emergencyExt: string;
  location?: string;
  operationalCapacity: string;
  insurancePanels: string;
  status: HospitalStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateHospitalDTO {
  hospitalName: string;
  code: string;
  tier: string;
  phone: string;
  email: string;
  emergencyExt: string;
  location?: string;
  operationalCapacity?: string;
  insurancePanels?: string;
  status: HospitalStatus;
}

export interface UpdateHospitalDTO {
  hospitalName: string;
  tier: string;
  phone: string;
  email: string;
  emergencyExt: string;
  location?: string;
  operationalCapacity?: string;
  insurancePanels?: string;
  status: HospitalStatus;
}
