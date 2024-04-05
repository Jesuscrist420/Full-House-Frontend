'use client'

import { useState } from "react";
import FullHouseLogo from "../../atoms/logo/fullHouseLogo";
import styles from "./HomeHeader.module.scss";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import classnames from 'classnames';
import HomeNavbar from "../../atoms/homeNavbar/HomeNavbar";


export default function HomeHeader() {

    const [showDropdown, setShowDropDown] = useState(false);

    const containerStyles = classnames(styles.navBarContainer, {[styles.active]: showDropdown});

    return (
        <>
            <header className={containerStyles}>
                <FullHouseLogo />
                <HomeNavbar />
                <button id="menuIcon" className={styles.menuIcon} onClick={() => { setShowDropDown(!showDropdown); }}>
                    <RxHamburgerMenu />
                </button>
            </header>
            {showDropdown ? <HomeNavbar showDropdown={showDropdown}/> : null}
        </>
    )
}