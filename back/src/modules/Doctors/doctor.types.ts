export type DoctorStatus = "Inactive" | "Active";

export type DoctorListResponse = {
  doctors: Doctor[];
  totalDoctors: number;
  currentPage: number;
  totalPages: number;
};

export interface Doctor {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  phone: string;
  specialty: string;
  agreedFeePercent: string;
  status: DoctorStatus;
  partnerHospital: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDoctorDTO {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: string;
  specialty: string;
  agreedFeePercent: string;
  status: DoctorStatus;
  partnerHospital: string;
}

export interface UpdateDoctorDTO {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  gender?: string;
  specialty?: string;
  agreedFeePercent?: string;
  status?: DoctorStatus;
  partnerHospital?: string;
}
