import type { Metadata } from 'next';
import { Inter, JetBrains_Mono, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/contexts/theme-context';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://thetejavath.com'),
  title: 'Pavan Tejavath - AI Engineer | LLMs, RAG, Vector Databases',
  description: 'AI Engineer specializing in LLMs, RAG pipelines, embeddings, and vector databases. Building production-grade AI assistants, chatbots, and scalable ML systems.',
  keywords: ['AI Engineer', 'LLMs', 'RAG', 'Vector Databases', 'Machine Learning', 'Python', 'FastAPI', 'LangChain', 'Pinecone', 'FAISS', 'Weaviate'],
  authors: [{ name: 'Pavan Tejavath', url: 'https://thetejavath.com' }],
  creator: 'Pavan Tejavath',
  publisher: 'Pavan Tejavath',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://thetejavath.com',
    siteName: 'Pavan Tejavath - AI Engineer',
    title: 'Pavan Tejavath - AI Engineer | LLMs, RAG, Vector Databases',
    description: 'AI Engineer specializing in LLMs, RAG pipelines, embeddings, and vector databases. Building production-grade AI assistants, chatbots, and scalable ML systems.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Pavan Tejavath - AI Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pavan Tejavath - AI Engineer | LLMs, RAG, Vector Databases',
    description: 'AI Engineer specializing in LLMs, RAG pipelines, embeddings, and vector databases. Building production-grade AI assistants, chatbots, and scalable ML systems.',
    images: ['/og-image.jpg'],
    creator: '@pavantejavath',
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0ea5e9' },
    { media: '(prefers-color-scheme: dark)', color: '#00ffff' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <meta name="theme-color" content="#00ffff" />
        <meta name="msapplication-TileColor" content="#0f172a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Pavan Tejavath" />
        <meta name="application-name" content="Pavan Tejavath" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="referrer" content="origin-when-cross-origin" />
      </head>
      <body className="font-sans antialiased overflow-x-hidden">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
