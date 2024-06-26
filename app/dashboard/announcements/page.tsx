import Pagination from '@/app/ui/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/announcements/table';
import { CreateAnnouncement } from '@/app/ui/announcements/buttons';
import { lusitana } from '@/app/ui/fonts';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchAnnouncementsPages } from '@/app/lib/data';
import { Metadata } from 'next';
import { getUserdata } from '@/auth';
 
export const metadata: Metadata = {
  title: 'Announcements',
};

export default async function Page({
  searchParams
}: {
  searchParams: {
    query: string,
    page: number
  }
}) {
  const userData: any = await getUserdata();
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchAnnouncementsPages(userData?.department, query);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Announcements</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search announcements..." />
        <CreateAnnouncement />
      </div>
       <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}