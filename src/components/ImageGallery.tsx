'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type ImageGalleryProps = {
    images: Array<{ url: string; alt: string | null }>;
};

export default function ImageGallery({ images }: ImageGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!images || images.length === 0) {
        return (
            <div className="flex h-96 items-center justify-center rounded-xl bg-gray-200">
                <p className="text-gray-500">No hay imágenes disponibles</p>
            </div>
        );
    }

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="space-y-4">
            {/* Main image */}
            <div className="relative h-96 overflow-hidden rounded-xl bg-gray-200 lg:h-[500px]">
                <Image
                    src={images[currentIndex].url}
                    alt={images[currentIndex].alt || 'Imagen de propiedad'}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                />

                {/* Navigation arrows */}
                {images.length > 1 && (
                    <>
                        <button
                            onClick={goToPrevious}
                            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg transition-all hover:bg-white hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            aria-label="Imagen anterior"
                        >
                            <ChevronLeft className="h-6 w-6 text-gray-900" />
                        </button>
                        <button
                            onClick={goToNext}
                            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg transition-all hover:bg-white hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-500"
                            aria-label="Siguiente imagen"
                        >
                            <ChevronRight className="h-6 w-6 text-gray-900" />
                        </button>
                    </>
                )}

                {/* Image counter */}
                {images.length > 1 && (
                    <div className="absolute bottom-4 right-4 rounded-full bg-black/70 px-3 py-1 text-sm text-white">
                        {currentIndex + 1} / {images.length}
                    </div>
                )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-8">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`relative h-20 overflow-hidden rounded-lg transition-all ${index === currentIndex
                                    ? 'ring-4 ring-primary-500'
                                    : 'opacity-70 hover:opacity-100'
                                }`}
                        >
                            <Image
                                src={image.url}
                                alt={image.alt || `Thumbnail ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 640px) 25vw, (max-width: 1024px) 16vw, 12vw"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
