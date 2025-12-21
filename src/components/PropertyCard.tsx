import Link from 'next/link';
import Image from 'next/image';
import { Casa, Terreno, CasaImagen, TerrenoImagen } from '@/types/database';
import { formatCurrency } from '@/lib/utils';
import { Bed, Bath, Car, Maximize, MapPin, Play, Video } from 'lucide-react';
import { isVideo } from '@/lib/videoUtils';
import { useState, useRef } from 'react';

type PropertyCardProps = {
    property: Casa | Terreno;
    type: 'casa' | 'terreno';
    images: (CasaImagen | TerrenoImagen)[];
};

export default function PropertyCard({ property, type, images }: PropertyCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Identify resources
    // Prioritize showing an actual image as the cover, even if it's not the first item
    const coverImage = images?.find(img => !isVideo(img.url))?.url;
    // If no images exist (only video), we don't have a cover image string
    const displayImage = coverImage || '/placeholder-property.jpg';

    // Find the first video if available
    const videoUrl = images?.find(img => isVideo(img.url))?.url;

    // If we only have a video and no regular images, we must show the video element always (paused by default)
    const onlyVideo = !coverImage && !!videoUrl;

    // Handle video playback on hover
    const handleMouseEnter = () => {
        setIsHovered(true);
        if (videoUrl && videoRef.current) {
            videoRef.current.play().catch(e => console.log('Video autoplay prevented:', e));
        }
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        if (videoUrl && videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    return (
        <Link
            href={`/${type === 'casa' ? 'casas' : 'terrenos'}/${property.slug}`}
            className="card group overflow-hidden"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Image & Video */}
            <div className="relative h-56 overflow-hidden bg-gray-200">
                {/* Show Image if we have one (and hide it if hovering over a video, unless it's only video mode) */}
                {!onlyVideo && (
                    <Image
                        src={displayImage}
                        alt={property.titulo}
                        fill
                        className={`object-cover transition-transform duration-300 group-hover:scale-110 ${isHovered && videoUrl ? 'opacity-0' : 'opacity-100'}`}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                )}

                {/* Video Element (Hidden by default, shown on hover if available, or always if only video) */}
                {videoUrl && (
                    <video
                        ref={videoRef}
                        src={videoUrl}
                        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${isHovered || onlyVideo ? 'opacity-100' : 'opacity-0'}`}
                        muted
                        loop
                        playsInline
                    />
                )}


                {/* Badges */}
                <div className="absolute right-3 top-3 flex gap-2">
                    {/* Video Indicator (Mobile/List view) */}
                    {videoUrl && (
                        <div className="rounded-full bg-black/50 p-1.5 text-white backdrop-blur-sm">
                            <Video className="h-3 w-3" />
                        </div>
                    )}
                    <div className="rounded-full bg-primary-600 px-3 py-1 text-xs font-semibold text-white shadow-lg">
                        {type === 'casa' ? 'Casa' : 'Terreno'}
                    </div>
                </div>

                {property.es_destacado && (
                    <div className="absolute left-3 top-3 rounded-full bg-yellow-500 px-3 py-1 text-xs font-semibold text-white shadow-lg">
                        Destacado
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold text-gray-900 line-clamp-2">
                    {property.titulo}
                </h3>

                {property.direccion_corta && (
                    <p className="mb-3 flex items-center text-sm text-gray-600">
                        <MapPin className="mr-1 h-4 w-4 flex-shrink-0" />
                        <span className="line-clamp-1">{property.direccion_corta}</span>
                    </p>
                )}

                <p className="mb-4 text-2xl font-bold text-primary-600">
                    {formatCurrency(property.precio_cents)}
                </p>

                {/* Type-specific details */}
                {type === 'casa' && 'recamaras' in property && (
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        {property.recamaras !== null && property.recamaras !== undefined && (
                            <div className="flex items-center">
                                <Bed className="mr-1.5 h-4 w-4" />
                                <span>{property.recamaras} {property.recamaras === 1 ? 'Recámara' : 'Recámaras'}</span>
                            </div>
                        )}
                        {property.banos !== null && property.banos !== undefined && (
                            <div className="flex items-center">
                                <Bath className="mr-1.5 h-4 w-4" />
                                <span>{property.banos} {property.banos === 1 ? 'Baño' : 'Baños'}</span>
                            </div>
                        )}
                        {property.estacionamientos !== null && property.estacionamientos !== undefined && (
                            <div className="flex items-center">
                                <Car className="mr-1.5 h-4 w-4" />
                                <span>{property.estacionamientos} Auto{property.estacionamientos !== 1 ? 's' : ''}</span>
                            </div>
                        )}
                    </div>
                )}

                {type === 'terreno' && 'superficie_m2' in property && property.superficie_m2 && (
                    <div className="flex items-center text-sm font-medium text-gray-700">
                        <Maximize className="mr-1.5 h-5 w-5" />
                        <span>{property.superficie_m2.toLocaleString('es-MX')} m²</span>
                    </div>
                )}

                {property.descripcion && (
                    <p className="mt-3 text-sm text-gray-600 line-clamp-2">
                        {property.descripcion}
                    </p>
                )}
            </div>
        </Link>
    );
}
