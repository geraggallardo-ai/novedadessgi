# Despliegue en GitHub Pages

Tu proyecto ha sido optimizado y configurado para desplegarse automáticamente en **GitHub Pages**.

## Pasos para desplegar

1.  **Subir a GitHub**:
    Si aún no lo has hecho, sube tu código a un repositorio en GitHub:
    ```bash
    git add .
    git commit -m "Configuración para GitHub Pages"
    git push origin main
    ```

2.  **Activar GitHub Pages**:
    *   Ve a tu repositorio en GitHub.
    *   Haz clic en **Settings** (Configuración) > **Pages** (en el menú lateral izquierdo).
    *   En **Build and deployment** > **Source**, selecciona **GitHub Actions**.

3.  **¡Listo!**:
    *   Al seleccionar "GitHub Actions", GitHub detectará automáticamente el archivo de flujo de trabajo que creé en `.github/workflows/deploy.yml`.
    *   Cada vez que hagas un `git push`, tu sitio se construirá y desplegará automáticamente.

## Nota sobre Rutas
Si tu sitio se ve "roto" (sin estilos) o las imágenes no cargan, puede ser porque GitHub Pages lo aloja en un subdirectorio (ej. `usuario.github.io/nombre-repo`).
Si eso pasa, avísame y ajustaremos el `basePath` en `next.config.js`. Si usas un dominio personalizado, no será necesario.
