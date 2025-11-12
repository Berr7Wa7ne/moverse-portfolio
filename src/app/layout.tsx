import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";
import ScrollProgress from "@/components/ui/ScrollProgress";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import CrispWidget from "@/components/CrispWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Moverse Technologies - Where Creativity Meets Cutting-Edge Technology",
  description: "Transform your ideas into digital reality with our comprehensive IT services including web design, application development, and UX/UI design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Diagnostics for ensuring the widget is rendered during server-side render
  // eslint-disable-next-line no-console
  console.log('[Layout] Rendering WhatsAppWidget');

  const CRISP_ID = process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID;
  const WHATSAPP_PHONE = process.env.NEXT_PUBLIC_WHATSAPP_PHONE;
  const WHATSAPP_DEFAULT_MESSAGE =
    process.env.NEXT_PUBLIC_WHATSAPP_DEFAULT_MESSAGE || "Hi Moverse! I'm interested in your services.";

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastProvider>
          <ScrollProgress />
          {children}
          {CRISP_ID && (
            <CrispWidget websiteId={CRISP_ID} label="Live chat" />
          )}
          {WHATSAPP_PHONE && (
            <WhatsAppWidget
              phoneNumber={WHATSAPP_PHONE}
              defaultMessage={WHATSAPP_DEFAULT_MESSAGE}
            />
          )}
        </ToastProvider>
      </body>
    </html>
  );
}
