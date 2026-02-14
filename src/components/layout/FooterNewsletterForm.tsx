'use client';

import { Button } from '@/components/ui/Button';

export default function FooterNewsletterForm() {
    return (
        <form
            className="flex gap-2"
            onSubmit={(e) => {
                e.preventDefault();
            }}
        >
            <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-4 py-2.5 bg-surface border border-border rounded-lg text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-violet transition-colors"
                required
            />
            <Button type="submit" size="sm">
                →
            </Button>
        </form>
    );
}
