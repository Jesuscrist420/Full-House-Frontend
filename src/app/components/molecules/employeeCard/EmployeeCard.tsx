import styles from './EmployeeCard.module.scss';
import Image from 'next/image';

type EmployeeCardProps = {
    id: string,
    img: string;
    name: string;
    position: string;
    employeeSelected: {
        name: string,
        email: string,
        position: string,
        user_id: string,
    }
    setEmployeeSelected: (employee: any) => void,
    setEmployeeSummaryIsOpen: (val: boolean) => void,
}


const EmployeeCard = ({employeeSelected, img, name, position, setEmployeeSelected, setEmployeeSummaryIsOpen}: EmployeeCardProps) => {
    
    const clickHandler = (): void => {
        setEmployeeSelected(employeeSelected);
        setEmployeeSummaryIsOpen(true);
    }

    return (
        <div className={styles.container} onClick={clickHandler}>
            {/* Img */}
            <Image
                src={img}
                width={80}
                height={80}
                className={styles.photo}
                alt="Photo of an integrant of the team"
            />
            <p className={styles.name}>{name}</p>
            <p className={styles.position}>{position}</p>
        </div>
    )
}

export default EmployeeCard;