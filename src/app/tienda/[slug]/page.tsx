
import Link from 'next/link';
import { getProductBySlug } from '@/lib/products';
import { type Metadata } from 'next';
import ProductDetailClient from '@/components/product/ProductDetailClient';

type Props = {
    params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const product = getProductBySlug(params.slug);

    if (!product) {
        return {
            title: 'Producto no encontrado',
        };
    }

    return {
        title: product.name,
        description: product.description.substring(0, 160),
        openGraph: {
            title: product.name,
            description: product.description.substring(0, 160),
            images: product.images.map((img) => ({ url: img })),
        },
    };
}

export default function ProductDetailPage({ params }: Props) {
    const slug = params.slug;
    const product = getProductBySlug(slug);

    if (!product) {
        return (
            <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">𖤐</div>
                    <h1 className="font-heading text-2xl mb-4">Producto no encontrado</h1>
                    <Link
                        href="/tienda"
                        className="text-accent-violet hover:text-accent-violet-light transition-colors"
                    >
                        ← Volver a la tienda
                    </Link>
                </div>
            </div>
        );
    }

    return <ProductDetailClient product={product} />;
}
