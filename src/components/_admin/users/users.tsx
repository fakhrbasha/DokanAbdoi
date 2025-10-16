'use client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useSearchParams } from 'next/navigation';
import * as api from '@/services';
import { useQuery, useMutation } from '@tanstack/react-query';
import Table from '@/components/table/table';
import UserList from '@/components/table/rows/user';
import RoleDialog from '@/components/dialog/role';

const TABLE_HEAD = [
  { id: 'name', label: 'User' },
  { id: 'email', label: 'Email' },
  { id: 'phone', label: 'phone' },
  { id: 'orders', label: 'Orders' },
  { id: 'role', label: 'Role' },
  { id: 'joined', label: 'Joined' },
  { id: '', label: 'Actions' }
];

const USER_ROLE_FILTERS = {
  name: 'Role',
  param: 'role',
  data: [
    {
      name: 'Users',
      slug: 'user'
    },
    {
      name: 'Vendors',
      slug: 'vendor'
    },
    {
      name: 'Admins',
      slug: 'admin'
    }
  ]
};

export default function AdminUsers(): React.JSX.Element {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const searchParam = searchParams.get('search');
  const [count, setCount] = useState(0);

  const { data, isPending: isLoading } = useQuery({
    queryKey: ['user', pageParam, searchParam, count],
    queryFn: () => api.getUserByAdminsByAdmin(Number(pageParam) || 1, searchParam || '')
  });

  const [id, setId] = useState<string | null>(null);

  const { mutate, isPending: roleLoading } = useMutation({
    mutationFn: api.updateUserRoleByAdmin,
    onSuccess: (data: any) => {
      toast.success(data?.message || 'Role updated successfully');
      setCount((prev) => prev + 1);
      setId(null);
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || 'Failed to update role');
      setId(null);
    }
  });

  return (
    <div>
      <RoleDialog 
        open={Boolean(id)} 
        onClose={() => setId(null)} 
        onClick={() => mutate(id)} 
        loading={roleLoading} 
      />
      <Table
        headData={TABLE_HEAD}
        data={data}
        isLoading={isLoading}
        row={UserList}
        setId={setId}
        id={setId}
        isSearch
        filters={[{ ...USER_ROLE_FILTERS }]}
      />
    </div>
  );
}

