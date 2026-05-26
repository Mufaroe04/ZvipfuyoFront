// import { useState, useMemo } from 'react';
// import { useHistory, useParams } from 'react-router-dom';
// import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
// import { addWeight, updateWeight } from '../../../redux/store/slices/operationsSlice';

// export const useWeightForm = (initialData?: any) => {
//   const history = useHistory();
//   const { id } = useParams<{ id: string }>();
//   const dispatch = useAppDispatch();
//   const { animals } = useAppSelector((state) => state.livestock);
  
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [formData, setFormData] = useState({
//     animal: initialData?.animal || '',
//     weight_kg: initialData?.weight_kg || '',
//     date: initialData?.date || new Date().toISOString().split('T')[0]
//   });

//   const isFormValid = useMemo(() => {
//     return formData.animal !== '' && formData.weight_kg !== '' && formData.date !== '';
//   }, [formData]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!isFormValid || isSubmitting) return;

//     try {
//       setIsSubmitting(true);
//       const payload = {
//         animal: Number(formData.animal),
//         weight_kg: Number(formData.weight_kg),
//         date: formData.date
//       };

//       if (id) {
//         await dispatch(updateWeight({ id: Number(id), data: payload })).unwrap();
//       } else {
//         await dispatch(addWeight(payload)).unwrap();
//       }

//       history.replace("/weights");
//     } catch (error) {
//       console.error("Weight record submission failed:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return {
//     formData,
//     setFormData,
//     isSubmitting,
//     handleSubmit,
//     isFormValid,
//     animals
//   };
// };
// src/views/operations/hooks/useWeightForm.ts
import { useState, useMemo, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { addWeight, updateWeight } from '../../../redux/store/slices/operationsSlice';
import { Animal } from '../../../types/types';

interface WeightFormData {
  animalObject: Animal | null;
  weight_kg: string;
  date: string;
}

export const useWeightForm = (initialData?: any) => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { animals } = useAppSelector((state) => state.livestock);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Resolve hydration properties for initial configuration states safely
  const initialAnimal = useMemo(() => {
    if (!initialData?.animal) return null;
    if (typeof initialData.animal === 'object') return initialData.animal as Animal;
    
    // Fallback lookups across local application caches
    return animals.find((a) => a.id === Number(initialData.animal)) || ({
      id: Number(initialData.animal),
      tag_number: initialData.animal_tag || `ID: ${initialData.animal}`
    } as unknown as Animal);
  }, [initialData, animals]);

  const [formData, setFormData] = useState<WeightFormData>({
    animalObject: initialAnimal,
    weight_kg: initialData?.weight_kg || '',
    date: initialData?.date || new Date().toISOString().split('T')[0]
  });

  // Ensure modification parameters preserve state bindings upon delayed sync routines
  useEffect(() => {
    if (initialAnimal) {
      setFormData((prev) => ({ ...prev, animalObject: initialAnimal }));
    }
  }, [initialAnimal]);

  const handleAnimalChange = (value: Animal | null) => {
    setFormData((prev) => ({
      ...prev,
      animalObject: value
    }));
  };

  const handleFieldChange = (field: keyof Omit<WeightFormData, 'animalObject'>, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const isFormValid = useMemo(() => {
    return formData.animalObject !== null && formData.weight_kg !== '' && formData.date !== '';
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting || !formData.animalObject) return;

    try {
      setIsSubmitting(true);
      const payload = {
        animal: Number(formData.animalObject.id),
        weight_kg: Number(formData.weight_kg),
        date: formData.date
      };

      if (id) {
        await dispatch(updateWeight({ id: Number(id), data: payload })).unwrap();
      } else {
        await dispatch(addWeight(payload)).unwrap();
      }

      history.replace("/weights");
    } catch (error) {
      console.error("Weight record submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    handleAnimalChange,
    handleFieldChange,
    isSubmitting,
    handleSubmit,
    isFormValid
  };
};