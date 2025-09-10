// components/forms/NewRequestForm.tsx
import React from 'react';
import { ArrowLeft, ArrowRight, Check} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ProductCatalog } from '../../../../components/common/ProductCatalog';
import { useRequestForm } from '../../hooks/useRequestForm';
import { useRequestState } from '../../hooks/useRequestState';
import { StepIndicator } from '@/components/forms/StepIndicator';
import { RequestSummary } from '@/components/common/RequestSummary';
import { QuantityForm } from '@/components/common/QuantityForm';
import { toast } from 'sonner';

const steps = [
  { id: 1, title: 'Seleccionar Productos', description: 'Elige los productos que necesitas' },
  { id: 2, title: 'Definir Cantidades', description: 'Especifica las cantidades requeridas' },
  { id: 3, title: 'Confirmar Solicitud', description: 'Revisa y confirma tu solicitud' }
];

const NewRequestForm: React.FC = () => {
  const navigate = useNavigate();
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
    prevStep
  } = useRequestState();

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedProducts.length > 0;
      case 2:
        return requestItems.every(item => item.quantity > 0);
      case 3:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep === 1 && selectedProducts.length === 0) {
      toast("Selecciona al menos un producto",{
        description: "Debes seleccionar al menos un producto para continuar.",
        duration: 4000,
      });
      return;
    }

    if (currentStep < 3) {
      nextStep();
    }
  };

  const handleSubmit = async () => {
    const success = await onSubmit(requestItems, generalObservations);
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
          <h1 className="text-2xl font-bold text-foreground">Nueva Solicitud</h1>
          <p className="text-muted-foreground">
            Crea una nueva solicitud de productos siguiendo estos pasos
          </p>
        </div>
      </div>

      {/* Step indicator */}
      <StepIndicator steps={steps} currentStep={currentStep} />

      {/* Step content */}
      {currentStep === 1 && (
        <ProductCatalog
          onProductSelect={handleProductSelect}
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
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Anterior
        </Button>

        {currentStep < 3 ? (
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
          >
            Siguiente
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            className="gradient-primary"
            disabled={isLoading}
          >
            <Check className="h-4 w-4 mr-2" />
            {isLoading ? 'Creando...' : 'Crear Solicitud'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default NewRequestForm;