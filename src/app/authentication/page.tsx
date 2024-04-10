'use client'
import React, { useEffect, useState } from 'react';
import LogInForm from '@/src/app/ui/organisms/logInForm/LogInForm';
import SignUpForm from '@/src/app/ui/organisms/signUpForm/SignUpForm';
import Overlay from '@/src/app/ui/atoms/overlay/Overlay';
// import {useSession} from "next-auth/react";
import styles from "./authentication.module.scss";
import { useRouter } from 'next/navigation';
import classNames from 'classnames';

const Authentication = () => {

    // const {data: session, status} = useSession();
    const router = useRouter();
    const [rightPanelActive, setRightPanelActive] = useState(false);

    // console.log({session, status});
    /* useEffect(() => {
        if(status === 'authenticated'){
            router.push("/")
        }
    }, [status, router]); */

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