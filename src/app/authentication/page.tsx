'use client'
import classNames from 'classnames';
import {useSession} from "next-auth/react";
import { useRouter } from 'next/navigation';
import styles from "./authentication.module.scss";
import React, { useEffect, useState } from 'react';
import Overlay from '@/app/components/atoms/overlay/Overlay';
import LogInForm from '@/app/components/organisms/logInForm/LogInForm';
import SignUpForm from '@/app/components/organisms/signUpForm/SignUpForm';

const Authentication = () => {

    const {data: session, status} = useSession();
    const router = useRouter();
    const [rightPanelActive, setRightPanelActive] = useState(false);

    useEffect(() => {
        if(status === 'authenticated'){
            router.push("/dashboard")
        }
    }, [status, router]);

    const containerStyles = classNames(styles.container, {[styles.rightPanelActive]:rightPanelActive});

    return (
        <div className={styles.falseBody}>
            <div className={containerStyles} id="container">
                <SignUpForm/>
                <LogInForm/>
                <Overlay setRightPanelActive={setRightPanelActive} />
            </div>
        </div>
    )
}

export default Authentication;