import Link from "next/link";
import styles from "./SocialLogosCompany.module.scss";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";


type SocialLogosCompanyProps = {
    facebook: string;
    twitter: string;
    instagram: string;
}

const SocialLogosCompany = ({ facebook, twitter, instagram }: SocialLogosCompanyProps) => {
    return (
        <div className={styles.logosContainer}>
            <Link href={{ pathname: facebook }}>
                <FaFacebookSquare size={25} />
            </Link>
            <Link href={{ pathname: twitter }}>
                <FaSquareXTwitter size={25} />
            </Link>
            <Link href={{ pathname: instagram }}>
                <FaInstagramSquare size={25} />
            </Link>
        </div>
    )
}

export default SocialLogosCompany;