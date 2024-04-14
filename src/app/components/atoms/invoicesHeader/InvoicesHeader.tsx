import React from 'react';
import styles from './InvoicesHeader.module.scss';

const InvoicesHeader = () => {
    return (
        <header className={styles.invoicesHeader}>
            <h1 className={styles.title}>Invoices</h1>
        </header>
    )
}

export default InvoicesHeader;