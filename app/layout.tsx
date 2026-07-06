import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Центр прикладного программирования РУДН × Школа 21',
  description: 'Интерактивное путешествие по кампусу Центра прикладного программирования РУДН × Школа 21.',
  openGraph: {
    title: 'РУДН × Школа 21',
    description: 'Познакомьтесь с кампусом через плавное путешествие по реке знаний.',
    type: 'website',
    locale: 'ru_RU'
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
