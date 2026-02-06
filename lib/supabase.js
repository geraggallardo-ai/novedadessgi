import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase - Proyecto: cartelerasgi
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jhyokqepwjopmauuqylg.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpoeW9rcWVwd2pvcG1hdXVxeWxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwNzg5MDQsImV4cCI6MjA4NTY1NDkwNH0.grNc0KeA4-yMpN6iib_NdTd2DecRssGLpv9XWKjziZE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Datos de prueba para desarrollo sin Supabase conectado
export const novedadesMock = [
    {
        id: '1',
        titulo: 'EMPOWER and INSPIRE',
        descripcion: 'Descubre las últimas novedades y recursos para potenciar tu desarrollo profesional en el sector.',
        tipo_contenido: 'texto',
        url_media: null,
        color_fondo: '#3b82f6',
        created_at: new Date().toISOString(),
    },
    {
        id: '2',
        titulo: 'Video de Capacitación',
        descripcion: 'Nuevo video tutorial sobre procedimientos de seguridad y mejores prácticas.',
        tipo_contenido: 'video',
        url_media: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        color_fondo: null,
        created_at: new Date().toISOString(),
    },
    {
        id: '3',
        titulo: 'PR+ Media Relations',
        descripcion: 'Estrategias de comunicación efectiva para el sector empresarial.',
        tipo_contenido: 'texto',
        url_media: null,
        color_fondo: '#1e293b',
        created_at: new Date().toISOString(),
    },
    {
        id: '4',
        titulo: 'Encuesta de Satisfacción',
        descripcion: 'Queremos conocer tu opinión. Completa nuestra encuesta de satisfacción.',
        tipo_contenido: 'formulario',
        url_media: 'https://forms.gle/ejemplo',
        color_fondo: '#f97316',
        created_at: new Date().toISOString(),
    },
    {
        id: '5',
        titulo: 'Galería de Eventos',
        descripcion: 'Revive los mejores momentos de nuestros eventos corporativos.',
        tipo_contenido: 'galeria',
        url_media: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
        color_fondo: null,
        created_at: new Date().toISOString(),
    },
    {
        id: '6',
        titulo: 'A playground for beauty entrepreneurs',
        descripcion: 'Espacio de innovación y creatividad para emprendedores del sector.',
        tipo_contenido: 'texto',
        url_media: null,
        color_fondo: '#06b6d4',
        created_at: new Date().toISOString(),
    },
    {
        id: '7',
        titulo: 'Uplink Expo 2024',
        descripcion: 'Próximo evento de networking y exposición de tecnología.',
        tipo_contenido: 'texto',
        url_media: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?w=800',
        color_fondo: null,
        created_at: new Date().toISOString(),
    },
    {
        id: '8',
        titulo: 'Comunicado Oficial',
        descripcion: 'Información importante sobre nuevas políticas y procedimientos.',
        tipo_contenido: 'texto',
        url_media: null,
        color_fondo: '#8b5cf6',
        created_at: new Date().toISOString(),
    },
];

// Función para obtener novedades (usa mock si Supabase no está configurado)
export async function getNovedades() {
    try {
        // Verificar si Supabase está configurado correctamente
        if (supabaseUrl.includes('tu-proyecto')) {
            console.log('Usando datos de prueba (Supabase no configurado)');
            return novedadesMock;
        }

        const { data, error } = await supabase
            .from('novedades')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error al obtener novedades:', error);
            return novedadesMock;
        }

        return data && data.length > 0 ? data : [];
    } catch (error) {
        console.error('Error de conexión:', error);
        return [];
    }
}

// Función para obtener novedades recientes (últimos 10 días) para el carrusel
export async function getRecentNovedades(dias = 10) {
    try {
        const fechaLimite = new Date();
        fechaLimite.setDate(fechaLimite.getDate() - dias);
        const fechaISO = fechaLimite.toISOString();

        const { data, error } = await supabase
            .from('novedades')
            .select('*')
            .gte('created_at', fechaISO)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error al obtener novedades recientes:', error);
            return [];
        }

        return data || [];
    } catch (error) {
        console.error('Error en getRecentNovedades:', error);
        return [];
    }
}
