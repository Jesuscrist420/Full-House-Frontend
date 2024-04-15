import ContactUsForm from "../components/atoms/contactUsForm/ContactUsForm";
import ContactCardInfo from "../components/molecules/contactCardInfo/ContactCardInfo";
import Footer from "../components/molecules/footer/Footer";
import HomeHeader from "../components/molecules/homeHeader/HomeHeader";
import styles from "./contactUs.module.scss";

export default function Page() {

    return (
        <>
            <HomeHeader />
            <div className={styles.pageContainer}>
                <h1 className={styles.title}>Contáctanos</h1>
                <ContactUsForm />
                <ContactCardInfo />
            </div>
        </>
    );
}