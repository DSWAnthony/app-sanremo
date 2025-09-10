import type { ProductRequest, PurchaseOrder } from '@/types/purchase';
import React, { createContext, useContext, useReducer, useEffect } from 'react';


interface RequestContextType {
  requests: ProductRequest[];
  orders: PurchaseOrder[];
  isLoading: boolean;
  createRequest: (items: any[], observations?: string) => Promise<boolean>;
  updateRequestStatus: (id: string, status: ProductRequest['status'], assignedSupplier?: string) => Promise<boolean>;
  generatePurchaseOrder: (requests: ProductRequest[], supplierId: string, supplierName: string) => Promise<boolean>;
  refreshData: () => void;
}

const RequestContext = createContext<RequestContextType | undefined>(undefined);

type RequestAction = 
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_REQUESTS'; payload: ProductRequest[] }
  | { type: 'SET_ORDERS'; payload: PurchaseOrder[] }
  | { type: 'ADD_REQUEST'; payload: ProductRequest }
  | { type: 'UPDATE_REQUEST'; payload: { id: string; updates: Partial<ProductRequest> } }
  | { type: 'ADD_ORDER'; payload: PurchaseOrder };

interface RequestState {
  requests: ProductRequest[];
  orders: PurchaseOrder[];
  isLoading: boolean;
}

const requestReducer = (state: RequestState, action: RequestAction): RequestState => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_REQUESTS':
      return { ...state, requests: action.payload, isLoading: false };
    case 'SET_ORDERS':
      return { ...state, orders: action.payload, isLoading: false };
    case 'ADD_REQUEST':
      return { 
        ...state, 
        requests: [...state.requests, action.payload],
        isLoading: false 
      };
    case 'UPDATE_REQUEST':
      return {
        ...state,
        requests: state.requests.map(req => 
          req.id === action.payload.id 
            ? { ...req, ...action.payload.updates, updatedAt: new Date() }
            : req
        ),
        isLoading: false
      };
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [...state.orders, action.payload],
        isLoading: false
      };
    default:
      return state;
  }
};

// Mock data
const mockRequests: ProductRequest[] = [
  {
    id: '1',
    productName: 'Arroz Blanco',
    quantity: 50,
    unit: 'kg',
    observations: 'Calidad premium para preparaciones especiales',
    requestedBy: '2',
    requestedByName: 'Carlos López',
    status: 'pending',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    productName: 'Aceite Vegetal',
    quantity: 10,
    unit: 'litros',
    requestedBy: '2',
    requestedByName: 'Carlos López',
    status: 'approved',
    createdAt: new Date('2024-01-14'),
    updatedAt: new Date('2024-01-14')
  },
  {
    id: '3',
    productName: 'Pasta Italiana',
    quantity: 25,
    unit: 'kg',
    observations: 'Preferencia por marca reconocida',
    requestedBy: '3',
    requestedByName: 'Ana Martínez',
    status: 'assigned',
    assignedSupplier: 'supplier-1',
    createdAt: new Date('2024-01-13'),
    updatedAt: new Date('2024-01-13')
  },
  {
    id: '4',
    productName: 'Detergente Industrial',
    quantity: 5,
    unit: 'litros',
    requestedBy: '2',
    requestedByName: 'Carlos López',
    status: 'rejected',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12')
  }
];

const mockOrders: PurchaseOrder[] = [
  {
    id: 'po-001',
    code: 'OC-2025-0001',
    requestIds: ['3'],
    supplierId: 'supplier-1',
    supplierName: 'Proveedor ABC',
    supplierContact: 'Juan Pérez',
    details: [{
      id: 'od-1',
      orderId: 'po-001',
      requestDetailId: 'rd-1',
      product: {
        id: '3',
        code: 'PAS-001',
        name: 'Pasta Italiana',
        unit: 'kg',
        category: 'Pastas',
        sku: 'PAS-001',
        photoUrl: '',
        minQty: 1,
        maxQty: 800,
        currentStock: 80,
        minStock: 30,
        maxStock: 200,
        reorderPoint: 40,
        cost: 2.75,
        supplier: 'Proveedor ABC',
        location: 'Almacén A-3',
        lastUpdated: new Date(),
        isActive: true
      },
      quantityOrdered: 25,
      unitPrice: 50.00,
      subtotal: 1250.00,
      notes: 'Preferencia por marca reconocida'
    }],
    totalAmount: 1250.00,
    status: 'sent',
    paymentTerms: '30 días',
    deliveryDate: new Date('2024-02-15'),
    notes: 'Entrega urgente',
    createdAt: new Date('2024-01-13'),
    createdBy: '1',
    updatedAt: new Date('2024-01-13')
  }
];

