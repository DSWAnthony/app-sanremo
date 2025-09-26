import type { Product } from "./product"

export type RequestItemForm = {
  productId: number
  productName: string
  unit: string
  quantity: number
  observations?: string
}

export type RequestForm = {
  id?: number
  userId: number
  status: string
  items: RequestItemForm[]
  observations?: string
  createdAt?: string
  updatedAt?: string
}

export type RequestItem = {
  id?: number
  product: Product
  unit: string
  quantity: number
  observations?: string
}

export type Request = {
  id: number
  userId: number
  status: string
  items: RequestItem[]
  observations?: string
  createdAt?: string
  updatedAt?: string
}

export const REQUEST_STATUSES = {
  pending: 'Pendiente',
  approved: 'Aprobada',
  rejected: 'Rechazada',
  assigned: 'Asignada'
} as const;