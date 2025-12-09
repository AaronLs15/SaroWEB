import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
            <h1 className="mb-4 text-6xl font-bold text-gray-900">404</h1>
            <h2 className="mb-4 text-2xl font-semibold text-gray-700">
                Propiedad no encontrada
            </h2>
            <p className="mb-8 text-gray-600">
                Lo sentimos, la propiedad que buscas no existe o ya no está disponible.
            </p>
            <Link href="/" className="btn-primary">
                Volver al inicio
            </Link>
        </div>
    );
}
