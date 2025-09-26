// src/hooks/useRequestForm.ts
import { useState } from 'react';
import { toast } from 'sonner';
import type { RequestForm } from '@/types/request';
import { requestService } from '../services/resquestService'; // mantuve tu path original

export const useRequestForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // TODO: reemplaza por tu auth real si lo tienes
  const user = {
    id: 1,
    name: 'John Doe'
  };

  /**
   * onSubmit: crea o actualiza según editId.
   * Retorna true/false para indicar éxito.
   */
  const onSubmit = async (items: any[], observations: string, editId?: number): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      if (editId) {
        // update
        await requestService.update(editId, { items, observations });
        toast.success('Solicitud actualizada correctamente');
        return true;
      } else {
        // create
        const requestData: RequestForm = {
          userId: user.id,
          items,
          status: 'pending',
          observations
        };

        await requestService.create(requestData);
        toast.success('Solicitud creada con éxito');
        return true;
      }
    } catch (err) {
      console.error('request onSubmit error', err);
      setError('Error al enviar la solicitud. Inténtalo de nuevo.');
      toast.error('Error al enviar la solicitud');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async (id: number): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      await requestService.delete(id);
      toast.success('Solicitud eliminada correctamente');
      return true;
    } catch (err) {
      console.error('request onDelete error', err);
      setError('Error al eliminar la solicitud. Inténtalo de nuevo.');
      toast.error('Error al eliminar la solicitud');
      return false;
    } finally {
      setIsLoading(false);
    }
  }

  return { onSubmit, isLoading, error, onDelete };
};

