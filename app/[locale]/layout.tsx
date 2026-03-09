import { hasLocale, NextIntlClientProvider } from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import '../../styles/globals.css';

export const metadata = {
  title: 'Chata Claudia',
  description: 'Chata Claudia - Ubytovanie v srdci prírody',
  autor: 'Mathias Matejčík',
};

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export default async function RootLayout({ children, params }: Props) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  
  const messages = (await import(`../../locales/${locale}.json`)).default;

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}