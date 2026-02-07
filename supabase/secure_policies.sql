-- ============================================================
-- ACTUALIZACIÓN DE SEGURIDAD (RLS)
-- Ejecutar en SQL Editor de Supabase para aplicar políticas
-- ============================================================

-- 1. Asegurar que RLS esté activado
ALTER TABLE novedades ENABLE ROW LEVEL SECURITY;

-- 2. Limpiar políticas antiguas (para evitar conflictos)
DROP POLICY IF EXISTS "Lectura pública de novedades" ON novedades;
DROP POLICY IF EXISTS "Solo autenticados crean novedades" ON novedades;
DROP POLICY IF EXISTS "Solo el autor puede actualizar" ON novedades;
DROP POLICY IF EXISTS "Solo el autor puede eliminar" ON novedades;
DROP POLICY IF EXISTS "Acceso total admins" ON novedades;

-- 3. NUEVAS POLÍTICAS ROBUSTAS

-- Política: LECTURA PÚBLICA
-- Todo el mundo (anon y autenticado) puede VER las novedades
CREATE POLICY "Public Read Access"
ON novedades FOR SELECT
USING (true);

-- Política: ESCRITURA TOTAL PARA ADMINS
-- Solo usuarios autenticados pueden Insertar, Actualizar o Borrar
-- Se asume que si estás autenticado, eres Admin (porque deshabilitamos el registro público)
CREATE POLICY "Admin Full Access"
ON novedades FOR ALL
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- ============================================================
-- FIN DE POLÍTICAS
-- ============================================================
