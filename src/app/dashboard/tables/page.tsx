'use client'

import CommonHeaderButton from "@/app/components/atoms/commonHeaderButton/CommonHeaderButton";
import CommonHeader from "@/app/components/atoms/commonHeader/CommonHeader";
import EmptyPage from "@/app/components/atoms/emptyPage/EmptyPage";
import RightBar from "@/app/components/atoms/rightBar/RightBar";
import { useEffect, useState } from "react";
import AddTableForm from "@/app/components/molecules/addTableForm/AddTableForm";
import UpdateTableForm from "@/app/components/molecules/updateTableForm/updateTableFrom";
import DeleteTableForm from "@/app/components/molecules/deleteTableForm/DeleteTableForm";
import CategoriesAccordion from "@/app/components/organisms/categoriesAccordion/CategoriesAccordion";
import { useSession } from "next-auth/react";
import { getTables } from "@/services/getTables.service";
import TablesAccordion from "@/app/components/organisms/tablesAccordion/TablesAccordion";

const Page = () => {

    const [addTablesIsOpen, setAddTablesIsOpen] = useState(false);
    const [deleteTableIsOpen, setDeleteTableIsOpen] = useState(false);
    const [updateTableIsOpen, setUpdateTableIsOpen] = useState(false);
    const [selectedTable, setSelectedTable] = useState(null);
    const handleAddTables = (): void => {
        setAddTablesIsOpen(true);
    }

    const handleEditTable = (table: any): void => {
        setSelectedTable(table);
        setUpdateTableIsOpen(true);
    }

    const handleDeleteTable = (table: any): void => {
        setSelectedTable(table);
        setDeleteTableIsOpen(true);
    }

    const [tablesList, setTablesList] = useState();
    const { data: session, status } = useSession();
    const token = session?.token;


    const fetchTablesData = async () => {
        if (status == 'authenticated') {
            const res = await getTables(token);
            if(res.length !== 0){
                setTablesList(res);
                console.log('Response: ', res);
            }
        }
    }
    //setCategoriesList(categoriesListMock);
    useEffect(() => {
        void fetchTablesData();
    }, [session]);



    return (
        <>
            <CommonHeader title='Mesas'>
                <CommonHeaderButton text="Mesa" handleClick={handleAddTables} />
            </CommonHeader>
            <EmptyPage handleClick={handleAddTables} emptyPage="Mesas" hidden={tablesList ? true : false} />
            <RightBar isOpen={addTablesIsOpen} setIsOpen={setAddTablesIsOpen} title='Crear Mesa'>
                <AddTableForm setAddTableIsOpen={setAddTablesIsOpen} />
            </RightBar>
            <RightBar isOpen={updateTableIsOpen} setIsOpen={setUpdateTableIsOpen} title='Actualizar Mesa'>
                <UpdateTableForm setUpdateTableIsOpen={setUpdateTableIsOpen} tableSelected={selectedTable} />
            </RightBar>
            <RightBar isOpen={deleteTableIsOpen} setIsOpen={setDeleteTableIsOpen} title='Eliminar Mesa'>
                <DeleteTableForm setDeleteTableIsOpen={setDeleteTableIsOpen} tableSelected={selectedTable} />
            </RightBar>
            <TablesAccordion setTableDelete={handleDeleteTable} tablesList={tablesList ? tablesList : []} setTableEdit={handleEditTable} />
        </>
    );
}

export default Page;