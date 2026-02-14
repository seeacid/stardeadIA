import Link from 'next/link';
import ProductCard from '@/components/product/ProductCard';
import { getFeaturedProducts, getNewProducts } from '@/lib/products';
import HeroSection from '@/components/home/HeroSection';
import NewsletterForm from '@/components/home/NewsletterForm';

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const newProducts = getNewProducts();

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Featured Products */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-wider uppercase text-gradient mb-4">
            Destacados
          </h2>
          <p className="text-text-secondary max-w-xl mx-auto">
            Lo que más rompe. Nuestras prendas más buscadas y los diseños que definen la temporada.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.slice(0, 8).map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/tienda"
            className="inline-flex items-center gap-2 px-8 py-3 border border-accent-violet text-accent-violet hover:bg-accent-violet hover:text-white rounded-lg transition-all duration-300 font-medium uppercase tracking-wider text-sm hover:shadow-lg hover:shadow-accent-violet/20"
          >
            Ver toda la tienda
            <span>→</span>
          </Link>
        </div>
      </section>

      {/* Collection Banner */}
      <section className="relative py-32 overflow-hidden noise-overlay">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-violet/20 via-transparent to-accent-cyan/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-void via-transparent to-void" />
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <span className="text-accent-cyan text-sm uppercase tracking-[0.3em] font-heading mb-4 inline-block">
            Colección 2026
          </span>
          <h2 className="font-heading text-4xl md:text-6xl font-bold tracking-wider uppercase mb-6">
            <span className="text-gradient-hot">DEAD</span>{' '}
            <span className="text-text-primary">SIGNAL</span>
          </h2>
          <p className="text-text-secondary text-lg mb-8 max-w-2xl mx-auto">
            Señales desde el vacío. Prendas que hablan cuando las palabras no alcanzan.
            La nueva colección ya está disponible.
          </p>
          <Link
            href="/tienda"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-brand text-white rounded-lg font-medium uppercase tracking-wider text-sm hover:opacity-90 transition-opacity glow-violet"
          >
            Explorar colección
            <span>→</span>
          </Link>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-wider uppercase">
              Nuevos drops
            </h2>
            <p className="text-text-secondary mt-2">Recién salidos del sistema.</p>
          </div>
          <Link
            href="/tienda?sort=newest"
            className="text-accent-violet hover:text-accent-violet-light transition-colors text-sm uppercase tracking-wider"
          >
            Ver todos →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {newProducts.slice(0, 4).map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* Instagram Teaser */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-wider uppercase mb-3">
              @stardead.clothes
            </h2>
            <p className="text-text-secondary">
              Seguinos en Instagram para ver lo último antes que nadie.
            </p>
          </div>
          {/* Instagram Grid Preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <a
                key={i}
                href="https://www.instagram.com/stardead.clothes/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square bg-surface-raised rounded-lg overflow-hidden hover:opacity-80 transition-opacity"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl text-surface-overlay/50 group-hover:text-accent-violet/50 transition-colors">
                    𖤐
                  </span>
                </div>
                <div className="absolute inset-0 bg-accent-violet/0 group-hover:bg-accent-violet/10 transition-colors flex items-center justify-center">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
          <div className="text-center mt-8">
            <a
              href="https://www.instagram.com/stardead.clothes/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border hover:border-accent-violet text-text-secondary hover:text-accent-violet rounded-lg transition-all duration-300 text-sm"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              Seguir en Instagram
            </a>
          </div>
        </div>
      </section>

      {/* CTA / Newsletter */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-wider uppercase mb-4">
            <span className="text-gradient">Unite al sistema</span>
          </h2>
          <p className="text-text-secondary mb-8 text-lg">
            Acceso anticipado a drops, descuentos exclusivos y contenido que no se comparte en ningún otro lado.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
