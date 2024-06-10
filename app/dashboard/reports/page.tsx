import { fetchFilteredReports, fetchReportsPages } from '@/app/lib/data';
import Table from '@/app/ui/reports/table';
import { lusitana } from '@/app/ui/fonts';
import Pagination from '@/app/ui/pagination';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Metadata } from 'next';
import { Suspense } from 'react';
import { getUserdata } from '@/auth';
 
export const metadata: Metadata = {
  title: 'Reports',
};

export default async function Page({
  searchParams
}: {
  searchParams: {
    query: string,
    page: number
  }
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const userData: any = await getUserdata();
  const totalPages = await fetchReportsPages(userData?.department, query);
  const reports: any = await fetchFilteredReports(userData?.department, query, currentPage);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Reports</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
      </div>
       <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table reports={reports} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}