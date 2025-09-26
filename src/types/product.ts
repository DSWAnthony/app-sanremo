import type { Category } from "./category";

export type Product = {
  id: number;
  name: string;
  description?: string;
  category: Category;
  unit: string;
  price: number;
  quantity: number
  createdAt: Date;
}

export type ProductForm = {
  name: string;
  description?: string;
  categoryId: number;
  unit: string;
  price: number;
  quantity: number
}

export interface ProductRequest {
  id: number;
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