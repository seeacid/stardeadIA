import Link from 'next/link';
import FooterNewsletterForm from './FooterNewsletterForm';

const footerLinks = {
    shop: [
        { href: '/tienda', label: 'Todas las prendas' },
        { href: '/tienda?category=remeras', label: 'Remeras' },
        { href: '/tienda?category=buzos', label: 'Buzos & Hoodies' },
        { href: '/tienda?category=pantalones', label: 'Pantalones' },
        { href: '/tienda?category=accesorios', label: 'Accesorios' },
    ],
    info: [
        { href: '/nosotros', label: 'Sobre nosotros' },
        { href: '/contacto', label: 'Contacto' },
        { href: '/galeria', label: 'Galería' },
        { href: '#', label: 'Envíos y devoluciones' },
        { href: '#', label: 'Términos y condiciones' },
    ],
};

export default function Footer() {
    return (
        <footer className="bg-void-deep border-t border-border">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="inline-block mb-4">
                            <span className="text-2xl font-heading font-bold tracking-wider text-gradient">
                                𖤐 STARDEAD
                            </span>
                        </Link>
                        <p className="text-text-secondary text-sm leading-relaxed mb-6">
                            Ropa urbana con visión futurista. Cada prenda es un acto de rebeldía contra lo ordinario.
                        </p>
                        {/* Social Links */}
                        <div className="flex items-center gap-4">
                            <a
                                href="https://www.instagram.com/stardead.clothes/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface hover:bg-accent-violet transition-colors group"
                                aria-label="Instagram de Stardead Clothes"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="group-hover:scale-110 transition-transform">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                </svg>
                            </a>
                            <a
                                href="https://wa.me/5491100000000"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface hover:bg-green-600 transition-colors group"
                                aria-label="WhatsApp"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="group-hover:scale-110 transition-transform">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Shop Links */}
                    <div>
                        <h3 className="font-heading text-sm tracking-wider uppercase mb-4 text-text-primary">
                            Tienda
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.shop.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-text-secondary hover:text-accent-violet text-sm transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Info Links */}
                    <div>
                        <h3 className="font-heading text-sm tracking-wider uppercase mb-4 text-text-primary">
                            Información
                        </h3>
                        <ul className="space-y-3">
                            {footerLinks.info.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="text-text-secondary hover:text-accent-violet text-sm transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-heading text-sm tracking-wider uppercase mb-4 text-text-primary">
                            Newsletter
                        </h3>
                        <p className="text-text-secondary text-sm mb-4">
                            Recibí las últimas novedades y acceso anticipado a drops exclusivos.
                        </p>
                        <FooterNewsletterForm />
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-text-muted text-xs">
                        © {new Date().getFullYear()} Stardead Clothes. Todos los derechos reservados.
                    </p>
                    <p className="text-text-muted text-xs">
                        Buenos Aires, Argentina 🇦🇷
                    </p>
                </div>
            </div>
        </footer>
    );
}
