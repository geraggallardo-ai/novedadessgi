'use client';

import CardNovedad from './CardNovedad';

export default function GridMosaico({ novedades, onCardClick }) {
    if (!novedades || novedades.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                    <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-1">No hay novedades</h3>
                <p className="text-gray-500 text-sm">Vuelve pronto para ver las últimas noticias.</p>
            </div>
        );
    }

    return (
        <div className="relative">
            {/* Decorative background pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none pattern-dots"></div>

            {/* Grid de tarjetas */}
            <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {novedades.map((novedad, index) => (
                    <div
                        key={novedad.id}
                        className="animate-fade-in"
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <CardNovedad
                            novedad={novedad}
                            index={index}
                            onClick={() => onCardClick(novedad)}
                        />
                    </div>
                ))}
            </div>

            {/* Decorative element */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-primary-100 opacity-50 blur-3xl pointer-events-none"></div>
        </div>
    );
}
