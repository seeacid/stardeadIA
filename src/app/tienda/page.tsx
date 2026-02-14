'use client';

import { useState, useMemo } from 'react';
import ProductCard from '@/components/product/ProductCard';
import { getProducts } from '@/lib/products';
import { filterProducts, getAllCategories, getAllSizes, getAllColors, formatPrice } from '@/lib/utils';
import { type ProductFilters } from '@/types';
import { cn } from '@/lib/utils';

const CATEGORIES_LABELS: Record<string, string> = {
    remeras: 'Remeras',
    buzos: 'Buzos & Hoodies',
    pantalones: 'Pantalones',
    camperas: 'Camperas',
    accesorios: 'Accesorios',
};

const SORT_OPTIONS = [
    { value: 'relevance', label: 'Relevancia' },
    { value: 'price-asc', label: 'Precio: menor a mayor' },
    { value: 'price-desc', label: 'Precio: mayor a menor' },
    { value: 'newest', label: 'Más nuevos' },
] as const;

export default function TiendaPage() {
    const allProducts = getProducts();
    const categories = getAllCategories(allProducts);
    const sizes = getAllSizes(allProducts);
    const colors = getAllColors(allProducts);

    const [filters, setFilters] = useState<ProductFilters>({});
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [search, setSearch] = useState('');

    const activeFilters: ProductFilters = {
        ...filters,
        search: search || undefined,
    };

    const filteredProducts = useMemo(
        () => filterProducts(allProducts, activeFilters),
        [allProducts, activeFilters]
    );

    const toggleSize = (size: string) => {
        setFilters((prev) => {
            const current = prev.sizes || [];
            return {
                ...prev,
                sizes: current.includes(size)
                    ? current.filter((s) => s !== size)
                    : [...current, size],
            };
        });
    };

    const toggleColor = (color: string) => {
        setFilters((prev) => {
            const current = prev.colors || [];
            return {
                ...prev,
                colors: current.includes(color)
                    ? current.filter((c) => c !== color)
                    : [...current, color],
            };
        });
    };

    const clearFilters = () => {
        setFilters({});
        setSearch('');
    };

    const hasActiveFilters = filters.category || (filters.sizes && filters.sizes.length > 0) || (filters.colors && filters.colors.length > 0) || filters.sortBy || search;

    return (
        <div className="pt-24 md:pt-32 pb-16 min-h-screen">
            {/* Page Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-wider uppercase text-gradient">
                    Tienda
                </h1>
                <p className="text-text-secondary mt-2">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'producto' : 'productos'}
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Search & Controls Bar */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    {/* Search */}
                    <div className="relative flex-1">
                        <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
                        >
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-surface border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-violet transition-colors"
                        />
                    </div>

                    {/* Sort */}
                    <select
                        value={filters.sortBy || 'relevance'}
                        onChange={(e) =>
                            setFilters((prev) => ({
                                ...prev,
                                sortBy: e.target.value as ProductFilters['sortBy'],
                            }))
                        }
                        className="px-4 py-3 bg-surface border border-border rounded-lg text-text-primary focus:outline-none focus:border-accent-violet transition-colors cursor-pointer appearance-none"
                    >
                        {SORT_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>

                    {/* Filter Toggle (Mobile) */}
                    <button
                        onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                        className="lg:hidden px-4 py-3 bg-surface border border-border rounded-lg text-text-primary hover:border-accent-violet transition-colors flex items-center gap-2"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="4" y1="21" x2="4" y2="14" />
                            <line x1="4" y1="10" x2="4" y2="3" />
                            <line x1="12" y1="21" x2="12" y2="12" />
                            <line x1="12" y1="8" x2="12" y2="3" />
                            <line x1="20" y1="21" x2="20" y2="16" />
                            <line x1="20" y1="12" x2="20" y2="3" />
                            <line x1="1" y1="14" x2="7" y2="14" />
                            <line x1="9" y1="8" x2="15" y2="8" />
                            <line x1="17" y1="16" x2="23" y2="16" />
                        </svg>
                        Filtros
                    </button>
                </div>

                <div className="flex gap-8">
                    {/* Sidebar Filters */}
                    <aside
                        className={cn(
                            'w-64 flex-shrink-0 transition-all duration-300',
                            isFiltersOpen
                                ? 'fixed inset-0 z-40 lg:relative lg:inset-auto'
                                : 'hidden lg:block'
                        )}
                    >
                        {isFiltersOpen && (
                            <div
                                className="fixed inset-0 bg-black/60 lg:hidden"
                                onClick={() => setIsFiltersOpen(false)}
                            />
                        )}
                        <div
                            className={cn(
                                'bg-surface border border-border rounded-xl p-6 space-y-6',
                                isFiltersOpen &&
                                'fixed top-0 left-0 bottom-0 w-72 z-50 rounded-none overflow-y-auto lg:relative lg:w-64 lg:rounded-xl'
                            )}
                        >
                            {/* Mobile Close */}
                            <div className="flex items-center justify-between lg:hidden">
                                <h3 className="font-heading text-sm tracking-wider uppercase">Filtros</h3>
                                <button
                                    onClick={() => setIsFiltersOpen(false)}
                                    className="p-1 hover:bg-surface-raised rounded"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>
                            </div>

                            {/* Categories */}
                            <div>
                                <h3 className="font-heading text-xs tracking-wider uppercase text-text-secondary mb-3">
                                    Categorías
                                </h3>
                                <div className="space-y-2">
                                    <button
                                        onClick={() => setFilters((prev) => ({ ...prev, category: undefined }))}
                                        className={cn(
                                            'block w-full text-left text-sm py-1.5 px-3 rounded transition-colors',
                                            !filters.category
                                                ? 'bg-accent-violet/20 text-accent-violet'
                                                : 'text-text-secondary hover:text-text-primary hover:bg-surface-raised'
                                        )}
                                    >
                                        Todas
                                    </button>
                                    {categories.map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => setFilters((prev) => ({ ...prev, category: cat }))}
                                            className={cn(
                                                'block w-full text-left text-sm py-1.5 px-3 rounded transition-colors',
                                                filters.category === cat
                                                    ? 'bg-accent-violet/20 text-accent-violet'
                                                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-raised'
                                            )}
                                        >
                                            {CATEGORIES_LABELS[cat] || cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Sizes */}
                            <div>
                                <h3 className="font-heading text-xs tracking-wider uppercase text-text-secondary mb-3">
                                    Talles
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => toggleSize(size)}
                                            className={cn(
                                                'px-3 py-1.5 text-xs rounded-md border transition-colors',
                                                filters.sizes?.includes(size)
                                                    ? 'border-accent-violet bg-accent-violet/20 text-accent-violet'
                                                    : 'border-border text-text-secondary hover:border-accent-violet/50'
                                            )}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Colors */}
                            <div>
                                <h3 className="font-heading text-xs tracking-wider uppercase text-text-secondary mb-3">
                                    Colores
                                </h3>
                                <div className="space-y-2">
                                    {colors.map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => toggleColor(color)}
                                            className={cn(
                                                'block w-full text-left text-sm py-1.5 px-3 rounded transition-colors',
                                                filters.colors?.includes(color)
                                                    ? 'bg-accent-violet/20 text-accent-violet'
                                                    : 'text-text-secondary hover:text-text-primary hover:bg-surface-raised'
                                            )}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Clear Filters */}
                            {hasActiveFilters && (
                                <button
                                    onClick={clearFilters}
                                    className="w-full py-2 text-sm text-accent-red hover:text-accent-red/80 transition-colors border border-accent-red/30 rounded-lg"
                                >
                                    Limpiar filtros
                                </button>
                            )}
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="flex-1">
                        {filteredProducts.length === 0 ? (
                            <div className="text-center py-20">
                                <div className="text-6xl mb-4">𖤐</div>
                                <h3 className="font-heading text-xl mb-2">No encontramos productos</h3>
                                <p className="text-text-secondary mb-4">
                                    Probá ajustar los filtros o buscar algo diferente.
                                </p>
                                <button
                                    onClick={clearFilters}
                                    className="px-6 py-2 bg-accent-violet hover:bg-accent-violet-light text-white rounded-lg transition-colors text-sm"
                                >
                                    Limpiar filtros
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                                {filteredProducts.map((product, i) => (
                                    <ProductCard key={product.id} product={product} index={i} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
