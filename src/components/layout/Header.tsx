'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { cn } from '@/lib/utils';

const navLinks = [
    { href: '/', label: 'Inicio' },
    { href: '/tienda', label: 'Tienda' },
    { href: '/galeria', label: 'Galería' },
    { href: '/nosotros', label: 'Nosotros' },
    { href: '/contacto', label: 'Contacto' },
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const pathname = usePathname();
    const { itemCount, items, subtotal, removeItem, updateQuantity } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsCartOpen(false);
    }, [pathname]);

    // Lock body scroll when mobile menu or cart is open
    useEffect(() => {
        if (isMobileMenuOpen || isCartOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isMobileMenuOpen, isCartOpen]);

    const formatPrice = (price: number) =>
        new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS',
            minimumFractionDigits: 0,
        }).format(price);

    return (
        <>
            <header
                className={cn(
                    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                    isScrolled
                        ? 'glass-strong shadow-lg shadow-black/20'
                        : 'bg-transparent'
                )}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 md:h-20">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="flex items-center gap-2 group"
                            aria-label="Stardead Clothes - Inicio"
                        >
                            <span className="text-xl md:text-2xl font-heading font-bold tracking-wider text-gradient group-hover:opacity-80 transition-opacity">
                                𖤐 STARDEAD
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-8" aria-label="Navegación principal">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        'text-sm uppercase tracking-widest font-medium transition-colors duration-200 relative',
                                        pathname === link.href
                                            ? 'text-accent-violet'
                                            : 'text-text-secondary hover:text-text-primary'
                                    )}
                                >
                                    {link.label}
                                    {pathname === link.href && (
                                        <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-brand rounded-full" />
                                    )}
                                </Link>
                            ))}
                        </nav>

                        {/* Right Actions */}
                        <div className="flex items-center gap-3">
                            {/* Cart Button */}
                            <button
                                onClick={() => setIsCartOpen(!isCartOpen)}
                                className="relative p-2 hover:bg-surface-raised rounded-lg transition-colors"
                                aria-label={`Carrito (${itemCount} items)`}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                                    <line x1="3" y1="6" x2="21" y2="6" />
                                    <path d="M16 10a4 4 0 01-8 0" />
                                </svg>
                                {itemCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent-violet text-white text-xs font-bold rounded-full flex items-center justify-center animate-fade-in">
                                        {itemCount}
                                    </span>
                                )}
                            </button>

                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="md:hidden p-2 hover:bg-surface-raised rounded-lg transition-colors"
                                aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
                                aria-expanded={isMobileMenuOpen}
                            >
                                <div className="w-6 h-5 flex flex-col justify-between">
                                    <span
                                        className={cn(
                                            'block h-0.5 bg-current rounded transition-all duration-300 origin-center',
                                            isMobileMenuOpen && 'rotate-45 translate-y-2'
                                        )}
                                    />
                                    <span
                                        className={cn(
                                            'block h-0.5 bg-current rounded transition-all duration-300',
                                            isMobileMenuOpen && 'opacity-0 scale-0'
                                        )}
                                    />
                                    <span
                                        className={cn(
                                            'block h-0.5 bg-current rounded transition-all duration-300 origin-center',
                                            isMobileMenuOpen && '-rotate-45 -translate-y-2'
                                        )}
                                    />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 md:hidden animate-fade-in">
                    <div
                        className="absolute inset-0 bg-black/60"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                    <nav className="absolute top-16 left-0 right-0 bg-surface border-b border-border p-6 animate-slide-up">
                        <div className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={cn(
                                        'text-lg uppercase tracking-widest font-medium py-2 transition-colors',
                                        pathname === link.href
                                            ? 'text-accent-violet'
                                            : 'text-text-secondary hover:text-text-primary'
                                    )}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </nav>
                </div>
            )}

            {/* Cart Drawer */}
            {isCartOpen && (
                <div className="fixed inset-0 z-50">
                    <div
                        className="absolute inset-0 bg-black/60 animate-fade-in"
                        onClick={() => setIsCartOpen(false)}
                    />
                    <div className="absolute top-0 right-0 bottom-0 w-full max-w-md glass-strong animate-slide-in-right overflow-y-auto">
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="font-heading text-lg tracking-wider uppercase">
                                    Carrito ({itemCount})
                                </h2>
                                <button
                                    onClick={() => setIsCartOpen(false)}
                                    className="p-2 hover:bg-surface-raised rounded-lg transition-colors"
                                    aria-label="Cerrar carrito"
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>
                            </div>

                            {items.length === 0 ? (
                                <div className="text-center py-12">
                                    <div className="text-4xl mb-4">𖤐</div>
                                    <p className="text-text-secondary mb-4">Tu carrito está vacío</p>
                                    <Link
                                        href="/tienda"
                                        onClick={() => setIsCartOpen(false)}
                                        className="inline-block px-6 py-3 bg-accent-violet hover:bg-accent-violet-light text-white rounded-lg transition-colors font-medium"
                                    >
                                        Explorar tienda
                                    </Link>
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-4 mb-6">
                                        {items.map((item) => (
                                            <div
                                                key={`${item.product.id}-${item.variant.sku}`}
                                                className="flex gap-4 p-3 bg-surface rounded-lg"
                                            >
                                                <div className="w-20 h-20 bg-surface-raised rounded-md flex items-center justify-center text-text-muted text-xs">
                                                    {item.product.name.charAt(0)}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <h3 className="text-sm font-medium truncate">{item.product.name}</h3>
                                                    <p className="text-xs text-text-muted mt-0.5">
                                                        {item.variant.size} / {item.variant.color}
                                                    </p>
                                                    <p className="text-sm font-semibold text-accent-violet mt-1">
                                                        {formatPrice(item.product.price)}
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <button
                                                            onClick={() => updateQuantity(item.product.id, item.variant.sku, item.quantity - 1)}
                                                            className="w-6 h-6 flex items-center justify-center bg-surface-raised hover:bg-surface-overlay rounded text-xs transition-colors"
                                                            aria-label="Reducir cantidad"
                                                        >
                                                            −
                                                        </button>
                                                        <span className="text-sm w-6 text-center">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.product.id, item.variant.sku, item.quantity + 1)}
                                                            className="w-6 h-6 flex items-center justify-center bg-surface-raised hover:bg-surface-overlay rounded text-xs transition-colors"
                                                            aria-label="Aumentar cantidad"
                                                            disabled={item.quantity >= item.variant.stock}
                                                        >
                                                            +
                                                        </button>
                                                        <button
                                                            onClick={() => removeItem(item.product.id, item.variant.sku)}
                                                            className="ml-auto text-text-muted hover:text-accent-red transition-colors"
                                                            aria-label="Eliminar producto"
                                                        >
                                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                                <polyline points="3,6 5,6 21,6" />
                                                                <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="border-t border-border pt-4">
                                        <div className="flex justify-between items-center mb-4">
                                            <span className="text-text-secondary">Subtotal</span>
                                            <span className="font-heading font-bold text-lg">{formatPrice(subtotal)}</span>
                                        </div>
                                        <Link
                                            href="/checkout"
                                            onClick={() => setIsCartOpen(false)}
                                            className="block w-full text-center px-6 py-3 bg-accent-violet hover:bg-accent-violet-light text-white rounded-lg transition-colors font-medium uppercase tracking-wider"
                                        >
                                            Finalizar compra
                                        </Link>
                                        <button
                                            onClick={() => setIsCartOpen(false)}
                                            className="block w-full text-center mt-3 px-6 py-2 text-text-secondary hover:text-text-primary transition-colors text-sm"
                                        >
                                            Seguir comprando
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
