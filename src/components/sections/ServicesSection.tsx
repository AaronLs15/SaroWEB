'use client';

import { useStaggerAnimation } from '@/hooks/useGsapScroll';
import { Shield, Banknote, Headphones, FileCheck } from 'lucide-react';

const services = [
    {
        icon: Shield,
        title: 'Asesoría Legal',
        description: 'Gestión completa de documentación y trámites legales para tu tranquilidad.',
    },
    {
        icon: Banknote,
        title: 'Financiamiento',
        description: 'Te ayudamos a encontrar las mejores opciones de crédito hipotecario.',
    },
    {
        icon: Headphones,
        title: 'Atención Personalizada',
        description: 'Un asesor dedicado que te acompaña en cada paso del proceso.',
    },
    {
        icon: FileCheck,
        title: 'Transparencia Total',
        description: 'Información clara y verificada de todas nuestras propiedades.',
    },
];

export default function ServicesSection() {
    useStaggerAnimation('.service-card', {});

    return (
        <section className="py-20 bg-gray-50">
            <div className="container-custom">
                {/* Header */}
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <span className="text-sm font-semibold text-primary-600 uppercase tracking-wider">
                        Nuestros Servicios
                    </span>
                    <h2 className="mt-4 text-4xl font-bold text-gray-900 lg:text-5xl">
                        ¿Por Qué Elegir INMOBILIARA SARO?
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Ofrecemos un servicio integral que va más allá de solo mostrar propiedades.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <div
                                key={index}
                                className="service-card group rounded-2xl bg-white p-8 shadow-lg transition-all hover:shadow-2xl hover:-translate-y-2"
                            >
                                <div className="mb-6 inline-flex rounded-xl bg-primary-100 p-4 transition-colors group-hover:bg-primary-600">
                                    <Icon className="h-8 w-8 text-primary-600 transition-colors group-hover:text-white" />
                                </div>

                                <h3 className="mb-3 text-xl font-bold text-gray-900">
                                    {service.title}
                                </h3>

                                <p className="text-gray-600 leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
