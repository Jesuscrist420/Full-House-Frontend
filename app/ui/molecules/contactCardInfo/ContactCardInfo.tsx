import SocialLogosCompany from "../../atoms/socialLogosCompany/SocialLogosCompany";
import styles from "./ContactCardInfo.module.scss";

const ContactCardInfo = () => {
    return(
        <div className={styles.contactCard}>
            <h1 className={styles.title}>Información de contacto</h1>
            <p>stocked.tables@gmail.com</p>
            <SocialLogosCompany facebook={""} twitter={""} instagram={""} />
        </div>
    )
}

export default ContactCardInfo;