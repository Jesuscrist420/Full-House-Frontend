import React from 'react';
import styles from './transactionsSummary.module.scss';
import SummaryCard from '@/app/components/atoms/summaryCard/SummaryCard';

interface TransactionsSummaryProps {
    balance: number,
    totalSales: number,
    totalExpenses: number
}

function TransactionsSummary({ balance, totalSales, totalExpenses }: TransactionsSummaryProps): JSX.Element {
    return (
        <div className={styles.container}>
            <SummaryCard title='Total' value={balance} type='balance' />
            <SummaryCard title='Cobrado' value={totalSales} type='profit' />
            <SummaryCard title='Pendiente' value={totalExpenses} type='loss' />
        </div>
    )
}

export default TransactionsSummary;