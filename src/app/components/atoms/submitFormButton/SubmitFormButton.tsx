import styles from './SubmitFormButton.module.scss';

type submitFormButtonProps = {
    text: string
}
const SubmitFormButton = ({text}: submitFormButtonProps) => {
    return(
        <button className={styles.submitButton}>{text}</button>
    )
}

export default SubmitFormButton;