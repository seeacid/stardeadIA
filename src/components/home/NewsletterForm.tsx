'use client';

import { Button } from '@/components/ui/Button';

export default function NewsletterForm() {
    return (
        <form
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            onSubmit={(e) => {
                e.preventDefault();
                // Here we would handle the submission
            }}
        >
            <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-5 py-3 bg-surface border border-border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-violet transition-colors"
                required
            />
            <Button type="submit" className="whitespace-nowrap animate-glow-pulse">
                Suscribirse
            </Button>
        </form>
    );
}
