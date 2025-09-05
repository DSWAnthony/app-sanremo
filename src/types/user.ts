export type UserRole = "admin" | "warehouse";

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  createdAt: Date;
}

export interface ProductRequest {
  id: string;
  productName: string;
  quantity: number;
  unit: string;
  observations?: string;
  requestedBy: string; // User ID
  requestedByName: string; // User name for display
  status: 'pending' | 'approved' | 'rejected' | 'assigned';
  createdAt: Date;
  updatedAt: Date;
  assignedSupplier?: string; // Supplier ID when assigned
}


// Status options for filtering and display
export const REQUEST_STATUSES = {
  pending: 'Pendiente',
  approved: 'Aprobada',
  rejected: 'Rechazada',
  assigned: 'Asignada'
} as const;

export const PURCHASE_ORDER_STATUSES = {
  pending: 'Pendiente',
  sent: 'Enviada',
  received: 'Recibida'
} as const;