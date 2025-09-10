
export type RequestItem = {
  productId: string
  productName: string
  unit: string
  quantity: number
  observations?: string
}

export type CreateRequest = {
  userId: string
  items: RequestItem[]
  observations?: string
}

export const REQUEST_STATUSES = {
  pending: 'Pendiente',
  approved: 'Aprobada',
  rejected: 'Rechazada',
  assigned: 'Asignada'
} as const;