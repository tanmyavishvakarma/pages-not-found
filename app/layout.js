import './globals.css'
import Providers from './components/Providers'
import Navbar from './components/Navbar'

export const metadata = {
  title: 'Pages Not Found',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="min-h-screen bg-gray-100">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
