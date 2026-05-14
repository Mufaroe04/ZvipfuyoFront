import { useState, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { addWeight, updateWeight } from '../../../redux/store/slices/operationsSlice';

export const useWeightForm = (initialData?: any) => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { animals } = useAppSelector((state) => state.livestock);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    animal: initialData?.animal || '',
    weight_kg: initialData?.weight_kg || '',
    date: initialData?.date || new Date().toISOString().split('T')[0]
  });

  const isFormValid = useMemo(() => {
    return formData.animal !== '' && formData.weight_kg !== '' && formData.date !== '';
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    try {
      setIsSubmitting(true);
      const payload = {
        animal: Number(formData.animal),
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
    setFormData,
    isSubmitting,
    handleSubmit,
    isFormValid,
    animals
  };
};