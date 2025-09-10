import { apiClient as api } from "@/api/ApiClient";
import type { CreateRequest, RequestItem } from "@/types/request";

export const requestService = {

  async create(userData: CreateRequest): Promise<CreateRequest> {

    const response = await api.post<CreateRequest>('/requests', userData);

    return response.data;
  },

  async fetchAll(): Promise<RequestItem[]> {

    const response = await api.get<RequestItem[]>('/requests');

    return response.data;
  }
};