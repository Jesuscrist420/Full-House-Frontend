'use client'
import React from 'react';
import styles from '@/app/authentication/authentication.module.scss';
import classNames from 'classnames';

type OverlayLeftProps = {
    setRightPanelActive: (val: boolean) => void;
}

const OverlayLeft = ({setRightPanelActive}: OverlayLeftProps) => {
    
    function handleClick(): void{
        setRightPanelActive(false);
    }

    const overlayStyles = classNames(styles.overlayPanel, styles.overlayLeft);

    return(
        <div className={overlayStyles}>
            <h1><strong>Bienvenido!</strong></h1>
            <p className={styles.overlayP}>Ingresa tu información personal para empezar tu viaje con nosotros!</p>
            <button onClick={handleClick} className={styles.buttonOverlay} id="signIn">Ingresar</button>
        </div>
    )
}

export default OverlayLeft;