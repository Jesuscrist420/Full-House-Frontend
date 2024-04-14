import { Card } from '@/app/components/dashboard/cards';
import RevenueChart from '@/app/components/dashboard/revenue-chart';
import LatestInvoices from '@/app/components/dashboard/latest-invoices';
import { lusitana } from '@/app/components/fonts';
import { fetchRevenue } from '@/app/lib/data';
import SettingsForm from '@/app/components/atoms/settingsForm/SettingsForm';
import CommonHeader from '../components/atoms/commonHeader/CommonHeader';

export default async function Page() {

    //const revenue = await fetchRevenue();

    return (
        <>
            <CommonHeader title='Dashboard' />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 p-2">
                <Card title="Collected" value={"totalPaidInvoices"} type="collected" />
                <Card title="Pending" value={"totalPendingInvoices"} type="pending" />
                <Card title="Total Invoices" value={"numberOfInvoices"} type="invoices" />
                <Card title="Total Customers" value={"numberOfCustomers"} type="customers" /> 
            </div>
            <SettingsForm />
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                {/* <RevenueChart revenue={revenue}  /> */}
                {/* <LatestInvoices latestInvoices={latestInvoices} /> */}
            </div>
        </>
    );
}