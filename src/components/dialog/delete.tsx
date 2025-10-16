import React from 'react';
import toast from 'react-hot-toast';
import { DialogTitle, DialogContent, DialogContentText, DialogActions, Button, alpha, Box } from '@mui/material';
import { IoWarning } from 'react-icons/io5';
import * as api from '@/services';
import { useMutation } from '@tanstack/react-query';

interface DeleteDialogProps {
  onClose: () => void;
  id: string;
  apicall: (prev: any) => void;
  endPoint: string;
  type: string;
  deleteMessage: string;
}

export default function DeleteDialog({ 
  onClose, 
  id, 
  apicall, 
  endPoint, 
  type, 
  deleteMessage 
}: DeleteDialogProps): React.JSX.Element {
  const { mutate, isPending: isLoading } = useMutation({
    mutationFn: api[endPoint as keyof typeof api] as any,
    onSuccess: () => {
      toast.success(type);
      apicall((prev: any) => ({ ...prev, apicall: !prev.apicall }));
      onClose();
    },
    onError: (err: any) => {
      toast.error(err?.response?.data?.message || 'Something went wrong!');
    }
  });

  const handleDelete = () => {
    mutate(id);
  };

  return (
    <>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Box
          sx={{
            height: 40,
            width: 40,
            bgcolor: (theme) => alpha(theme.palette.error.main, 0.2),
            borderRadius: '50px',
            color: (theme) => theme.palette.error.main,
            mr: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <IoWarning size={24} />
        </Box>
        Warning
      </DialogTitle>
      <DialogContent sx={{ pb: '16px !important' }}>
        <DialogContentText>
          {deleteMessage}
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ pt: '8px !important' }}>
        <Button onClick={onClose}> cancel </Button>
        <Button variant="contained" disabled={isLoading} onClick={handleDelete} color="error">
          delete
        </Button>
      </DialogActions>
    </>
  );
}

