import classNames from 'classnames';
import styles from './EmptyPage.module.scss';
import Image from 'next/image';

type menuEmptyProps = {
    handleClick: () => void,
    emptyPage: string,
    categoriesList: {}[],
}

const EmptyPage = ({ handleClick, emptyPage, categoriesList }: menuEmptyProps) => {

    const containerStyles = classNames(styles.container, 'mt-16 sm:mt-16 md:mt-0', {
        [styles.hidden]: categoriesList !== null,
    })

    return (
        <div className={containerStyles}>
            <Image src='/missing.png' width={100} height={100} alt='Missing img' />
            <p className={styles.alert}>Oops !</p>
            <p className={styles.text}>Parece que aún no tienes {emptyPage}</p>
            <button className={styles.button} onClick={handleClick}> Crear {emptyPage.slice(0, -1)} </button>
        </div>
    )
}

export default EmptyPage;