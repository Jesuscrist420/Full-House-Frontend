import React from 'react';
import classNames from 'classnames';
import styles from './TablesGrid.module.scss';
import TableCard from '../../molecules/tableCard/TableCard';


type TableGridProps = {
    tablesList?: {
        id: string,
        available: boolean,
        location: string,
        name: string,
        seats: number,
    }[],
    hidden?: boolean,
    setTableSelected: (table: any) => void,
    setTableSummaryIsOpen:(val: boolean) => void
}

const TablesGrid = ({tablesList, hidden, setTableSelected, setTableSummaryIsOpen}: TableGridProps) => {

    const containerStyles = classNames(styles.employeesGridContainer, {
        [styles.hidden]: hidden,
    })

    return (
        <>
            <div className={containerStyles}>
                {tablesList?.map((table) => (
                    <TableCard 
                        key={`table_${table.id}`} 
                        img={'/customers/evil-Rabbit.png'} 
                        name={table.name} 
                        available={table.available}
                        location={table.location}
                        seats={table.seats}
                        tableSelected={table}
                        setTableSelected={setTableSelected}
                        setTableSummaryIsOpen={setTableSummaryIsOpen} 
                    />
                ))}
            </div>
        </>
    )
}

export default TablesGrid;