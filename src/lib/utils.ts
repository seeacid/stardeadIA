import { type Product, type ProductFilters } from '@/types';

export function formatPrice(price: number): string {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
}

export function getDiscountPercentage(price: number, compareAtPrice: number): number {
    return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
}

export function getTotalStock(product: Product): number {
    return product.variants.reduce((total, v) => total + v.stock, 0);
}

export function getAvailableSizes(product: Product): string[] {
    const sizes = new Set(product.variants.filter(v => v.stock > 0).map(v => v.size));
    return Array.from(sizes);
}

export function getAvailableColors(product: Product): string[] {
    const colors = new Set(product.variants.filter(v => v.stock > 0).map(v => v.color));
    return Array.from(colors);
}

export function filterProducts(products: Product[], filters: ProductFilters): Product[] {
    let filtered = [...products];

    if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filtered = filtered.filter(
            (p) =>
                p.name.toLowerCase().includes(searchLower) ||
                p.description.toLowerCase().includes(searchLower) ||
                p.tags.some((t) => t.toLowerCase().includes(searchLower))
        );
    }

    if (filters.category) {
        filtered = filtered.filter((p) => p.category === filters.category);
    }

    if (filters.minPrice !== undefined) {
        filtered = filtered.filter((p) => p.price >= filters.minPrice!);
    }

    if (filters.maxPrice !== undefined) {
        filtered = filtered.filter((p) => p.price <= filters.maxPrice!);
    }

    if (filters.sizes && filters.sizes.length > 0) {
        filtered = filtered.filter((p) =>
            p.variants.some((v) => filters.sizes!.includes(v.size) && v.stock > 0)
        );
    }

    if (filters.colors && filters.colors.length > 0) {
        filtered = filtered.filter((p) =>
            p.variants.some((v) => filters.colors!.includes(v.color) && v.stock > 0)
        );
    }

    if (filters.tags && filters.tags.length > 0) {
        filtered = filtered.filter((p) =>
            filters.tags!.some((t) => p.tags.includes(t))
        );
    }

    switch (filters.sortBy) {
        case 'price-asc':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            filtered.sort(
                (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
            break;
        default:
            // relevance — featured first, then newest
            filtered.sort((a, b) => {
                if (a.featured !== b.featured) return a.featured ? -1 : 1;
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            });
    }

    return filtered;
}

export function getAllCategories(products: Product[]): string[] {
    const categories = new Set(products.map((p) => p.category));
    return Array.from(categories).sort();
}

export function getAllSizes(products: Product[]): string[] {
    const sizes = new Set<string>();
    products.forEach((p) => p.variants.forEach((v) => sizes.add(v.size)));
    const sizeOrder = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'Único'];
    return Array.from(sizes).sort((a, b) => {
        const aIdx = sizeOrder.indexOf(a);
        const bIdx = sizeOrder.indexOf(b);
        if (aIdx === -1 && bIdx === -1) return a.localeCompare(b);
        if (aIdx === -1) return 1;
        if (bIdx === -1) return -1;
        return aIdx - bIdx;
    });
}

export function getAllColors(products: Product[]): string[] {
    const colors = new Set<string>();
    products.forEach((p) => p.variants.forEach((v) => colors.add(v.color)));
    return Array.from(colors).sort();
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
    return classes.filter(Boolean).join(' ');
}
