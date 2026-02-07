'use client';

import { Play, FileText, Image as ImageIcon, ExternalLink, Eye, Share2 } from 'lucide-react';

export default function CardNovedad({ novedad, onClick, index = 0 }) {
    const handleShare = (e) => {
        e.stopPropagation();
        if (navigator.share) {
            navigator.share({
                title: novedad.titulo,
                text: novedad.descripcion,
                url: window.location.href,
            }).catch(console.error);
        } else {
            // Fallback: Copiar al portapapeles
            navigator.clipboard.writeText(`${novedad.titulo}\n\n${novedad.descripcion}\n\n${window.location.href}`);
            alert('¡Enlace copiado al portapapeles!');
        }
    };

    // Iconos por tipo de contenido
    const icons = {
        video: <Play className="w-4 h-4" />,
        formulario: <FileText className="w-4 h-4" />,
        galeria: <ImageIcon className="w-4 h-4" />,
        texto: <ExternalLink className="w-4 h-4" />,
    };

    // Labels por tipo de contenido
    const labels = {
        video: 'Video',
        formulario: 'Formulario',
        galeria: 'Galería',
        texto: 'Información',
    };

    // Gradientes predefinidos para carteles sin imagen
    const gradients = [
        'from-primary-500 to-primary-700',
        'from-accent-500 to-accent-700',
        'from-slate-700 to-slate-900',
        'from-cyan-500 to-blue-600',
        'from-violet-500 to-purple-700',
        'from-emerald-500 to-teal-700',
    ];

    const gradientClass = gradients[index % gradients.length];
    const hasImage = novedad.url_media && novedad.tipo_contenido !== 'texto';

    return (
        <article
            onClick={onClick}
            className="group relative overflow-hidden rounded-2xl bg-white shadow-lg card-hover cursor-pointer"
        >
            {/* Imagen o cartel con color */}
            <div className="aspect-video w-full overflow-hidden relative">
                {hasImage ? (
                    <>
                        <img
                            src={novedad.url_media}
                            alt={novedad.titulo}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                        />
                        {/* Overlay gradiente */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </>
                ) : (
                    <div
                        className={`flex h-full w-full items-center justify-center p-6 text-center bg-gradient-to-br ${gradientClass} relative`}
                    >
                        {/* Decoración de patrón */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-4 right-4 w-24 h-24 rounded-full border-2 border-white"></div>
                            <div className="absolute bottom-4 left-4 w-16 h-16 rounded-full border border-white"></div>
                        </div>

                        {/* Radial decoration para algunos */}
                        {index % 3 === 0 && (
                            <div className="absolute right-4 bottom-4 opacity-30">
                                <svg width="80" height="80" viewBox="0 0 80 80">
                                    {[...Array(18)].map((_, i) => (
                                        <line
                                            key={i}
                                            x1="40"
                                            y1="40"
                                            x2="40"
                                            y2="10"
                                            stroke="white"
                                            strokeWidth="1"
                                            transform={`rotate(${i * 20} 40 40)`}
                                        />
                                    ))}
                                </svg>
                            </div>
                        )}

                        <h3 className="relative text-xl sm:text-2xl font-bold text-white uppercase tracking-wider leading-tight max-w-[80%]">
                            {novedad.titulo}
                        </h3>
                    </div>
                )}

                {/* Badge de tipo flotante */}
                <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-gray-700 shadow-lg">
                        {icons[novedad.tipo_contenido]}
                        {labels[novedad.tipo_contenido]}
                    </span>
                </div>

                {/* Share button floating on top right */}
                <button
                    onClick={handleShare}
                    className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 backdrop-blur-sm text-gray-700 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary-50 hover:text-primary-600 scale-75 group-hover:scale-100"
                    title="Compartir"
                >
                    <Share2 className="w-4 h-4" />
                </button>

                {/* Eye icon on hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-xl transform scale-50 group-hover:scale-100 transition-transform duration-300">
                        <Eye className="w-5 h-5 text-gray-700" />
                    </div>
                </div>
            </div>

            {/* Contenido de la tarjeta */}
            <div className="p-4 sm:p-5">
                <h4 className="font-bold text-gray-900 text-base sm:text-lg line-clamp-1 group-hover:text-primary-600 transition-colors duration-300">
                    {novedad.titulo}
                </h4>
                <p className="mt-1.5 text-sm text-gray-600 line-clamp-2 leading-relaxed">
                    {novedad.descripcion}
                </p>

                {/* Footer con fecha y acción */}
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                        {new Date(novedad.created_at).toLocaleDateString('es-ES', {
                            day: 'numeric',
                            month: 'short',
                        })}
                    </span>
                    <span className="text-xs font-medium text-primary-600 group-hover:underline">
                        Ver detalle →
                    </span>
                </div>
            </div>
        </article>
    );
}
