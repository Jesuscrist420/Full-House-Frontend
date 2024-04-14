import React from 'react';
import styles from './SettingsForm.module.scss';

const SettingsForm = () => {

    const citiesList = ['Bogota', 'Paris', 'New York', 'Medellin'];

    return (
        <div className={styles.container}>
            <section className={styles.formContainer}>
                <form>
                    <fieldset>
                        <h1 className={styles.title}>Datos del negocio</h1>
                        <div className={styles.row}>
                            <div>
                                <label className={styles.label}>Nombre*</label>
                                <input className={styles.input} type='text' placeholder='Nombre del restaurante' />
                            </div>
                            <div>
                                <label className={styles.label}>Dirección *</label>
                                <input className={styles.input} type='text' placeholder='¿Dónde estan ubicados?' />
                            </div>
                        </div>
                        <div className={styles.row}>
                            <div>
                                <label className={styles.label}>Teléfono *</label>
                                <input className={styles.input} type='number' placeholder='0000000000' />
                            </div>

                            <button className={styles.button}>Guardar</button>
                        </div>
                    </fieldset>
                </form>
            </section>
        </div>
    )
}

export default SettingsForm;