'use client'

import HomeHeader from '@/app/components/molecules/homeHeader/HomeHeader';
import HomeImages from './components/atoms/homeImages/HomeImages';
import Footer from '@/app/components/molecules/footer/Footer';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { lato, lusitana } from '@/app/components/fonts';
import styles from '@/app/home.module.scss';
import Link from 'next/link';

export default function Page() {
  return (
    <>
      <HomeHeader />
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p className={`${lato.className} text-xl text-gray-800 md:text-3xl md:leading-normal`}>
            <strong>Bienvenido a FullHouse.</strong> Acabas de encontrar el App perfecta para optimizar{' '}
            tu <strong>Restaurante!</strong>
          </p>
          <Link href="/authentication" className={styles.loginButton} >
            <span>Comenzar</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
        <HomeImages />
      </div>
      <Footer />
    </>
  );
}
