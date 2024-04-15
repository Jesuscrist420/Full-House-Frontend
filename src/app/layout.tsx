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
      <body className={`${inter.className} antialiased ${styles.body} absolute`}>
        <main className={`${styles.mainContent} relative`}>
          {children}
        </main>
        <div className='pb-6 pr-6 pl-6 relative'>
          <Footer />
        </div>
      </body>
    </html>
  );
}
