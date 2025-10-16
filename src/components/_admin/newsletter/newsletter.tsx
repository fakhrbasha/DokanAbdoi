'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
// components
import Table from '@/components/table/table';
import Newsletter from '@/components/table/rows/newsletter';
// api
import * as api from '@/services';
import { useQuery } from '@tanstack/react-query';

const TABLE_HEAD = [
  { id: 'email', label: 'Email' },
  { id: 'createdAt', label: 'Date' },
  { id: 'action', label: 'Actions' }
];

export default function NewsletterList(): React.JSX.Element {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const { data, isPending: isLoading } = useQuery({
    queryKey: ['newsletter', pageParam],
    queryFn: () => api.getNewsletter({ page: +(pageParam || 1) })
  });
  return (
    <>
      <Table
        rows={10}
        headData={TABLE_HEAD}
        data={data as any}
        isLoading={isLoading}
        row={Newsletter}
        onClickCopy={() => toast.success('Copy email')}
      />
    </>
  );
}
