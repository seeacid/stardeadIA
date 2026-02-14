// ============================================
// Product Types
// ============================================

export interface ProductVariant {
    size: string;
    color: string;
    stock: number;
    sku: string;
}

export interface Product {
    id: string;
    slug: string;
    name: string;
    description: string;
    price: number;
    compareAtPrice?: number;
    images: string[];
    category: string;
    subcategory?: string;
    variants: ProductVariant[];
    tags: string[];
    composition?: string;
    care?: string[];
    featured: boolean;
    isNew: boolean;
    isLimitedEdition: boolean;
    createdAt: string;
}

// ============================================
// Cart Types
// ============================================

export interface CartItem {
    product: Product;
    variant: ProductVariant;
    quantity: number;
}

export type CartAction =
    | { type: 'ADD_ITEM'; payload: { product: Product; variant: ProductVariant; quantity: number } }
    | { type: 'REMOVE_ITEM'; payload: { productId: string; sku: string } }
    | { type: 'UPDATE_QUANTITY'; payload: { productId: string; sku: string; quantity: number } }
    | { type: 'CLEAR_CART' }
    | { type: 'HYDRATE'; payload: CartItem[] };

export interface CartState {
    items: CartItem[];
    isOpen: boolean;
}

// ============================================
// Instagram Types
// ============================================

export interface InstagramPost {
    id: string;
    caption?: string;
    mediaUrl: string;
    mediaType: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
    permalink: string;
    timestamp: string;
    thumbnailUrl?: string;
}

// ============================================
// Checkout Types
// ============================================

export interface ShippingInfo {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    province: string;
    postalCode: string;
    notes?: string;
}

export interface ShippingOption {
    id: string;
    name: string;
    description: string;
    price: number;
    estimatedDays: string;
}

export interface Order {
    id: string;
    items: CartItem[];
    shipping: ShippingInfo;
    shippingOption: ShippingOption;
    subtotal: number;
    shippingCost: number;
    total: number;
    status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
    createdAt: string;
}

// ============================================
// Contact Types
// ============================================

export interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

// ============================================
// Filter/Search Types
// ============================================

export interface ProductFilters {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sizes?: string[];
    colors?: string[];
    tags?: string[];
    sortBy?: 'relevance' | 'price-asc' | 'price-desc' | 'newest';
    search?: string;
}

// ============================================
// UI Types
// ============================================

export interface ToastMessage {
    id: string;
    type: 'success' | 'error' | 'info';
    message: string;
}

export interface SizeGuideData {
    sizes: string[];
    measurements: {
        name: string;
        values: Record<string, string>;
    }[];
}
