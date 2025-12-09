'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { Casa, Terreno, CasaImagen, TerrenoImagen } from '@/types/database';
import { formatCurrency, getFirstImageUrl } from '@/lib/utils';
import LoadingSkeleton from './LoadingSkeleton';
import { Bed, Bath, Car, Maximize, MapPin, Star } from 'lucide-react';

type FeaturedProperty = (Casa | Terreno) & {
    tipo: 'casa' | 'terreno';
    imagenes: (CasaImagen | TerrenoImagen)[];
};

export default function FeaturedProperties() {
    const [properties, setProperties] = useState<FeaturedProperty[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchFeaturedProperties() {
            try {
                // Fetch featured casas
                const { data: casas, error: casasError } = await supabase
                    .from('casas')
                    .select('*, casa_imagen(*)')
                    .eq('estado', 'publicado')
                    .eq('es_destacado', true)
                    .order('fecha_publicacion', { ascending: false })
                    .limit(3);

                if (casasError) throw casasError;

                // Fetch featured terrenos
                const { data: terrenos, error: terrenosError } = await supabase
                    .from('terrenos')
                    .select('*, terreno_imagen(*)')
                    .eq('estado', 'publicado')
                    .eq('es_destacado', true)
                    .order('fecha_publicacion', { ascending: false })
                    .limit(3);

                if (terrenosError) throw terrenosError;

                // Combine and format
                const featured: FeaturedProperty[] = [
                    ...(casas || []).map((casa) => ({
                        ...casa,
                        tipo: 'casa' as const,
                        imagenes: casa.casa_imagen || [],
                    })),
                    ...(terrenos || []).map((terreno) => ({
                        ...terreno,
                        tipo: 'terreno' as const,
                        imagenes: terreno.terreno_imagen || [],
                    })),
                ].slice(0, 6);

                setProperties(featured);
            } catch (error) {
                console.error('Error fetching featured properties:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchFeaturedProperties();
    }, []);

    if (loading) {
        return (
            <section className="container-custom py-16">
                <h2 className="mb-8 text-center text-3xl font-bold">Propiedades Destacadas</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                        <LoadingSkeleton key={i} />
                    ))}
                </div>
            </section>
        );
    }

    if (properties.length === 0) {
        return null;
    }

    return (
        <section className="container-custom py-16">
            <div className="mb-12 text-center">
                <div className="mb-4 inline-flex items-center space-x-2 rounded-full bg-primary-50 px-4 py-2">
                    <Star className="h-4 w-4 text-primary-600" />
                    <span className="text-sm font-semibold text-primary-600">Destacadas</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                    Propiedades Destacadas
                </h2>
                <p className="mt-4 text-lg text-gray-600">
                    Explora nuestra selección de propiedades premium
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {properties.map((property) => (
                    <Link
                        key={`${property.tipo}-${property.id}`}
                        href={`/${property.tipo === 'casa' ? 'casas' : 'terrenos'}/${property.slug}`}
                        className="card group overflow-hidden"
                    >
                        {/* Image */}
                        <div className="relative h-48 overflow-hidden bg-gray-200">
                            <Image
                                src={getFirstImageUrl(property.imagenes)}
                                alt={property.titulo}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <div className="absolute right-3 top-3 rounded-full bg-primary-600 px-3 py-1 text-xs font-semibold text-white">
                                {property.tipo === 'casa' ? 'Casa' : 'Terreno'}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <h3 className="mb-2 text-lg font-semibold text-gray-900 line-clamp-1">
                                {property.titulo}
                            </h3>

                            {property.direccion_corta && (
                                <p className="mb-3 flex items-center text-sm text-gray-600">
                                    <MapPin className="mr-1 h-4 w-4" />
                                    {property.direccion_corta}
                                </p>
                            )}

                            <p className="mb-4 text-2xl font-bold text-primary-600">
                                {formatCurrency(property.precio_cents)}
                            </p>

                            {/* Type-specific details */}
                            {property.tipo === 'casa' && 'recamaras' in property && (
                                <div className="flex items-center space-x-4 text-sm text-gray-600">
                                    {property.recamaras && (
                                        <div className="flex items-center">
                                            <Bed className="mr-1 h-4 w-4" />
                                            <span>{property.recamaras}</span>
                                        </div>
                                    )}
                                    {property.banos && (
                                        <div className="flex items-center">
                                            <Bath className="mr-1 h-4 w-4" />
                                            <span>{property.banos}</span>
                                        </div>
                                    )}
                                    {property.estacionamientos && (
                                        <div className="flex items-center">
                                            <Car className="mr-1 h-4 w-4" />
                                            <span>{property.estacionamientos}</span>
                                        </div>
                                    )}
                                </div>
                            )}

                            {property.tipo === 'terreno' && 'superficie_m2' in property && property.superficie_m2 && (
                                <div className="flex items-center text-sm text-gray-600">
                                    <Maximize className="mr-1 h-4 w-4" />
                                    <span>{property.superficie_m2} m²</span>
                                </div>
                            )}
                        </div>
                    </Link>
                ))}
            </div>

            <div className="mt-12 text-center">
                <Link href="/casas" className="btn-primary mr-4">
                    Ver Todas las Casas
                </Link>
                <Link href="/terrenos" className="btn-secondary">
                    Ver Todos los Terrenos
                </Link>
            </div>
        </section>
    );
}
