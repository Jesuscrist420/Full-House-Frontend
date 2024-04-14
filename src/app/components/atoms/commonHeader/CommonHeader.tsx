import React, { ReactNode } from 'react';
import styles from './CommonHeader.module.scss';

type commonHeaderProps = {
    children?: ReactNode,
    title: string
}

const CommonHeader = ({title, children}:commonHeaderProps) => {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>{title}</h1>
            <div className='flex items-center'>
                {children ? <div className={styles.divider}></div> : null}
                {children}
            </div>
        </header>
    )
}

export default CommonHeader;