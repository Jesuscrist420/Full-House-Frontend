import Pagination from '@/app/components/invoices/pagination';
import Search from '@/app/components/search';
import Table from '@/app/components/invoices/table';
import { CreateInvoice } from '@/app/components/invoices/buttons';
import { lusitana } from '@/app/components/fonts';
import { InvoicesTableSkeleton } from '@/app/components/skeletons';
import { Suspense } from 'react';
import InvoicesHeader from '@/app/components/atoms/invoicesHeader/InvoicesHeader';

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
            <InvoicesHeader />
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