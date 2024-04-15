'use client'
import React, { useRef, type ReactNode } from 'react';
import { IoIosCloseCircle } from "react-icons/io";
import styles from './RightBar.module.scss';
import classNames from 'classnames';

type rightBarProps = {
    children?: ReactNode,
    isOpen?: boolean,
    setIsOpen: (val: boolean) => void,
    title?: string,
}

const RightBar = ({ children, isOpen = false, setIsOpen, title = 'Title' }: rightBarProps) => {

    const rightBarRef = useRef(null);

    const handleClose = (): void => {
        setIsOpen(false);
    }

    const containerStyles = classNames(styles.container, { [styles.containerActive]: isOpen });
    const righBarStyles = classNames(styles.rightBar, { [styles.active]: isOpen });

    return (
        <>
            <div className={containerStyles} onClick={handleClose}>

            </div>
            <div className={righBarStyles} ref={rightBarRef}>
                <header className={styles.rightBarHeader}>
                    <h1 className={styles.title}>{title}</h1>
                    <button onClick={handleClose}>
                        <IoIosCloseCircle size={20} />
                    </button>
                </header>
                {children}
            </div>
        </>
    )
}

export default RightBar;