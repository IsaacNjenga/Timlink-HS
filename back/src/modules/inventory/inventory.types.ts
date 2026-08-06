export type InventoryStatus = "Available" | "In Service" | "Maintenance";

export type InventoryListResponse = {
  inventory: Inventory[];
  totalInventory: number;
  currentPage: number;
  totalPages: number;
};

export interface Inventory {
  _id: string;
  equipmentName: string;
  category: string;
  serialModel?: string;
  vehiclePlate?: string;
  location?: string;
  status: InventoryStatus;
  rate: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateInventoryDTO {
  equipmentName: string;
  category: string;
  serialModel?: string;
  vehiclePlate?: string;
  location?: string;
  status: InventoryStatus;
  rate: number;
  notes?: string;
}

export interface UpdateInventoryDTO {
  equipmentName: string;
  category: string;
  serialModel?: string;
  vehiclePlate?: string;
  location?: string;
  status: InventoryStatus;
  rate: number;
  notes?: string;
}
