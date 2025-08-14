import './globals.css'
import Header from '../components/Header'

export const metadata = { title: 'Vaultara', description: 'Buy & sell easily' }

export default function RootLayout({children}){
  return (
    <html lang="en">
      <body>
        <Header/>
        <main className="max-w-6xl mx-auto p-4">{children}</main>
      </body>
    </html>
  )
}
