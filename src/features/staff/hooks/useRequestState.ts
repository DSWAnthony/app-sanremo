import type { Product } from '@/types/product';
import type { RequestItem } from '@/types/request';
import { useState, useCallback } from 'react';

export const useRequestState = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [requestItems, setRequestItems] = useState<RequestItem[]>([]);
  const [generalObservations, setGeneralObservations] = useState('');

  const handleProductSelect = useCallback((product: Product) => {
  setSelectedProducts(prev => {
    const isSelected = prev.some(p => p.id === product.id);
    
    if (isSelected) {
      // Remove product
      const newProducts = prev.filter(p => p.id !== product.id);
      setRequestItems(prevItems => prevItems.filter(item => item.productId !== product.id));
      return newProducts;
    } else {
      // Add product - pero primero verificar que no exista ya en requestItems
      setRequestItems(prevItems => {
        // Si ya existe, no lo agregamos de nuevo
        if (prevItems.some(item => item.productId === product.id)) {
          return prevItems;
        }
        return [
          ...prevItems, 
          {
            productId: product.id,
            productName: product.name,
            unit: product.unit,
            quantity: 1,
            observations: ''
          }
        ];
      });
      return [...prev, product];
    }
  });
}, []);

  const handleQuantityChange = useCallback((productId: string, quantity: number) => {
    setRequestItems(prev => prev.map(item => 
      item.productId === productId ? { ...item, quantity } : item
    ));
  }, []);

  const handleObservationsChange = useCallback((productId: string, observations: string) => {
    setRequestItems(prev => prev.map(item => 
      item.productId === productId ? { ...item, observations } : item
    ));
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep(prev => prev + 1);
  }, []);

  const prevStep = useCallback(() => {
    setCurrentStep(prev => prev - 1);
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
    setCurrentStep
  };
};