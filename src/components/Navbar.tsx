'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X, Home } from 'lucide-react';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    // Only apply transparent effect on home page
    const isHomePage = pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Determine if navbar should be solid (white background)
    const isSolid = !isHomePage || isScrolled;

    const navigation = [
        { name: 'Inicio', href: '/' },
        { name: 'Casas', href: '/casas' },
        { name: 'Terrenos', href: '/terrenos' },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isSolid
                    ? 'bg-white shadow-md'
                    : 'bg-transparent'
                }`}
        >
            <div className="container-custom">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <Home
                            className={`h-8 w-8 transition-colors duration-300 ${isSolid ? 'text-primary-600' : 'text-white'
                                }`}
                        />
                        <span
                            className={`text-xl font-bold transition-colors duration-300 ${isSolid ? 'text-gray-900' : 'text-white'
                                }`}
                        >
                            INMOBILIARIA SARO
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:space-x-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`text-sm font-medium transition-colors duration-300 ${isSolid
                                        ? 'text-gray-700 hover:text-primary-600'
                                        : 'text-white/90 hover:text-white'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        type="button"
                        className={`md:hidden inline-flex items-center justify-center rounded-md p-2 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 ${isSolid
                                ? 'text-gray-700 hover:bg-gray-100 hover:text-primary-600'
                                : 'text-white hover:bg-white/10'
                            }`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span className="sr-only">Abrir menú</span>
                        {isMenuOpen ? (
                            <X className="h-6 w-6" aria-hidden="true" />
                        ) : (
                            <Menu className="h-6 w-6" aria-hidden="true" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className={`md:hidden ${isSolid ? 'bg-white' : 'bg-black/80 backdrop-blur-sm'}`}>
                    <div className="space-y-1 px-4 pb-3 pt-2">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`block rounded-md px-3 py-2 text-base font-medium ${isSolid
                                        ? 'text-gray-700 hover:bg-gray-100 hover:text-primary-600'
                                        : 'text-white hover:bg-white/10'
                                    }`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
}

