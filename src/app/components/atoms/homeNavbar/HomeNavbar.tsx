'use client'

import { useState } from "react";
import FullHouseLogo from "../logo/fullHouseLogo";
import styles from "./HomeNavbar.module.scss";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import classnames from 'classnames';
import { usePathname } from 'next/navigation';
import { UrlObject } from "url";

type homeNavbarProps = {
    showDropdown?: boolean;
}

const HomeNavbar = ({ showDropdown }: homeNavbarProps) => {

    const pathname = usePathname();
    const navStyles = classnames(styles.nav, { [styles.active]: showDropdown });

    const links = [
        { name: 'Home', value: 'Home', href: '/' },
        { name: 'About Us', value: '¿Quiénes Somos?', href: '/aboutUs' },
        { name: 'Contact Us', value: 'Contáctanos', href: '/contactUs' },
        { name: 'Authentication', value: 'Empieza Ahora', href: '/authentication' },
    ];

    return (
        <nav className={navStyles}>
            <ul>
                {links.map((link) => {
                    const selectedStyles = classnames({ [styles.selected]: pathname === link.href })
                    return (
                        <li className={selectedStyles} key={link.name}><Link href={link.href}>{link.value}</Link></li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default HomeNavbar;