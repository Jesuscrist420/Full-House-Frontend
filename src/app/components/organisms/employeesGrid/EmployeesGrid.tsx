import React from 'react';
import classNames from 'classnames';
import styles from './EmployeesGrid.module.scss';
import EmployeeCard from '@/app/components/molecules/employeeCard/EmployeeCard';


type EmployeesGridProps = {
    employeesList?: {
        name: string,
        email: string,
        position: string,
        user_id: string,
    }[],
    hidden?: boolean,
    setEmployeeSelected: (employee: any) => void,
    setEmployeeSummaryIsOpen: (val: boolean) => void
}

const EmployessGrid = ({ employeesList, hidden, setEmployeeSelected, setEmployeeSummaryIsOpen }: EmployeesGridProps) => {

    const containerStyles = classNames(styles.employeesGridContainer, {
        [styles.hidden]: hidden,
    })

    const employeeImg = (position: string) => {
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
        }
        return img;
    }

    return (
        <>
            <div className={containerStyles}>
                {employeesList?.map((employee) => (
                    <EmployeeCard
                        key={`employee_${employee.user_id}`}
                        id={employee.user_id}
                        img={employeeImg(employee.position)}
                        name={employee.name}
                        position={employee.position}
                        employeeSelected={employee}
                        setEmployeeSelected={setEmployeeSelected}
                        setEmployeeSummaryIsOpen={setEmployeeSummaryIsOpen}
                    />
                ))}
            </div>
        </>
    )
}

export default EmployessGrid;