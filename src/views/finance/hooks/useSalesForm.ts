// // src/views/finance/hooks/useSalesForm.ts

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppDispatch } from '../../../redux/store';
import { createMilkSale, createCattleSale } from '../../../redux/store/slices/financeSlice';
import { Animal } from '../../../types/types'; // Import your Animal interface

export interface SalesFormFields {
  date: string;
  amount: string;
  currency: string;
  payment_method: string;
  buyer: string;
  liters_sold: string;
  price_per_liter: string;
  total_weight_kg: string;
  price_per_kg: string;
  description: string;
}

interface UseSalesFormProps {
  initialType?: 'milk' | 'cattle' | null;
  initialData?: any;
  editId?: string;
}

export const useSalesForm = ({ initialType = null, initialData, editId }: UseSalesFormProps = {}) => {
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();

  const [type, setType] = useState<'milk' | 'cattle' | null>(initialType);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [saleDetails, setSaleDetails] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [formData, setFormData] = useState<SalesFormFields>({
    date: new Date().toISOString().split('T')[0],
    amount: '',
    currency: 'USD',
    payment_method: 'cash_usd',
    buyer: '',
    liters_sold: '',
    price_per_liter: '',
    total_weight_kg: '',
    price_per_kg: '',
    description: '',
  });

  // Fixed: Track rich Animal objects instead of raw strings to maintain autocomplete stability
  const [selectedAnimals, setSelectedAnimals] = useState<Animal[]>([]);

  // Handle data hydration during edit mode sequences
  useEffect(() => {
    if (initialData) {
      if (initialData.type) setType(initialData.type);
      
      const tx = initialData.transaction_details || {};
      setFormData({
        date: tx.date || new Date().toISOString().split('T')[0],
        amount: tx.amount?.toString() || '',
        currency: tx.currency || 'USD',
        payment_method: tx.payment_method || 'cash_usd',
        buyer: initialData.type === 'milk' ? initialData.buyer : initialData.buyer_name,
        liters_sold: initialData.liters_sold?.toString() || '',
        price_per_liter: initialData.price_per_liter?.toString() || '',
        total_weight_kg: initialData.total_weight_kg?.toString() || '',
        price_per_kg: initialData.price_per_kg?.toString() || '',
        description: tx.description || '',
      });

      if (initialData.type === 'cattle' && initialData.animals) {
        // Ensure hydration assigns rich options to meet Autocomplete requirements
        const normalizedAnimals = initialData.animals.map((a: any) => 
          typeof a === 'object' ? (a as Animal) : ({ id: Number(a), tag_number: `ID: ${a}` } as unknown as Animal)
        );
        setSelectedAnimals(normalizedAnimals);
      }
    }
  }, [initialData]);

  const handleInputChange = (name: keyof SalesFormFields, value: string) => {
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      if (type === 'milk' && (name === 'liters_sold' || name === 'price_per_liter')) {
        const total = parseFloat(updated.liters_sold || '0') * parseFloat(updated.price_per_liter || '0');
        updated.amount = isNaN(total) ? '' : total.toFixed(2);
      }

      if (type === 'cattle' && (name === 'total_weight_kg' || name === 'price_per_kg')) {
        const total = parseFloat(updated.total_weight_kg || '0') * parseFloat(updated.price_per_kg || '0');
        updated.amount = isNaN(total) ? '' : total.toFixed(2);
      }

      return updated;
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let payload: any = {
      date: formData.date,
      amount: parseFloat(formData.amount),
      currency: formData.currency,
      payment_method: formData.payment_method,
      description: formData.description,
    };

    try {
      let response: any;

      if (type === 'milk') {
        payload = {
          ...payload,
          buyer: formData.buyer,
          liters_sold: parseFloat(formData.liters_sold),
          price_per_liter: parseFloat(formData.price_per_liter),
        };
        
        if (editId) {
          // Placeholder for updateMilkSale implementation
        } else {
          response = await dispatch(createMilkSale(payload)).unwrap();
        }
      } else {
        payload = {
          ...payload,
          buyer_name: formData.buyer,
          total_weight_kg: parseFloat(formData.total_weight_kg),
          price_per_kg: parseFloat(formData.price_per_kg),
          // Fixed: Pull out underlying integer IDs for the Django relational field
          animals: selectedAnimals.map((a) => a.id),
        };

        if (editId) {
          // Placeholder for updateCattleSale implementation
        } else {
          response = await dispatch(createCattleSale(payload)).unwrap();
        }
      }

      setSaleDetails(response);
      setIsCompleted(true);
    } catch (err) {
      console.error("Critical error saving sale ledger record:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetFormState = () => {
    setType(null);
    setIsCompleted(false);
    setSaleDetails(null);
    setSelectedAnimals([]);
  };

  return {
    type,
    setType,
    formData,
    handleInputChange,
    selectedAnimals,
    setSelectedAnimals,
    isCompleted,
    saleDetails,
    isSubmitting,
    handleFormSubmit,
    resetFormState,
    history,
  };
};