// src/hooks/useRequestState.ts
import { useState, useCallback } from 'react';
import type { Product } from '@/types/product';
import type { RequestItemForm } from '@/types/request';

export const useRequestState = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [requestItems, setRequestItems] = useState<RequestItemForm[]>([]);
  const [generalObservations, setGeneralObservations] = useState<string>('');

  const handleProductSelect = useCallback((product: Product) => {
    setSelectedProducts(prev => {
      const isSelected = prev.some(p => p.id === product.id);

      if (isSelected) {
        // Remover producto y su item asociado
        setRequestItems(prevItems => prevItems.filter(item => item.productId !== product.id));
        return prev.filter(p => p.id !== product.id);
      } else {
        // Añadir producto y si no existe, crear requestItem con quantity 1
        setRequestItems(prevItems => {
          if (prevItems.some(item => item.productId === product.id)) return prevItems;
          return [
            ...prevItems,
            {
              // RequestItemForm shape asumida
              productId: product.id,
              productName: product.name,
              unit: product.unit ?? '',
              quantity: 1,
              observations: ''
            }
          ];
        });
        return [...prev, product];
      }
    });
  }, []);

  const handleQuantityChange = useCallback((productId: number, quantity: number) => {
    setRequestItems(prev => prev.map(item => item.productId === productId ? { ...item, quantity } : item));
  }, []);

  const handleObservationsChange = useCallback((productId: number, observations: string) => {
    setRequestItems(prev => prev.map(item => item.productId === productId ? { ...item, observations } : item));
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep(prev => Math.min(3, prev + 1));
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep(prev => Math.max(1, prev - 1));
  }, []);

  const resetForm = useCallback(() => {
    setCurrentStep(1);
    setSelectedProducts([]);
    setRequestItems([]);
    setGeneralObservations('');
  }, []);

  return {
    currentStep,
    selectedProducts,
    requestItems,
    generalObservations,
    setGeneralObservations,
    handleProductSelect,
    handleQuantityChange,
    handleObservationsChange,
    nextStep,
    prevStep,
    resetForm,
    setCurrentStep,
    setSelectedProducts,
    setRequestItems
  };
};

export default useRequestState;
