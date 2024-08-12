'use client'

import { useSession } from 'next-auth/react';
import { fetchRevenue } from '@/app/lib/data';
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
    const [invoices, setInvoices] = useState<Account[]>([]);
    const [totalPaidInvoices, setTotalPaidInvoices] = useState(0);
    const [totalPendingInvoices, setTotalPendingInvoices] = useState(0);
    const [numberOfInvoices, setNumberOfInvoices] = useState(0);
    const [numberOfCustomers, setNumberOfCustomers] = useState(0);
    const [revenue, setRevenue] = useState<Revenue[]>([
        { month: 'Ene', revenue: 10000000 },
        { month: 'Feb', revenue: 20000000 },
        { month: 'Mar', revenue: 30000000 },
        { month: 'Abr', revenue: 40000000 },
        { month: 'May', revenue: 50000000 },
        { month: 'Jun', revenue: 60000000 },
        { month: 'Jul', revenue: 70000000 },
        { month: 'Ago', revenue: 80000000 },
        { month: 'Sep', revenue: 90000000 },
        { month: 'Oct', revenue: 100000000 },
        { month: 'Nov', revenue: 110000000 },
        { month: 'Dic', revenue: 120000000 }
    ]);
    // last invoices
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
                /*
                const lastYear = new Date();
                lastYear.setFullYear(lastYear.getFullYear() - 1);
                const lastYearInvoices = invoices.filter(invoice => new Date(invoice.opening_timestamp) >= lastYear);
                const groupedInvoices = lastYearInvoices.reduce((acc, invoice) => {
                    const month = new Date(invoice.opening_timestamp).toLocaleString('default', { month: 'short' });
                    if (acc[month]) {
                        acc[month] += invoice.total;
                    } else {
                        acc[month] = invoice.total;
                    }
                    return acc;
                }, {} as Record<string, number>);
                const revenue = Object.keys(groupedInvoices).map(month => ({
                    month,
                    revenue: groupedInvoices[month]
                }));
                setRevenue(revenue);
                */
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
    }, [token]
    )

    const router = useRouter();

    const user = session?.user;
    const userId = user?.id;
    const restaurantId = user?.restaurant_id;



    return (
        <>
            <CommonHeader title='Dashboard' />
            {restaurantId ?
                <>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 p-2">
                        <Card title="Cuentas Pagas" value={totalPaidInvoices} type="collected" />
                        <Card title="Cuentas Por Pagar" value={totalPendingInvoices} type="pending" />
                        <Card title="Total Cuentas" value={numberOfInvoices} type="invoices" />
                        <Card title="Total Empleados" value={numberOfCustomers} type="customers" />
                    </div>
                    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
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