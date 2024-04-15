import styles from './FormLabel.module.scss';

type formLabelProps = {
    text: string,
    required: boolean
}

const FormLabel = ({text, required}: formLabelProps) => {
    return(
        <label className={styles.newLabel}>{text}{required ? '*' : null}</label>
    )
}
export default FormLabel;