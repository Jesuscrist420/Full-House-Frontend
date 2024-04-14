import Image from 'next/image';
import logo from '/public/logo/Logo-Full-House.jpg';
import logoMobile from '/public/logo/Logo-Full-House-Mobile.png';
import styles from './fullHouseLogo.module.scss';
import Link from 'next/link';


export default function FullHouseLogo() {
    return (
        <Link href={'/'}>
            <Image
                src={logo}
                alt='Logo of Full House'
                width={200}
                height={80}
                className={styles.fullHouseLogo}
            />
            <Image
                src={logoMobile}
                alt='Logo of Full House for Mobile'
                width={50}
                height={50}
                className={styles.fullHouseLogoMobile}
            />
        </ Link>
    );
}
