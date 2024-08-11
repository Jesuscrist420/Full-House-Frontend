'use client'

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import RightBar from "@/app/components/atoms/rightBar/RightBar";
import EmptyPage from "@/app/components/atoms/emptyPage/EmptyPage";
import { getEmployees } from "@/services/employees/getEmployees.service";
import CommonHeader from "@/app/components/atoms/commonHeader/CommonHeader";
import EmployessGrid from "@/app/components/organisms/employeesGrid/EmployeesGrid";
import AddEmployeeForm from "@/app/components/molecules/addEmployeeForm/AddEmployeeForm";
import EmployeeSummary from "@/app/components/organisms/employeeSummary/EmployeeSummary";
import CommonHeaderButton from "@/app/components/atoms/commonHeaderButton/CommonHeaderButton";
import DeleteEmployeeForm from '@/app/components/molecules/deleteEmployeeForm/DeleteEmployeeForm';
import UpdateEmployeeForm from "@/app/components/molecules/updateEmployeeForm/UpdateEmployeeForm";

const Page = () => {

    const [addEmployeeIsOpen, setAddEmployeeIsOpen] = useState(false);
    const [editEmployeeIsOpen, setEditEmployeeIsOpen] = useState(false);
    const [deleteEmployeeIsOpen, setDeleteEmployeeIsOpen] = useState(false);
    const [employeeSummaryIsOpen, setEmployeeSummaryIsOpen] = useState(false);

    const [employeesList, setEmployeesList] = useState();

    const [employeeSelected, setEmployeeSelected] = useState({
        name: '',
        email: '',
        password: '',
        position: '',
        user_id: ''
    });

    const { data: session, status } = useSession();
    const token = session?.token;

    const fetchEmployeesData =  async () => {
        if(status == 'authenticated'){
            const res = await getEmployees(token);
            if(res.length !== 0){
                setEmployeesList(res);
                console.log('Employees List: ', res);
            }else{
                setEmployeesList(undefined);
            }
        }
    }

    useEffect(() => {
        void fetchEmployeesData();   
    },[session, addEmployeeIsOpen, editEmployeeIsOpen, deleteEmployeeIsOpen, employeeSummaryIsOpen]);

    const handleOpenAddEmployee = (): void => {
        setAddEmployeeIsOpen(true);
    }

    const handleOpenEditEmployee = (employee: any): void => {
        setEmployeeSelected(employee);
        setEditEmployeeIsOpen(true);
    }

    const handleOpenDeleteEmployee = (employee: any): void => {
        setEmployeeSelected(employee);
        setDeleteEmployeeIsOpen(true);
    }

    return (
        <>
            <CommonHeader title='Empleados' >
                <CommonHeaderButton text="Empleado" handleClick={handleOpenAddEmployee} />
            </CommonHeader>
            <EmptyPage handleClick={handleOpenAddEmployee} emptyPage="Empleados" hidden={employeesList ? true : false}/>

            <EmployessGrid
                setEmployeeSelected={setEmployeeSelected}
                setEmployeeSummaryIsOpen={setEmployeeSummaryIsOpen}
                employeesList={employeesList} 
                hidden={employeesList ? false : true}
            />

            <RightBar isOpen={addEmployeeIsOpen} setIsOpen={setAddEmployeeIsOpen} title='Crear Empleado'>
                <AddEmployeeForm setAddEmployeeIsOpen={setAddEmployeeIsOpen} />
            </RightBar>

            <RightBar isOpen={employeeSummaryIsOpen} title='Empleado' setIsOpen={setEmployeeSummaryIsOpen}>
                <EmployeeSummary
                    employee={employeeSelected}
                    setEmployeeSummaryIsOpen={setEmployeeSummaryIsOpen}
                    setEmployeeDeleteIsOpen={setDeleteEmployeeIsOpen}
                    setEmployeeEditIsOpen={setEditEmployeeIsOpen}
                    setEmployeeEdit={handleOpenEditEmployee}
                    setEmployeeDelete={handleOpenDeleteEmployee}
                />
            </RightBar>

            <RightBar isOpen={editEmployeeIsOpen} title='Editar Empleado' setIsOpen={setEditEmployeeIsOpen}>
                <UpdateEmployeeForm employeeSelected={employeeSelected} setEditEmployeeIsOpen={setEditEmployeeIsOpen} />
            </RightBar>

            <RightBar isOpen={deleteEmployeeIsOpen} title='Eliminar Empleado' setIsOpen={setDeleteEmployeeIsOpen}>
                <DeleteEmployeeForm employeeSelected={employeeSelected} setEmployeeDeleteIsOpen={setDeleteEmployeeIsOpen} />
            </RightBar>
        </>
    );
}

export default Page;