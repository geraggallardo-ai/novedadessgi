'use client';

import { X, Play, FileText, Image as ImageIcon, ExternalLink, Calendar, Share2 } from 'lucide-react';

export default function ModalDetalle({ novedad, onClose }) {
    if (!novedad) return null;

    // Renderizado condicional según tipo de contenido
    const renderContenido = () => {
        switch (novedad.tipo_contenido) {
            case 'video':
                // Convertir URL de YouTube a embed
                const embedUrl = novedad.url_media
                    ?.replace('watch?v=', 'embed/')
                    ?.replace('youtu.be/', 'youtube.com/embed/');
                return (
                    <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg">
                        <iframe
                            className="w-full h-full"
                            src={embedUrl}
                            title="Reproductor de Video"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                );

            case 'formulario':
                return (
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border-2 border-dashed border-gray-300">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-lg bg-accent-100 flex items-center justify-center">
                                <FileText className="w-5 h-5 text-accent-600" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">Formulario Interactivo</h3>
                                <p className="text-sm text-gray-500">Complete el siguiente formulario</p>
                            </div>
                        </div>
                        <iframe
                            src={novedad.url_media}
                            className="w-full h-[400px] rounded-lg border border-gray-200 bg-white"
                            frameBorder="0"
                        >
                            Cargando formulario...
                        </iframe>
                    </div>
                );

            case 'galeria':
                return (
                    <div className="space-y-4">
                        {/* Imagen principal */}
                        <div className="rounded-xl overflow-hidden shadow-lg">
                            <img
                                src={novedad.url_media}
                                alt={novedad.titulo}
                                className="w-full h-auto object-cover"
                            />
                        </div>
                        {/* Miniaturas simuladas */}
                        <div className="grid grid-cols-4 gap-2">
                            <div className="aspect-square rounded-lg overflow-hidden">
                                <img
                                    src={novedad.url_media}
                                    alt="Miniatura"
                                    className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                                />
                            </div>
                            <div className="aspect-square rounded-lg bg-gray-200 flex items-center justify-center text-gray-500 cursor-pointer hover:bg-gray-300 transition-colors">
                                <span className="text-sm font-medium">+ Más</span>
                            </div>
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="prose prose-lg max-w-none">
                        <p className="text-gray-700 leading-relaxed text-lg">
                            {novedad.descripcion}
                        </p>
                    </div>
                );
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl modal-enter">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 z-20 p-2.5 rounded-full bg-white/90 backdrop-blur-sm shadow-lg hover:bg-red-50 hover:text-red-500 transition-all duration-300 group"
                    aria-label="Cerrar"
                >
                    <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                </button>

                {/* Header gradient */}
                <div className="h-2 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-600 rounded-t-3xl"></div>

                <div className="p-6 sm:p-8">
                    {/* Badge de tipo */}
                    <div className="flex items-center gap-2 mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-primary-100 text-primary-700">
                            {novedad.tipo_contenido === 'video' && <Play className="w-3 h-3" />}
                            {novedad.tipo_contenido === 'formulario' && <FileText className="w-3 h-3" />}
                            {novedad.tipo_contenido === 'galeria' && <ImageIcon className="w-3 h-3" />}
                            {novedad.tipo_contenido === 'texto' && <ExternalLink className="w-3 h-3" />}
                            {novedad.tipo_contenido}
                        </span>
                        <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(novedad.created_at).toLocaleDateString('es-ES', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                            })}
                        </span>
                    </div>

                    {/* Título */}
                    <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2 leading-tight">
                        {novedad.titulo}
                    </h2>

                    <hr className="my-6 border-gray-200" />

                    {/* Contenido dinámico */}
                    <div className="mt-6">
                        {renderContenido()}
                    </div>

                    {/* Descripción adicional si no es texto */}
                    {novedad.descripcion && novedad.tipo_contenido !== 'texto' && (
                        <div className="mt-8 p-5 bg-gray-50 rounded-xl border border-gray-100">
                            <h4 className="font-semibold text-gray-900 mb-2">Descripción</h4>
                            <p className="text-gray-600 leading-relaxed">{novedad.descripcion}</p>
                        </div>
                    )}

                    {/* Footer con acciones */}
                    <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                        <button className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors">
                            <Share2 className="w-4 h-4" />
                            Compartir
                        </button>
                        <button
                            onClick={onClose}
                            className="px-6 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-colors"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
