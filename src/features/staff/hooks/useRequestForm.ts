
import { useState } from 'react';
// import { useAuth } from '@/contexts/AuthContext';
import type { CreateRequest, RequestItem } from '@/types/request';
import { requestService } from '../services/resquestService';
import { toast } from 'sonner';

export const useRequestForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const user = {
    id: 'user-123',
    name: 'John Doe'
  }



  const onSubmit = async (items: RequestItem[], observations?: string) => {
   
    if (!user) {
      setError('Usuario no autenticado');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const requestData: CreateRequest = {
        userId: user.id,
        items,
        observations
      };

      // await requestService.create(requestData);
      console.log('Request submitted:', requestData);
      
      
      toast("Solicitud creada con éxito",{
        description: "Tu solicitud ha sido enviada correctamente.",
        duration: 4000,
      });
      
      return true;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al crear la solicitud';
      setError(message);
      
      toast("Error al crear la solicitud",{
        description: message,
        duration: 4000,
      });
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { onSubmit, isLoading, error };
};