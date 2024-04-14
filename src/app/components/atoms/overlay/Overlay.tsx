import React from 'react'
import OverlayLeft from '@/app/components/atoms/overlay/OverlayLeft';
import OverlayRight from '@/app/components/atoms/overlay/OverlayRight';
import styles from '@/app/authentication/authentication.module.scss';

type OverlayProps = {
    setRightPanelActive: (val: boolean) => void;
}

const Overlay = ({setRightPanelActive}: OverlayProps) => {
    return(
        <div className={styles.overlayContainer}>
            <div className={styles.overlay}>
                <OverlayLeft setRightPanelActive={setRightPanelActive} />
                <OverlayRight setRightPanelActive={setRightPanelActive} />
            </div>
        </div>
    )
}

export default Overlay;