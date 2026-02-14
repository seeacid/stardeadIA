'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { type InstagramPost } from '@/types';

// Mock Instagram data for development
const MOCK_POSTS: InstagramPost[] = Array.from({ length: 12 }, (_, i) => ({
    id: `post-${i + 1}`,
    caption: [
        '𖤐 Void Signal — Nueva remera oversize ya disponible. Link en bio.',
        '𖤐 Dead Frequency. El frío no es excusa para no tener estilo.',
        '𖤐 Neon Decay — Los colores que necesitás en tu vida.',
        '𖤐 Backstage del último shooting. Coming soon...',
        '𖤐 Cargo Phantom — Funcionalidad × estilo.',
        '𖤐 STARDEAD OG — La base de todo.',
        '𖤐 Edición limitada: Cyber Skull. Cuando se acaba, se acaba.',
        '𖤐 Crewneck Glitch — Hacé ruido visual.',
        '𖤐 La calle es nuestro lienzo.',
        '𖤐 Bomber Eclipse — La campera insignia.',
        '𖤐 Static Noise — Comodidad sin perder el estilo.',
        '𖤐 Buenos Aires × Stardead. Siempre.',
    ][i],
    mediaUrl: `/images/instagram/post-${i + 1}.jpg`,
    mediaType: 'IMAGE' as const,
    permalink: 'https://www.instagram.com/stardead.clothes/',
    timestamp: new Date(Date.now() - i * 86400000 * 3).toISOString(),
}));

export default function GaleriaPage() {
    const [posts] = useState<InstagramPost[]>(MOCK_POSTS);
    const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);
    const [isLoading] = useState(false);

    return (
        <div className="pt-20 md:pt-24 pb-16 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-wider uppercase text-gradient mb-4">
                        Galería
                    </h1>
                    <p className="text-text-secondary max-w-xl mx-auto mb-4">
                        Nuestro universo visual. Directo desde nuestro Instagram.
                    </p>
                    <a
                        href="https://www.instagram.com/stardead.clothes/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-accent-violet hover:text-accent-violet-light transition-colors text-sm"
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                        @stardead.clothes
                    </a>
                </div>

                {/* loading skeletons */}
                {isLoading && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div
                                key={i}
                                className="aspect-square bg-surface-raised rounded-lg animate-pulse"
                                style={{ animationDelay: `${i * 100}ms` }}
                            />
                        ))}
                    </div>
                )}

                {/* Gallery Grid */}
                {!isLoading && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {posts.map((post, i) => (
                            <button
                                key={post.id}
                                onClick={() => setSelectedPost(post)}
                                className="group relative aspect-square bg-surface-raised rounded-lg overflow-hidden hover:ring-2 hover:ring-accent-violet transition-all duration-300"
                                style={{
                                    animationDelay: `${i * 50}ms`,
                                }}
                            >
                                {/* Placeholder */}
                                <div className="absolute inset-0 flex items-center justify-center bg-surface-raised">
                                    <span className="text-4xl text-surface-overlay/30 group-hover:text-accent-violet/30 transition-colors duration-300">
                                        𖤐
                                    </span>
                                </div>

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-void/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                    <p className="text-white text-xs line-clamp-2">{post.caption}</p>
                                </div>

                                {/* Corner Icon */}
                                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="white"
                                        strokeWidth="1.5"
                                    >
                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                    </svg>
                                </div>
                            </button>
                        ))}
                    </div>
                )}

                {/* No Posts */}
                {!isLoading && posts.length === 0 && (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">𖤐</div>
                        <h3 className="font-heading text-xl mb-2">No hay publicaciones</h3>
                        <p className="text-text-secondary">
                            Seguinos en Instagram para ver nuestro contenido.
                        </p>
                    </div>
                )}
            </div>

            {/* Lightbox Modal */}
            {selectedPost && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
                    onClick={() => setSelectedPost(null)}
                >
                    <div className="absolute inset-0 bg-void/90 backdrop-blur-sm" />
                    <div
                        className="relative max-w-3xl w-full bg-surface rounded-xl overflow-hidden border border-border animate-slide-up"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Image */}
                        <div className="aspect-square bg-surface-raised flex items-center justify-center">
                            <span className="text-8xl text-surface-overlay/20">𖤐</span>
                        </div>

                        {/* Info */}
                        <div className="p-6">
                            <p className="text-text-primary text-sm leading-relaxed mb-4">
                                {selectedPost.caption}
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="text-text-muted text-xs">
                                    {new Date(selectedPost.timestamp).toLocaleDateString('es-AR', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric',
                                    })}
                                </span>
                                <a
                                    href={selectedPost.permalink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-accent-violet hover:text-accent-violet-light transition-colors text-sm"
                                >
                                    Ver en Instagram
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                                        <polyline points="15 3 21 3 21 9" />
                                        <line x1="10" y1="14" x2="21" y2="3" />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        {/* Close */}
                        <button
                            onClick={() => setSelectedPost(null)}
                            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-void/80 hover:bg-void rounded-full transition-colors"
                            aria-label="Cerrar"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
