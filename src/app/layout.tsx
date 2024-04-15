import '@/app/components/global.css';
import { inter } from '@/app/components/fonts';
import styles from './home.module.scss';
import Footer from './components/molecules/footer/Footer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={styles.html}>
      <body className={`${inter.className} antialiased ${styles.body}`}>
        <main className={styles.mainContent}>
          {children}
        </main>
        <div className='p-6'>
          <Footer />
        </div>
      </body>
    </html>
  );
}
