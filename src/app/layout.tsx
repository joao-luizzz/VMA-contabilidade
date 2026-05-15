import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "VMA Contabilidade | Excelência em Contabilidade Estratégica",
  description: "Soluções inteligentes de contabilidade, planejamento tributário e consultoria para empresas que buscam crescimento sólido e conformidade fiscal em São Paulo.",
  keywords: ["contabilidade", "planejamento tributário", "vma contabilidade", "abertura de empresa", "consultoria financeira"],
  authors: [{ name: "VMA Contabilidade" }],
  openGraph: {
    title: "VMA Contabilidade | Excelência em Contabilidade Estratégica",
    description: "Soluções inteligentes de contabilidade, planejamento tributário e consultoria empresarial para o seu negócio.",
    url: "https://vmacontabilidade.com.br",
    siteName: "VMA Contabilidade",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VMA Contabilidade",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}