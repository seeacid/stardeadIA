import { MetadataRoute } from 'next';
import { getProducts } from '@/lib/products';

const BASE_URL = 'https://stardead-clothes.vercel.app'; // Replace with actual domain

export default function sitemap(): MetadataRoute.Sitemap {
    const products = getProducts();

    const productUrls = products.map((product) => ({
        url: `${BASE_URL}/tienda/${product.slug}`,
        lastModified: new Date(product.createdAt),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    return [
        {
            url: BASE_URL,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: `${BASE_URL}/tienda`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/nosotros`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${BASE_URL}/contacto`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        ...productUrls,
    ];
}
