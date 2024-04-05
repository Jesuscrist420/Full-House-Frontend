import Link from "next/link";
import { UrlObject } from "url";
import { FaLinkedin, FaGithubSquare } from "react-icons/fa";
import styles from "./SocialLogosTeam.module.scss";


type SocialLogosTeamProps = {
    github: string;
    linkedin: string;
}

const SocialLogosTeam = ({ github, linkedin }: SocialLogosTeamProps) => {
    return (
        <div className={styles.logosContainer}>
            <Link href={{ pathname: github}}>
                <FaGithubSquare size={25} />
            </Link>
            <Link href={{ pathname: linkedin}}>
                <FaLinkedin size={25}/>
            </Link>
        </div>
    )
}

export default SocialLogosTeam;