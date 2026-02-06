import './globals.css';

export const metadata = {
    title: 'Cartelera de Novedades | SGI Sector',
    description: 'Gestión de información y avisos importantes para el sector.',
    keywords: ['novedades', 'cartelera', 'avisos', 'información'],
};

export default function RootLayout({ children }) {
    return (
        <html lang="es">
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}
