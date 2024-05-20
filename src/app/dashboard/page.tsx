'use client'

import { useSession } from 'next-auth/react';
import { fetchRevenue } from '@/app/lib/data';
import { Card } from '@/app/components/dashboard/cards';
import EmptyPage from '../components/atoms/emptyPage/EmptyPage';
import RevenueChart from '@/app/components/dashboard/revenue-chart';
import LatestInvoices from '@/app/components/dashboard/latest-invoices';
import CommonHeader from '../components/atoms/commonHeader/CommonHeader';
import { useRouter } from 'next/navigation';

export default function Page() {

    //const revenue = await fetchRevenue();
    const { data: session, status } = useSession();
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
                        <Card title="Collected" value={"totalPaidInvoices"} type="collected" />
                        <Card title="Pending" value={"totalPendingInvoices"} type="pending" />
                        <Card title="Total Invoices" value={"numberOfInvoices"} type="invoices" />
                        <Card title="Total Customers" value={"numberOfCustomers"} type="customers" />
                    </div>
                </>
                :
                <EmptyPage handleClick={() => router.push("/dashboard/settings")} emptyPage='Restaurante ' />
            }
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                {/* <RevenueChart revenue={revenue}  /> */}
                {/* <LatestInvoices latestInvoices={latestInvoices} /> */}
            </div>
        </>
    );
}