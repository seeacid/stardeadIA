import productsData from '@/data/products.json';
import { type Product } from '@/types';

const products: Product[] = productsData as Product[];

export function getProducts(): Product[] {
    return products;
}

export function getProductBySlug(slug: string): Product | undefined {
    return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
    return products.find((p) => p.id === id);
}

export function getFeaturedProducts(): Product[] {
    return products.filter((p) => p.featured);
}

export function getNewProducts(): Product[] {
    return products.filter((p) => p.isNew);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
    return products
        .filter(
            (p) =>
                p.id !== product.id &&
                (p.category === product.category ||
                    p.tags.some((t) => product.tags.includes(t)))
        )
        .slice(0, limit);
}

export function getProductsByCategory(category: string): Product[] {
    return products.filter((p) => p.category === category);
}

export function getAllSlugs(): string[] {
    return products.map((p) => p.slug);
}
