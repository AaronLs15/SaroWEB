'use client';

import { useEffect, useRef } from 'react';
import { useGsapScroll, animateCounter } from '@/hooks/useGsapScroll';
import { Home, Users, MapPin, Trophy } from 'lucide-react';

const stats = [
    {
        icon: Home,
        value: 350,
        suffix: '+',
        label: 'Propiedades Vendidas',
    },
    {
        icon: Users,
        value: 1200,
        suffix: '+',
        label: 'Clientes Satisfechos',
    },
    {
        icon: MapPin,
        value: 25,
        suffix: '+',
        label: 'Ubicaciones',
    },
    {
        icon: Trophy,
        value: 37,
        suffix: '+',
        label: 'Años de Experiencia',
    },
];

export default function StatsSection() {
    const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const hasAnimated = useRef(false);

    useGsapScroll();

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated.current) {
                        hasAnimated.current = true;
                        counterRefs.current.forEach((ref, index) => {
                            if (ref) {
                                animateCounter(ref, stats[index].value, 2);
                            }
                        });
                    }
                });
            },
            { threshold: 0.3 }
        );

        const section = document.querySelector('.stats-section');
        if (section) {
            observer.observe(section);
        }

        return () => {
            if (section) {
                observer.unobserve(section);
            }
        };
    }, []);

    return (
        <section className="stats-section relative py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />
            </div>

            <div className="container-custom relative">
                <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div key={index} className="text-center">
                                <div className="mb-4 inline-flex rounded-full bg-white/10 p-4 backdrop-blur-sm">
                                    <Icon className="h-8 w-8" />
                                </div>

                                <div className="mb-2">
                                    <span
                                        ref={(el) => {
                                            counterRefs.current[index] = el;
                                        }}
                                        className="text-4xl font-bold lg:text-5xl"
                                    >
                                        0
                                    </span>
                                    <span className="text-4xl font-bold lg:text-5xl">{stat.suffix}</span>
                                </div>

                                <p className="text-lg text-primary-100">{stat.label}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
