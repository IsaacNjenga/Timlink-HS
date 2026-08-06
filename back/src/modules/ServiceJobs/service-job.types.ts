export type ServiceJobStatus = "Completed" | "Scheduled" | "Cancelled";

export type ServiceJobListResponse = {
  serviceJobs: ServiceJob[];
  totalServiceJobs: number;
  currentPage: number;
  totalPages: number;
};

export interface ServiceJob {
  _id: string;
  serviceType: string;
  clientType: string;
  patient?: string;
  externalPatient?: string;
  facilityLocation: string;
  serviceDate: string;
  equipment: string;
  serviceCost: number;
  status: ServiceJobStatus;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateServiceJobDTO {
  serviceType: string;
  clientType: string;
  patient?: string;
  externalPatient?: string;
  facilityLocation: string;
  serviceDate: string;
  equipment: string;
  serviceCost: number;
  status: ServiceJobStatus;
  notes?: string;
}

export interface UpdateServiceJobDTO {
  serviceType: string;
  clientType: string;
  patient?: string;
  externalPatient?: string;
  facilityLocation: string;
  serviceDate: string;
  equipment: string;
  serviceCost: number;
  status: ServiceJobStatus;
  notes?: string;
}
