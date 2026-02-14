import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    const BASE_URL = 'https://stardead-clothes.vercel.app'; // Replace with actual domain

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/',
        },
        sitemap: `${BASE_URL}/sitemap.xml`,
    };
}
