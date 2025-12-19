'use client';

import { useFadeIn } from '@/hooks/useGsapScroll';
import { Building2, Users, Award, TrendingUp } from 'lucide-react';
import Image from 'next/image';

export default function AboutSection() {
    useFadeIn('.about-content', {});

    return (
        <section className="py-20 bg-white">
            <div className="container-custom">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
                    {/* Image */}
                    <div className="about-content relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                            src="/images/about-building.jpg"
                            alt="INMOBILIARIA SARO"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary-900/30 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="about-content space-y-6">
                        <div className="inline-block">
                            <span className="text-sm font-semibold text-primary-600 uppercase tracking-wider">
                                Acerca de Nosotros
                            </span>
                        </div>

                        <h2 className="text-4xl font-bold text-gray-900 lg:text-5xl">
                            Tu Socio de Confianza en Bienes Raíces
                        </h2>

                        <p className="text-lg text-gray-600 leading-relaxed">
                            En INMOBILIARIA SARO, nos especializamos en conectar a las personas con las propiedades
                            de sus sueños. Con años de experiencia en el mercado inmobiliario, ofrecemos un
                            servicio personalizado y profesional que garantiza resultados excepcionales.
                        </p>

                        <p className="text-lg text-gray-600 leading-relaxed">
                            Nuestro compromiso es brindarte la mejor experiencia, desde la primera consulta
                            hasta la entrega de llaves. Confía en expertos que entienden tus necesidades.
                        </p>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-6 pt-6">
                            <div className="flex items-start space-x-3">
                                <div className="rounded-lg bg-primary-100 p-3">
                                    <Building2 className="h-6 w-6 text-primary-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">500+</p>
                                    <p className="text-sm text-gray-600">Propiedades</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="rounded-lg bg-primary-100 p-3">
                                    <Users className="h-6 w-6 text-primary-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">1,200+</p>
                                    <p className="text-sm text-gray-600">Clientes Felices</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="rounded-lg bg-primary-100 p-3">
                                    <Award className="h-6 w-6 text-primary-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">37+</p>
                                    <p className="text-sm text-gray-600">Años de Experiencia</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <div className="rounded-lg bg-primary-100 p-3">
                                    <TrendingUp className="h-6 w-6 text-primary-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold text-gray-900">98%</p>
                                    <p className="text-sm text-gray-600">Satisfacción</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
