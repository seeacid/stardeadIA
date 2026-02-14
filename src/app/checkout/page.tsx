'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatPrice, cn } from '@/lib/utils';
import { type ShippingInfo } from '@/types';

type CheckoutStep = 'shipping' | 'payment' | 'confirmation';

const SHIPPING_OPTIONS = [
    {
        id: 'standard',
        name: 'Envío estándar',
        description: 'CABA y GBA',
        price: 3500,
        estimatedDays: '3-5 días hábiles',
    },
    {
        id: 'express',
        name: 'Envío express',
        description: 'CABA',
        price: 5500,
        estimatedDays: '24-48 hs hábiles',
    },
    {
        id: 'interior',
        name: 'Envío al interior',
        description: 'Todo el país',
        price: 6000,
        estimatedDays: '5-7 días hábiles',
    },
];

const PROVINCES = [
    'Buenos Aires', 'CABA', 'Catamarca', 'Chaco', 'Chubut', 'Córdoba',
    'Corrientes', 'Entre Ríos', 'Formosa', 'Jujuy', 'La Pampa', 'La Rioja',
    'Mendoza', 'Misiones', 'Neuquén', 'Río Negro', 'Salta', 'San Juan',
    'San Luis', 'Santa Cruz', 'Santa Fe', 'Santiago del Estero',
    'Tierra del Fuego', 'Tucumán',
];

