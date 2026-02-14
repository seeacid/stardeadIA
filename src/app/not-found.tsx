import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center">
                <div className="text-8xl font-heading font-black text-gradient mb-4">404</div>
                <h1 className="font-heading text-2xl md:text-3xl font-bold tracking-wider uppercase mb-4">
                    Página no encontrada
                </h1>
                <p className="text-text-secondary mb-8 max-w-md mx-auto">
                    La página que buscás no existe o fue movida a otra dimensión.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-accent-violet hover:bg-accent-violet-light text-white rounded-lg transition-colors font-medium uppercase tracking-wider text-sm"
                    >
                        Volver al inicio
                    </Link>
                    <Link
                        href="/tienda"
                        className="inline-flex items-center justify-center gap-2 px-8 py-3 border border-border hover:border-accent-violet text-text-secondary hover:text-text-primary rounded-lg transition-colors font-medium uppercase tracking-wider text-sm"
                    >
                        Ir a la tienda
                    </Link>
                </div>
            </div>
        </div>
    );
}
