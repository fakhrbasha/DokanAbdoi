// Dialog open/close state management hook

import { useState, useCallback } from 'react';

interface DialogState {
  isOpen: boolean;
  data: any;
  mode: 'create' | 'edit' | 'view';
  title: string;
  isLoading: boolean;
}

interface DialogActions {
  openDialog: (options: DialogOptions) => void;
  closeDialog: () => void;
  setLoading: (loading: boolean) => void;
  updateData: (data: any) => void;
}

interface DialogOptions {
  mode: 'create' | 'edit' | 'view';
  title: string;
  data?: any;
  isLoading?: boolean;
}

export function useDialog(initialState?: Partial<DialogState>): DialogState & DialogActions {
  const [state, setState] = useState<DialogState>({
    isOpen: false,
    data: null,
    mode: 'create',
    title: '',
    isLoading: false,
    ...initialState
  });

  const openDialog = useCallback((options: DialogOptions) => {
    setState({
      isOpen: true,
      data: options.data || null,
      mode: options.mode,
      title: options.title,
      isLoading: options.isLoading || false
    });
  }, []);

  const closeDialog = useCallback(() => {
    setState(prev => ({
      ...prev,
      isOpen: false,
      isLoading: false
    }));
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({
      ...prev,
      isLoading: loading
    }));
  }, []);

  const updateData = useCallback((data: any) => {
    setState(prev => ({
      ...prev,
      data
    }));
  }, []);

  return {
    ...state,
    openDialog,
    closeDialog,
    setLoading,
    updateData
  };
}

// Hook for delete confirmation dialog
interface DeleteDialogState {
  isOpen: boolean;
  itemId: string | null;
  itemName: string;
  isLoading: boolean;
}

interface DeleteDialogActions {
  openDeleteDialog: (id: string, name?: string) => void;
  closeDeleteDialog: () => void;
  setLoading: (loading: boolean) => void;
}

export function useDeleteDialog(): DeleteDialogState & DeleteDialogActions {
  const [state, setState] = useState<DeleteDialogState>({
    isOpen: false,
    itemId: null,
    itemName: '',
    isLoading: false
  });

  const openDeleteDialog = useCallback((id: string, name: string = '') => {
    setState({
      isOpen: true,
      itemId: id,
      itemName: name,
      isLoading: false
    });
  }, []);

  const closeDeleteDialog = useCallback(() => {
    setState({
      isOpen: false,
      itemId: null,
      itemName: '',
      isLoading: false
    });
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({
      ...prev,
      isLoading: loading
    }));
  }, []);

  return {
    ...state,
    openDeleteDialog,
    closeDeleteDialog,
    setLoading
  };
}

// Hook for confirmation dialog
interface ConfirmationDialogState {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  isLoading: boolean;
  onConfirm: (() => void) | null;
  onCancel: (() => void) | null;
}

interface ConfirmationDialogActions {
  openConfirmation: (options: ConfirmationOptions) => void;
  closeConfirmation: () => void;
  setLoading: (loading: boolean) => void;
}

interface ConfirmationOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

export function useConfirmationDialog(): ConfirmationDialogState & ConfirmationDialogActions {
  const [state, setState] = useState<ConfirmationDialogState>({
    isOpen: false,
    title: '',
    message: '',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    isLoading: false,
    onConfirm: null,
    onCancel: null
  });

  const openConfirmation = useCallback((options: ConfirmationOptions) => {
    setState({
      isOpen: true,
      title: options.title,
      message: options.message,
      confirmText: options.confirmText || 'Confirm',
      cancelText: options.cancelText || 'Cancel',
      isLoading: false,
      onConfirm: options.onConfirm,
      onCancel: options.onCancel || null
    });
  }, []);

  const closeConfirmation = useCallback(() => {
    setState(prev => ({
      ...prev,
      isOpen: false,
      isLoading: false
    }));
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({
      ...prev,
      isLoading: loading
    }));
  }, []);

  return {
    ...state,
    openConfirmation,
    closeConfirmation,
    setLoading
  };
}