export default function CheckoutPage() {
    const { items, subtotal, clearCart } = useCart();
    const [step, setStep] = useState<CheckoutStep>('shipping');
    const [selectedShipping, setSelectedShipping] = useState(SHIPPING_OPTIONS[0].id);
    const [orderId, setOrderId] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const [shipping, setShipping] = useState<ShippingInfo>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        province: '',
        postalCode: '',
        notes: '',
    });

    const [errors, setErrors] = useState<Partial<ShippingInfo>>({});

    const shippingOption = SHIPPING_OPTIONS.find((o) => o.id === selectedShipping)!;
    const total = subtotal + shippingOption.price;

    const validateShipping = (): boolean => {
        const errs: Partial<ShippingInfo> = {};
        if (!shipping.firstName.trim()) errs.firstName = 'Obligatorio';
        if (!shipping.lastName.trim()) errs.lastName = 'Obligatorio';
        if (!shipping.email.trim()) errs.email = 'Obligatorio';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(shipping.email)) errs.email = 'Email inválido';
        if (!shipping.phone.trim()) errs.phone = 'Obligatorio';
        if (!shipping.address.trim()) errs.address = 'Obligatorio';
        if (!shipping.city.trim()) errs.city = 'Obligatorio';
        if (!shipping.province) errs.province = 'Obligatorio';
        if (!shipping.postalCode.trim()) errs.postalCode = 'Obligatorio';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleContinueToPayment = () => {
        if (validateShipping()) setStep('payment');
    };

    const handlePlaceOrder = async () => {
        setIsProcessing(true);
        // Simulate payment processing
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const newOrderId = `SD-${Date.now().toString(36).toUpperCase()}`;
        setOrderId(newOrderId);
        clearCart();
        setStep('confirmation');
        setIsProcessing(false);
    };

    if (items.length === 0 && step !== 'confirmation') {
        return (
            <div className="pt-24 pb-16 min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">𖤐</div>
                    <h1 className="font-heading text-2xl mb-4">Tu carrito está vacío</h1>
                    <Link
                        href="/tienda"
                        className="text-accent-violet hover:text-accent-violet-light transition-colors"
                    >
                        Ir a la tienda →
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="pt-24 md:pt-32 pb-16 min-h-screen">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="font-heading text-3xl font-bold tracking-wider uppercase text-gradient">
                        Checkout
                    </h1>
                </div>

                {/* Steps Indicator */}
                {step !== 'confirmation' && (
                    <div className="flex items-center gap-2 mb-10">
                        {[
                            { key: 'shipping', label: 'Envío' },
                            { key: 'payment', label: 'Pago' },
                        ].map((s, i) => (
                            <div key={s.key} className="flex items-center gap-2">
                                {i > 0 && <div className="w-8 h-px bg-border" />}
                                <div
                                    className={cn(
                                        'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                                        step === s.key
                                            ? 'bg-accent-violet/20 text-accent-violet border border-accent-violet/30'
                                            : step === 'payment' && s.key === 'shipping'
                                                ? 'bg-green-600/10 text-green-400 border border-green-600/30'
                                                : 'bg-surface text-text-muted border border-border'
                                    )}
                                >
                                    <span className="w-6 h-6 rounded-full bg-current/20 flex items-center justify-center text-xs">
                                        {step === 'payment' && s.key === 'shipping' ? '✓' : i + 1}
                                    </span>
                                    {s.label}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Confirmation */}
                {step === 'confirmation' && (
                    <div className="max-w-xl mx-auto text-center py-16">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-600/20 flex items-center justify-center">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>
                        <h2 className="font-heading text-3xl font-bold tracking-wider uppercase mb-4">
                            ¡Pedido confirmado!
                        </h2>
                        <p className="text-text-secondary mb-2">
                            Tu número de orden es:
                        </p>
                        <p className="font-heading text-2xl text-accent-violet font-bold mb-6">{orderId}</p>
                        <p className="text-text-secondary text-sm mb-8">
                            Te enviamos un email de confirmación a <span className="text-text-primary">{shipping.email}</span>.
                            Podés seguir el estado de tu pedido desde tu email.
                        </p>
                        <Link
                            href="/tienda"
                            className="inline-flex items-center gap-2 px-8 py-3 bg-accent-violet hover:bg-accent-violet-light text-white rounded-lg transition-colors font-medium uppercase tracking-wider text-sm"
                        >
                            Seguir comprando
                        </Link>
                    </div>
                )}

                {step !== 'confirmation' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Form Area */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Shipping Form */}
                            {step === 'shipping' && (
                                <div className="bg-surface rounded-xl border border-border p-6">
                                    <h2 className="font-heading text-sm tracking-wider uppercase mb-6">
                                        Datos de envío
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {[
                                            { key: 'firstName', label: 'Nombre', type: 'text', placeholder: 'Juan', full: false },
                                            { key: 'lastName', label: 'Apellido', type: 'text', placeholder: 'Pérez', full: false },
                                            { key: 'email', label: 'Email', type: 'email', placeholder: 'juan@email.com', full: true },
                                            { key: 'phone', label: 'Teléfono', type: 'tel', placeholder: '+54 11 0000-0000', full: false },
                                            { key: 'address', label: 'Dirección', type: 'text', placeholder: 'Av. Corrientes 1234, Piso 2, Depto B', full: true },
                                            { key: 'city', label: 'Ciudad', type: 'text', placeholder: 'Buenos Aires', full: false },
                                            { key: 'postalCode', label: 'Código postal', type: 'text', placeholder: '1414', full: false },
                                        ].map((field) => (
                                            <div key={field.key} className={field.full ? 'sm:col-span-2' : ''}>
                                                <label className="block text-sm text-text-secondary mb-1.5">
                                                    {field.label} *
                                                </label>
                                                <input
                                                    type={field.type}
                                                    value={shipping[field.key as keyof ShippingInfo] || ''}
                                                    onChange={(e) =>
                                                        setShipping({ ...shipping, [field.key]: e.target.value })
                                                    }
                                                    placeholder={field.placeholder}
                                                    className={cn(
                                                        'w-full px-4 py-3 bg-void border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none transition-colors',
                                                        errors[field.key as keyof ShippingInfo]
                                                            ? 'border-accent-red'
                                                            : 'border-border focus:border-accent-violet'
                                                    )}
                                                />
                                                {errors[field.key as keyof ShippingInfo] && (
                                                    <p className="text-accent-red text-xs mt-1">
                                                        {errors[field.key as keyof ShippingInfo]}
                                                    </p>
                                                )}
                                            </div>
                                        ))}

                                        {/* Province Select */}
                                        <div>
                                            <label className="block text-sm text-text-secondary mb-1.5">
                                                Provincia *
                                            </label>
                                            <select
                                                value={shipping.province}
                                                onChange={(e) =>
                                                    setShipping({ ...shipping, province: e.target.value })
                                                }
                                                className={cn(
                                                    'w-full px-4 py-3 bg-void border rounded-lg text-text-primary focus:outline-none transition-colors appearance-none cursor-pointer',
                                                    errors.province
                                                        ? 'border-accent-red'
                                                        : 'border-border focus:border-accent-violet'
                                                )}
                                            >
                                                <option value="">Seleccioná una provincia</option>
                                                {PROVINCES.map((p) => (
                                                    <option key={p} value={p}>
                                                        {p}
                                                    </option>
                                                ))}
                                            </select>
                                            {errors.province && (
                                                <p className="text-accent-red text-xs mt-1">{errors.province}</p>
                                            )}
                                        </div>

                                        {/* Notes */}
                                        <div className="sm:col-span-2">
                                            <label className="block text-sm text-text-secondary mb-1.5">
                                                Notas (opcional)
                                            </label>
                                            <textarea
                                                value={shipping.notes || ''}
                                                onChange={(e) =>
                                                    setShipping({ ...shipping, notes: e.target.value })
                                                }
                                                rows={3}
                                                placeholder="Indicaciones para el envío, timbre, horarios..."
                                                className="w-full px-4 py-3 bg-void border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-violet transition-colors resize-none"
                                            />
                                        </div>
                                    </div>

                                    {/* Shipping Options */}
                                    <div className="mt-8">
                                        <h3 className="font-heading text-sm tracking-wider uppercase mb-4 text-text-secondary">
                                            Método de envío
                                        </h3>
                                        <div className="space-y-3">
                                            {SHIPPING_OPTIONS.map((option) => (
                                                <label
                                                    key={option.id}
                                                    className={cn(
                                                        'flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors',
                                                        selectedShipping === option.id
                                                            ? 'border-accent-violet bg-accent-violet/5'
                                                            : 'border-border hover:border-accent-violet/50'
                                                    )}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div
                                                            className={cn(
                                                                'w-4 h-4 rounded-full border-2 flex items-center justify-center',
                                                                selectedShipping === option.id
                                                                    ? 'border-accent-violet'
                                                                    : 'border-border'
                                                            )}
                                                        >
                                                            {selectedShipping === option.id && (
                                                                <div className="w-2 h-2 rounded-full bg-accent-violet" />
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium">{option.name}</p>
                                                            <p className="text-xs text-text-muted">
                                                                {option.description} — {option.estimatedDays}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <span className="text-sm font-medium">
                                                        {formatPrice(option.price)}
                                                    </span>
                                                    <input
                                                        type="radio"
                                                        name="shipping"
                                                        value={option.id}
                                                        checked={selectedShipping === option.id}
                                                        onChange={() => setSelectedShipping(option.id)}
                                                        className="sr-only"
                                                    />
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleContinueToPayment}
                                        className="w-full mt-8 py-3.5 bg-accent-violet hover:bg-accent-violet-light text-white rounded-lg font-medium uppercase tracking-wider text-sm transition-colors"
                                    >
                                        Continuar al pago →
                                    </button>
                                </div>
                            )}

                            {/* Payment Step */}
                            {step === 'payment' && (
                                <div className="bg-surface rounded-xl border border-border p-6">
                                    <h2 className="font-heading text-sm tracking-wider uppercase mb-6">
                                        Método de pago
                                    </h2>

                                    <div className="p-6 rounded-lg bg-surface-raised border border-border/50 text-center mb-6">
                                        <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-accent-cyan/10">
                                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#06B6D4" strokeWidth="1.5">
                                                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                                                <line x1="1" y1="10" x2="23" y2="10" />
                                            </svg>
                                        </div>
                                        <h3 className="font-medium mb-2">MercadoPago</h3>
                                        <p className="text-text-secondary text-sm mb-4">
                                            Serás redirigido a MercadoPago para completar el pago de forma segura.
                                        </p>
                                        <p className="text-text-muted text-xs">
                                            Aceptamos tarjetas de crédito, débito y otros medios de pago.
                                        </p>
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setStep('shipping')}
                                            className="px-6 py-3 border border-border hover:border-accent-violet text-text-secondary hover:text-text-primary rounded-lg transition-colors text-sm"
                                        >
                                            ← Volver
                                        </button>
                                        <button
                                            onClick={handlePlaceOrder}
                                            disabled={isProcessing}
                                            className={cn(
                                                'flex-1 py-3.5 rounded-lg font-medium uppercase tracking-wider text-sm transition-all',
                                                isProcessing
                                                    ? 'bg-surface-raised text-text-muted cursor-wait'
                                                    : 'bg-accent-violet hover:bg-accent-violet-light text-white glow-violet'
                                            )}
                                        >
                                            {isProcessing ? (
                                                <span className="flex items-center justify-center gap-2">
                                                    <span className="w-4 h-4 border-2 border-text-muted border-t-accent-violet rounded-full animate-spin" />
                                                    Procesando...
                                                </span>
                                            ) : (
                                                `Pagar ${formatPrice(total)}`
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Order Summary Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-surface rounded-xl border border-border p-6 sticky top-24">
                                <h2 className="font-heading text-sm tracking-wider uppercase mb-4">
                                    Resumen del pedido
                                </h2>

                                <div className="space-y-3 mb-6 max-h-60 overflow-y-auto">
                                    {items.map((item) => (
                                        <div
                                            key={`${item.product.id}-${item.variant.sku}`}
                                            className="flex gap-3"
                                        >
                                            <div className="w-14 h-14 bg-surface-raised rounded-md flex items-center justify-center text-xs text-text-muted flex-shrink-0">
                                                𖤐
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium truncate">{item.product.name}</p>
                                                <p className="text-xs text-text-muted">
                                                    {item.variant.size} / {item.variant.color} × {item.quantity}
                                                </p>
                                            </div>
                                            <p className="text-sm font-medium">
                                                {formatPrice(item.product.price * item.quantity)}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-2 border-t border-border pt-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-text-secondary">Subtotal</span>
                                        <span>{formatPrice(subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-text-secondary">Envío ({shippingOption.name})</span>
                                        <span>{formatPrice(shippingOption.price)}</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold pt-3 border-t border-border">
                                        <span>Total</span>
                                        <span className="text-accent-violet font-heading">
                                            {formatPrice(total)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
