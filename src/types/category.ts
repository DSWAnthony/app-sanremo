
export type Category = {
  id: number;
  name: string;
  description?: string;
  createdAt: Date;
}

export type CategoryRequest = {
  name: string;
  description?: string;
}