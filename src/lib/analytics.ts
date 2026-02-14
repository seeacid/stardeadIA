// Google Analytics 4 helper functions
// Configure GA_MEASUREMENT_ID in environment variables

declare global {
    interface Window {
        gtag: (...args: unknown[]) => void;
        dataLayer: unknown[];
    }
}

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

// Initialize GA
export const pageview = (url: string) => {
    if (typeof window !== 'undefined' && window.gtag && GA_MEASUREMENT_ID) {
        window.gtag('config', GA_MEASUREMENT_ID, {
            page_path: url,
        });
    }
};

// E-commerce Events
export const viewProduct = (productId: string, productName: string, price: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'view_item', {
            currency: 'ARS',
            value: price,
            items: [{ item_id: productId, item_name: productName, price }],
        });
    }
};

export const addToCart = (productId: string, productName: string, price: number, quantity: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'add_to_cart', {
            currency: 'ARS',
            value: price * quantity,
            items: [{ item_id: productId, item_name: productName, price, quantity }],
        });
    }
};

export const beginCheckout = (total: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'begin_checkout', {
            currency: 'ARS',
            value: total,
        });
    }
};

export const purchase = (orderId: string, total: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'purchase', {
            transaction_id: orderId,
            currency: 'ARS',
            value: total,
        });
    }
};
