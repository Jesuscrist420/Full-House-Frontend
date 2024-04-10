import React from 'react'
import OverlayLeft from '@/src/app/ui/atoms/overlay/OverlayLeft';
import OverlayRight from '@/src/app/ui/atoms/overlay/OverlayRight';
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