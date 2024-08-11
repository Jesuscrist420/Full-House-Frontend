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

export default function Page() {

    //const revenue = await fetchRevenue();
    const { data: session, status } = useSession();
    const router = useRouter();

    const user = session?.user;
    const userId = user?.id;
    const restaurantId = user?.restaurant_id;

    const revenue: Revenue[] = [
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
    ]

    const latestInvoices = [
        {
            id: '1',
            name: 'Test',
            email: 'test@gmail.com',
            amount: '$150.000',
        },
        {
            id: '2',
            name: 'Test 2',
            email: 'test2@gmail.com',
            amount: '$130.000',
        },
        {
            id: '3',
            name: 'Test 3',
            email: 'test3@gmail.com',
            amount: '$120.000',
        },
    ]

    return (
        <>
            <CommonHeader title='Dashboard' />
            {restaurantId ?
                <>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 p-2">
                        <Card title="Cuentas Pagas" value={"totalPaidInvoices"} type="collected" />
                        <Card title="Cuentas Por Pagar" value={"totalPendingInvoices"} type="pending" />
                        <Card title="Total Cuentas" value={"numberOfInvoices"} type="invoices" />
                        <Card title="Total Empleados" value={"numberOfCustomers"} type="customers" />
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