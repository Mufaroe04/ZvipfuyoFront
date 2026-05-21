// // src/views/finance/hooks/useSalesForm.ts

// import { useState, useEffect, useMemo } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
// import { AppDispatch, RootState } from '../../../redux/store';
// import { createMilkSale, createCattleSale } from '../../../redux/store/slices/financeSlice';
// import { fetchAllAnimals } from '../../../redux/store/slices/livestockSlice';

// export interface SalesFormFields {
//   date: string;
//   amount: string;
//   currency: string;
//   payment_method: string;
//   buyer: string;
//   liters_sold: string;
//   price_per_liter: string;
//   total_weight_kg: string;
//   price_per_kg: string;
//   description: string;
// }

// interface UseSalesFormProps {
//   initialType?: 'milk' | 'cattle' | null;
//   initialData?: any;
//   editId?: string;
// }

// export const useSalesForm = ({ initialType = null, initialData, editId }: UseSalesFormProps = {}) => {
//   const history = useHistory();
//   const dispatch = useDispatch<AppDispatch>();

//   const { animals } = useSelector((state: RootState) => state.livestock);

//   const [type, setType] = useState<'milk' | 'cattle' | null>(initialType);
//   const [isCompleted, setIsCompleted] = useState<boolean>(false);
//   const [saleDetails, setSaleDetails] = useState<any>(null);
//   const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

//   const [formData, setFormData] = useState<SalesFormFields>({
//     date: new Date().toISOString().split('T')[0],
//     amount: '',
//     currency: 'USD',
//     payment_method: 'cash_usd',
//     buyer: '',
//     liters_sold: '',
//     price_per_liter: '',
//     total_weight_kg: '',
//     price_per_kg: '',
//     description: '',
//   });

//   const [selectedAnimals, setSelectedAnimals] = useState<any[]>([]);

//   // Pre-load reference options for the cattle selections
//   useEffect(() => {
//     dispatch(fetchAllAnimals());
//   }, [dispatch]);

//   // Handle data hydration during edit mode sequences
//   useEffect(() => {
//     if (initialData) {
//       if (initialData.type) setType(initialData.type);
      
//       const tx = initialData.transaction_details || {};
//       setFormData({
//         date: tx.date || new Date().toISOString().split('T')[0],
//         amount: tx.amount?.toString() || '',
//         currency: tx.currency || 'USD',
//         payment_method: tx.payment_method || 'cash_usd',
//         buyer: initialData.type === 'milk' ? initialData.buyer : initialData.buyer_name,
//         liters_sold: initialData.liters_sold?.toString() || '',
//         price_per_liter: initialData.price_per_liter?.toString() || '',
//         total_weight_kg: initialData.total_weight_kg?.toString() || '',
//         price_per_kg: initialData.price_per_kg?.toString() || '',
//         description: tx.description || '',
//       });

//       if (initialData.type === 'cattle' && initialData.animals && animals.length > 0) {
//         const preselected = animals.filter((animal) => 
//           initialData.animals.includes(animal.id)
//         );
//         setSelectedAnimals(preselected);
//       }
//     }
//   }, [initialData, animals]);

//   const handleInputChange = (name: keyof SalesFormFields, value: string) => {
//     setFormData((prev) => {
//       const updated = { ...prev, [name]: value };

//       if (type === 'milk' && (name === 'liters_sold' || name === 'price_per_liter')) {
//         const total = parseFloat(updated.liters_sold || '0') * parseFloat(updated.price_per_liter || '0');
//         updated.amount = isNaN(total) ? '' : total.toFixed(2);
//       }

//       if (type === 'cattle' && (name === 'total_weight_kg' || name === 'price_per_kg')) {
//         const total = parseFloat(updated.total_weight_kg || '0') * parseFloat(updated.price_per_kg || '0');
//         updated.amount = isNaN(total) ? '' : total.toFixed(2);
//       }

//       return updated;
//     });
//   };

//   const handleFormSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     let payload: any = {
//       date: formData.date,
//       amount: parseFloat(formData.amount),
//       currency: formData.currency,
//       payment_method: formData.payment_method,
//       description: formData.description,
//     };

//     try {
//       let response: any;

//       if (type === 'milk') {
//         payload = {
//           ...payload,
//           buyer: formData.buyer,
//           liters_sold: parseFloat(formData.liters_sold),
//           price_per_liter: parseFloat(formData.price_per_liter),
//         };
        
//         if (editId) {
//           // Placeholder for updateMilkSale implementation once added to slice
//           // response = await dispatch(updateMilkSale({ id: editId, ...payload })).unwrap();
//         } else {
//           response = await dispatch(createMilkSale(payload)).unwrap();
//         }
//       } else {
//         payload = {
//           ...payload,
//           buyer_name: formData.buyer,
//           total_weight_kg: parseFloat(formData.total_weight_kg),
//           price_per_kg: parseFloat(formData.price_per_kg),
//           animals: selectedAnimals.map((a) => a.id),
//         };

//         if (editId) {
//           // Placeholder for updateCattleSale implementation once added to slice
//           // response = await dispatch(updateCattleSale({ id: editId, ...payload })).unwrap();
//         } else {
//           response = await dispatch(createCattleSale(payload)).unwrap();
//         }
//       }

//       setSaleDetails(response);
//       setIsCompleted(true);
//     } catch (err) {
//       console.error("Critical error saving sale ledger record:", err);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const resetFormState = () => {
//     setType(null);
//     setIsCompleted(false);
//     setSaleDetails(null);
//     setSelectedAnimals([]);
//   };

//   return {
//     type,
//     setType,
//     formData,
//     handleInputChange,
//     selectedAnimals,
//     setSelectedAnimals,
//     animalOptions: animals || [],
//     isCompleted,
//     saleDetails,
//     isSubmitting,
//     handleFormSubmit,
//     resetFormState,
//     history,
//   };
// };
// src/views/finance/hooks/useSalesForm.ts

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppDispatch } from '../../../redux/store';
import { createMilkSale, createCattleSale } from '../../../redux/store/slices/financeSlice';

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

  // Storing primitive IDs matching the AsyncAnimalSelect signature
  const [selectedAnimals, setSelectedAnimals] = useState<string[]>([]);

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
        // Map rich models or direct integers down to standard payload strings
        const normalizedIds = initialData.animals.map((a: any) => 
          typeof a === 'object' ? a.id.toString() : a.toString()
        );
        setSelectedAnimals(normalizedIds);
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
          animals: selectedAnimals.map((id) => Number(id)),
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