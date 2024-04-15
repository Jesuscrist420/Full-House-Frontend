import CommonHeader from '@/app/components/atoms/commonHeader/CommonHeader';
import { InvoicesTableSkeleton } from '@/app/components/skeletons';
import { CreateInvoice } from '@/app/components/invoices/buttons';
import Pagination from '@/app/components/invoices/pagination';
import Table from '@/app/components/invoices/table';
import { lusitana } from '@/app/components/fonts';
import Search from '@/app/components/search';
import { Suspense } from 'react';

export default async function Page({
    searchParams
}: {
    searchParams?: {
        query?: string;
        page?: string;
    }
}) {

    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    return (
        <div className="w-full">
            <CommonHeader title='Facturas' >
            </CommonHeader>
            <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
                <Search placeholder="Search invoices..." />
                <CreateInvoice />
            </div>
            {/* <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
                <Table query={query} currentPage={currentPage} />
            </Suspense> */}
            <div className="mt-5 flex w-full justify-center">
                {/* <Pagination totalPages={totalPages} /> */}
            </div>
        </div>
    );
}