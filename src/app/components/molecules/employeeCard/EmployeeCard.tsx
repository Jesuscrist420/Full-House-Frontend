import Image, { StaticImageData } from 'next/image';
import styles from './EmployeeCard.module.scss';
import SocialLogosTeam from '../../atoms/socialLogosTeam/SocialLogosTeam';
import { UrlObject } from 'url';

type EmployeeCardProps = {
    id: string,
    img: string;
    name: string;
    position: string;
    setEmployeeSummaryIsOpen: (val: boolean) => void,
    setIdEmployeeSelected: (val: string) => void,
}


const EmployeeCard = ({id,img, name, position, setEmployeeSummaryIsOpen, setIdEmployeeSelected}: EmployeeCardProps) => {
    
    const clickHandler = (): void => {
        setEmployeeSummaryIsOpen(true);
        setIdEmployeeSelected(id);
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