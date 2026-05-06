import './globals.css'

export const metadata = {
  title: 'NÚCLEO · Sistema de Gestión Urbanística',
  description: 'Consulta y gestión de expedientes de urbanismo reglado',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="bg-nucleo-50 min-h-screen font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
