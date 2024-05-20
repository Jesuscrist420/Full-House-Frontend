'use client'

import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import styles from './SettingsForm.module.scss';
import { createRestaurant } from '@/services/createRestaurant.service';

const SettingsForm = () => {

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [errorsName, setErrorsName] = useState([]);
    const [errorsAddress, setErrorsAddress] = useState([]);
    const [errorsSave, setErrorsSave] = useState('');
    const [errorsPhoneNumber, setErrorsPhoneNumber] = useState([]);

    const { data: session, status , update} = useSession();
    
    const token = session?.token;
    const restaurantId = session?.user?.restaurant_id;

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            if (!restaurantId) {
                const res = await createRestaurant({ name, address, phoneNumber, token });
                const response = await res.json();
                if (res.ok) {
                    setName('');
                    setAddress('');
                    setPhoneNumber('');
                    setErrorsName([]);
                    setErrorsAddress([]);
                    setErrorsPhoneNumber([]);
                    update();
                } else {
                    if (res.errors) {
                        if (res.errors.name) {
                            setErrorsName(res.errors.name);
                        } else if (res.errors.address) {
                            setErrorsAddress(res.errors.address);
                        } else if (res.errors.phoneNumber) {
                            setErrorsPhoneNumber(res.errors.phoneNumber)
                        }
                    }
                }
            } else {
                setErrorsSave('Ya tienes un restaurante');
            }
            // const res = await updateRestaurant(name , address, phoneNumber);
        } catch (err) {
            console.log(err);
            return
        }
    }

    return (
        <div className={styles.container}>
            <section className={styles.formContainer}>
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <h1 className={styles.title}>Datos del negocio</h1>
                        <div className={styles.row}>
                            <div>
                                <label className={styles.label}>Nombre*</label>
                                <input
                                    id='RestaurantNameInput'
                                    className={styles.input}
                                    type='text'
                                    placeholder='Nombre del restaurante'
                                    maxLength={20}
                                    value={name}
                                    onChange={(e) => { setName(e.target.value); setErrorsName([]); setErrorsSave('') }}
                                    required
                                />
                                {errorsName?.map((errorName) => {
                                    return (
                                        <p key={errorName} className={styles.error}>{errorName}</p>
                                    )
                                })}
                            </div>
                            <div>
                                <label className={styles.label}>Dirección *</label>
                                <input
                                    id='RestaurantAddressInput'
                                    className={styles.input}
                                    type='text'
                                    placeholder='¿Dónde estan ubicados?'
                                    value={address}
                                    onChange={(e) => { setAddress(e.target.value); setErrorsAddress([]); setErrorsSave('') }}
                                    required
                                />
                                {errorsAddress?.map((errorAddress) => {
                                    return (
                                        <p key={errorAddress} className={styles.error}>{errorAddress}</p>
                                    )
                                })}
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div>
                                <label className={styles.label}>Teléfono *</label>
                                <input
                                    id='RestaurantPhoneInput'
                                    className={styles.input}
                                    type='text'
                                    inputMode='numeric'
                                    pattern='[0-9]{7}{10}'
                                    placeholder='0000000000'
                                    maxLength={10}
                                    value={phoneNumber}
                                    onChange={(e) => { setPhoneNumber(e.target.value); setErrorsPhoneNumber([]); setErrorsSave('') }}
                                    required
                                />
                                {errorsPhoneNumber?.map((errorPhoneNumber) => {
                                    return (
                                        <p key={errorPhoneNumber} className={styles.error}>{errorPhoneNumber}</p>
                                    )
                                })}
                            </div>
                            <button className={styles.button}>Guardar</button>
                            <p className={styles.error}>{errorsSave}</p>
                        </div>
                    </fieldset>
                </form>
            </section>
        </div>
    )
}

export default SettingsForm;