import AppWrappers from "@/AppWrappers";
import { AuthProvider } from "@/AuthContext";
import Header from "@/components/common/header";
import '@/styles/globals.css';
import { ThemeProvider } from "@/themeProvider";
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { Poppins } from 'next/font/google';
import { Providers } from "./Providers";
const poppins = Poppins({
  weight: '500',
  subsets: ['latin'],
})


interface RootLayoutProps {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}
export default function RootLayout({
  children,
  params: { locale },
}: Readonly<RootLayoutProps>) {
  const messages = useMessages();
  return (
    <html lang={locale}>
      <body className={poppins.className} >
        <AppWrappers>
          <Providers>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <NextIntlClientProvider locale={locale} messages={messages}>
                <AuthProvider>
                  <Header />
                  {children}
                </AuthProvider>
              </NextIntlClientProvider>
            </ThemeProvider>
          </Providers>
        </AppWrappers>
      </body>
    </html >
  );
}
