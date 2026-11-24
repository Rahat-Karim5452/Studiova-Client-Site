import type { Metadata } from "next"
import {
  Geist_Mono,
  Instrument_Serif,
  Manrope,
  Space_Grotesk,
} from "next/font/google"

import "./globals.css"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

const heading = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
})

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
})

export const metadata: Metadata = {
  title: {
    default: "Studiova - Book Creative Studios by the Hour",
    template: "%s | Studiova",
  },
  description:
    "Find and book photo studios, sound stages, podcast rooms, music suites and art workshops by the hour.",
  applicationName: "Studiova",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        manrope.variable,
        fontMono.variable,
        heading.variable,
        serif.variable
      )}
    >
      <body className="flex min-h-screen flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
