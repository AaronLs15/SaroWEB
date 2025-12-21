'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
    useEffect(() => {
        // Animate hero content
        gsap.fromTo(
            '.hero-badge',
            { opacity: 0, y: -20 },
            { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: 'power3.out' }
        );

        gsap.fromTo(
            '.hero-title',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: 'power3.out' }
        );

        gsap.fromTo(
            '.hero-subtitle',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, delay: 0.7, ease: 'power3.out' }
        );

        gsap.fromTo(
            '.hero-buttons',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, delay: 0.9, ease: 'power3.out' }
        );
    }, []);

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 h-full w-full object-cover"
                    poster="/images/hero-poster.jpg"
                >
                    <source src="/videos/hero-background.webm" type="video/webm" />
                    {/* Fallback gradient if video doesn't load */}
                </video>

                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-primary-900/70" />
            </div>

            {/* Animated background pattern 
            <div className="absolute inset-0 z-10 opacity-10">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />
            </div>*/}

            {/* Content */}
            <div className="container-custom relative z-20 text-white">
                <div className="mx-auto max-w-4xl text-center">
                    {/* Badge */}
                    <div className="hero-badge mb-8 inline-flex items-center space-x-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-sm">
                        <Sparkles className="h-4 w-4" />
                        <span className="text-sm font-medium">Bienes Raíces de Lujo</span>
                    </div>

                    {/* Main heading */}
                    <h1 className="hero-title mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                        Encuentra la propiedad de tus sueños con{' '}
                        <span className="text-primary-200">Inmobiliaria Saro</span>
                    </h1>

                    <p className="hero-subtitle mb-10 text-lg text-gray-100 sm:text-xl">
                        Descubre propiedades excepcionales en las mejores ubicaciones. Tu futuro comienza aquí.
                    </p>

                    {/* CTA Buttons */}
                    <div className="hero-buttons flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link
                            href="/casas"
                            className="inline-flex w-full items-center justify-center space-x-2 rounded-lg bg-white px-8 py-4 text-sm font-semibold text-primary-600 shadow-lg transition-all hover:bg-primary-50 hover:shadow-xl sm:w-auto"
                        >
                            <span>Ver Casas</span>
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                        <Link
                            href="/terrenos"
                            className="inline-flex w-full items-center justify-center space-x-2 rounded-lg border-2 border-white bg-transparent px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-white/10 sm:w-auto"
                        >
                            <span>Ver Terrenos</span>
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 animate-bounce">
                <div className="flex flex-col items-center space-y-2 text-white">
                    <span className="text-sm font-medium opacity-75">Desliza para explorar</span>
                    <svg
                        className="h-6 w-6 opacity-75"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 14l-7 7m0 0l-7-7m7 7V3"
                        />
                    </svg>
                </div>
            </div>
        </section>
    );
}
