import React from 'react'
import styles from './Footer.module.scss'

interface FooterListProps {
    children: React.ReactNode
}

const FooterList: React.FC<FooterListProps> = ({ children }) => {
    return <div className={styles.footerList}>{children}</div>
}

export default FooterList
