import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { formatCurrency, formatNumber } from '@/lib/utils';
import ImageGallery from '@/components/ImageGallery';
import ContactForm from '@/components/ContactForm';
import { Maximize, MapPin, ExternalLink, CheckCircle } from 'lucide-react';

type Props = {
    params: Promise<{ slug: string }>;
};

async function getTerreno(slug: string) {
    const { data, error } = await supabase
        .from('terrenos')
        .select('*, terreno_imagen(*)')
        .eq('slug', slug)
        .eq('estado', 'publicado')
        .single();

    if (error || !data) return null;
    return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const terreno = await getTerreno(slug);

    if (!terreno) {
        return {
            title: 'Terreno no encontrado',
        };
    }

    return {
        title: `${terreno.titulo} - Sora Company`,
        description: terreno.descripcion || `Terreno en venta: ${terreno.titulo}`,
    };
}

export default async function TerrenoDetailPage({ params }: Props) {
    const { slug } = await params;
    const terreno = await getTerreno(slug);

    if (!terreno) {
        notFound();
    }

    const servicios = terreno.servicios as Record<string, boolean>;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container-custom py-8">
                {/* Breadcrumb */}
                <nav className="mb-6 flex items-center space-x-2 text-sm text-gray-600">
                    <Link href="/" className="hover:text-primary-600">
                        Inicio
                    </Link>
                    <span>/</span>
                    <Link href="/terrenos" className="hover:text-primary-600">
                        Terrenos
                    </Link>
                    <span>/</span>
                    <span className="text-gray-900">{terreno.titulo}</span>
                </nav>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Main content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Gallery */}
                        <ImageGallery images={terreno.terreno_imagen || []} />

                        {/* Title and Price */}
                        <div>
                            <h1 className="mb-2 text-3xl font-bold text-gray-900 sm:text-4xl">
                                {terreno.titulo}
                            </h1>
                            {terreno.direccion_corta && (
                                <p className="mb-4 flex items-center text-lg text-gray-600">
                                    <MapPin className="mr-2 h-5 w-5" />
                                    {terreno.direccion_corta}
                                </p>
                            )}
                            <p className="text-4xl font-bold text-primary-600">
                                {formatCurrency(terreno.precio_cents)}
                            </p>
                        </div>

                        {/* Key feature - Surface area */}
                        {terreno.superficie_m2 !== null && (
                            <div className="rounded-lg bg-white p-8 text-center shadow-sm">
                                <Maximize className="mx-auto mb-4 h-12 w-12 text-primary-600" />
                                <p className="text-4xl font-bold text-gray-900">
                                    {formatNumber(terreno.superficie_m2)}
                                </p>
                                <p className="mt-2 text-lg text-gray-600">metros cuadrados</p>
                            </div>
                        )}

                        {/* Description */}
                        {terreno.descripcion && (
                            <div className="rounded-xl bg-white p-6 shadow-sm">
                                <h2 className="mb-4 text-2xl font-bold text-gray-900">Descripción</h2>
                                <p className="whitespace-pre-line text-gray-700 leading-relaxed">
                                    {terreno.descripcion}
                                </p>
                            </div>
                        )}

                        {/* Services */}
                        {servicios && Object.keys(servicios).length > 0 && (
                            <div className="rounded-xl bg-white p-6 shadow-sm">
                                <h2 className="mb-4 text-2xl font-bold text-gray-900">Servicios Disponibles</h2>
                                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
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

                        {/* Tags */}
                        {terreno.etiquetas && terreno.etiquetas.length > 0 && (
                            <div className="rounded-xl bg-white p-6 shadow-sm">
                                <h2 className="mb-4 text-2xl font-bold text-gray-900">Características</h2>
                                <div className="flex flex-wrap gap-2">
                                    {terreno.etiquetas.map((etiqueta: string, index: number) => (
                                        <span
                                            key={index}
                                            className="rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-700"
                                        >
                                            {etiqueta}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Coordinates */}
                        {terreno.lat !== null && terreno.lng !== null && (
                            <div className="rounded-xl bg-white p-6 shadow-sm">
                                <h2 className="mb-4 text-2xl font-bold text-gray-900">Ubicación</h2>
                                <dl className="grid grid-cols-2 gap-4">
                                    <div>
                                        <dt className="text-sm font-medium text-gray-600">Latitud</dt>
                                        <dd className="mt-1 text-lg font-semibold text-gray-900">
                                            {terreno.lat.toFixed(6)}
                                        </dd>
                                    </div>
                                    <div>
                                        <dt className="text-sm font-medium text-gray-600">Longitud</dt>
                                        <dd className="mt-1 text-lg font-semibold text-gray-900">
                                            {terreno.lng.toFixed(6)}
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        )}

                        {/* Map link */}
                        {terreno.link_maps && (
                            <a
                                href={terreno.link_maps}
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
                            <ContactForm origenSlug={terreno.slug} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
