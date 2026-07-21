export type PatientStatus =
  | "New Lead"
  | "Under Review"
  | "Matched"
  | "Scheduled"
  | "Completed"
  | "Closed";
export type PatientGender = "MALE" | "FEMALE" | "OTHER";
export type ReferralType = "walk-in" | "referral doctor" | "website" | "other";

export interface Patient {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  gender?: PatientGender;
  phone: string;
  dateOfBirth: Date;
  address: string;
  nextOfKin: string;
  referralType: ReferralType;
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
  nextOfKin: string;
  referralType: ReferralType;
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
  nextOfKin?: string;
  referralType?: ReferralType;
  diagnosis?: string;
  paymentMode?: string;
  status?: PatientStatus;
  notes?: string;
  dateOfRegistration?: Date;
}
