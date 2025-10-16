import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { useFormik } from 'formik';
import { UserRole } from '@/types/models';
import { toast } from 'react-hot-toast';
import * as api from '@/services';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface RoleDialogProps {
  open: boolean;
  onClose: () => void;
  userId: string;
  currentRole: UserRole;
}

interface RoleFormData {
  role: UserRole;
}

export default function RoleDialog({ open, onClose, userId, currentRole }: RoleDialogProps): React.JSX.Element {
  const queryClient = useQueryClient();

  const { mutate: updateUserRole, isPending } = useMutation({
    mutationFn: ({ userId, role }: { userId: string; role: UserRole }) => 
      api.updateUserRoleByAdmin(userId, { role }),
    onSuccess: () => {
      toast.success('User role updated successfully');
      queryClient.invalidateQueries({ queryKey: ['users-by-admin'] });
      onClose();
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update user role');
    }
  });

  const formik = useFormik<RoleFormData>({
    initialValues: {
      role: currentRole
    },
    onSubmit: (values) => {
      updateUserRole({ userId, role: values.role });
    }
  });

  const handleClose = () => {
    formik.resetForm();
    onClose();
  };

  const roles: { value: UserRole; label: string }[] = [
    { value: 'customer', label: 'Customer' },
    { value: 'vendor', label: 'Vendor' },
    { value: 'admin', label: 'Admin' }
  ];

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Update User Role</DialogTitle>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                value={formik.values.role}
                onChange={(e) => formik.setFieldValue('role', e.target.value as UserRole)}
                label="Role"
                disabled={isPending}
              >
                {roles.map((role) => (
                  <MenuItem key={role.value} value={role.value}>
                    {role.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={isPending}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isPending || formik.values.role === currentRole}
          >
            {isPending ? 'Updating...' : 'Update Role'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
