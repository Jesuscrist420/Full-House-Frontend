import React from 'react';
import styles from './SettingsHeader.module.scss';

const SettingsHeader = () => {
    return (
        <header className={styles.settingsHeader}>
            <h1 className={styles.title}>Dashboard</h1>
        </header>
    )
}

export default SettingsHeader;