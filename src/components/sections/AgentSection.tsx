'use client';

import { useFadeIn } from '@/hooks/useGsapScroll';
import { Phone, Mail, Award, Star } from 'lucide-react';
import Image from 'next/image';

export default function AgentSection() {
    useFadeIn('.agent-content', {});

    return (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
            <div className="container-custom">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
                    {/* Content */}
                    <div className="agent-content space-y-6 order-2 lg:order-1">
                        <div className="inline-block">
                            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wider">
                                Nuestro Especialista
                            </span>
                        </div>

                        <h2 className="text-4xl font-bold text-gray-900 lg:text-5xl">
                            Conoce a Tu Asesor Inmobiliario
                        </h2>

                        <p className="text-lg text-gray-600 leading-relaxed">
                            Broker inmobiliario con más de 35 años de experiencia en la venta de casas y terrenos industriales, especializado en brindar soluciones integrales. Cuenta con amplio conocimiento en movimientos catastrales, escrituración y trámites notariales, ofreciendo a sus clientes un servicio confiable, seguro y eficiente en cada etapa del proceso inmobiliario.
                        </p>

                        <div className="space-y-4">
                            <h3 className="text-2xl font-bold text-gray-900">
                                {/* Aquí puedes cambiar el nombre */}
                                Alejandro Salinas
                            </h3>
                            <p className="text-primary-600 font-medium text-lg">
                                Director de Ventas
                            </p>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-2 gap-4 pt-4">
                            <div className="flex items-center space-x-3">
                                <div className="rounded-full bg-primary-100 p-2">
                                    <Award className="h-5 w-5 text-primary-600" />
                                </div>
                                <span className="text-gray-700">Experto Certificado</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="rounded-full bg-primary-100 p-2">
                                    <Star className="h-5 w-5 text-primary-600" />
                                </div>
                                <span className="text-gray-700">+500 Ventas</span>
                            </div>
                        </div>

                        {/* Contact Info 
                        <div className="flex flex-col sm:flex-row gap-4 pt-6">
                            <a
                                href="tel:+521234567890"
                                className="inline-flex items-center justify-center space-x-2 rounded-lg bg-primary-600 px-6 py-3 text-white font-medium transition-all hover:bg-primary-700 hover:shadow-lg"
                            >
                                <Phone className="h-5 w-5" />
                                <span>Llamar Ahora</span>
                            </a>
                            <a
                                href="mailto:ventas@inmobiliariasora.com"
                                className="inline-flex items-center justify-center space-x-2 rounded-lg border-2 border-primary-600 px-6 py-3 text-primary-600 font-medium transition-all hover:bg-primary-50"
                            >
                                <Mail className="h-5 w-5" />
                                <span>Enviar Email</span>
                            </a>
                        </div>*/}
                    </div>

                    {/* Image */}
                    <div className="agent-content relative order-1 lg:order-2">
                        <div className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                            <Image
                                src="/images/agent.jpeg"
                                alt="Asesor Inmobiliario"
                                fill
                                className="object-cover object-top"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary-900/30 to-transparent" />
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute -bottom-6 -left-6 h-24 w-24 rounded-2xl bg-primary-600 opacity-20 blur-xl" />
                        <div className="absolute -top-6 -right-6 h-32 w-32 rounded-full bg-primary-400 opacity-20 blur-xl" />

                        {/* Badge */}
                        <div className="absolute bottom-6 left-6 right-6 rounded-xl bg-white/90 backdrop-blur-sm p-4 shadow-lg">
                            <div className="flex items-center space-x-3">
                                <div className="flex -space-x-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className="h-5 w-5 text-yellow-400 fill-yellow-400"
                                        />
                                    ))}
                                </div>
                                <span className="text-gray-700 font-medium">
                                    Calificación 5 estrellas
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
