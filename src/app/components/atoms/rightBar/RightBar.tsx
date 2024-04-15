'use client'
import React, { useRef, type ReactNode } from 'react';
import { IoIosCloseCircle } from "react-icons/io";
import styles from './RightBar.module.scss';

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

    return (
        <>
            {isOpen ? (
                <>
                    <div className={styles.container} onClick={handleClose}>

                    </div>
                    <div className={styles.rightBar} ref={rightBarRef}>
                        <div className = {styles.rightBarContainer}> 
                            <header className={styles.rightBarHeader}>
                                <h1 className={styles.title}>{title}</h1>
                                <button onClick={handleClose}>
                                    <IoIosCloseCircle size={20} />
                                </button>
                            </header>
                            {children}
                        </div>
                    </div>
                </>

            ) : (
                <></>
            )}
        </>
    )
}

export default RightBar;