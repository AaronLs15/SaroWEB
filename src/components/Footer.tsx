import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="container-custom py-12">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {/* About */}
                    <div>
                        <h3 className="mb-4 text-lg font-semibold text-white">Sora Company</h3>
                        <p className="text-sm">
                            Tu socio de confianza en bienes raíces. Encuentra la propiedad de tus sueños con nosotros.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-4 text-lg font-semibold text-white">Enlaces Rápidos</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/" className="transition-colors hover:text-white">
                                    Inicio
                                </Link>
                            </li>
                            <li>
                                <Link href="/casas" className="transition-colors hover:text-white">
                                    Casas
                                </Link>
                            </li>
                            <li>
                                <Link href="/terrenos" className="transition-colors hover:text-white">
                                    Terrenos
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="mb-4 text-lg font-semibold text-white">Contacto</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start space-x-3">
                                <MapPin className="h-5 w-5 flex-shrink-0 text-primary-400" />
                                <span>Santiago, NL</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone className="h-5 w-5 flex-shrink-0 text-primary-400" />
                                <span>+52 1 81 2014 1491</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail className="h-5 w-5 flex-shrink-0 text-primary-400" />
                                <span>saroinmuebles01@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
