'use client';
import { useSearchParams } from 'next/navigation';
// component
import Table from '@/components/table/table';
import OrderList from '@/components/table/rows/order';
import ProfileCover from '@/components/_main/profile/profile-cover';
// api
import * as api from '@/services';
import { useQuery } from '@tanstack/react-query';

const TABLE_HEAD = [
  { id: 'name', label: 'Product' },
  { id: 'total', label: 'total' },
  { id: 'inventoryType', label: 'Status' },
  { id: 'price', label: 'Price' },
  { id: 'quantity', label: 'Quantity' },
  { id: 'date', label: 'Date' },
  { id: '', label: 'Actions' }
];
interface UserProfileProps {
  id: string;
}

export default function UserProfile({ id }: UserProfileProps): React.JSX.Element {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const { data, isPending: isLoading } = useQuery({
    queryKey: ['user-details', id, pageParam],
    queryFn: () => api.getUserByAdmin(`${id}?page=${pageParam || 1}`),
    enabled: !!id,
    retry: false
  });
  const user = (function () {
    if (isLoading) {
      return null;
    } else {
      const { user } = data;
      return user;
    }
  })();
  const orders = (function () {
    if (isLoading) {
      return null;
    } else {
      const { orders } = data;
      return orders;
    }
  })();
  const tableData = { data: orders, count: data?.count };

  return (
    <div>
      <ProfileCover data={user} isLoading={isLoading} />

      <Table headData={TABLE_HEAD} data={tableData} isLoading={isLoading} row={OrderList} isUser />
    </div>
  );
}
