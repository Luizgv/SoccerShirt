export enum Size {
  XS = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
  XXL = 'XXL',
  XXXL = 'XXXL'
}

export enum ProductCategory {
  HOME = 'HOME',
  AWAY = 'AWAY',
  THIRD = 'THIRD',
  GOALKEEPER = 'GOALKEEPER',
  RETRO = 'RETRO',
  TRAINING = 'TRAINING'
}

export interface ProductSize {
  size: Size;
  priceModifier: number;
  stockQuantity: number;
  isAvailable: boolean;
  finalPrice: number;
}

export interface Product {
  id: number;
  name: string;
  team: string;
  league: string;
  season: string;
  description: string;
  basePrice: number;
  availableSizes: ProductSize[];
  imageUrl?: string;
  category: ProductCategory;
  isAvailable: boolean;
}

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}

export interface ProductFilters {
  team?: string;
  league?: string;
  category?: ProductCategory;
  name?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
}
