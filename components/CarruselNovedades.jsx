'use client';

import { Video, Image, FileText, AlignLeft, Calendar } from 'lucide-react';

export default function CarruselNovedades({ novedades, onVerDetalle }) {
    if (!novedades || novedades.length === 0) return null;

    const getIconoTipo = (tipo) => {
        switch (tipo) {
            case 'video': return <Video className="w-4 h-4" />;
            case 'galeria': return <Image className="w-4 h-4" />;
            case 'formulario': return <FileText className="w-4 h-4" />;
            default: return <AlignLeft className="w-4 h-4" />;
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'short' }).format(date);
    };

    // Duplicamos las novedades para lograr el efecto infinito
    const novedadesInfinitas = [...novedades, ...novedades, ...novedades, ...novedades]; // Cuadruplicamos para asegurar fluidez en pantallas grandes

    return (
        <div className="w-full mb-12 relative overflow-hidden group bg-white/50 backdrop-blur-sm rounded-3xl p-4 border border-white/60 shadow-sm">
            <div className="flex items-center justify-between mb-4 px-2">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <span className="w-2 h-6 bg-accent-400 rounded-full"></span>
                    Destacados Recientes
                </h2>
                <div className="text-sm text-gray-500 font-medium bg-primary-50 px-3 py-1 rounded-full border border-primary-100 flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500"></span>
                    </span>
                    En vivo
                </div>
            </div>

            {/* Contenedor Marquee con gradientes de desvanecimiento laterales */}
            <div className="relative w-full overflow-hidden rounded-2xl">
                <div className="absolute left-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-gray-50/90 to-transparent pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-gray-50/90 to-transparent pointer-events-none"></div>

                <div className="animate-marquee flex gap-5 py-2 pl-4">
                    {novedadesInfinitas.map((novedad, index) => (
                        <div
                            key={`${novedad.id}-${index}`}
                            className="w-[280px] sm:w-[320px] shrink-0 bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 group/card relative select-none"
                            onClick={() => onVerDetalle(novedad)}
                        >
                            {/* Barra superior de color */}
                            <div className="h-1.5 w-full bg-gradient-to-r from-primary-600 via-primary-500 to-accent-400"></div>

                            <div className="p-5 flex flex-col h-full relative z-0">
                                {/* Decoración de fondo sutil */}
                                {novedad.color_fondo && (
                                    <div
                                        className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-5 -mr-10 -mt-10 z-[-1]"
                                        style={{ backgroundColor: novedad.color_fondo || '#0054A6' }}
                                    ></div>
                                )}

                                <div className="flex justify-between items-start mb-3">
                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold
                                            ${novedad.tipo_contenido === 'video' ? 'bg-red-50 text-red-600 border border-red-100' :
                                            novedad.tipo_contenido === 'formulario' ? 'bg-orange-50 text-orange-600 border border-orange-100' :
                                                novedad.tipo_contenido === 'galeria' ? 'bg-purple-50 text-purple-600 border border-purple-100' :
                                                    'bg-blue-50 text-primary-600 border border-blue-100'}`}
                                    >
                                        {getIconoTipo(novedad.tipo_contenido)}
                                        {novedad.tipo_contenido.charAt(0).toUpperCase() + novedad.tipo_contenido.slice(1)}
                                    </span>
                                    <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {formatDate(novedad.created_at)}
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 leading-tight group-hover/card:text-primary-700 transition-colors">
                                    {novedad.titulo}
                                </h3>

                                <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                                    {novedad.descripcion}
                                </p>

                                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between text-sm">
                                    <span className="text-primary-600 font-medium group-hover/card:underline">Ver detalle</span>
                                    {novedad.url_media && (
                                        <span className="flex h-2 w-2 rounded-full bg-accent-400 animate-pulse"></span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
