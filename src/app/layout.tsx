import '@/app/ui/global.css';
import { inter } from '@/src/app/ui/fonts';
import styles from './home.module.scss';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <main className={styles.mainContent}>
          {children}
        </main>
      </body>
    </html>
  );
}
