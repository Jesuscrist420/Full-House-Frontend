import Image, { StaticImageData } from 'next/image';
import styles from './PresentationCard.module.scss';
import SocialLogosTeam from '../../atoms/socialLogosTeam/SocialLogosTeam';
import { UrlObject } from 'url';

type PresentationCardProps = {
    img: StaticImageData;
    name: string;
    position: string;
    github: string;
    linkedin: string;
}

const PresentationCard = ({img, name, position, github, linkedin}: PresentationCardProps) => {
    return (
        <div className={styles.container}>
            {/* Img */}
            <Image
                src={img}
                width={150}
                height={150}
                className={styles.photo}
                alt="Photo of an integrant of the team"
            />
            <p className={styles.name}>{name}</p>
            <p className={styles.position}>{position}</p>
            {/* Social buttons */}
            <SocialLogosTeam github={github} linkedin={linkedin} />
        </div>
    )
}

export default PresentationCard;