import React from 'react'
import styles from './Footer.module.scss'
import FooterList from './FooterList'
import Link from 'next/link'
import FullHouseLogo from '../../atoms/logo/fullHouseLogo'
import SocialLogosCompany from '../../atoms/socialLogosCompany/SocialLogosCompany'

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.items}>
                <div className="mr-6">
                    <FullHouseLogo />
                </div>
                <FooterList>
                    <h3 className="text-base font-bold mb-2">Full House</h3>
                    <Link href="/">Home</Link>
                    <Link href="/aboutUs">¿Quiénes Somos?</Link>
                    <Link href="/contactUs">Contáctanos</Link>
                    <Link href="/contactUs">FAQ</Link>
                </FooterList>
                <div className="w-full md:w-1/3">
                    <h3 className="text-base font-bold mb-2">
                        Acerca de nosotros:
                    </h3>
                    <p className="mb-2">
                        Somos una startup dedicada a optimizar los procesos en su restaurante como lo son las
                        operaciones de gestión de mesas/cuentas, inventario de productos y transacciones.
                    </p>
                    <p>
                        &copy; {new Date().getFullYear()} Full House | Derechos Reservados
                    </p>
                </div>
                <div className={styles.socialMedia}>
                    <h3 className="text-base font-bold mb-2">Redes:</h3>
                    <SocialLogosCompany facebook={""} twitter={""} instagram={""} />
                </div>
            </div>
        </footer>
    )
}

export default Footer
