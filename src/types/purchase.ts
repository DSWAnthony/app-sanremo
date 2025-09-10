import type { Product } from "./product";

export interface PurchaseOrder {
  id: string;
  code: string; // OC-2025-0007
  requestIds: string[]; // Multiple request IDs
  supplierId: string;
  supplierName: string;
  supplierContact?: string;
  details: OrderDetail[];
  totalAmount?: number;
  status: 'draft' | 'pending' | 'sent' | 'received' | 'completed';
  paymentTerms?: string;
  deliveryDate?: Date;
  notes?: string;
  createdAt: Date;
  createdBy: string; // Admin user ID
  updatedAt: Date;
}

export interface OrderDetail {
  id: string;
  orderId: string;
  requestDetailId: string; // Links back to the original request detail
  product: Product;
  quantityOrdered: number;
  unitPrice?: number;
  subtotal?: number;
  notes?: string;
}

export const PURCHASE_ORDER_STATUSES = {
  pending: 'Pendiente',
  sent: 'Enviada',
  received: 'Recibida'
} as const;