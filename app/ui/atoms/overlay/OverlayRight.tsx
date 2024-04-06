'use client'
import React from 'react';
import styles from '@/app/authentication/authentication.module.scss';
import classNames from 'classnames';

type OverlayRightProps = {
    setRightPanelActive: (val: boolean) => void;
}

const OverlayRight = ({setRightPanelActive}: OverlayRightProps) => {
    
    function handleClick(): void{
        setRightPanelActive(true);
    }

    const overlayStyles = classNames(styles.overlayPanel, styles.overlayRight);
    return(
        <div className={overlayStyles}>
            <h1><strong>Bienvenido de nuevo!</strong></h1>
            <p className={styles.overlayP}>Para mantenerte conectado por favor ingresa con tu credenciales</p>
            <button onClick={handleClick} className={styles.buttonOverlay} id="signUp">Registro</button>
        </div>
    )
}

export default OverlayRight;