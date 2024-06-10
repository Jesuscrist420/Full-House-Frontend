'use client'
import Table from '@/app/components/invoices/table';
import CommonHeader from '@/app/components/atoms/commonHeader/CommonHeader';
import Search from '@/app/components/molecules/search/Search';
import { Suspense, useEffect, useState } from 'react';
import CommonHeaderButton from '@/app/components/atoms/commonHeaderButton/CommonHeaderButton';
import RightBar from '@/app/components/atoms/rightBar/RightBar';
import { getAccounts } from '@/services/getAccounts.service';
import { useSession } from 'next-auth/react';

export interface Account {
    id: number;
    closing_timestamp: string;
    comment: string;
    opening_timestamp: string;
    restaurant_id: number;
    status: string;
    table_id: number;
    total: number;
    user_id: number;
}

export default function Page() {
    const [addInvoiceIsOpen, setAddInvoiceIsOpen] = useState(false);
    const handleAddInvoice = (): void => {
        setAddInvoiceIsOpen(true);
    }
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [filteredAccounts, setFilteredAccounts] = useState<Account[]>([]);
    const [totalSales, setTotalSales] = useState(0);
    const [accountsNumber, setAccountsNumber] = useState(0);
    const { data: session, status } = useSession();
    const token = session?.token;

    useEffect(() => {
        const fetchAccountsData = async () => {
            try {
                const response: Account[] | undefined = await getAccounts(token);
                if (response) {
                    console.log('calling fetchAccountsData');
                    setAccounts(response);
                    setFilteredAccounts(response);
                    const total = response.reduce((sum, account) => sum + account.total, 0);
                    setAccountsNumber(response.length);
                    setTotalSales(total);
                }
            } catch (error) {
                console.error('Error fetching accounts data:', error);
            }
        };
        if (token) {
            fetchAccountsData();
        }
    }, [token]);

    const handleSearch = (term: string): void => {
        if (term === "") {
            setFilteredAccounts(accounts);
        } else {
            const filtered = accounts.filter((account) =>
                account.comment.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredAccounts(filtered);
        }
    };

    return (
        <div className="w-full">
            <CommonHeader title='Cuentas'>
                <CommonHeaderButton text='Crear Cuenta' handleClick={handleAddInvoice} />
            </CommonHeader>
            <RightBar isOpen={addInvoiceIsOpen} setIsOpen={setAddInvoiceIsOpen} title='Crear Cuenta'>
                {/* Add form or content for creating a new account */}
            </RightBar>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Buscar cuentas..." onSearch={handleSearch} />
            </div>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <div className="flex items-center gap-2">
                    <p>Total de ventas:</p>
                    <p>${totalSales}</p>
                    <p>Numero de cuentas: {accountsNumber}</p>
                </div>
            </div>
            {/*}
            <p> Cuentas pedidas: </p>
            {accounts.map((account) => {
                return <p key={account.id}>{account.id}</p>
            })}
            <p> Cuentas filtradas: </p>
            {filteredAccounts.map((account) => {
                return <p key={account.id}>{account.id}</p>
            })}
            */}
            <div className="mt-5 flex w-full justify-center">

                <Table accounts={filteredAccounts} />

            </div>
        </div>
    );
}
