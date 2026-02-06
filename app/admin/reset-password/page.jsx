'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Eye, EyeOff, Megaphone, AlertCircle, CheckCircle, Shield } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function ResetPasswordPage() {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [isValidSession, setIsValidSession] = useState(false);
    const [checkingSession, setCheckingSession] = useState(true);

    useEffect(() => {
        // Verificar si hay una sesión válida de recuperación
        const checkSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            if (session) {
                setIsValidSession(true);
            }
            setCheckingSession(false);
        };

        // Escuchar cambios de autenticación (cuando el usuario llega desde el email)
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'PASSWORD_RECOVERY') {
                setIsValidSession(true);
                setCheckingSession(false);
            }
        });

        checkSession();

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const validatePassword = () => {
        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.');
            return false;
        }
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validatePassword()) return;

        setIsLoading(true);

        try {
            const { error: updateError } = await supabase.auth.updateUser({
                password: password
            });

            if (updateError) throw updateError;

            setSuccess(true);

            // Redirigir al login después de 3 segundos
            setTimeout(() => {
                router.push('/admin/login');
            }, 3000);
        } catch (err) {
            console.error('Error al actualizar contraseña:', err);
            setError('No se pudo actualizar la contraseña. El enlace puede haber expirado.');
        } finally {
            setIsLoading(false);
        }
    };

    // Estado de carga mientras verifica la sesión
    if (checkingSession) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 p-4">
                <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
                    <svg className="animate-spin w-12 h-12 text-primary-600 mx-auto mb-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <p className="text-gray-600">Verificando enlace...</p>
                </div>
            </div>
        );
    }

    // Estado cuando no hay sesión válida
    if (!isValidSession && !success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 p-4">
                <div className="bg-white rounded-3xl shadow-2xl p-8 sm:p-10 text-center max-w-md">
                    <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
                        <AlertCircle className="w-8 h-8 text-red-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Enlace Inválido o Expirado</h1>
                    <p className="text-gray-500 mb-6">
                        El enlace de recuperación no es válido o ha expirado. Por favor, solicita un nuevo enlace.
                    </p>
                    <a
                        href="/admin/forgot-password"
                        className="inline-block w-full py-3.5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-center"
                    >
                        Solicitar Nuevo Enlace
                    </a>
                    <div className="mt-4">
                        <a href="/admin/login" className="text-sm text-gray-500 hover:text-primary-600 transition-colors">
                            ← Volver al inicio de sesión
                        </a>
                    </div>
                </div>
            </div>
        );
    }

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
                            {success ? (
                                <CheckCircle className="w-8 h-8 text-white" />
                            ) : (
                                <Shield className="w-8 h-8 text-white" />
                            )}
                        </div>
                    </div>

                    {success ? (
                        /* Success State */
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                                <CheckCircle className="w-8 h-8 text-green-600" />
                            </div>
                            <h1 className="text-2xl font-bold text-gray-900 mb-2">¡Contraseña Actualizada!</h1>
                            <p className="text-gray-500 mb-6">
                                Tu contraseña ha sido actualizada exitosamente. Serás redirigido al inicio de sesión en unos segundos.
                            </p>
                            <a
                                href="/admin/login"
                                className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
                            >
                                Ir al inicio de sesión →
                            </a>
                        </div>
                    ) : (
                        /* Form State */
                        <>
                            {/* Title */}
                            <div className="text-center mb-8">
                                <h1 className="text-2xl font-bold text-gray-900">Nueva Contraseña</h1>
                                <p className="text-gray-500 mt-2">
                                    Ingresa tu nueva contraseña para restablecer el acceso.
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
                                {/* New Password */}
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                        Nueva Contraseña
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Lock className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none"
                                            placeholder="Mínimo 6 caracteres"
                                            required
                                            minLength={6}
                                            autoFocus
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                        Confirmar Contraseña
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                            <Lock className="w-5 h-5 text-gray-400" />
                                        </div>
                                        <input
                                            id="confirmPassword"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all outline-none"
                                            placeholder="Repite la contraseña"
                                            required
                                            minLength={6}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                                        >
                                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Password requirements */}
                                <div className="text-sm text-gray-500 space-y-1">
                                    <p className={password.length >= 6 ? 'text-green-600' : ''}>
                                        {password.length >= 6 ? '✓' : '○'} Mínimo 6 caracteres
                                    </p>
                                    <p className={password && password === confirmPassword ? 'text-green-600' : ''}>
                                        {password && password === confirmPassword ? '✓' : '○'} Las contraseñas coinciden
                                    </p>
                                </div>

                                {/* Submit button */}
                                <button
                                    type="submit"
                                    disabled={isLoading || password.length < 6 || password !== confirmPassword}
                                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold shadow-lg hover:shadow-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                            </svg>
                                            Actualizando...
                                        </>
                                    ) : (
                                        'Actualizar Contraseña'
                                    )}
                                </button>
                            </form>
                        </>
                    )}
                </div>

                {/* Note */}
                <p className="text-center text-white/60 text-sm mt-6">
                    Por seguridad, usa una contraseña única y segura.
                </p>
            </div>
        </div>
    );
}
