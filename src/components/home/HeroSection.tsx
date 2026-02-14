'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function HeroSection() {
    const heroRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const hero = heroRef.current;
        if (!hero) return;

        // Parallax effect on mouse move
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            const xPercent = (clientX / innerWidth - 0.5) * 2;
            const yPercent = (clientY / innerHeight - 0.5) * 2;

            const bgElement = hero.querySelector('.hero-bg') as HTMLElement;
            if (bgElement) {
                bgElement.style.transform = `translate(${xPercent * 10}px, ${yPercent * 10}px) scale(1.05)`;
            }
        };

        // Check reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!prefersReducedMotion) {
            window.addEventListener('mousemove', handleMouseMove);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div
            ref={heroRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Background Layers */}
            <div className="hero-bg absolute inset-0 transition-transform duration-700 ease-out">
                {/* Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-void via-surface to-void" />

                {/* Animated Grid */}
                <div
                    className="absolute inset-0 opacity-[0.06]"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
            `,
                        backgroundSize: '60px 60px',
                    }}
                />

                {/* Radial Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-accent-violet/5 blur-[120px]" />
                <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-accent-cyan/5 blur-[100px]" />
                <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] rounded-full bg-accent-magenta/5 blur-[80px]" />
            </div>

            {/* Noise Overlay */}
            <div className="absolute inset-0 noise-overlay" />

            {/* Scan Line Effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute left-0 right-0 h-[2px] bg-accent-violet/10 animate-scan-line" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                {/* Subtitle */}
                <div className="mb-6 animate-fade-in" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
                    <span className="inline-block px-4 py-1.5 text-xs uppercase tracking-[0.4em] text-accent-cyan border border-accent-cyan/20 rounded-full font-heading">
                        Streetwear Futurista — Buenos Aires
                    </span>
                </div>

                {/* Main Title */}
                <h1
                    className="font-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-wider uppercase mb-6 text-glitch-hover animate-slide-up"
                    style={{ animationDelay: '400ms', animationFillMode: 'both' }}
                >
                    <span className="text-gradient">STAR</span>
                    <span className="text-text-primary">DEAD</span>
                </h1>

                {/* Tagline */}
                <p
                    className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 animate-slide-up"
                    style={{ animationDelay: '600ms', animationFillMode: 'both' }}
                >
                    Cada prenda es un acto de rebeldía contra lo ordinario.
                    <br className="hidden md:block" />
                    El futuro es oscuro, intenso y nuestro.
                </p>

                {/* CTAs */}
                <div
                    className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up"
                    style={{ animationDelay: '800ms', animationFillMode: 'both' }}
                >
                    <Link
                        href="/tienda"
                        className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-gradient-brand text-white rounded-lg font-medium uppercase tracking-wider text-sm hover:opacity-90 transition-all glow-violet hover:scale-105 active:scale-95"
                    >
                        Explorar tienda
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9,18 15,12 9,6" />
                        </svg>
                    </Link>
                    <Link
                        href="/nosotros"
                        className="inline-flex items-center justify-center gap-2 px-10 py-4 border border-border hover:border-accent-violet text-text-secondary hover:text-text-primary rounded-lg font-medium uppercase tracking-wider text-sm transition-all hover:scale-105 active:scale-95"
                    >
                        Conocé la marca
                    </Link>
                </div>

                {/* Scroll Indicator */}
                <div
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float"
                    style={{ animationDelay: '1200ms' }}
                >
                    <div className="flex flex-col items-center gap-2 text-text-muted">
                        <span className="text-xs uppercase tracking-widest">Scroll</span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6,9 12,15 18,9" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-20 left-10 text-text-muted/10 font-heading text-xs tracking-[0.3em] rotate-90 origin-left hidden lg:block">
                STARDEAD.CLOTHES
            </div>
            <div className="absolute bottom-20 right-10 text-text-muted/10 font-heading text-xs tracking-[0.3em] -rotate-90 origin-right hidden lg:block">
                EST. 2025 — BUE
            </div>
        </div>
    );
}
