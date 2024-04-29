import React from 'react';
import Image from 'next/image';
import styles from './EmployeeSummary.module.scss';
import { MdDelete } from 'react-icons/md';
import { FaPencilAlt } from 'react-icons/fa';
import { AtSymbolIcon, InformationCircleIcon } from '@heroicons/react/20/solid';


interface EmployeeSummaryProps {
    employee: any,
    setEmployeeSummaryIsOpen: (val: boolean) => void,
    setEmployeeDeleteIsOpen: (val: boolean) => void
    setEmployeeEditIsOpen: (val: boolean) => void
}

const EmployeeSummary = ({ employee, setEmployeeSummaryIsOpen, setEmployeeDeleteIsOpen, setEmployeeEditIsOpen }: EmployeeSummaryProps) => {

    const handleDelete = (): void => {
        setEmployeeDeleteIsOpen(true);
        setEmployeeSummaryIsOpen(false);
    }

    const handleEdit = (): void => {
        setEmployeeEditIsOpen(true);
        setEmployeeSummaryIsOpen(false);
    }

    return (
        <>
            <div className={styles.imgContainer}>
                <Image className={styles.img} width={80} height={80} src={'/customers/evil-Rabbit.png'} alt={''} />
            </div>
            <h3 className={styles.employeeName}>{employee?.name}</h3>
            <section className={styles.sectionInfo}>
                <div className={styles.infoRow}>
                    <div className={styles.titleInfoContainer}>
                        <AtSymbolIcon width={20}/>
                        <p className={styles.infoTitle}>Email</p>
                    </div>
                    <p className={styles.infoText}>{employee?.email}</p>
                </div>
                <div className={styles.infoRow}>
                    <div className={styles.titleInfoContainer}>
                        <InformationCircleIcon width={20} />
                        <p className={styles.infoTitle}>Cargo</p>
                    </div>
                    <p className={styles.infoText}>{employee?.role}</p>
                </div>
            </section>
            <div className={styles.buttonsContainer}>
                <button onClick={handleDelete} className={styles.deleteButton}><MdDelete />Eliminar</button>
                <button onClick={handleEdit} className={styles.editButton}><FaPencilAlt />Editar</button>
            </div>
        </>
    )
}

export default EmployeeSummary;