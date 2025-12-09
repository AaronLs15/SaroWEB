import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { formatCurrency, formatNumber } from '@/lib/utils';
import ImageGallery from '@/components/ImageGallery';
import ContactForm from '@/components/ContactForm';
import {
    Bed,
    Bath,
    Car,
    Maximize,
    MapPin,
    Calendar,
    Home as HomeIcon,
    ExternalLink,
    CheckCircle,
} from 'lucide-react';

type Props = {
    params: Promise<{ slug: string }>;
};

async function getCasa(slug: string) {
    const { data, error } = await supabase
        .from('casas')
        .select('*, casa_imagen(*)')
        .eq('slug', slug)
        .eq('estado', 'publicado')
        .single();

    if (error || !data) return null;
    return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const casa = await getCasa(slug);

    if (!casa) {
        return {
            title: 'Casa no encontrada',
        };
    }

    return {
        title: `${casa.titulo} - Sora Company`,
        description: casa.descripcion || `Casa en venta: ${casa.titulo}`,
    };
}

export default async function CasaDetailPage({ params }: Props) {
    const { slug } = await params;
    const casa = await getCasa(slug);

    if (!casa) {
        notFound();
    }

    const servicios = casa.servicios as Record<string, boolean>;
    const amenidades = casa.amenidades as string[];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container-custom py-8">
                {/* Breadcrumb */}
                <nav className="mb-6 flex items-center space-x-2 text-sm text-gray-600">
                    <Link href="/" className="hover:text-primary-600">
                        Inicio
                    </Link>
                    <span>/</span>
                    <Link href="/casas" className="hover:text-primary-600">
                        Casas
                    </Link>
                    <span>/</span>
                    <span className="text-gray-900">{casa.titulo}</span>
                </nav>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Main content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Gallery */}
                        <ImageGallery images={casa.casa_imagen || []} />

                        {/* Title and Price */}
                        <div>
                            <h1 className="mb-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                                {casa.titulo}
                            </h1>
                            {casa.direccion_corta && (
                                <p className="mb-4 flex items-center text-lg text-gray-600">
                                    <MapPin className="mr-2 h-5 w-5" />
                                    {casa.direccion_corta}
                                </p>
                            )}
                            <p className="text-4xl font-bold text-primary-600">
                                {formatCurrency(casa.precio_cents)}
                            </p>
                        </div>

                        {/* Key features */}
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                            {casa.recamaras !== null && (
                                <div className="rounded-lg bg-white p-4 text-center shadow-sm">
                                    <Bed className="mx-auto mb-2 h-8 w-8 text-primary-600" />
                                    <p className="text-2xl font-bold text-gray-900">{casa.recamaras}</p>
                                    <p className="text-sm text-gray-600">
                                        {casa.recamaras === 1 ? 'Recámara' : 'Recámaras'}
                                    </p>
                                </div>
                            )}
                            {casa.banos !== null && (
                                <div className="rounded-lg bg-white p-4 text-center shadow-sm">
                                    <Bath className="mx-auto mb-2 h-8 w-8 text-primary-600" />
                                    <p className="text-2xl font-bold text-gray-900">{casa.banos}</p>
                                    <p className="text-sm text-gray-600">
                                        {casa.banos === 1 ? 'Baño' : 'Baños'}
                                    </p>
                                </div>
                            )}
                            {casa.estacionamientos !== null && (
                                <div className="rounded-lg bg-white p-4 text-center shadow-sm">
                                    <Car className="mx-auto mb-2 h-8 w-8 text-primary-600" />
                                    <p className="text-2xl font-bold text-gray-900">{casa.estacionamientos}</p>
                                    <p className="text-sm text-gray-600">
                                        {casa.estacionamientos === 1 ? 'Auto' : 'Autos'}
                                    </p>
                                </div>
                            )}
                            {casa.construccion_m2 !== null && (
                                <div className="rounded-lg bg-white p-4 text-center shadow-sm">
                                    <Maximize className="mx-auto mb-2 h-8 w-8 text-primary-600" />
                                    <p className="text-2xl font-bold text-gray-900">
                                        {formatNumber(casa.construccion_m2)}
                                    </p>
                                    <p className="text-sm text-gray-600">m² construidos</p>
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        {casa.descripcion && (
                            <div className="rounded-xl bg-white p-6 shadow-sm">
                                <h2 className="mb-4 text-2xl font-bold text-gray-900">Descripción</h2>
                                <p className="whitespace-pre-line text-gray-700 leading-relaxed">
                                    {casa.descripcion}
                                </p>
                            </div>
                        )}

                        {/* Details */}
                        <div className="rounded-xl bg-white p-6 shadow-sm">
                            <h2 className="mb-4 text-2xl font-bold text-gray-900">Detalles</h2>
                            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {casa.pisos !== null && (
                                    <div>
                                        <dt className="text-sm font-medium text-gray-600">Niveles</dt>
                                        <dd className="mt-1 text-lg font-semibold text-gray-900">
                                            {casa.pisos} {casa.pisos === 1 ? 'nivel' : 'niveles'}
                                        </dd>
                                    </div>
                                )}
                                {casa.terreno_m2 !== null && (
                                    <div>
                                        <dt className="text-sm font-medium text-gray-600">Terreno</dt>
                                        <dd className="mt-1 text-lg font-semibold text-gray-900">
                                            {formatNumber(casa.terreno_m2)} m²
                                        </dd>
                                    </div>
                                )}
                                {casa.ano_construccion !== null && (
                                    <div>
                                        <dt className="text-sm font-medium text-gray-600">Año de construcción</dt>
                                        <dd className="mt-1 text-lg font-semibold text-gray-900">
                                            {casa.ano_construccion}
                                        </dd>
                                    </div>
                                )}
                            </dl>
                        </div>

                        {/* Amenities */}
                        {amenidades && amenidades.length > 0 && (
                            <div className="rounded-xl bg-white p-6 shadow-sm">
                                <h2 className="mb-4 text-2xl font-bold text-gray-900">Amenidades</h2>
                                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                    {amenidades.map((amenidad, index) => (
                                        <li key={index} className="flex items-start">
                                            <CheckCircle className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                                            <span className="text-gray-700 capitalize">{amenidad}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Services */}
                        {servicios && Object.keys(servicios).length > 0 && (
                            <div className="rounded-xl bg-white p-6 shadow-sm">
                                <h2 className="mb-4 text-2xl font-bold text-gray-900">Servicios</h2>
                                <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                    {Object.entries(servicios).map(([servicio, disponible]) => (
                                        disponible && (
                                            <li key={servicio} className="flex items-start">
                                                <CheckCircle className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                                                <span className="text-gray-700 capitalize">{servicio}</span>
                                            </li>
                                        )
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Map link */}
                        {casa.link_maps && (
                            <a
                                href={casa.link_maps}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary inline-flex w-full justify-center sm:w-auto"
                            >
                                <MapPin className="mr-2 h-5 w-5" />
                                Ver en Google Maps
                                <ExternalLink className="ml-2 h-4 w-4" />
                            </a>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <ContactForm origenSlug={casa.slug} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
