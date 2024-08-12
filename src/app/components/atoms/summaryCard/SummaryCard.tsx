import React from 'react';
import { BiMoney } from 'react-icons/bi';
import { IoIosTime } from 'react-icons/io';
import styles from './summaryCard.module.scss';
import { AiOutlineStock, AiOutlineInbox } from 'react-icons/ai';

function SummaryCard({ title, value, type }: { title: string, value: number, type: string }): JSX.Element {

    let validationType;
    let validationTypeText;
    let text;

    function logo(): JSX.Element {
        return (
            <>
                {type === 'profit' ? <BiMoney size={30} /> : null}
                {type === 'loss' ? <IoIosTime size={30} /> : null}
                {type === 'balance' ? <AiOutlineStock size={30} /> : null}
                {type === 'product' ? <AiOutlineInbox size={30} /> : null}
            </>
        )
    }

    switch (type) {
        case 'profit':
            validationType = styles.profit;
            validationTypeText = styles.profitText;
            text = `$${value.toLocaleString('de-DE')}`;
            break;
        case 'loss':
            validationType = styles.loss;
            validationTypeText = styles.lossText;
            text = `$${value.toLocaleString('de-DE')}`;
            break;
        case 'product':
            validationType = styles.product;
            validationTypeText = styles.productText;
            text = `${value.toLocaleString('de-DE')}`;;
            break;
        default:
            validationType = styles.product;
            validationTypeText = styles.productText;
            text = `$${value.toLocaleString('de-DE')}`;;
            break;

    }

    const logoStyle = `${styles.logo} ${validationType}`;
    const textStyle = `${styles.content} ${validationTypeText}`;

    return (
        <div className={styles.container}>
            <span>
                <div className={styles.balanceCard}>
                    <div className={logoStyle}>
                        {logo()}
                    </div>
                    <div className={styles.info}>
                        <h3 className={styles.title}>{title}</h3>
                        <p className={textStyle}>{text}</p>
                    </div>
                </div>
            </span>
        </div>
    )
}

export default SummaryCard;