import ContactUsForm from "../ui/atoms/contactUsForm/ContactUsForm";
import HomeHeader from "../ui/molecules/homeHeader/HomeHeader";
import styles from "./contactUs.module.scss";

export default function Page() {

    return (
        <>
            <HomeHeader />
            <div className={styles.pageContainer}>
                <h1 className={styles.title}>Contáctanos</h1>
                <ContactUsForm />
            </div>
        </>
    );
}