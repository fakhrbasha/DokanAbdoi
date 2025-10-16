import React, { ReactNode } from 'react';
import { Dialog, DialogContent, DialogTitle, Divider, IconButton, Stack } from '@mui/material';
import { RxCross2 } from 'react-icons/rx';

interface FormDialogProps {
  open: boolean;
  handleClose: () => void;
  children: ReactNode;
  title: string;
}

export default function FormDialog({ open, handleClose, children, title }: FormDialogProps): React.JSX.Element {
  return (
    <Dialog open={open} onClose={handleClose}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: '24px', py: '18px' }}>
        <DialogTitle variant="h5" sx={{ p: 0 }}>
          {title}
        </DialogTitle>
        <IconButton onClick={handleClose}>
          <RxCross2 />
        </IconButton>
      </Stack>
      <Divider />

      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
