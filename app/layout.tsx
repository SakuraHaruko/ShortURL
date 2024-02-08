import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://qwq.lgbt'),

  title: 'Short Url - NekoCafe',
  description: 'Shorten your URL~',

  openGraph: {
    title: 'Short Url - NekoCafe',
    images: "https://data.nekocafe.moe/qwq.lgbt/images/image1-512.png",
    description: 'Short Url - NekoCafe',
    type: "website"
  },

  twitter : {
    title: 'Short Url - NekoCafe',
    images: "https://data.nekocafe.moe/qwq.lgbt/images/image1-512.png",
    description: 'Shorten your URL~',
    card: "summary_large_image"
  },

  appleWebApp: {
    title: 'Short Url - NekoCafe',
    startupImage: "https://data.nekocafe.moe/qwq.lgbt/images/image1-full.jpg",
    statusBarStyle: "black-translucent",
    capable: true
  },

  applicationName: "ShortURL - NekoCafe"
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" sizes="384x384" href="https://data.nekocafe.moe/qwq.lgbt/images/image1-384.png" />
        <link rel="apple-touch-icon" sizes="256x256" href="https://data.nekocafe.moe/qwq.lgbt/images/image1-256.png" />
        <link rel="apple-touch-icon" sizes="512x512" href="https://data.nekocafe.moe/qwq.lgbt/images/image1-512.png" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
