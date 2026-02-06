'use client';

import { Megaphone, Sparkles } from 'lucide-react';

export default function Header() {
    return (
        <header className="relative overflow-hidden bg-gradient-to-r from-primary-600 via-primary-700 to-primary-800 text-white">
            {/* Decorative elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-accent-400 blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
            </div>

            {/* Radial pattern decoration */}
            <div className="absolute right-10 top-1/2 transform -translate-y-1/2 opacity-20">
                <svg width="200" height="200" viewBox="0 0 200 200">
                    {[...Array(36)].map((_, i) => (
                        <line
                            key={i}
                            x1="100"
                            y1="100"
                            x2="100"
                            y2="30"
                            stroke="currentColor"
                            strokeWidth="1"
                            transform={`rotate(${i * 10} 100 100)`}
                        />
                    ))}
                </svg>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        {/* Logo */}
                        <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg">
                            <Megaphone className="w-7 h-7 text-white" />
                        </div>

                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                                    Cartelera de Novedades
                                </h1>
                                <Sparkles className="w-5 h-5 text-accent-400" />
                            </div>
                            <p className="text-primary-200 text-sm sm:text-base mt-1">
                                Gestión de información y avisos importantes
                            </p>
                        </div>
                    </div>

                    {/* Admin button */}
                    <a
                        href="/admin/login"
                        className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-medium hover:bg-white/20 transition-all duration-300"
                    >
                        Administrar
                    </a>
                </div>
            </div>

            {/* Bottom wave decoration */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                    <path
                        d="M0 40V20C360 40 720 0 1080 20C1260 30 1380 35 1440 20V40H0Z"
                        fill="#f8fafc"
                    />
                </svg>
            </div>
        </header>
    );
}
