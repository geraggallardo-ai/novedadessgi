'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import GridMosaico from '@/components/GridMosaico';
import ModalDetalle from '@/components/ModalDetalle';
import CarruselNovedades from '@/components/CarruselNovedades';
import { getNovedades, getRecentNovedades } from '@/lib/supabase';

export default function HomePage() {
    const [novedades, setNovedades] = useState([]);
    const [novedadesRecientes, setNovedadesRecientes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedNovedad, setSelectedNovedad] = useState(null);

    useEffect(() => {
        async function cargarDatos() {
            try {
                const [todas, recientes] = await Promise.all([
                    getNovedades(),
                    getRecentNovedades(10) // Últimos 10 días
                ]);

                setNovedades(todas);
                setNovedadesRecientes(recientes);
            } catch (error) {
                console.error('Error al cargar datos:', error);
            } finally {
                setIsLoading(false);
            }
        }

        cargarDatos();
    }, []);

    // Cerrar modal con tecla Escape
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && selectedNovedad) {
                setSelectedNovedad(null);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [selectedNovedad]);

    // Bloquear scroll cuando el modal está abierto
    useEffect(() => {
        if (selectedNovedad) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [selectedNovedad]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
                {/* Carrusel de Novedades Recientes */}
                {!isLoading && novedadesRecientes.length > 0 && (
                    <CarruselNovedades
                        novedades={novedadesRecientes}
                        onVerDetalle={(novedad) => setSelectedNovedad(novedad)}
                    />
                )}

                {/* Título Grid */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Últimas Novedades</h2>
                    <p className="text-gray-600">Mantente informado con las noticias y avisos más recientes del sector.</p>
                </div>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                    </div>
                ) : (
                    <GridMosaico
                        novedades={novedades}
                        onCardClick={(novedad) => setSelectedNovedad(novedad)}
                    />
                )}
            </main>

            {/* Footer */}
            <footer className="bg-primary-900 text-white/60 py-8 mt-20 border-t border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-sm">
                        © {new Date().getFullYear()} SGI Sector. Todos los derechos reservados.
                    </p>
                </div>
            </footer>

            {/* Modal de detalle */}
            {selectedNovedad && (
                <ModalDetalle
                    novedad={selectedNovedad}
                    onClose={() => setSelectedNovedad(null)}
                />
            )}
        </div>
    );
}
