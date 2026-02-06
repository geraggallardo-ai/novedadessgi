-- ============================================================
-- ESQUEMA DE BASE DE DATOS PARA CARTELERA DE NOVEDADES
-- Ejecutar en SQL Editor de Supabase
-- ============================================================

-- 1. CREACIÓN DE LA TABLA DE NOVEDADES
CREATE TABLE IF NOT EXISTS novedades (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  titulo TEXT NOT NULL,
  descripcion TEXT,
  tipo_contenido TEXT CHECK (tipo_contenido IN ('texto', 'video', 'formulario', 'galeria')) DEFAULT 'texto',
  url_media TEXT,
  color_fondo TEXT DEFAULT '#3b82f6',
  autor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL
);

-- 2. CREAR ÍNDICES PARA OPTIMIZACIÓN
CREATE INDEX IF NOT EXISTS idx_novedades_created_at ON novedades(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_novedades_tipo ON novedades(tipo_contenido);
CREATE INDEX IF NOT EXISTS idx_novedades_autor ON novedades(autor_id);

-- 3. HABILITAR ROW LEVEL SECURITY
ALTER TABLE novedades ENABLE ROW LEVEL SECURITY;

-- 4. POLÍTICAS DE ACCESO

-- Lectura pública: cualquier persona puede ver las novedades
CREATE POLICY "Lectura pública de novedades" 
ON novedades FOR SELECT 
USING (true);

-- Inserción: solo usuarios autenticados pueden crear novedades
CREATE POLICY "Solo autenticados crean novedades" 
ON novedades FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = autor_id OR autor_id IS NULL);

-- Actualización: solo el autor puede editar sus novedades
CREATE POLICY "Solo el autor puede actualizar" 
ON novedades FOR UPDATE 
TO authenticated 
USING (auth.uid() = autor_id OR autor_id IS NULL);

-- Eliminación: solo el autor puede eliminar sus novedades
CREATE POLICY "Solo el autor puede eliminar" 
ON novedades FOR DELETE 
TO authenticated 
USING (auth.uid() = autor_id OR autor_id IS NULL);

-- 5. DATOS DE PRUEBA (opcional)
INSERT INTO novedades (titulo, descripcion, tipo_contenido, url_media, color_fondo)
VALUES 
  ('Bienvenido a la Cartelera', 'Explora las últimas noticias y avisos importantes del sector.', 'texto', NULL, '#3b82f6'),
  ('Video de Capacitación', 'Nuevo video tutorial sobre procedimientos de seguridad.', 'video', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', NULL),
  ('Encuesta de Satisfacción', 'Queremos conocer tu opinión. Completa nuestra encuesta.', 'formulario', 'https://forms.gle/ejemplo', '#f97316'),
  ('Galería de Eventos', 'Revive los mejores momentos de nuestros eventos.', 'galeria', 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800', NULL);

-- ============================================================
-- FIN DEL ESQUEMA
-- ============================================================
