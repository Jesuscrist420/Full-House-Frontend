import type { Metadata } from 'next';
import '@/app/components/global.css';
import styles from './home.module.scss';
import { inter } from '@/app/components/fonts';
import Footer from './components/molecules/footer/Footer';
import SessionAuthProvider from '@/context/SessionAuthProvider';

export const metadata: Metadata = {
  title: 'Full House',
  description:
      'Restaurant management project for ingesoft II, Universidad Nacional de Colombia.',
  robots:'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={styles.html}>
      <body className={`${inter.className} antialiased ${styles.body} absolute`}>
        <main className={`${styles.mainContent} relative`}>
          <SessionAuthProvider>
            {children}
          </SessionAuthProvider>
        </main>
        <div className='pb-6 pr-6 pl-6 relative'>
          <Footer />
        </div>
      </body>
    </html>
  );
}
