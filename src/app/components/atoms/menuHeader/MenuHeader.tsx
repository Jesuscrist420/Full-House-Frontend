import React from 'react';
import styles from './MenuHeader.module.scss';

const MenuHeader = () => {
    return (
        <header className={styles.menuHeader}>
            <h1 className={styles.title}>Menu</h1>
        </header>
    )
}

export default MenuHeader;