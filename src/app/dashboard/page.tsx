'use client'

import { useSession } from 'next-auth/react';
import { Card } from '@/app/components/dashboard/cards';
import EmptyPage from '../components/atoms/emptyPage/EmptyPage';
import RevenueChart from '@/app/components/dashboard/revenue-chart';
import LatestInvoices from '@/app/components/dashboard/latest-invoices';
import CommonHeader from '../components/atoms/commonHeader/CommonHeader';
import { useRouter } from 'next/navigation';
import { Revenue } from '../lib/definitions';
import { useEffect, useState } from 'react';
import { getAccounts } from '@/services/accounts/getAccounts.service';
import { getEmployees } from '@/services/employees/getEmployees.service';
const monthsNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
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

const calculateRevenue = (invoices: Account[]) => {
    const revenue = invoices.reduce((acc, invoice) => {
        const month = new Date(invoice.opening_timestamp).getMonth();
        acc[month] = (acc[month] || 0) + invoice.total;
        return acc;
    }, {} as Record<number, number>);

    const result = Array.from({ length: 12 }, (_, i) => ({
        month: monthsNames[i],
        revenue: revenue[i] || 0
    }));
    console.log("revenue result ", result);
    return result;
}
export default function Page() {

    const [_, setInvoices] = useState<Account[]>([]);
    const [totalPaidInvoices, setTotalPaidInvoices] = useState(0);
    const [totalPendingInvoices, setTotalPendingInvoices] = useState(0);
    const [numberOfInvoices, setNumberOfInvoices] = useState(0);
    const [numberOfCustomers, setNumberOfCustomers] = useState(0);
    const [revenue, setRevenue] = useState<Revenue[]>([]);
    const [latestInvoices, setLatestInvoices] = useState<Account[]>([]);
    const { data: session, status } = useSession();
    const token = session?.token;

    useEffect(() => {
        const fetchInvoices = async () => {
            const invoices = await getAccounts(token)
            if (invoices) {
                setInvoices(invoices);
                setLatestInvoices(invoices.slice(0, 3));
                const totalPaidInvoices = invoices.filter(invoice => invoice.status === 'closed').reduce((sum, invoice) => sum + invoice.total, 0);
                setTotalPaidInvoices(totalPaidInvoices);
                const totalPendingInvoices = invoices.filter(invoice => invoice.status === 'open').reduce((sum, invoice) => sum + invoice.total, 0);
                setTotalPendingInvoices(totalPendingInvoices);
                setNumberOfInvoices(invoices.length);
                const revenue = calculateRevenue(invoices);
                setRevenue(revenue);
            } else {
                const revenue = monthsNames.map((month) => ({ month, revenue: 0 }));
                setRevenue(revenue);

            }
        }

        const fetchEmployees = async () => {
            const employees = await getEmployees(token)
            if (employees) {
                setNumberOfCustomers(employees.length);
            }
        }

        if (token) {
            fetchInvoices();
            fetchEmployees();
        }
    }, [token])

    const router = useRouter();

    const user = session?.user;
    const userId = user?.id;
    const restaurantId = user?.restaurant_id;

    return (
        <>
            <CommonHeader title='Dashboard' />
            {restaurantId ?
                <>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 py-4">
                        <Card title="Pago" value={totalPaidInvoices} type="collected" />
                        <Card title="Por Pagar" value={totalPendingInvoices} type="pending" />
                        <Card title="Cuentas" value={numberOfInvoices} type="invoices" />
                        <Card title="Empleados" value={numberOfCustomers} type="customers" />
                    </div>
                    <div className="mt-3 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                        <RevenueChart revenue={revenue} />
                        <LatestInvoices latestInvoices={latestInvoices} />
                    </div>
                </>
                :
                <EmptyPage handleClick={() => router.push("/dashboard/settings")} emptyPage='Restaurante ' />
            }
        </>
    );
}