// Database Types based on Supabase schema

export type EstadoPropiedad = 'borrador' | 'publicado' | 'archivado';

export interface Terreno {
    id: number;
    slug: string;
    titulo: string;
    descripcion: string | null;
    link_maps: string | null;
    precio_cents: number;
    moneda: string;
    superficie_m2: number | null;
    lat: number | null;
    lng: number | null;
    direccion_corta: string | null;
    servicios: Record<string, boolean>;
    etiquetas: string[];
    es_destacado: boolean;
    estado: EstadoPropiedad;
    fecha_publicacion: string | null;
    creado: string;
    actualizado: string;
}

export interface TerrenoImagen {
    id: number;
    terreno_id: number;
    url: string;
    alt: string | null;
    orden: number;
}

export interface Casa {
    id: number;
    slug: string;
    titulo: string;
    descripcion: string | null;
    link_maps: string | null;
    precio_cents: number;
    moneda: string;
    recamaras: number | null;
    banos: number | null;
    estacionamientos: number | null;
    pisos: number | null;
    terreno_m2: number | null;
    construccion_m2: number | null;
    ano_construccion: number | null;
    lat: number | null;
    lng: number | null;
    direccion_corta: string | null;
    servicios: Record<string, boolean>;
    amenidades: string[];
    etiquetas: string[];
    es_destacado: boolean;
    estado: EstadoPropiedad;
    fecha_publicacion: string | null;
    creado: string;
    actualizado: string;
}

export interface CasaImagen {
    id: number;
    casa_id: number;
    url: string;
    alt: string | null;
    orden: number;
}

export interface Lead {
    id?: number;
    tipo: string;
    nombre: string | null;
    email: string | null;
    telefono: string | null;
    mensaje: string | null;
    origen_slug: string | null;
    creado?: string;
}

export interface PageView {
    id?: number;
    path: string;
    user_id?: string | null;
    anonymous_id?: string | null;
    ip_address?: string | null;
    user_agent?: string | null;
    created_at?: string;
}

// Extended types with relations
export interface TerrenoConImagenes extends Terreno {
    terreno_imagen: TerrenoImagen[];
}

export interface CasaConImagenes extends Casa {
    casa_imagen: CasaImagen[];
}

// Union type for mixed property lists
export type Propiedad = (Terreno | Casa) & { tipo: 'casa' | 'terreno' };
