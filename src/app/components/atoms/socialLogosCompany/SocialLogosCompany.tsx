import Link from "next/link";
import styles from "./SocialLogosCompany.module.scss";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const SocialLogosCompany = () => {

    const FB_URL = "";
    const IG_URL = "https://www.instagram.com/fullhousestockage";
    const X_URL = "https://x.com/FullHouseCol";

    return (
        <div className={styles.logosContainer}>
            <Link href={FB_URL} target="_blank">
                <FaFacebookSquare size={25} />
            </Link>
            <Link href={X_URL} target="_blank">
                <FaSquareXTwitter size={25} />
            </Link>
            <Link href={IG_URL} target="_blank">
                <FaInstagramSquare size={25} />
            </Link>
        </div>
    )
}

export default SocialLogosCompany;