'use client'

import CommonHeader from "@/app/components/atoms/commonHeader/CommonHeader";
import RightBar from "@/app/components/atoms/rightBar/RightBar";
import EmptyPage from "@/app/components/molecules/emptyPage/EmptyPage";
import { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import styles from '@/app/dashboard/dashboard.module.scss';

const Page = () => {

    const [addEmployeeIsOpen, setAddEmployeeIsOpen] = useState(false);

    const handleAddEmployee = (): void => {
        setAddEmployeeIsOpen(true);
    }

    return (
        <>
            <CommonHeader title='Empleados' >
                <button className={styles.button} onClick={handleAddEmployee}>
                    <IoMdAddCircleOutline size={20} className='mr-1' />
                    Empleado
                </button>
            </CommonHeader>
            <EmptyPage handleClick={handleAddEmployee} emptyPage="Empleados" />
            <p>Employees Page</p>
            <RightBar isOpen={addEmployeeIsOpen} setIsOpen={setAddEmployeeIsOpen} title='Crear Empleado'>
                {/* <AddEmployeeForm setAddEmployeeIsOpen={setAddEmployeeIsOpen} /> */}
            </RightBar>
        </>
    );
}

export default Page;