// Hook for multi-step dialog
interface MultiStepDialogState {
  currentStep: number;
  totalSteps: number;
  isOpen: boolean;
  data: any;
  completedSteps: number[];
  isLoading: boolean;
}

interface MultiStepDialogActions {
  openMultiStepDialog: (totalSteps: number, initialData?: any) => void;
  closeMultiStepDialog: () => void;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: number) => void;
  updateData: (data: any) => void;
  markStepCompleted: (step: number) => void;
  setLoading: (loading: boolean) => void;
}

export function useMultiStepDialog(): MultiStepDialogState & MultiStepDialogActions {
  const [state, setState] = useState<MultiStepDialogState>({
    currentStep: 0,
    totalSteps: 1,
    isOpen: false,
    data: {},
    completedSteps: [],
    isLoading: false
  });

  const openMultiStepDialog = useCallback((totalSteps: number, initialData: any = {}) => {
    setState({
      currentStep: 0,
      totalSteps,
      isOpen: true,
      data: initialData,
      completedSteps: [],
      isLoading: false
    });
  }, []);

  const closeMultiStepDialog = useCallback(() => {
    setState({
      currentStep: 0,
      totalSteps: 1,
      isOpen: false,
      data: {},
      completedSteps: [],
      isLoading: false
    });
  }, []);

  const nextStep = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentStep: Math.min(prev.currentStep + 1, prev.totalSteps - 1)
    }));
  }, []);

  const previousStep = useCallback(() => {
    setState(prev => ({
      ...prev,
      currentStep: Math.max(prev.currentStep - 1, 0)
    }));
  }, []);

  const goToStep = useCallback((step: number) => {
    setState(prev => ({
      ...prev,
      currentStep: Math.max(0, Math.min(step, prev.totalSteps - 1))
    }));
  }, []);

  const updateData = useCallback((data: any) => {
    setState(prev => ({
      ...prev,
      data: { ...prev.data, ...data }
    }));
  }, []);

  const markStepCompleted = useCallback((step: number) => {
    setState(prev => ({
      ...prev,
      completedSteps: [...new Set([...prev.completedSteps, step])]
    }));
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({
      ...prev,
      isLoading: loading
    }));
  }, []);

  const isStepCompleted = (step: number) => state.completedSteps.includes(step);
  const canGoNext = state.currentStep < state.totalSteps - 1;
  const canGoPrevious = state.currentStep > 0;

  return {
    ...state,
    openMultiStepDialog,
    closeMultiStepDialog,
    nextStep,
    previousStep,
    goToStep,
    updateData,
    markStepCompleted,
    setLoading,
    isStepCompleted,
    canGoNext,
    canGoPrevious
  };
}

// Hook for drawer/modal state
interface DrawerState {
  isOpen: boolean;
  anchor: 'left' | 'right' | 'top' | 'bottom';
  isLoading: boolean;
}

interface DrawerActions {
  openDrawer: (anchor?: 'left' | 'right' | 'top' | 'bottom') => void;
  closeDrawer: () => void;
  setLoading: (loading: boolean) => void;
}

export function useDrawer(): DrawerState & DrawerActions {
  const [state, setState] = useState<DrawerState>({
    isOpen: false,
    anchor: 'right',
    isLoading: false
  });

  const openDrawer = useCallback((anchor: 'left' | 'right' | 'top' | 'bottom' = 'right') => {
    setState({
      isOpen: true,
      anchor,
      isLoading: false
    });
  }, []);

  const closeDrawer = useCallback(() => {
    setState(prev => ({
      ...prev,
      isOpen: false,
      isLoading: false
    }));
  }, []);

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({
      ...prev,
      isLoading: loading
    }));
  }, []);

  return {
    ...state,
    openDrawer,
    closeDrawer,
    setLoading
  };
}
