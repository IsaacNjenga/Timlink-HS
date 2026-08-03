export type PatientStatus =
  | "New Lead"
  | "Under Review"
  | "Matched"
  | "Scheduled"
  | "Completed"
  | "Closed";
export type PatientGender = "MALE" | "FEMALE" | "OTHER";
export type ReferralType =
  | "walk-in"
  | "referral doctor"
  | "website"
  | "other"
  | "social media";

export type PatientListResponse = {
  patients: Patient[];
  totalPatients: number;
  currentPage: number;
  totalPages: number;
};

export interface NextOfKin {
  name: string;
  relation: string;
  contact: string;
  email?: string;
}

export interface Patient {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  gender?: PatientGender;
  phone: string;
  dateOfBirth: Date;
  address: string;
  nextOfKin: NextOfKin[];
  referralType: ReferralType;
  referringDoctor?: string;
  diagnosis: string;
  paymentMode: string;
  status: PatientStatus;
  notes: string;
  dateOfRegistration: Date;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePatientDTO {
  firstname: string;
  lastname: string;
  email: string;
  gender?: PatientGender;
  phone: string;
  dateOfBirth: Date;
  address: string;
  nextOfKin: NextOfKin | NextOfKin[];
  referralType: ReferralType;
  referringDoctor?: string;
  diagnosis: string;
  paymentMode: string;
  status: PatientStatus;
  notes: string;
  dateOfRegistration: Date;
}

export interface UpdatePatientDTO {
  firstname?: string;
  lastname?: string;
  email?: string;
  gender?: PatientGender;
  phone?: string;
  dateOfBirth?: Date;
  address?: string;
  nextOfKin?: NextOfKin | NextOfKin[];
  referralType?: ReferralType;
  referringDoctor?: string;
  diagnosis?: string;
  paymentMode?: string;
  status?: PatientStatus;
  notes?: string;
  dateOfRegistration?: Date;
}
