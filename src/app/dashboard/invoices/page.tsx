'use client'
import { useSession } from 'next-auth/react';
import Table from '@/app/components/invoices/table';
import { Suspense, useEffect, useState } from 'react';
import Search from '@/app/components/molecules/search/Search';
import RightBar from '@/app/components/atoms/rightBar/RightBar';
import { getAccounts } from '@/services/accounts/getAccounts.service';
import CommonHeader from '@/app/components/atoms/commonHeader/CommonHeader';
import AddAccountForm from '@/app/components/molecules/addAccountForm/AddAccountForm';
import CommonHeaderButton from '@/app/components/atoms/commonHeaderButton/CommonHeaderButton';
import DeleteAccountForm from '@/app/components/molecules/deleteAccountForm/DeleteAccountForm';
import UpdateAccountForm from '@/app/components/molecules/updateAccountForm/UpdateAccountForm';
import TransactionsSummary from '@/app/components/molecules/transactionsSummary/TransactionsSummary';

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
    const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
    const [deleteAccountIsOpen, setDeleteAccountIsOpen] = useState(false);
    const [updateAccountIsOpen, setUpdateAccountIsOpen] = useState(false);
    const handleEdit = (account: Account): void => {
        setSelectedAccount(account);
        setUpdateAccountIsOpen(true);
    }
    const handleDelete = (account: Account): void => {
        setSelectedAccount(account);
        setDeleteAccountIsOpen(true);
    }
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [filteredAccounts, setFilteredAccounts] = useState<Account[]>([]);
    const [totalSales, setTotalSales] = useState(0);
    const [accountsNumber, setAccountsNumber] = useState(0);

    const [totalPaidInvoices, setTotalPaidInvoices] = useState(0);
    const [totalPendingInvoices, setTotalPendingInvoices] = useState(0);

    const { data: session, status } = useSession();
    const token = session?.token;


    useEffect(() => {
        const fetchAccountsData = async () => {
            try {
                const response: Account[] | undefined = await getAccounts(token);
                if (response) {
                    console.log('calling fetchAccountsData');
                    const totalPaid = response.filter(invoice => invoice.status === 'closed').reduce((sum, invoice) => sum + invoice.total, 0);
                    const totalPending = response.filter(invoice => invoice.status === 'open').reduce((sum, invoice) => sum + invoice.total, 0);
                    setTotalPaidInvoices(totalPaid);
                    setTotalPendingInvoices(totalPending);
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
    }, [token, accounts]);

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
            <TransactionsSummary balance={totalSales} totalSales={totalPaidInvoices} totalExpenses={totalPendingInvoices} />
            
            <RightBar isOpen={addInvoiceIsOpen} setIsOpen={setAddInvoiceIsOpen} title='Crear Cuenta'>
                <AddAccountForm setAddAccountIsOpen={setAddInvoiceIsOpen} accounts={accounts} setAccounts={setAccounts} />
            </RightBar>
            <RightBar isOpen={updateAccountIsOpen} setIsOpen={setUpdateAccountIsOpen} title='Actualizar Cuenta'>
                <UpdateAccountForm setUpdateAccountIsOpen={setUpdateAccountIsOpen} accountSelected={selectedAccount} setAccounts={setAccounts} accounts={accounts} />
            </RightBar>
            <RightBar isOpen={deleteAccountIsOpen} setIsOpen={setDeleteAccountIsOpen} title='Eliminar Cuenta'>
                <DeleteAccountForm setDeleteAccountIsOpen={setDeleteAccountIsOpen} accountSelected={selectedAccount} />
            </RightBar>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Buscar cuentas..." onSearch={handleSearch} />
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
                <Table accounts={filteredAccounts} handleDelete={handleDelete} handleEdit={handleEdit} />
            </div>
        </div>
    );
}
