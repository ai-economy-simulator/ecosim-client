import type { Metadata } from 'next'
import { Navbar } from './components/navbar'
import { Footer } from './components/footer'

export const metadata: Metadata = {
  title: 'Restart.',
  description: 'Is it easy building a business?',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body style={{margin: '0px'}}>
        <div style={{display: 'flex', flexFlow: 'column', justifyContent: 'space-between', height: '100vh', width: '100vw', alignItems: 'stretch'}}>
          <div style={{flexGrow: 1}}>
            <Navbar />
          </div>
          <div style={{flexGrow: 10}}>{children}</div>
          <div style={{flexGrow: 1}}>
            <Footer></Footer>
          </div>
        </div>
      </body>
    </html>
  )
}
