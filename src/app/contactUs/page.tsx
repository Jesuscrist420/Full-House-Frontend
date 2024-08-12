import Image from "next/image";
import styles from "./contactUs.module.scss";
import HomeHeader from "../components/molecules/homeHeader/HomeHeader";
import ContactUsForm from "../components/atoms/contactUsForm/ContactUsForm";
import ContactCardInfo from "../components/molecules/contactCardInfo/ContactCardInfo";
export default function Page() {

    return (
        <>
            <HomeHeader />
            <div className={styles.pageContainer}>
                <div className={styles.infoContainer}>
                    <Image className={styles.img} src={"/Contact.JPG"} width={100} height={100} alt={"Waiter showing an ipad to a user"} />
                    <div className={styles.formContainer}>
                        <h1 className={styles.title}>Contáctanos</h1>
                        <ContactUsForm />
                    </div>
                </div>
                <ContactCardInfo />
            </div>
        </>
    );
}