export const RequestProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = {
    id: '2',
    name: 'Carlos López',
    email: 'carlos.lopez@example.com'
  }

  const [state, dispatch] = useReducer(requestReducer, {
    requests: [],
    orders: [],
    isLoading: true
  });

  useEffect(() => {
    // Simulate loading data
    const loadData = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      dispatch({ type: 'SET_REQUESTS', payload: mockRequests });
      dispatch({ type: 'SET_ORDERS', payload: mockOrders });
    };

    loadData();
  }, []);

  const createRequest = async (items: any[], observations?: string): Promise<boolean> => {
    if (!user) return false;

    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create multiple requests (one per product)
      const newRequests = items.map((item, index) => ({
        id: `req-${Date.now()}-${index}`,
        productName: item.productName,
        quantity: item.quantity,
        unit: item.unit,
        observations: item.observations || observations,
        requestedBy: user.id,
        requestedByName: user.name,
        status: 'pending' as const,
        createdAt: new Date(),
        updatedAt: new Date()
      }));

      // Add all new requests
      newRequests.forEach(request => {
        dispatch({ type: 'ADD_REQUEST', payload: request });
      });

      return true;
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      return false;
    }
  };

  const updateRequestStatus = async (
    id: string, 
    status: ProductRequest['status'], 
    assignedSupplier?: string
  ): Promise<boolean> => {
    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));

      dispatch({ 
        type: 'UPDATE_REQUEST', 
        payload: { 
          id, 
          updates: { 
            status, 
            assignedSupplier,
            updatedAt: new Date()
          } 
        } 
      });

      return true;
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      return false;
    }
  };

  const generatePurchaseOrder = async (
    requests: ProductRequest[], 
    supplierId: string, 
    supplierName: string
  ): Promise<boolean> => {
    if (!user) return false;

    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newOrder: PurchaseOrder = {
        id: `po-${Date.now()}`,
        code: `OC-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 9999) + 1).padStart(4, '0')}`,
        requestIds: requests.map(r => r.id),
        supplierId,
        supplierName,
        supplierContact: '',
        details: requests.map(req => ({
          id: `od-${Date.now()}-${Math.random()}`,
          orderId: `po-${Date.now()}`,
          requestDetailId: req.id,
          product: {
            id: req.id,
            code: `PRD-${req.id}`,
            name: req.productName,
            unit: req.unit,
            category: '',
            sku: '',
            photoUrl: '',
            minQty: 1,
            maxQty: 1000,
            currentStock: 0,
            minStock: 0,
            maxStock: 0,
            reorderPoint: 0,
            isActive: true,
            lastUpdated: new Date()
          },
          quantityOrdered: req.quantity,
          unitPrice: 500,
          subtotal: req.quantity * 500,
          notes: req.observations
        })),
        totalAmount: requests.length * 500, // Mock calculation
        status: 'pending',
        paymentTerms: 'Contado',
        createdAt: new Date(),
        createdBy: user.id,
        updatedAt: new Date()
      };

      dispatch({ type: 'ADD_ORDER', payload: newOrder });

      // Update request statuses to assigned
      requests.forEach(request => {
        dispatch({ 
          type: 'UPDATE_REQUEST', 
          payload: { 
            id: request.id, 
            updates: { 
              status: 'assigned',
              assignedSupplier: supplierId,
              updatedAt: new Date()
            } 
          } 
        });
      });

      return true;
    } catch (error) {
      dispatch({ type: 'SET_LOADING', payload: false });
      return false;
    }
  };

  const refreshData = () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    // Simulate refresh
    setTimeout(() => {
      dispatch({ type: 'SET_REQUESTS', payload: state.requests });
      dispatch({ type: 'SET_ORDERS', payload: state.orders });
    }, 500);
  };

  return (
    <RequestContext.Provider value={{
      ...state,
      createRequest,
      updateRequestStatus,
      generatePurchaseOrder,
      refreshData
    }}>
      {children}
    </RequestContext.Provider>
  );
};

export const useRequests = () => {
  const context = useContext(RequestContext);
  if (context === undefined) {
    throw new Error('useRequests must be used within a RequestProvider');
  }
  return context;
};