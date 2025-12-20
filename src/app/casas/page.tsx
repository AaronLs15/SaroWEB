'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Casa, CasaImagen } from '@/types/database';
import PropertyCard from '@/components/PropertyCard';
import LoadingSkeleton from '@/components/LoadingSkeleton';
import { Home, SlidersHorizontal } from 'lucide-react';

import { usePageView } from '@/hooks/usePageView';

type CasaConImagenes = Casa & { casa_imagen: CasaImagen[] };

export default function CasasPage() {
    usePageView();
    const [casas, setCasas] = useState<CasaConImagenes[]>([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        price: 'all',
        recamaras: 'any',
        banos: 'any',
        estacionamientos: 'any',
    });

    useEffect(() => {
        async function fetchCasas() {
            setLoading(true);
            try {
                let query = supabase
                    .from('casas')
                    .select('*, casa_imagen(*)')
                    .eq('estado', 'publicado')
                    .order('es_destacado', { ascending: false })
                    .order('fecha_publicacion', { ascending: false });

                // Apply filters
                if (filters.price === 'low') {
                    query = query.lte('precio_cents', 500000000); // Up to 5M MXN
                } else if (filters.price === 'mid') {
                    query = query.gt('precio_cents', 500000000).lte('precio_cents', 1000000000); // 5M-10M
                } else if (filters.price === 'high') {
                    query = query.gt('precio_cents', 1000000000); // Above 10M
                }

                if (filters.recamaras !== 'any') {
                    query = query.gte('recamaras', parseInt(filters.recamaras));
                }
                if (filters.banos !== 'any') {
                    query = query.gte('banos', parseInt(filters.banos));
                }
                if (filters.estacionamientos !== 'any') {
                    query = query.gte('estacionamientos', parseInt(filters.estacionamientos));
                }

                const { data, error } = await query;

                if (error) throw error;
                setCasas(data || []);
            } catch (error) {
                console.error('Error fetching casas:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchCasas();
    }, [filters]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-primary-600 pt-20 pb-12 text-white">
                <div className="container-custom">
                    <div className="flex items-center space-x-3">
                        <Home className="h-8 w-8" />
                        <h1 className="text-3xl font-bold sm:text-4xl">Casas en Venta</h1>
                    </div>
                    <p className="mt-3 text-lg text-primary-100">
                        Encuentra la casa perfecta para ti y tu familia
                    </p>
                </div>
            </div>

            <div className="container-custom py-12">
                {/* Filters */}
                <div className="mb-8 space-y-4">
                    <p className="text-sm text-gray-600">
                        {loading ? 'Cargando...' : `${casas.length} ${casas.length === 1 ? 'propiedad encontrada' : 'propiedades encontradas'}`}
                    </p>

                    <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center sm:gap-4">
                        <div className="col-span-2 flex items-center space-x-2 sm:col-span-1">
                            <SlidersHorizontal className="h-5 w-5 text-gray-600 hidden sm:block" />
                            <select
                                value={filters.price}
                                onChange={(e) => setFilters({ ...filters, price: e.target.value })}
                                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-base focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 sm:w-auto sm:px-4 sm:py-2 sm:text-sm"
                            >
                                <option value="all">Todos los precios</option>
                                <option value="low">Hasta $5,000,000</option>
                                <option value="mid">$5,000,000 - $10,000,000</option>
                                <option value="high">Más de $10,000,000</option>
                            </select>
                        </div>

                        <select
                            value={filters.recamaras}
                            onChange={(e) => setFilters({ ...filters, recamaras: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-base focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 sm:w-auto sm:px-4 sm:py-2 sm:text-sm"
                        >
                            <option value="any">Recámaras (Todas)</option>
                            <option value="1">1+</option>
                            <option value="2">2+</option>
                            <option value="3">3+</option>
                            <option value="4">4+</option>
                        </select>

                        <select
                            value={filters.banos}
                            onChange={(e) => setFilters({ ...filters, banos: e.target.value })}
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-base focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 sm:w-auto sm:px-4 sm:py-2 sm:text-sm"
                        >
                            <option value="any">Baños (Todos)</option>
                            <option value="1">1+</option>
                            <option value="2">2+</option>
                            <option value="3">3+</option>
                        </select>

                        <select
                            value={filters.estacionamientos}
                            onChange={(e) => setFilters({ ...filters, estacionamientos: e.target.value })}
                            className="col-span-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-3 text-base focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 sm:w-auto sm:px-4 sm:py-2 sm:text-sm"
                        >
                            <option value="any">Estacionamientos (Todos)</option>
                            <option value="1">1+</option>
                            <option value="2">2+</option>
                            <option value="3">3+</option>
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
                ) : casas.length === 0 ? (
                    <div className="rounded-lg bg-white p-12 text-center">
                        <Home className="mx-auto h-16 w-16 text-gray-400" />
                        <h3 className="mt-4 text-lg font-semibold text-gray-900">
                            No se encontraron casas
                        </h3>
                        <p className="mt-2 text-gray-600">
                            Intenta ajustar los filtros para ver más resultados
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {casas.map((casa) => (
                            <PropertyCard
                                key={casa.id}
                                property={casa}
                                type="casa"
                                images={casa.casa_imagen}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
