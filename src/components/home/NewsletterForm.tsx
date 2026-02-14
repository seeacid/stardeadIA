'use client';

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
            <button
                type="submit"
                className="px-8 py-3 bg-accent-violet hover:bg-accent-violet-light text-white rounded-lg transition-colors font-medium uppercase tracking-wider text-sm animate-glow-pulse"
            >
                Suscribirse
            </button>
        </form>
    );
}
