import { IoMdAddCircleOutline } from "react-icons/io"
import styles from "./CommonHeaderButton.module.scss"

type commonHeaderButtonProps = {
    text: string,
    handleClick: () => void
}

const CommonHeaderButton = ({text, handleClick}: commonHeaderButtonProps) => {
    return (
        <button className={styles.button} onClick={handleClick}>
            <IoMdAddCircleOutline size={20} className='mr-1' />
            {text}
        </button>
    )
}

export default CommonHeaderButton