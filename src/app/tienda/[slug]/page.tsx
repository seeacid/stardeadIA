'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { getProductBySlug, getRelatedProducts } from '@/lib/products';
import { useCart } from '@/context/CartContext';
import { formatPrice, getDiscountPercentage, cn } from '@/lib/utils';
import ProductCard from '@/components/product/ProductCard';
import { type Metadata } from 'next';
import { type ProductVariant } from '@/types';

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

export default function ProductDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    const product = getProductBySlug(slug);

    const { addItem } = useCart();
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [showSizeGuide, setShowSizeGuide] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);

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

    const relatedProducts = getRelatedProducts(product, 4);
    const uniqueSizes = Array.from(new Set(product.variants.map((v) => v.size)));
    const uniqueColors = Array.from(new Set(product.variants.map((v) => v.color)));

    // Auto-select first color if only one exists
    const effectiveColor = selectedColor || (uniqueColors.length === 1 ? uniqueColors[0] : null);

    const selectedVariant: ProductVariant | undefined = product.variants.find(
        (v) => v.size === selectedSize && v.color === effectiveColor
    );

    const isVariantAvailable = selectedVariant && selectedVariant.stock > 0;
    const discount = product.compareAtPrice
        ? getDiscountPercentage(product.price, product.compareAtPrice)
        : 0;

    const handleAddToCart = () => {
        if (!selectedVariant || !isVariantAvailable) return;
        addItem(product, selectedVariant, quantity);
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    const isSizeAvailable = (size: string) =>
        product.variants.some(
            (v) => v.size === size && (!effectiveColor || v.color === effectiveColor) && v.stock > 0
        );

    const isColorAvailable = (color: string) =>
        product.variants.some(
            (v) => v.color === color && (!selectedSize || v.size === selectedSize) && v.stock > 0
        );

    return (
        <div className="pt-20 md:pt-24 pb-16 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="mb-6 text-sm text-text-muted">
                    <Link href="/" className="hover:text-text-primary transition-colors">
                        Inicio
                    </Link>
                    <span className="mx-2">/</span>
                    <Link href="/tienda" className="hover:text-text-primary transition-colors">
                        Tienda
                    </Link>
                    <span className="mx-2">/</span>
                    <span className="text-text-secondary">{product.name}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="relative aspect-square bg-surface rounded-xl overflow-hidden border border-border">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-8xl font-heading text-surface-overlay/30">𖤐</span>
                            </div>
                            {/* Badges */}
                            <div className="absolute top-4 left-4 flex flex-col gap-2">
                                {product.isNew && (
                                    <span className="px-3 py-1.5 bg-accent-cyan text-void text-xs font-bold uppercase rounded tracking-wider">
                                        Nuevo
                                    </span>
                                )}
                                {discount > 0 && (
                                    <span className="px-3 py-1.5 bg-accent-red text-white text-xs font-bold rounded">
                                        -{discount}%
                                    </span>
                                )}
                                {product.isLimitedEdition && (
                                    <span className="px-3 py-1.5 bg-accent-magenta text-white text-xs font-bold uppercase rounded tracking-wider">
                                        Edición Limitada
                                    </span>
                                )}
                            </div>
                        </div>
                        {/* Thumbnail List */}
                        <div className="grid grid-cols-4 gap-2">
                            {product.images.map((_, i) => (
                                <div
                                    key={i}
                                    className="aspect-square bg-surface-raised rounded-lg border border-border/50 flex items-center justify-center cursor-pointer hover:border-accent-violet transition-colors"
                                >
                                    <span className="text-lg text-surface-overlay/30">𖤐</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        <div>
                            <p className="text-accent-violet text-sm uppercase tracking-widest font-heading mb-2">
                                {product.category}
                            </p>
                            <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-wider uppercase">
                                {product.name}
                            </h1>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-3">
                            <span className="font-heading text-3xl font-bold text-accent-violet">
                                {formatPrice(product.price)}
                            </span>
                            {product.compareAtPrice && (
                                <span className="text-lg text-text-muted line-through">
                                    {formatPrice(product.compareAtPrice)}
                                </span>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-text-secondary leading-relaxed">{product.description}</p>

                        {/* Color Selector */}
                        {uniqueColors.length > 1 && (
                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm font-medium text-text-secondary uppercase tracking-wider">
                                        Color: <span className="text-text-primary">{effectiveColor || '—'}</span>
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    {uniqueColors.map((color) => {
                                        const available = isColorAvailable(color);
                                        return (
                                            <button
                                                key={color}
                                                onClick={() => setSelectedColor(color)}
                                                disabled={!available}
                                                className={cn(
                                                    'px-4 py-2 text-sm rounded-lg border transition-all',
                                                    effectiveColor === color
                                                        ? 'border-accent-violet bg-accent-violet/20 text-accent-violet'
                                                        : available
                                                            ? 'border-border text-text-secondary hover:border-accent-violet/50'
                                                            : 'border-border/30 text-text-muted opacity-50 cursor-not-allowed line-through'
                                                )}
                                            >
                                                {color}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Size Selector */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-sm font-medium text-text-secondary uppercase tracking-wider">
                                    Talle: <span className="text-text-primary">{selectedSize || '—'}</span>
                                </span>
                                <button
                                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                                    className="text-xs text-accent-cyan hover:text-accent-cyan/80 transition-colors underline"
                                >
                                    Guía de talles
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {uniqueSizes.map((size) => {
                                    const available = isSizeAvailable(size);
                                    return (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            disabled={!available}
                                            className={cn(
                                                'min-w-[48px] px-4 py-2.5 text-sm rounded-lg border transition-all font-medium',
                                                selectedSize === size
                                                    ? 'border-accent-violet bg-accent-violet/20 text-accent-violet scale-105'
                                                    : available
                                                        ? 'border-border text-text-secondary hover:border-accent-violet/50 hover:scale-105'
                                                        : 'border-border/30 text-text-muted opacity-50 cursor-not-allowed line-through'
                                            )}
                                        >
                                            {size}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Size Guide Modal */}
                        {showSizeGuide && (
                            <div className="p-4 bg-surface rounded-lg border border-border">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="font-heading text-sm uppercase tracking-wider">Guía de talles</h3>
                                    <button
                                        onClick={() => setShowSizeGuide(false)}
                                        className="text-text-muted hover:text-text-primary"
                                    >
                                        ✕
                                    </button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="border-b border-border">
                                                <th className="p-2 text-left text-text-muted">Talle</th>
                                                <th className="p-2 text-center text-text-muted">Pecho (cm)</th>
                                                <th className="p-2 text-center text-text-muted">Largo (cm)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {[
                                                { s: 'S', p: '50', l: '70' },
                                                { s: 'M', p: '53', l: '72' },
                                                { s: 'L', p: '56', l: '74' },
                                                { s: 'XL', p: '59', l: '76' },
                                            ].map((row) => (
                                                <tr key={row.s} className="border-b border-border/30">
                                                    <td className="p-2 font-medium">{row.s}</td>
                                                    <td className="p-2 text-center text-text-secondary">{row.p}</td>
                                                    <td className="p-2 text-center text-text-secondary">{row.l}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Quantity + Add to Cart */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="flex items-center border border-border rounded-lg">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="px-4 py-3 text-text-secondary hover:text-text-primary transition-colors"
                                >
                                    −
                                </button>
                                <span className="px-4 py-3 min-w-[48px] text-center font-medium">{quantity}</span>
                                <button
                                    onClick={() =>
                                        setQuantity(Math.min(selectedVariant?.stock || 10, quantity + 1))
                                    }
                                    className="px-4 py-3 text-text-secondary hover:text-text-primary transition-colors"
                                >
                                    +
                                </button>
                            </div>
                            <button
                                onClick={handleAddToCart}
                                disabled={!selectedSize || !isVariantAvailable}
                                className={cn(
                                    'flex-1 py-3.5 px-8 rounded-lg font-medium uppercase tracking-wider text-sm transition-all',
                                    addedToCart
                                        ? 'bg-green-600 text-white'
                                        : selectedSize && isVariantAvailable
                                            ? 'bg-accent-violet hover:bg-accent-violet-light text-white glow-violet hover:scale-[1.02] active:scale-[0.98]'
                                            : 'bg-surface-raised text-text-muted cursor-not-allowed'
                                )}
                            >
                                {addedToCart
                                    ? '✓ Agregado al carrito'
                                    : !selectedSize
                                        ? 'Seleccioná un talle'
                                        : !isVariantAvailable
                                            ? 'Sin stock'
                                            : 'Agregar al carrito'}
                            </button>
                        </div>

                        {/* Stock Info */}
                        {selectedVariant && selectedVariant.stock <= 5 && selectedVariant.stock > 0 && (
                            <p className="text-accent-red text-sm flex items-center gap-1">
                                <span className="w-2 h-2 rounded-full bg-accent-red animate-glow-pulse inline-block" />
                                ¡Solo quedan {selectedVariant.stock} unidades!
                            </p>
                        )}

                        {/* Details */}
                        <div className="space-y-4 pt-6 border-t border-border">
                            {product.composition && (
                                <div>
                                    <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-1">
                                        Composición
                                    </h3>
                                    <p className="text-text-primary text-sm">{product.composition}</p>
                                </div>
                            )}
                            {product.care && product.care.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-medium text-text-secondary uppercase tracking-wider mb-1">
                                        Cuidados
                                    </h3>
                                    <ul className="text-text-secondary text-sm space-y-1">
                                        {product.care.map((c, i) => (
                                            <li key={i} className="flex items-center gap-2">
                                                <span className="w-1 h-1 rounded-full bg-accent-violet" />
                                                {c}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <section className="mt-20">
                        <h2 className="font-heading text-2xl font-bold tracking-wider uppercase mb-8">
                            También te puede gustar
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                            {relatedProducts.map((p, i) => (
                                <ProductCard key={p.id} product={p} index={i} />
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}
