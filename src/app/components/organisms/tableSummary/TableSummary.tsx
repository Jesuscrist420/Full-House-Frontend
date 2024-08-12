import React from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import { MdDelete } from 'react-icons/md';
import { FaPencilAlt } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import styles from './TableSummary.module.scss';
import { ArrowRightCircleIcon, InformationCircleIcon, MapPinIcon } from '@heroicons/react/20/solid';

interface TableSummaryProps {
    table: {
        available: boolean,
        location: string,
        name: string,
        seats: number,
    } | null,
    setTableSummaryIsOpen: (val: boolean) => void,
    setDeleteTableIsOpen: (val: boolean) => void
    setUpdateTableIsOpen: (val: boolean) => void
    setTableEdit: (table: any) => void,
    setTableDelete: (table: any) => void,
}

const TableSummary = ({ table, setTableSummaryIsOpen, setDeleteTableIsOpen, setUpdateTableIsOpen, setTableDelete, setTableEdit}: TableSummaryProps) => {
    
    const { data: session, status, update } = useSession();

    const availableStyles = classNames(styles.infoText, {
        [styles.green]: table?.available,
        [styles.red]: !table?.available
    })

    const handleDelete = (table: any): void => {
        setDeleteTableIsOpen(true);
        setTableSummaryIsOpen(false);
        setTableDelete(table);
        update();
    }

    const handleEdit = (table: any): void => {
        setUpdateTableIsOpen(true);
        setTableSummaryIsOpen(false);
        setTableEdit(table);
        update();
    }

    return (
        <>
            <div className={styles.imgContainer}>
                <Image className={styles.img} width={80} height={80} src={'/customers/evil-Rabbit.png'} alt={''} />
            </div>
            <h3 className={styles.employeeName}>{table?.name}</h3>
            <section className={styles.sectionInfo}>
                <div className={styles.infoRow}>
                    <div className={styles.titleInfoContainer}>
                        <ArrowRightCircleIcon width={20}/>
                        <p className={styles.infoTitle}>Disponible</p>
                    </div>
                    <p className={availableStyles}>{table?.available ? 'Disponible' : 'Ocupada'}</p>
                </div>
                <div className={styles.infoRow}>
                    <div className={styles.titleInfoContainer}>
                        <InformationCircleIcon width={20} />
                        <p className={styles.infoTitle}>Asientos</p>
                    </div>
                    <p className={styles.infoText}>{table?.seats}</p>
                </div>
                <div className={styles.infoRow}>
                    <div className={styles.titleInfoContainer}>
                        <MapPinIcon width={20} />
                        <p className={styles.infoTitle}>Ubicación</p>
                    </div>
                    <p className={styles.infoText}>{table?.location}</p>
                </div>
            </section>
            <div className={styles.buttonsContainer}>
                <button onClick={() => handleEdit(table)} className={styles.editButton}><FaPencilAlt />Editar</button>
                <button onClick={() => handleDelete(table)} className={styles.deleteButton}><MdDelete />Eliminar</button>
            </div>
        </>
    )
}

export default TableSummary;