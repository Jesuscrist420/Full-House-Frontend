'use client'

import CommonHeader from "@/app/components/atoms/commonHeader/CommonHeader";
import RightBar from "@/app/components/atoms/rightBar/RightBar";
import EmptyPage from "@/app/components/atoms/emptyPage/EmptyPage";
import { useState } from "react";
import CommonHeaderButton from "@/app/components/atoms/commonHeaderButton/CommonHeaderButton";
import AddEmployeeForm from "@/app/components/molecules/addEmployeeForm/AddEmployeeForm";
import EmployessGrid from "@/app/components/organisms/employeesGrid/EmployeesGrid";

const Page = () => {

    const [addEmployeeIsOpen, setAddEmployeeIsOpen] = useState(false);

    const [employeesList, setEmployeesList] = useState([
        {
            name: 'employeeName',
            email: 'employeeEmail',
            password: 'employeePassword',
            role: 'Admin',
            id: "653c0608195e0930f96230f7",
            createdAt: "2023-11-26T18:49:41.082Z",
            updatedAt: "2023-11-26T18:49:41.082Z"
        },
    ]);

    const handleAddEmployee = (): void => {
        setAddEmployeeIsOpen(true);
    }

    return (
        <>
            <CommonHeader title='Empleados' >
                <CommonHeaderButton text="Empleado" handleClick={handleAddEmployee} />
            </CommonHeader>
            <EmptyPage handleClick={handleAddEmployee} emptyPage="Empleados" hidden={employeesList.length !== 0}/>
            <EmployessGrid employeesList={employeesList} hidden={employeesList.length == 0}/>
            <RightBar isOpen={addEmployeeIsOpen} setIsOpen={setAddEmployeeIsOpen} title='Crear Empleado'>
                <AddEmployeeForm setAddEmployeeIsOpen={setAddEmployeeIsOpen} employeesList={employeesList} />
            </RightBar>
        </>
    );
}

export default Page;