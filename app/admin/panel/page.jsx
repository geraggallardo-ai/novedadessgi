'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Megaphone, Plus, Edit2, Trash2, LogOut, Save, X,
    Video, FileText, Image as ImageIcon, Type, ArrowLeft,
    Loader2, CheckCircle, AlertCircle
} from 'lucide-react';
import { supabase, novedadesMock } from '@/lib/supabase';

export default function AdminPanelPage() {
    const router = useRouter();
    const [novedades, setNovedades] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingNovedad, setEditingNovedad] = useState(null);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    // Estado del formulario
    const [formData, setFormData] = useState({
        titulo: '',
        descripcion: '',
        tipo_contenido: 'texto',
        url_media: '',
        color_fondo: '#3b82f6',
    });

    // Colores predefinidos
    const colores = [
        { name: 'Azul', value: '#3b82f6' },
        { name: 'Naranja', value: '#f97316' },
        { name: 'Oscuro', value: '#1e293b' },
        { name: 'Cyan', value: '#06b6d4' },
        { name: 'Violeta', value: '#8b5cf6' },
        { name: 'Esmeralda', value: '#10b981' },
    ];

    // Tipos de contenido
    const tiposContenido = [
        { value: 'texto', label: 'Texto', icon: Type },
        { value: 'video', label: 'Video', icon: Video },
        { value: 'formulario', label: 'Formulario', icon: FileText },
        { value: 'galeria', label: 'Galería', icon: ImageIcon },
    ];

    useEffect(() => {
        fetchNovedades();
    }, []);

    const fetchNovedades = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('novedades')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setNovedades(data || novedadesMock);
        } catch (error) {
            console.error('Error:', error);
            setNovedades(novedadesMock);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setMessage({ type: '', text: '' });

        try {
            if (editingNovedad) {
                // Actualizar
                const { error } = await supabase
                    .from('novedades')
                    .update(formData)
                    .eq('id', editingNovedad.id);

                if (error) throw error;
                setMessage({ type: 'success', text: 'Novedad actualizada correctamente.' });
            } else {
                // Crear nueva
                const { error } = await supabase
                    .from('novedades')
                    .insert([formData]);

                if (error) throw error;
                setMessage({ type: 'success', text: 'Novedad creada correctamente.' });
            }

            resetForm();
            fetchNovedades();
        } catch (error) {
            console.error('Error:', error);
            setMessage({ type: 'error', text: 'Error al guardar. Verifique su conexión.' });
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (novedad) => {
        setEditingNovedad(novedad);
        setFormData({
            titulo: novedad.titulo,
            descripcion: novedad.descripcion || '',
            tipo_contenido: novedad.tipo_contenido,
            url_media: novedad.url_media || '',
            color_fondo: novedad.color_fondo || '#3b82f6',
        });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('¿Está seguro de eliminar esta novedad?')) return;

        try {
            const { error } = await supabase
                .from('novedades')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setMessage({ type: 'success', text: 'Novedad eliminada correctamente.' });
            fetchNovedades();
        } catch (error) {
            console.error('Error:', error);
            setMessage({ type: 'error', text: 'Error al eliminar.' });
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/');
    };

    const resetForm = () => {
        setFormData({
            titulo: '',
            descripcion: '',
            tipo_contenido: 'texto',
            url_media: '',
            color_fondo: '#3b82f6',
        });
        setEditingNovedad(null);
        setShowForm(false);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                                <Megaphone className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h1 className="font-bold text-gray-900">Panel de Administración</h1>
                                <p className="text-xs text-gray-500">Gestión de Novedades</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <a
                                href="/"
                                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Ver cartelera
                            </a>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-sm font-medium"
                            >
                                <LogOut className="w-4 h-4" />
                                Salir
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Message */}
                {message.text && (
                    <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${message.type === 'success'
                            ? 'bg-green-50 border border-green-100 text-green-700'
                            : 'bg-red-50 border border-red-100 text-red-700'
                        }`}>
                        {message.type === 'success' ? (
                            <CheckCircle className="w-5 h-5" />
                        ) : (
                            <AlertCircle className="w-5 h-5" />
                        )}
                        <p className="text-sm">{message.text}</p>
                    </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Novedades</h2>
                        <p className="text-gray-500 text-sm">Administra el contenido de la cartelera</p>
                    </div>
                    <button
                        onClick={() => {
                            resetForm();
                            setShowForm(true);
                        }}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/25"
                    >
                        <Plus className="w-5 h-5" />
                        Nueva Novedad
                    </button>
                </div>

                {/* Form Modal */}
                {showForm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                                <h3 className="text-lg font-bold text-gray-900">
                                    {editingNovedad ? 'Editar Novedad' : 'Nueva Novedad'}
                                </h3>
                                <button
                                    onClick={resetForm}
                                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-6 space-y-5">
                                {/* Título */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Título *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.titulo}
                                        onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all outline-none"
                                        placeholder="Título de la novedad"
                                        required
                                    />
                                </div>

                                {/* Descripción */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Descripción
                                    </label>
                                    <textarea
                                        value={formData.descripcion}
                                        onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all outline-none resize-none"
                                        rows={3}
                                        placeholder="Descripción detallada..."
                                    />
                                </div>

                                {/* Tipo de contenido */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Tipo de contenido
                                    </label>
                                    <div className="grid grid-cols-4 gap-3">
                                        {tiposContenido.map((tipo) => (
                                            <button
                                                key={tipo.value}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, tipo_contenido: tipo.value })}
                                                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${formData.tipo_contenido === tipo.value
                                                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                                                        : 'border-gray-200 hover:border-gray-300 text-gray-600'
                                                    }`}
                                            >
                                                <tipo.icon className="w-5 h-5" />
                                                <span className="text-xs font-medium">{tipo.label}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* URL Media */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        URL de contenido (imagen, video, formulario)
                                    </label>
                                    <input
                                        type="url"
                                        value={formData.url_media}
                                        onChange={(e) => setFormData({ ...formData, url_media: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all outline-none"
                                        placeholder="https://..."
                                    />
                                </div>

                                {/* Color de fondo */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-3">
                                        Color de fondo (para tarjetas sin imagen)
                                    </label>
                                    <div className="flex gap-2">
                                        {colores.map((color) => (
                                            <button
                                                key={color.value}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, color_fondo: color.value })}
                                                className={`w-10 h-10 rounded-xl transition-all ${formData.color_fondo === color.value
                                                        ? 'ring-2 ring-offset-2 ring-gray-400 scale-110'
                                                        : 'hover:scale-105'
                                                    }`}
                                                style={{ backgroundColor: color.value }}
                                                title={color.name}
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={resetForm}
                                        className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="flex-1 py-3 rounded-xl bg-primary-600 text-white font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {saving ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Guardando...
                                            </>
                                        ) : (
                                            <>
                                                <Save className="w-5 h-5" />
                                                Guardar
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Lista de novedades */}
                {isLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
                    </div>
                ) : novedades.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
                        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                            <Megaphone className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-1">Sin novedades</h3>
                        <p className="text-gray-500 text-sm">Comienza creando tu primera novedad.</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200">
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Título
                                    </th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Tipo
                                    </th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Fecha
                                    </th>
                                    <th className="text-right px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {novedades.map((novedad) => (
                                    <tr key={novedad.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-10 h-10 rounded-lg flex-shrink-0"
                                                    style={{
                                                        backgroundColor: novedad.color_fondo || '#3b82f6',
                                                        backgroundImage: novedad.url_media ? `url(${novedad.url_media})` : undefined,
                                                        backgroundSize: 'cover',
                                                        backgroundPosition: 'center',
                                                    }}
                                                />
                                                <div>
                                                    <p className="font-medium text-gray-900 line-clamp-1">{novedad.titulo}</p>
                                                    <p className="text-xs text-gray-500 line-clamp-1">{novedad.descripcion}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 capitalize">
                                                {novedad.tipo_contenido}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {new Date(novedad.created_at).toLocaleDateString('es-ES')}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(novedad)}
                                                    className="p-2 rounded-lg text-gray-500 hover:text-primary-600 hover:bg-primary-50 transition-colors"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(novedad.id)}
                                                    className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>
        </div>
    );
}
