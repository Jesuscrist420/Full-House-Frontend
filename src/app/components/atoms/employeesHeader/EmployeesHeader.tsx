import React from 'react';
import styles from './EmployeesHeader.module.scss';

const EmployeesHeader = () => {
    return (
        <header className={styles.employeesHeader}>
            <h1 className={styles.title}>Employees</h1>
        </header>
    )
}

export default EmployeesHeader;