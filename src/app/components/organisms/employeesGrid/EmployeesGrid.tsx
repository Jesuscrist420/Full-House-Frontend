import EmployeeCard from '@/app/components/molecules/employeeCard/EmployeeCard';
import React, { useEffect, useState } from 'react';
import styles from './EmployeesGrid.module.scss';
import RightBar from '@/app/components/atoms/rightBar/RightBar';
import classNames from 'classnames';
import EmployeeSummary from '../employeeSummary/EmployeeSummary';
// import EmployeeSummaryRightBar from '../employeeSummaryRightBar/EmployeeSummaryRightBar';
// import { getEmployee, getEmployees } from '@/services/Employee.service';
// import DeleteEmployeePanel from '@/components/atoms/deleteEmployeePanel/DeleteEmployeePanel';
// import EmployeeForm from '@/components/molecules/employeeForm/EmployeeForm';

type EmployeesGridProps = {
    employeesList: {
        name: string,
        email: string,
        password: string,
        role: string,
        id: string,
        createdAt: string,
        updatedAt: string,
    }[],
    hidden?: boolean,
}

const EmployessGrid = ({employeesList, hidden}: EmployeesGridProps) => {

    const [employeeSummaryIsOpen, setEmployeeSummaryIsOpen] = useState(false);
    const [employeeDeleteIsOpen, setEmployeeDeleteIsOpen] = useState(false);
    const [employeeEditIsOpen, setEmployeeEditIsOpen] = useState(false);

    const [idEmployeeSelected, setIdEmployeeSelected] = useState('');
    const [employeeSelected, setEmployeeSelected] = useState({
        userId: '1',
        name: 'employeeName',
        email: 'employeeEmail',
        role: 'employeeRole',
    });

    const newEmployeesList: any = [];

    const containerStyles = classNames(styles.employeesGridContainer, {
        [styles.hidden]: hidden,
    })

    /* useEffect(() => {
        void fetchEmployeesData();
        if (EmployeeSummaryIsOpen) {
            void fetchEmployeeData(idEmployeeSelected);
        }
    }, [EmployeeSummaryIsOpen, EmployeeDeleteIsOpen, EmployeeEditIsOpen, addEmployeeIsOpen]) */

    /* const fetchEmployeeData = async (id: string) => {
        try {
            const response = await getEmployee(id);
            const resultStr = JSON.stringify(response);
            const resultObj = JSON.parse(resultStr);
            const newEmployee = {
                id: resultObj[0]._id,
                name: resultObj[0].name,
                email: resultObj[0].email,
                role: resultObj[0].role,
            }
            setEmployeeSelected(newEmployee);
        } catch (error) {
            console.error('Error fetching Employee data:', error);
        }
    } */

    /* const fetchEmployeesData = async () => {
        try {
            const response = await getEmployees();
            const resultStr = JSON.stringify(response);
            const resultObj = JSON.parse(resultStr);
            console.log('Object: ', resultObj);
            // let newCost = 0;
            let newTotalEmployees = 0;
            for (let i = 0; i < resultObj.length; i++) {
                newEmployeesList.push({
                    id: resultObj[i]._id,
                    name: resultObj[i].name,
                    email: resultObj[i].email,
                    role: resultObj[i].role,
                })
                newTotalEmployees += parseInt(resultObj[i].stock);
                // newCost += (parseInt(resultObj[i].price) * parseInt(resultObj[i].stock));
            }
            setTotalEmployees(newTotalEmployees);
            // setTotalCost(newCost);
            setEmployeesList(newEmployeesList);
        } catch (error) {
            console.error('Error fetching Employees data:', error);
        }
    }*/

    return (
        <>
            <div className={containerStyles}>
                {employeesList?.map((employee) => (
                    <EmployeeCard 
                        key={employee.id} 
                        id={employee.id}
                        img={'/customers/evil-Rabbit.png'} 
                        name={employee.name} 
                        position={employee.role} 
                        setEmployeeSummaryIsOpen={setEmployeeSummaryIsOpen} 
                        setIdEmployeeSelected={setIdEmployeeSelected}
                    />
                ))}
            </div>

            <RightBar isOpen={employeeSummaryIsOpen} title='Empleado' setIsOpen={setEmployeeSummaryIsOpen}>
                <EmployeeSummary
                    employee={employeeSelected}
                    setEmployeeSummaryIsOpen={setEmployeeSummaryIsOpen}
                    setEmployeeDeleteIsOpen={setEmployeeDeleteIsOpen}
                    setEmployeeEditIsOpen={setEmployeeEditIsOpen}
                />
            </RightBar>

            <RightBar isOpen={employeeDeleteIsOpen} title='Eliminar Empleado' setIsOpen={setEmployeeDeleteIsOpen}>
                {/* <DeleteEmployeePanel EmployeeSelected={EmployeeSelected} setEmployeeSelected={setEmployeeSelected} setEmployeeSummaryIsOpen={setEmployeeSummaryIsOpen} setEmployeeDeleteIsOpen={setEmployeeDeleteIsOpen} /> */}
            </RightBar>

            <RightBar isOpen={employeeEditIsOpen} title='Editar Empleado' setIsOpen={setEmployeeEditIsOpen}>
                {/* <EmployeeForm isEdit EmployeeSelected={EmployeeSelected} categoriesList={categoriesList} setEmployeeSummaryIsOpen={setEmployeeSummaryIsOpen} setEmployeeEditIsOpen={setEmployeeEditIsOpen} /> */}
            </RightBar>
        </>
    )
}

export default EmployessGrid;