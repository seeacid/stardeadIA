'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface FormState {
    name: string;
    email: string;
    message: string;
}

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function ContactoPage() {
    const [form, setForm] = useState<FormState>({ name: '', email: '', message: '' });
    const [status, setStatus] = useState<Status>('idle');
    const [errors, setErrors] = useState<Partial<FormState>>({});

    const validate = (): boolean => {
        const newErrors: Partial<FormState> = {};
        if (!form.name.trim()) newErrors.name = 'El nombre es obligatorio';
        if (!form.email.trim()) {
            newErrors.email = 'El email es obligatorio';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            newErrors.email = 'Ingresá un email válido';
        }
        if (!form.message.trim()) newErrors.message = 'El mensaje es obligatorio';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setStatus('sending');

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setStatus('success');
        setForm({ name: '', email: '', message: '' });

        setTimeout(() => setStatus('idle'), 5000);
    };

    return (
        <div className="pb-16 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-wider uppercase text-gradient mb-4">
                        Contacto
                    </h1>
                    <p className="text-text-secondary max-w-xl mx-auto">
                        ¿Tenés alguna pregunta, propuesta o simplemente querés hablar? Escribinos.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Contact Form */}
                    <div className="bg-surface rounded-xl border border-border p-6 md:p-8">
                        <h2 className="font-heading text-lg tracking-wider uppercase mb-6">
                            Envianos un mensaje
                        </h2>

                        {status === 'success' && (
                            <div className="mb-6 p-4 bg-green-600/10 border border-green-600/30 rounded-lg text-green-400 text-sm">
                                ✓ Tu mensaje fue enviado correctamente. Te responderemos pronto.
                            </div>
                        )}

                        {status === 'error' && (
                            <div className="mb-6 p-4 bg-accent-red/10 border border-accent-red/30 rounded-lg text-accent-red text-sm">
                                ✕ Hubo un error al enviar el mensaje. Intentá de nuevo.
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                            {/* Name */}
                            <div>
                                <label htmlFor="contact-name" className="block text-sm text-text-secondary mb-1.5">
                                    Nombre *
                                </label>
                                <input
                                    id="contact-name"
                                    type="text"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className={cn(
                                        'w-full px-4 py-3 bg-void border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none transition-colors',
                                        errors.name ? 'border-accent-red' : 'border-border focus:border-accent-violet'
                                    )}
                                    placeholder="Tu nombre"
                                />
                                {errors.name && (
                                    <p className="text-accent-red text-xs mt-1">{errors.name}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="contact-email" className="block text-sm text-text-secondary mb-1.5">
                                    Email *
                                </label>
                                <input
                                    id="contact-email"
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    className={cn(
                                        'w-full px-4 py-3 bg-void border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none transition-colors',
                                        errors.email ? 'border-accent-red' : 'border-border focus:border-accent-violet'
                                    )}
                                    placeholder="tu@email.com"
                                />
                                {errors.email && (
                                    <p className="text-accent-red text-xs mt-1">{errors.email}</p>
                                )}
                            </div>

                            {/* Message */}
                            <div>
                                <label htmlFor="contact-message" className="block text-sm text-text-secondary mb-1.5">
                                    Mensaje *
                                </label>
                                <textarea
                                    id="contact-message"
                                    value={form.message}
                                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                                    rows={5}
                                    className={cn(
                                        'w-full px-4 py-3 bg-void border rounded-lg text-text-primary placeholder:text-text-muted focus:outline-none transition-colors resize-none',
                                        errors.message ? 'border-accent-red' : 'border-border focus:border-accent-violet'
                                    )}
                                    placeholder="¿En qué podemos ayudarte?"
                                />
                                {errors.message && (
                                    <p className="text-accent-red text-xs mt-1">{errors.message}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'sending'}
                                className={cn(
                                    'w-full py-3.5 rounded-lg font-medium uppercase tracking-wider text-sm transition-all',
                                    status === 'sending'
                                        ? 'bg-surface-raised text-text-muted cursor-wait'
                                        : 'bg-accent-violet hover:bg-accent-violet-light text-white glow-violet hover:scale-[1.01] active:scale-[0.99]'
                                )}
                            >
                                {status === 'sending' ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="w-4 h-4 border-2 border-text-muted border-t-accent-violet rounded-full animate-spin" />
                                        Enviando...
                                    </span>
                                ) : (
                                    'Enviar mensaje'
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="font-heading text-lg tracking-wider uppercase mb-6">
                                Otras formas de contactarnos
                            </h2>
                            <div className="space-y-5">
                                {/* Email */}
                                <div className="flex items-start gap-4 p-4 bg-surface rounded-lg border border-border/50 hover:border-accent-violet/30 transition-colors">
                                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-accent-violet/10 text-accent-violet">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                            <polyline points="22,6 12,13 2,6" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium mb-0.5">Email</h3>
                                        <a
                                            href="mailto:hola@stardeadclothes.com"
                                            className="text-text-secondary text-sm hover:text-accent-violet transition-colors"
                                        >
                                            hola@stardeadclothes.com
                                        </a>
                                    </div>
                                </div>

                                {/* WhatsApp */}
                                <a
                                    href="https://wa.me/5491100000000"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-start gap-4 p-4 bg-surface rounded-lg border border-border/50 hover:border-green-600/30 transition-colors group"
                                >
                                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-green-600/10 text-green-500">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium mb-0.5">WhatsApp</h3>
                                        <p className="text-text-secondary text-sm group-hover:text-green-500 transition-colors">
                                            +54 9 11 0000-0000
                                        </p>
                                    </div>
                                </a>

                                {/* Instagram */}
                                <a
                                    href="https://www.instagram.com/stardead.clothes/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-start gap-4 p-4 bg-surface rounded-lg border border-border/50 hover:border-accent-violet/30 transition-colors group"
                                >
                                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-accent-magenta/10 text-accent-magenta">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                            <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-medium mb-0.5">Instagram</h3>
                                        <p className="text-text-secondary text-sm group-hover:text-accent-magenta transition-colors">
                                            @stardead.clothes
                                        </p>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* FAQ */}
                        <div className="p-6 bg-surface rounded-xl border border-border/50">
                            <h3 className="font-heading text-sm tracking-wider uppercase mb-4">
                                Preguntas frecuentes
                            </h3>
                            <div className="space-y-4 text-sm">
                                <div>
                                    <h4 className="font-medium text-text-primary mb-1">
                                        ¿Cuánto tarda el envío?
                                    </h4>
                                    <p className="text-text-secondary">
                                        Los envíos dentro de CABA se despachan en 24-48 hs hábiles. Interior: 3-5 días hábiles.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-text-primary mb-1">
                                        ¿Puedo cambiar un producto?
                                    </h4>
                                    <p className="text-text-secondary">
                                        Sí, tenés 15 días para hacer cambios. El producto debe estar sin uso y con etiquetas.
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-text-primary mb-1">
                                        ¿Hacen envíos internacionales?
                                    </h4>
                                    <p className="text-text-secondary">
                                        Por ahora solo enviamos dentro de Argentina. ¡Próximamente a más destinos!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
