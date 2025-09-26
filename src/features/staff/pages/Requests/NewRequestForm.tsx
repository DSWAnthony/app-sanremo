// src/components/forms/NewRequestForm.tsx
import React, { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { ProductCatalog } from '../../../../components/common/ProductCatalog';
import { useRequestForm } from '../../hooks/useRequestForm';
import { useRequestState } from '../../hooks/useRequestState';
import { StepIndicator } from '@/components/forms/StepIndicator';
import { RequestSummary } from '@/components/common/RequestSummary';
import { QuantityForm } from '@/components/common/QuantityForm';
import { toast } from 'sonner';
import type { Product } from '@/types/product';
import { productService } from '../../services/productService';
import type { Request } from '@/types/request';

const steps = [
  { id: 1, title: 'Seleccionar Productos', description: 'Elige los productos que necesitas' },
  { id: 2, title: 'Definir Cantidades', description: 'Especifica las cantidades requeridas' },
  { id: 3, title: 'Confirmar Solicitud', description: 'Revisa y confirma tu solicitud' }
];

const NewRequestForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = (location.state || {}) as { mode?: 'edit' | 'create'; request?: Request; initialStep?: number };

  const { onSubmit, isLoading } = useRequestForm();

  const {
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
  } = useRequestState();

  // Catalog
  const [catalog, setCatalog] = useState<Product[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataProducts = await productService.fetchAll();
        setCatalog(dataProducts);
      } catch (err) {
        console.error('Error fetching products', err);
      }
    };
    fetchData();
  }, []);

  // Si venimos en modo edit: precargar estado
  useEffect(() => {
    if (state.mode === 'edit' && state.request) {
      const r = state.request;

      // Preselected products (objetos Product)
      const preSelectedProducts = r.items.map(it => it.product);
      setSelectedProducts(preSelectedProducts);

      // Prefill requestItems con la forma RequestItemForm
      const preRequestItems = r.items.map(it => ({
        productId: it.product.id,
        productName: it.product.name,
        unit: it.product.unit ?? '',
        quantity: it.quantity ?? 1,
        observations: it.observations ?? '',
        // opcional: conservar id si lo necesitas al hacer update
        id: it.id
      }));
      setRequestItems(preRequestItems);

      // Observaciones generales
      setGeneralObservations(r.observations ?? '');

      // Ir al step indicado (por defecto 2)
      setCurrentStep(state.initialStep ?? 2);
    } else {
      // Si no es edición, limpiar (modo crear)
      resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.request, state.mode]);

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedProducts.length > 0;
      case 2:
        return requestItems.length > 0 && requestItems.every(item => item.quantity > 0);
      case 3:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep === 1 && selectedProducts.length === 0) {
      toast('Selecciona al menos un producto', {
        description: 'Debes seleccionar al menos un producto para continuar.',
        duration: 4000
      });
      return;
    }
    if (currentStep < 3) nextStep();
  };

  const handleSubmit = async () => {
    // si modo edit, pasar el id para actualizar
    const editId = state.mode === 'edit' && state.request ? state.request.id : undefined;
    const success = await onSubmit(requestItems, generalObservations, editId);
    if (success) {
      navigate('/almacen/solicitudes');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{state.mode === 'edit' ? 'Editar Solicitud' : 'Nueva Solicitud'}</h1>
          <p className="text-muted-foreground">
            {state.mode === 'edit'
              ? 'Edita la solicitud y actualiza las cantidades u observaciones'
              : 'Crea una nueva solicitud de productos siguiendo estos pasos'}
          </p>
        </div>
      </div>

      {/* Step indicator */}
      <StepIndicator steps={steps} currentStep={currentStep} />

      {/* Step content */}
      {currentStep === 1 && (
        <ProductCatalog
          onProductSelect={handleProductSelect}
          catalog={catalog}
          selectedProducts={selectedProducts.map(p => p.id)}
          viewMode="selection"
        />
      )}

      {currentStep === 2 && (
        <QuantityForm
          requestItems={requestItems}
          onQuantityChange={handleQuantityChange}
          onObservationsChange={handleObservationsChange}
        />
      )}

      {currentStep === 3 && (
        <RequestSummary
          requestItems={requestItems}
          generalObservations={generalObservations}
          onGeneralObservationsChange={setGeneralObservations}
        />
      )}

      {/* Navigation buttons */}
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Anterior
        </Button>

        {currentStep < 3 ? (
          <Button onClick={handleNext} disabled={!canProceed()}>
            Siguiente
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} className="gradient-primary" disabled={isLoading}>
            <Check className="h-4 w-4 mr-2" />
            {isLoading ? (state.mode === 'edit' ? 'Actualizando...' : 'Creando...') : (state.mode === 'edit' ? 'Actualizar Solicitud' : 'Crear Solicitud')}
          </Button>
        )}
      </div>
    </div>
  );
};

export default NewRequestForm;
