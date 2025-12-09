'use client';

import { useState, FormEvent } from 'react';
import { supabase } from '@/lib/supabase';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

type ContactFormProps = {
    origenSlug: string;
};

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm({ origenSlug }: ContactFormProps) {
    const [status, setStatus] = useState<FormStatus>('idle');
    const [formData, setFormData] = useState({
        tipo: 'informacion',
        nombre: '',
        email: '',
        telefono: '',
        mensaje: '',
    });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const { error } = await supabase.from('leads').insert([
                {
                    ...formData,
                    origen_slug: origenSlug,
                },
            ]);

            if (error) throw error;

            setStatus('success');
            setFormData({
                tipo: 'informacion',
                nombre: '',
                email: '',
                telefono: '',
                mensaje: '',
            });

            // Reset success message after 5 seconds
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            console.error('Error al enviar formulario:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="rounded-xl bg-white p-8 shadow-lg">
            <h3 className="mb-6 text-2xl font-bold text-gray-900">
                ¿Interesado en esta propiedad?
            </h3>

            {status === 'success' && (
                <div className="mb-6 flex items-center space-x-3 rounded-lg bg-green-50 p-4 text-green-800">
                    <CheckCircle className="h-5 w-5 flex-shrink-0" />
                    <p className="text-sm">
                        ¡Gracias por tu interés! Nos pondremos en contacto contigo pronto.
                    </p>
                </div>
            )}

            {status === 'error' && (
                <div className="mb-6 flex items-center space-x-3 rounded-lg bg-red-50 p-4 text-red-800">
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    <p className="text-sm">
                        Hubo un error al enviar tu mensaje. Por favor, intenta de nuevo.
                    </p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Tipo */}
                <div>
                    <label htmlFor="tipo" className="label-text">
                        Tipo de consulta
                    </label>
                    <select
                        id="tipo"
                        name="tipo"
                        value={formData.tipo}
                        onChange={handleChange}
                        required
                        className="input-field"
                    >
                        <option value="informacion">Solicitar información</option>
                        <option value="comprar">Quiero comprar</option>
                        <option value="vender">Quiero vender</option>
                    </select>
                </div>

                {/* Nombre */}
                <div>
                    <label htmlFor="nombre" className="label-text">
                        Nombre completo *
                    </label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        className="input-field"
                        placeholder="Juan Pérez"
                    />
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="label-text">
                        Email *
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input-field"
                        placeholder="correo@ejemplo.com"
                    />
                </div>

                {/* Teléfono */}
                <div>
                    <label htmlFor="telefono" className="label-text">
                        Teléfono
                    </label>
                    <input
                        type="tel"
                        id="telefono"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="+52 123 456 7890"
                    />
                </div>

                {/* Mensaje */}
                <div>
                    <label htmlFor="mensaje" className="label-text">
                        Mensaje
                    </label>
                    <textarea
                        id="mensaje"
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={handleChange}
                        rows={4}
                        className="input-field resize-none"
                        placeholder="Cuéntanos más sobre tu interés..."
                    />
                </div>

                {/* Submit button */}
                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {status === 'loading' ? (
                        <span className="flex items-center justify-center">
                            <svg
                                className="mr-2 h-5 w-5 animate-spin"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </svg>
                            Enviando...
                        </span>
                    ) : (
                        <span className="flex items-center justify-center">
                            <Send className="mr-2 h-5 w-5" />
                            Enviar consulta
                        </span>
                    )}
                </button>
            </form>
        </div>
    );
}
