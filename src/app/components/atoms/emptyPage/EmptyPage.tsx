import classNames from 'classnames';
import styles from './EmptyPage.module.scss';
import Image from 'next/image';

type menuEmptyProps = {
    handleClick: () => void,
    emptyPage: string,
    hidden?: boolean,
    primary?: boolean
}

const EmptyPage = ({ handleClick, emptyPage, hidden, primary = true }: menuEmptyProps) => {

    const containerStyles = classNames( 'mt-16 sm:mt-16 md:mt-0', {
        [styles.hidden]: hidden,
        [styles.container]: primary,
        [styles.containerSecondary]: !primary,
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