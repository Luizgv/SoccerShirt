import axios from 'axios';
import { Product, PageResponse, ProductFilters } from '../types/Product';

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

// Interceptador para logs de requisições
api.interceptors.request.use(
  (config) => {
    console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('API Request Error:', error);
    return Promise.reject(error);
  }
);

// Interceptador para logs de respostas
api.interceptors.response.use(
  (response) => {
    console.log(`API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('API Response Error:', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

export const productService = {
  // Buscar todos os produtos com paginação
  getProducts: async (filters: ProductFilters = {}): Promise<PageResponse<Product>> => {
    const params = new URLSearchParams();
    
    if (filters.page !== undefined) params.append('page', filters.page.toString());
    if (filters.size !== undefined) params.append('size', filters.size.toString());
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    if (filters.sortDir) params.append('sortDir', filters.sortDir);
    
    const response = await api.get<PageResponse<Product>>(`/products?${params}`);
    return response.data;
  },

  // Buscar produto por ID
  getProductById: async (id: number): Promise<Product> => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },

  // Buscar produtos por categoria
  getProductsByCategory: async (category: string, filters: ProductFilters = {}): Promise<PageResponse<Product>> => {
    const params = new URLSearchParams();
    
    if (filters.page !== undefined) params.append('page', filters.page.toString());
    if (filters.size !== undefined) params.append('size', filters.size.toString());
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    if (filters.sortDir) params.append('sortDir', filters.sortDir);
    
    const response = await api.get<PageResponse<Product>>(`/products/category/${category}?${params}`);
    return response.data;
  },

  // Buscar produtos por time
  getProductsByTeam: async (team: string, filters: ProductFilters = {}): Promise<PageResponse<Product>> => {
    const params = new URLSearchParams();
    
    if (filters.page !== undefined) params.append('page', filters.page.toString());
    if (filters.size !== undefined) params.append('size', filters.size.toString());
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    if (filters.sortDir) params.append('sortDir', filters.sortDir);
    
    const response = await api.get<PageResponse<Product>>(`/products/team/${encodeURIComponent(team)}?${params}`);
    return response.data;
  },

  // Buscar produtos com filtros
  searchProducts: async (filters: ProductFilters): Promise<PageResponse<Product>> => {
    const params = new URLSearchParams();
    
    if (filters.team) params.append('team', filters.team);
    if (filters.league) params.append('league', filters.league);
    if (filters.category) params.append('category', filters.category);
    if (filters.name) params.append('name', filters.name);
    if (filters.page !== undefined) params.append('page', filters.page.toString());
    if (filters.size !== undefined) params.append('size', filters.size.toString());
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    if (filters.sortDir) params.append('sortDir', filters.sortDir);
    
    const response = await api.get<PageResponse<Product>>(`/products/search?${params}`);
    return response.data;
  },

  // Buscar catálogo completo
  getCatalog: async (): Promise<Product[]> => {
    const response = await api.get<Product[]>('/products/catalog');
    return response.data;
  }
};

export default api;
