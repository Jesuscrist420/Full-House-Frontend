'use client'

import { useState } from "react";
import FullHouseLogo from "../logo/fullHouseLogo";
import styles from "./HomeNavbar.module.scss";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import classnames from 'classnames';
import { usePathname } from 'next/navigation';
import { UrlObject } from "url";
import { useSession } from "next-auth/react";

type homeNavbarProps = {
    showDropdown?: boolean;
}

const HomeNavbar = ({ showDropdown }: homeNavbarProps) => {

    const pathname = usePathname();
    const navStyles = classnames(styles.nav, { [styles.active]: showDropdown });
    const { data: session, status } = useSession();
    const isLogged = session ? true : false;

    const links = [
        { name: 'Home', value: 'Inicio', href: '/' },
        { name: 'About Us', value: '¿Quiénes Somos?', href: '/aboutUs' },
        { name: 'Contact Us', value: 'Contáctanos', href: '/contactUs' },
        { name: 'Dashboard', value: 'Dashboard', href: '/dashboard' },
        { name: 'Authentication', value: 'Empieza Ahora', href: '/authentication' },
    ];

    return (
        <nav className={navStyles}>
            <ul>
                {links.map((link) => {
                    const selectedStyles = classnames({ [styles.selected]: pathname === link.href })
                    if (link.name == 'Dashboard'){
                        if (!isLogged){
                            return;
                        }
                    }
                    return (
                        <li className={selectedStyles} key={link.name}><Link href={link.href}>{link.value}</Link></li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default HomeNavbar;