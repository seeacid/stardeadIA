'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { type Product } from '@/types';
import { Button } from '@/components/ui/Button';
import { formatPrice, getDiscountPercentage, getTotalStock } from '@/lib/utils';

interface ProductCardProps {
    product: Product;
    index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
    const totalStock = getTotalStock(product);
    const isLowStock = totalStock > 0 && totalStock <= 5;
    const discount = product.compareAtPrice
        ? getDiscountPercentage(product.price, product.compareAtPrice)
        : 0;

    return (
        <Link
            href={`/tienda/${product.slug}`}
            className="group block card-3d"
            style={{
                animationDelay: `${index * 100}ms`,
            }}
        >
            <div className="card-3d-inner h-full">
                <div className="relative overflow-hidden rounded-xl bg-surface border border-border/50 hover:border-accent-violet/50 transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] h-full flex flex-col group-hover:scale-[1.02]">
                    {/* Image Container */}
                    <div className="relative aspect-[3/4] bg-surface-raised overflow-hidden">
                        {/* Placeholder / Image */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <span className="text-6xl font-heading font-bold text-surface-overlay/50 group-hover:text-accent-violet/30 transition-colors duration-500">
                                    𖤐
                                </span>
                                <p className="text-xs text-text-muted mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {product.name}
                                </p>
                            </div>
                        </div>

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-void/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* Badges */}
                        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                            {product.isNew && (
                                <span className="px-2.5 py-1 bg-accent-cyan text-void text-xs font-bold uppercase rounded tracking-wider">
                                    Nuevo
                                </span>
                            )}
                            {discount > 0 && (
                                <span className="px-2.5 py-1 bg-accent-red text-white text-xs font-bold rounded">
                                    -{discount}%
                                </span>
                            )}
                            {product.isLimitedEdition && (
                                <span className="px-2.5 py-1 bg-accent-magenta text-white text-xs font-bold uppercase rounded tracking-wider">
                                    Limitada
                                </span>
                            )}
                            {product.tags.includes('trending') && (
                                <span className="px-2.5 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold uppercase rounded tracking-wider flex items-center gap-1">
                                    <span className="animate-pulse">🔥</span> Trending
                                </span>
                            )}
                        </div>

                        {/* Low Stock Indicator */}
                        {isLowStock && (
                            <div className="absolute top-3 right-3">
                                <span className="px-2.5 py-1 bg-void/80 text-accent-red text-xs font-medium rounded border border-accent-red/30">
                                    ¡Últimas unidades!
                                </span>
                            </div>
                        )}

                        {/* Quick View Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <Button
                                className="w-full bg-accent-violet/90 hover:bg-accent-violet backdrop-blur-sm"
                            >
                                Ver producto →
                            </Button>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                        <h3 className="font-medium text-sm text-text-primary group-hover:text-accent-violet-light transition-colors truncate">
                            {product.name}
                        </h3>
                        <p className="text-xs text-text-muted mt-1 capitalize">{product.category}</p>
                        <div className="flex items-center gap-2 mt-2">
                            <span className="font-heading font-bold text-lg">
                                {formatPrice(product.price)}
                            </span>
                            {product.compareAtPrice && (
                                <span className="text-sm text-text-muted line-through">
                                    {formatPrice(product.compareAtPrice)}
                                </span>
                            )}
                        </div>

                        {/* Available Sizes Preview */}
                        <div className="flex gap-1.5 mt-3">
                            {Array.from(new Set(product.variants.map((v) => v.size))).map((size) => {
                                const variant = product.variants.find((v) => v.size === size);
                                const hasStock = variant && variant.stock > 0;
                                return (
                                    <span
                                        key={size}
                                        className={cn(
                                            'px-2 py-0.5 text-xs rounded border transition-colors',
                                            hasStock
                                                ? 'border-border text-text-secondary'
                                                : 'border-border/30 text-text-muted line-through opacity-50'
                                        )}
                                    >
                                        {size}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
