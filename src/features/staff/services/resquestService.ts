import { apiClient as api } from "@/api/ApiClient";
import type { Request, RequestForm } from "@/types/request";

export const requestService = {

  async create(userData: RequestForm): Promise<Request> {

    const response = await api.post<Request>('/requests', userData);
    console.log('API Response:', response);
    
    return response.data;
  },

  async update(id: number, userData: Partial<RequestForm>): Promise<Request> {

    const response = await api.put<Request>(`/requests/${id}`, userData);
    console.log('API Response:', response);
    
    return response.data;
  },

  async fetchAll(): Promise<Request[]> {

    const {data} = await api.get('/requests');
    console.log('API de:', data.data);

    return data.data;
  },

  async delete(id: number): Promise<void> {

    await api.delete(`/requests/${id}`);
  }
};