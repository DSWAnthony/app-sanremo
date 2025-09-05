export interface Supplier {
  id: string;
  name: string;
  contact: string;
  phone: string;
  email: string;
  products: string[]; // Product IDs associated with this supplier
  createdAt: Date;
}
