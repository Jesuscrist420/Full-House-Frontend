'use client'

import { useState } from "react";
import FullHouseLogo from "../logo/fullHouseLogo";
import styles from "./HomeNavbar.module.scss";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import classnames from 'classnames';

type homeNavbarProps = {
    showDropdown?: boolean;
}

const HomeNavbar = ({showDropdown}: homeNavbarProps) => {

    const navStyles = classnames(styles.nav, {[styles.active]: showDropdown});

    return (
        <nav className={navStyles}>
            <ul>
                <li><Link href={"/"}>Home</Link></li>
                <li><Link href={"/aboutUs"}>¿Quiénes Somos?</Link></li>
                <li><Link href={"/contactUs"}>Contáctanos</Link></li>
                <li><Link href={"/authentication"}>Empieza Ahora</Link></li>
            </ul>
        </nav>
    )
}

export default HomeNavbar;