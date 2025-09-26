import { apiClient as api } from '@/api/ApiClient';
import type { Product, ProductRequest } from '@/types/product';

export const productService = {

    async create(userData: ProductRequest): Promise<Product[]> {

        const response = await api.post<Product[]>('/products', userData);
        console.log('API Response:', response);
        
        return response.data;
    },

    async fetchAll(): Promise<Product[]> {

        const response = await api.get('/products');
        console.log('API de:', response);

        return response.data.data;
    }
};
