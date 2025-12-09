'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Terreno, TerrenoImagen } from '@/types/database';
import PropertyCard from '@/components/PropertyCard';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import { Trees } from 'lucide-react';

import { usePageView } from '@/hooks/usePageView';
import { SlidersHorizontal } from 'lucide-react';

type TerrenoConImagenes = Terreno & { terreno_imagen: TerrenoImagen[] };

export default function TerrenosPage() {
    usePageView();
    const [terrenos, setTerrenos] = useState<TerrenoConImagenes[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        price: 'all',
        surface: 'all',
    });

    useEffect(() => {
        async function fetchTerrenos() {
            try {
                let query = supabase
                    .from('terrenos')
                    .select('*, terreno_imagen(*)')
                    .eq('estado', 'publicado')
                    .order('es_destacado', { ascending: false })
                    .order('fecha_publicacion', { ascending: false });

                // Apply filters
                if (filters.price === 'low') {
                    query = query.lte('precio_cents', 100000000); // Up to 1M MXN
                } else if (filters.price === 'mid') {
                    query = query.gt('precio_cents', 100000000).lte('precio_cents', 500000000); // 1M-5M
                } else if (filters.price === 'high') {
                    query = query.gt('precio_cents', 500000000); // Above 5M
                }

                if (filters.surface === 'small') {
                    query = query.lte('superficie_m2', 200);
                } else if (filters.surface === 'medium') {
                    query = query.gt('superficie_m2', 200).lte('superficie_m2', 500);
                } else if (filters.surface === 'large') {
                    query = query.gt('superficie_m2', 500);
                }

                const { data, error } = await query;

                if (error) throw error;
                setTerrenos(data || []);
            } catch (error) {
                console.error('Error fetching terrenos:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchTerrenos();
    }, [filters]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-green-700 py-12 text-white">
                <div className="container-custom">
                    <div className="flex items-center space-x-3">
                        <Trees className="h-8 w-8" />
                        <h1 className="text-3xl font-bold sm:text-4xl">Terrenos en Venta</h1>
                    </div>
                    <p className="mt-3 text-lg text-green-100">
                        Encuentra el terreno ideal para tu proyecto
                    </p>
                </div>
            </div>

            <div className="container-custom py-12">
                {/* Count */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-gray-600">
                        {loading ? 'Cargando...' : `${terrenos.length} ${terrenos.length === 1 ? 'terreno encontrado' : 'terrenos encontrados'}`}
                    </p>

                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center space-x-2">
                            <SlidersHorizontal className="h-5 w-5 text-gray-600" />
                            <select
                                value={filters.price}
                                onChange={(e) => setFilters({ ...filters, price: e.target.value })}
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            >
                                <option value="all">Todos los precios</option>
                                <option value="low">Hasta $1,000,000</option>
                                <option value="mid">$1,000,000 - $5,000,000</option>
                                <option value="high">Más de $5,000,000</option>
                            </select>
                        </div>

                        <select
                            value={filters.surface}
                            onChange={(e) => setFilters({ ...filters, surface: e.target.value })}
                            className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                            <option value="all">Superficie (Todas)</option>
                            <option value="small">Hasta 200 m²</option>
                            <option value="medium">200 m² - 500 m²</option>
                            <option value="large">Más de 500 m²</option>
                        </select>
                    </div>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <LoadingSkeleton key={i} />
                        ))}
                    </div>
                ) : terrenos.length === 0 ? (
                    <div className="rounded-lg bg-white p-12 text-center">
                        <Trees className="mx-auto h-16 w-16 text-gray-400" />
                        <h3 className="mt-4 text-lg font-semibold text-gray-900">
                            No se encontraron terrenos
                        </h3>
                        <p className="mt-2 text-gray-600">
                            Vuelve pronto para ver nuevas propiedades
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {terrenos.map((terreno) => (
                            <PropertyCard
                                key={terreno.id}
                                property={terreno}
                                type="terreno"
                                images={terreno.terreno_imagen}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
