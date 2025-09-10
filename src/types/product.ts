export type Product = {
  id: string;
  name: string;
  description?: string;
  unit: string;
  category?: string;
  inStock: boolean;
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