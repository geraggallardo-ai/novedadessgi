'use client';

import { useState } from 'react';
import { Mail, Megaphone, AlertCircle, CheckCircle, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/admin/reset-password`,
            });

            if (resetError) throw resetError;

            setSuccess(true);
        } catch (err) {
            console.error('Error al enviar email:', err);
            setError('No se pudo enviar el email de recuperación. Verifique que el correo esté registrado.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 p-4">
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-white/5 blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent-500/10 blur-3xl"></div>
            </div>

            <div className="relative w-full max-w-md">
                {/* Card */}
                <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10">
                    {/* Logo */}
                    <div className="flex justify-center mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center shadow-lg">
                            <Megaphone className="w-8 h-8 text-white" />
                        </div>
                    </div>

                    {success ? (
                        /* Success State */
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-8 h-8 text-green-600" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">¡Email Enviado!</h1>
                            <p className="text-gray-500 mb-6">
                                Hemos enviado un enlace de recuperación a <strong className="text-gray-700">{email}</strong>.
                                Revisa tu bandeja de entrada y sigue las instrucciones.
                            </p>
                            <p className="text-sm text-gray-400 mb-6">
                                Si no ves el email, revisa tu carpeta de spam.
                            </p>
                            <a
                                href="/admin/login"
                                className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Volver al inicio de sesión
                            </a>
                        </div>
                    ) : (
                        /* Form State */
                        <>
                            {/* Title */}
                            <div className="text-center mb-8">
                                <h1 className="text-2xl font-bold text-gray-900">Recuperar Contraseña</h1>
                                <p className="text-gray-500 mt-2">
                                    Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
                                </p>
                            </div>

                            {/* Error message */}
                            {error && (
                                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 flex items-center gap-3 text-red-700">
                                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                    <p className="text-sm">{error}</p>
                                </div>
                            )}

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Correo electrónico
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Mail className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none"
                                            placeholder="tu@email.com"
                                            required
                                            autoFocus
                                        />
                                    </div>
                                </div>

                                {/* Submit button */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold shadow-lg hover:shadow-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Enviando...
                                        </>
                                    ) : (
                                        'Enviar Enlace de Recuperación'
                                    )}
                                </button>
                            </form>

                            {/* Back link */}
                            <div className="mt-8 text-center">
                                <a href="/admin/login" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors">
                                    <ArrowLeft className="w-4 h-4" />
                                    Volver al inicio de sesión
                                </a>
                            </div>
                        </>
                    )}
                </div>

                {/* Note */}
                <p className="text-center text-white/60 text-sm mt-6">
                    El enlace de recuperación expira en 1 hora.
                </p>
            </div>
        </div>
    );
}
