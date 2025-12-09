'use client';

import { useFadeIn } from '@/hooks/useGsapScroll';
import ContactForm from '@/components/ContactForm';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function ContactSection() {
    useFadeIn('.contact-content', {});

    return (
        <section className="py-20 bg-white">
            <div className="container-custom">
                {/* Header */}
                <div className="mx-auto max-w-2xl text-center mb-16 contact-content">
                    <span className="text-sm font-semibold text-primary-600 uppercase tracking-wider">
                        Contáctanos
                    </span>
                    <h2 className="mt-4 text-4xl font-bold text-gray-900 lg:text-5xl">
                        ¿Listo para Encontrar tu Propiedad Ideal?
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Estamos aquí para ayudarte. Completa el formulario y nos pondremos en contacto contigo.
                    </p>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                    {/* Contact Info */}
                    <div className="contact-content space-y-8">
                        <div>
                            <h3 className="mb-6 text-2xl font-bold text-gray-900">
                                Información de Contacto
                            </h3>

                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="rounded-lg bg-primary-100 p-3">
                                        <MapPin className="h-6 w-6 text-primary-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Dirección</p>
                                        <p className="mt-1 text-gray-600">Santiago, NL</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="rounded-lg bg-primary-100 p-3">
                                        <Phone className="h-6 w-6 text-primary-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Teléfono</p>
                                        <p className="mt-1 text-gray-600">+52 1 81 2014 1491</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="rounded-lg bg-primary-100 p-3">
                                        <Mail className="h-6 w-6 text-primary-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Email</p>
                                        <p className="mt-1 text-gray-600">saroinmuebles01@gmail.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="rounded-lg bg-primary-100 p-3">
                                        <Clock className="h-6 w-6 text-primary-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Horario</p>
                                        <p className="mt-1 text-gray-600">Lunes - Viernes: 9:00 AM - 6:00 PM</p>
                                        <p className="text-gray-600">Sábado: 10:00 AM - 2:00 PM</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Map placeholder 
                        <div className="rounded-xl bg-gray-200 h-64 flex items-center justify-center overflow-hidden">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.157!2d-99.133!3d19.432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDI1JzU1LjIiTiA5OcKwMDcnNTguOCJX!5e0!3m2!1ses!2smx!4v1234567890"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>*/}
                    </div>

                    {/* Contact Form */}
                    <div className="contact-content">
                        <ContactForm origenSlug="" />
                    </div>
                </div>
            </div>
        </section>
    );
}
