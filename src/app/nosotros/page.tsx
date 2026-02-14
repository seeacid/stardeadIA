import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Nosotros',
    description:
        'Conocé la historia de Stardead Clothes. Ropa urbana con visión futurista, nacida en Buenos Aires.',
};

const values = [
    {
        icon: '⚡',
        title: 'Rebeldía',
        description:
            'Cada prenda desafía lo convencional. No seguimos tendencias, las creamos.',
    },
    {
        icon: '🌆',
        title: 'Calle',
        description:
            'Nacimos en las calles de Buenos Aires. La ciudad es nuestra inspiración y nuestro lienzo.',
    },
    {
        icon: '🔮',
        title: 'Futuro',
        description:
            'Miramos hacia adelante. Nuestra estética está inspirada en un futuro oscuro e intenso.',
    },
    {
        icon: '💀',
        title: 'Autenticidad',
        description:
            'Sin filtros, sin disculpas. Stardead es para los que son ellos mismos sin pedir permiso.',
    },
];

const timeline = [
    {
        year: '2025',
        title: 'El inicio',
        description:
            'Stardead nace como idea en Buenos Aires. Las primeras estampas se imprimen en un garaje.',
    },
    {
        year: '2025',
        title: 'Primer drop',
        description:
            'Se lanza la primera colección con 5 remeras de edición limitada. Se agotan en 48 horas.',
    },
    {
        year: '2026',
        title: 'Expansión',
        description:
            'La marca crece: hoodies, buzos, pantalones y accesorios se suman al catálogo. Nace la tienda online.',
    },
    {
        year: '2026',
        title: 'Dead Signal',
        description:
            'Se lanza la colección Dead Signal. La marca encuentra su voz y su visión definitiva.',
    },
];

export default function NosotrosPage() {
    return (
        <div className="pt-20 md:pt-24 pb-16 min-h-screen">
            {/* Hero */}
            <section className="relative py-20 md:py-32 overflow-hidden noise-overlay">
                <div className="absolute inset-0 bg-gradient-to-b from-accent-violet/5 via-transparent to-void" />
                <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
                    <span className="text-accent-cyan text-xs uppercase tracking-[0.4em] font-heading mb-4 inline-block">
                        Sobre nosotros
                    </span>
                    <h1 className="font-heading text-4xl md:text-6xl font-bold tracking-wider uppercase mb-6">
                        <span className="text-gradient">Más que ropa.</span>
                        <br />
                        <span className="text-text-primary">Es una declaración.</span>
                    </h1>
                    <p className="text-text-secondary text-lg leading-relaxed max-w-2xl mx-auto">
                        Stardead Clothes nace en Buenos Aires con una misión clara: vestir a los que no siguen,
                        a los que crean su propio código. Fusionamos la energía de la calle con una visión
                        futurista para crear prendas que hablan por vos.
                    </p>
                </div>
            </section>

            {/* Brand Manifesto */}
            <section className="py-16 px-4">
                <div className="max-w-3xl mx-auto">
                    <blockquote className="relative text-center">
                        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-6xl text-accent-violet/20 font-heading">
                            &ldquo;
                        </span>
                        <p className="text-xl md:text-2xl text-text-primary leading-relaxed italic">
                            Stardead no es solo ropa — es una declaración. Nacida en las calles con visión
                            futurista, cada prenda es un acto de rebeldía contra lo ordinario. Vestimos a los que
                            no siguen, a los que crean su propio código. El futuro es oscuro, intenso y nuestro.
                        </p>
                        <footer className="mt-6 text-accent-violet font-heading text-sm tracking-widest uppercase">
                            — Stardead Clothes
                        </footer>
                    </blockquote>
                </div>
            </section>

            {/* Values */}
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-center font-heading text-2xl md:text-3xl font-bold tracking-wider uppercase mb-12">
                        Nuestros <span className="text-gradient">valores</span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, i) => (
                            <div
                                key={value.title}
                                className="p-6 bg-surface rounded-xl border border-border/50 hover:border-accent-violet/30 transition-all duration-300 hover:shadow-lg hover:shadow-accent-violet/5 group"
                            >
                                <span className="text-3xl mb-4 block group-hover:scale-110 transition-transform">
                                    {value.icon}
                                </span>
                                <h3 className="font-heading text-sm tracking-wider uppercase mb-2 text-text-primary">
                                    {value.title}
                                </h3>
                                <p className="text-text-secondary text-sm leading-relaxed">
                                    {value.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-16 px-4 bg-surface">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-center font-heading text-2xl md:text-3xl font-bold tracking-wider uppercase mb-12">
                        Nuestra <span className="text-gradient">historia</span>
                    </h2>
                    <div className="relative">
                        {/* Vertical Line */}
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border" />

                        <div className="space-y-12">
                            {timeline.map((item, i) => (
                                <div
                                    key={i}
                                    className={`relative flex items-start gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                        }`}
                                >
                                    {/* Dot */}
                                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent-violet border-2 border-void z-10" />

                                    {/* Content */}
                                    <div
                                        className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                                            }`}
                                    >
                                        <span className="text-accent-cyan text-xs font-heading uppercase tracking-widest">
                                            {item.year}
                                        </span>
                                        <h3 className="font-heading text-lg font-bold tracking-wider uppercase mt-1 mb-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-text-secondary text-sm leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-4 text-center">
                <h2 className="font-heading text-2xl md:text-3xl font-bold tracking-wider uppercase mb-4">
                    ¿Listo para <span className="text-gradient">unirte</span>?
                </h2>
                <p className="text-text-secondary mb-8 max-w-lg mx-auto">
                    Explorá nuestra tienda y encontrá las prendas que te representan.
                </p>
                <a
                    href="/tienda"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-brand text-white rounded-lg font-medium uppercase tracking-wider text-sm hover:opacity-90 transition-opacity glow-violet"
                >
                    Explorar tienda →
                </a>
            </section>
        </div>
    );
}
