// hooks/useToast.ts
import { useState } from 'react';

export interface Toast {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

export const useToast = () => {
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = (toast: Toast) => {
    setToast(toast);
    // Auto hide after 5 seconds
    setTimeout(() => setToast(null), 5000);
  };

  return {
    toast,
    showToast
  };
};