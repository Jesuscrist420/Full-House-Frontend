import Image from 'next/image';
import classNames from 'classnames';
import styles from './TableCard.module.scss';

type TableCardProps = {
    img: string;
    available: boolean,
    location: string,
    name: string,
    seats: number,
    tableSelected: {
        available: boolean,
        location: string,
        name: string,
        seats: number,
    }
    setTableSelected: (employee: any) => void,
    setTableSummaryIsOpen: (val: boolean) => void,
}


const EmployeeCard = ({ tableSelected, img, name, available, setTableSelected, setTableSummaryIsOpen }: TableCardProps) => {

    const availableStyles = classNames(styles.available, {
        [styles.green]: available,
        [styles.red]: !available
    })

    const clickHandler = (): void => {
        setTableSelected(tableSelected);
        setTableSummaryIsOpen(true);
    }

    return (
        <div className={styles.container} onClick={clickHandler}>
            {/* Img */}
            <Image
                src={img}
                width={80}
                height={80}
                className={styles.photo}
                alt="Photo of a table"
            />
            <p className={styles.name}>{name}</p>
            <p className={availableStyles}>{available ? 'Disponible' : 'Ocupada'}</p>
        </div>
    )
}

export default EmployeeCard;