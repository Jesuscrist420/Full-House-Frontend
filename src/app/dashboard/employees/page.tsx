'use client'

import CommonHeader from "@/app/components/atoms/commonHeader/CommonHeader";
import RightBar from "@/app/components/atoms/rightBar/RightBar";
import EmptyPage from "@/app/components/atoms/emptyPage/EmptyPage";
import { useState } from "react";
import CommonHeaderButton from "@/app/components/atoms/commonHeaderButton/CommonHeaderButton";

const Page = () => {

    const [addEmployeeIsOpen, setAddEmployeeIsOpen] = useState(false);

    const handleAddEmployee = (): void => {
        setAddEmployeeIsOpen(true);
    }

    return (
        <>
            <CommonHeader title='Empleados' >
                <CommonHeaderButton text="Empleado" handleClick={handleAddEmployee} />
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