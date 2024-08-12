import React from 'react';
import Image from 'next/image';
import { MdDelete } from 'react-icons/md';
import { FaPencilAlt } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import styles from './EmployeeSummary.module.scss';
import { AtSymbolIcon, InformationCircleIcon } from '@heroicons/react/20/solid';


interface EmployeeSummaryProps {
    employee: {
        name: string,
        email: string,
        position: string,
        user_id: string,
    } | null,
    setEmployeeSummaryIsOpen: (val: boolean) => void,
    setEmployeeDeleteIsOpen: (val: boolean) => void
    setEmployeeEditIsOpen: (val: boolean) => void
    setEmployeeDelete: (employee: any) => void,
    setEmployeeEdit: (employee: any) => void,
}

const EmployeeSummary = ({ employee, setEmployeeSummaryIsOpen, setEmployeeDeleteIsOpen, setEmployeeEditIsOpen, setEmployeeDelete, setEmployeeEdit}: EmployeeSummaryProps) => {
    
    const { data: session, status, update } = useSession();

    const handleDelete = (employee: any): void => {
        setEmployeeDeleteIsOpen(true);
        setEmployeeSummaryIsOpen(false);
        setEmployeeDelete(employee);
        update();
    }

    const handleEdit = (employee: any): void => {
        setEmployeeEditIsOpen(true);
        setEmployeeSummaryIsOpen(false);
        setEmployeeEdit(employee);
        update();
    }

    const employeeImg = (position: string | undefined) => {
        var img = ''
        switch (position) {
            case 'Administrador':
                img = '/employees/admin.JPG';
                break;
            case 'Cocinero':
                img = '/employees/chef.JPG';
                break;
            case 'Mesero':
                img = '/employees/waiter.JPG';
                break;
            default:
                img = '/customers/evil-rabbit.png';
        }
        return img;
    }

    return (
        <>
            <div className={styles.imgContainer}>
                <Image className={styles.img} width={80} height={80} src={employeeImg(employee?.position)} alt={''} />
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
                    <p className={styles.infoText}>{employee?.position}</p>
                </div>
            </section>
            <div className={styles.buttonsContainer}>
                <button onClick={() => handleEdit(employee)} className={styles.editButton}><FaPencilAlt />Editar</button>
                <button onClick={() => handleDelete(employee)} className={styles.deleteButton}><MdDelete />Eliminar</button>
            </div>
        </>
    )
}

export default EmployeeSummary;