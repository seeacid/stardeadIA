'use client';

import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { type CartState, type CartAction, type CartItem, type Product, type ProductVariant } from '@/types';

const CART_STORAGE_KEY = 'stardead-cart';

const initialState: CartState = {
    items: [],
    isOpen: false,
};

function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case 'ADD_ITEM': {
            const { product, variant, quantity } = action.payload;
            const existingIndex = state.items.findIndex(
                (item) => item.product.id === product.id && item.variant.sku === variant.sku
            );

            if (existingIndex >= 0) {
                const newItems = [...state.items];
                newItems[existingIndex] = {
                    ...newItems[existingIndex],
                    quantity: Math.min(
                        newItems[existingIndex].quantity + quantity,
                        variant.stock
                    ),
                };
                return { ...state, items: newItems };
            }

            return {
                ...state,
                items: [...state.items, { product, variant, quantity: Math.min(quantity, variant.stock) }],
            };
        }

        case 'REMOVE_ITEM':
            return {
                ...state,
                items: state.items.filter(
                    (item) =>
                        !(item.product.id === action.payload.productId && item.variant.sku === action.payload.sku)
                ),
            };

        case 'UPDATE_QUANTITY': {
            const { productId, sku, quantity } = action.payload;
            if (quantity <= 0) {
                return {
                    ...state,
                    items: state.items.filter(
                        (item) => !(item.product.id === productId && item.variant.sku === sku)
                    ),
                };
            }

            return {
                ...state,
                items: state.items.map((item) =>
                    item.product.id === productId && item.variant.sku === sku
                        ? { ...item, quantity: Math.min(quantity, item.variant.stock) }
                        : item
                ),
            };
        }

        case 'CLEAR_CART':
            return { ...state, items: [] };

        case 'HYDRATE':
            return { ...state, items: action.payload };

        default:
            return state;
    }
}

interface CartContextValue {
    items: CartItem[];
    isOpen: boolean;
    addItem: (product: Product, variant: ProductVariant, quantity?: number) => void;
    removeItem: (productId: string, sku: string) => void;
    updateQuantity: (productId: string, sku: string, quantity: number) => void;
    clearCart: () => void;
    itemCount: number;
    subtotal: number;
    total: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    // Hydrate from localStorage
    useEffect(() => {
        try {
            const saved = localStorage.getItem(CART_STORAGE_KEY);
            if (saved) {
                const items = JSON.parse(saved) as CartItem[];
                dispatch({ type: 'HYDRATE', payload: items });
            }
        } catch {
            // Ignore parse errors
        }
    }, []);

    // Persist to localStorage
    useEffect(() => {
        try {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
        } catch {
            // Ignore storage errors
        }
    }, [state.items]);

    const addItem = useCallback(
        (product: Product, variant: ProductVariant, quantity = 1) => {
            dispatch({ type: 'ADD_ITEM', payload: { product, variant, quantity } });
        },
        []
    );

    const removeItem = useCallback((productId: string, sku: string) => {
        dispatch({ type: 'REMOVE_ITEM', payload: { productId, sku } });
    }, []);

    const updateQuantity = useCallback(
        (productId: string, sku: string, quantity: number) => {
            dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, sku, quantity } });
        },
        []
    );

    const clearCart = useCallback(() => {
        dispatch({ type: 'CLEAR_CART' });
    }, []);

    const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = state.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                items: state.items,
                isOpen: state.isOpen,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
                itemCount,
                subtotal,
                total: subtotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
