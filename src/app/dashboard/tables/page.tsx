'use client'

import CommonHeader from "@/app/components/atoms/commonHeader/CommonHeader";
import RightBar from "@/app/components/atoms/rightBar/RightBar";
import EmptyPage from "@/app/components/atoms/emptyPage/EmptyPage";
import { useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import styles from '@/app/dashboard/dashboard.module.scss';

const Page = () => {

    const [addTablesIsOpen, setAddTablesIsOpen] = useState(false);

    const handleAddTables = (): void => {
        setAddTablesIsOpen(true);
    }

    return (
        <>
            <CommonHeader title='Mesas'>
                <button className={styles.button} onClick={handleAddTables}>
                    <IoMdAddCircleOutline size={20} className='mr-1' />
                    Mesa
                </button>
            </CommonHeader>
            <EmptyPage handleClick={handleAddTables} emptyPage="Mesas" />
            <RightBar isOpen={addTablesIsOpen} setIsOpen={setAddTablesIsOpen} title='Crear Mesa'>
                {/* <AddTablesForm setAddTablesIsOpen={setAddTablesIsOpen} /> */}
            </RightBar>
        </>
    );
}

export default Page;