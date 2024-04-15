'use client'

import CommonHeaderButton from "@/app/components/atoms/commonHeaderButton/CommonHeaderButton";
import CommonHeader from "@/app/components/atoms/commonHeader/CommonHeader";
import EmptyPage from "@/app/components/atoms/emptyPage/EmptyPage";
import RightBar from "@/app/components/atoms/rightBar/RightBar";
import { useState } from "react";

const Page = () => {

    const [addTablesIsOpen, setAddTablesIsOpen] = useState(false);

    const handleAddTables = (): void => {
        setAddTablesIsOpen(true);
    }

    return (
        <>
            <CommonHeader title='Mesas'>
                <CommonHeaderButton text="Mesa" handleClick={handleAddTables}/>
            </CommonHeader>
            <EmptyPage handleClick={handleAddTables} emptyPage="Mesas" />
            <RightBar isOpen={addTablesIsOpen} setIsOpen={setAddTablesIsOpen} title='Crear Mesa'>
                {/* <AddTablesForm setAddTablesIsOpen={setAddTablesIsOpen} /> */}
            </RightBar>
        </>
    );
}

export default Page;