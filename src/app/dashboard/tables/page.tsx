'use client'

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getTables } from "@/services/tables/getTables.service";
import RightBar from "@/app/components/atoms/rightBar/RightBar";
import EmptyPage from "@/app/components/atoms/emptyPage/EmptyPage";
import TablesGrid from "@/app/components/organisms/tablesGrid/TablesGrid";
import CommonHeader from "@/app/components/atoms/commonHeader/CommonHeader";
import TableSummary from "@/app/components/organisms/tableSummary/TableSummary";
import AddTableForm from "@/app/components/molecules/addTableForm/AddTableForm";
import UpdateTableForm from "@/app/components/molecules/updateTableForm/updateTableFrom";
import DeleteTableForm from "@/app/components/molecules/deleteTableForm/DeleteTableForm";
import CommonHeaderButton from "@/app/components/atoms/commonHeaderButton/CommonHeaderButton";

const Page = () => {

    const [addTablesIsOpen, setAddTablesIsOpen] = useState(false);
    const [deleteTableIsOpen, setDeleteTableIsOpen] = useState(false);
    const [updateTableIsOpen, setUpdateTableIsOpen] = useState(false);
    const [tableSummaryIsOpen, setTableSummaryIsOpen] = useState(false);

    const [tablesList, setTablesList] = useState();

    const [tableSelected, setTableSelected] = useState({
        available: true,
        location: '',
        name: '',
        seats: 0,
    });
    
    const { data: session, status } = useSession();
    const token = session?.token;

    const fetchTablesData = async () => {
        if (status == 'authenticated') {
            const res = await getTables(token);
            if(res.length !== 0){
                setTablesList(res);
                console.log('Tables List: ', res);
            }else{
                setTablesList(undefined);
            }
        }
    }

    useEffect(() => {
        void fetchTablesData();
    }, [session, addTablesIsOpen, updateTableIsOpen, deleteTableIsOpen, tableSummaryIsOpen]);
    

    const handleAddTables = (): void => {
        setAddTablesIsOpen(true);
    }

    const handleEditTable = (table: any): void => {
        setTableSelected(table);
        setUpdateTableIsOpen(true);
    }

    const handleDeleteTable = (table: any): void => {
        setTableSelected(table);
        setDeleteTableIsOpen(true);
    }

    return (
        <>
            <CommonHeader title='Mesas'>
                <CommonHeaderButton text="Mesa" handleClick={handleAddTables} />
            </CommonHeader>
            <EmptyPage handleClick={handleAddTables} emptyPage="Mesas" hidden={tablesList ? true : false} />

            <TablesGrid 
                setTableSelected={setTableSelected}
                setTableSummaryIsOpen={setTableSummaryIsOpen}
                tablesList={tablesList} 
                hidden={tablesList ? false : true}
            />

            <RightBar isOpen={addTablesIsOpen} setIsOpen={setAddTablesIsOpen} title='Crear Mesa'>
                <AddTableForm setAddTableIsOpen={setAddTablesIsOpen} />
            </RightBar>

            <RightBar isOpen={tableSummaryIsOpen} title='Empleado' setIsOpen={setTableSummaryIsOpen}>
                <TableSummary
                    table={tableSelected}
                    setTableSummaryIsOpen={setTableSummaryIsOpen}
                    setDeleteTableIsOpen={setDeleteTableIsOpen}
                    setUpdateTableIsOpen={setUpdateTableIsOpen}
                    setTableEdit={handleEditTable}
                    setTableDelete={handleDeleteTable}
                />
            </RightBar>

            <RightBar isOpen={updateTableIsOpen} setIsOpen={setUpdateTableIsOpen} title='Editar Mesa'>
                <UpdateTableForm setUpdateTableIsOpen={setUpdateTableIsOpen} tableSelected={tableSelected} />
            </RightBar>

            <RightBar isOpen={deleteTableIsOpen} setIsOpen={setDeleteTableIsOpen} title='Eliminar Mesa'>
                <DeleteTableForm setDeleteTableIsOpen={setDeleteTableIsOpen} tableSelected={tableSelected} />
            </RightBar>
        </>
    );
}

export default Page;