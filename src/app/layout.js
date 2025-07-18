import { Plus_Jakarta_Sans } from "next/font/google";

import "./globals.css";
import {ThemeProvider} from "./context/Theme";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata = {
  title: 'Better Write Prompt - AI Prompt Enhancement Tool',
  description: 'Enhance your AI prompts with Better Write Prompt. Get improved prompts for images, videos, avatars, and more. Make your AI generations better with optimized prompts.',
  keywords: 'AI prompt, prompt enhancement, image generation, video generation, avatar creation, AI tools',
  openGraph: {
    title: 'Better Write Prompt - AI Prompt Enhancement Tool',
    description: 'Enhance your AI prompts with Better Write Prompt. Get improved prompts for images, videos, avatars, and more. Make your AI generations better with optimized prompts.',
    url: 'https://betterwriteprompt.vercel.app/',
    siteName: 'Better Write Prompt',
    images: [
      {
        url: 'https://betterwriteprompt.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Better Write Prompt Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Better Write Prompt - AI Prompt Enhancement Tool',
    description: 'Enhance your AI prompts with Better Write Prompt. Get improved prompts for images, videos, avatars, and more. Make your AI generations better with optimized prompts.',
    images: ['https://betterwriteprompt.vercel.app/og-image.png'],
  },
  other: {
    'og:image': 'https://betterwriteprompt.vercel.app/og-image.png',
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:type': 'image/png',
    'og:image:alt': 'Better Write Prompt Preview',
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },

};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} antialiased `}>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
