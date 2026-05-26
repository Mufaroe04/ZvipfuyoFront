// src/views/reproduction/hooks/useBreedingEventForm.ts
import { useState, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/hooks';
import { logBreedingEvent, updateBreedingEvent } from '../../../redux/store/slices/reproductionSlice';

export const useBreedingEventForm = (initialData?: any) => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    dam: initialData?.dam || '',
    dam_object: initialData?.dam_tag ? { id: initialData.dam, tag_number: initialData.dam_tag } : null as any,
    breeding_date: initialData?.breeding_date || new Date().toISOString().split('T')[0],
    method: initialData?.method || 'natural',
    sire_tag: initialData?.sire_tag || '',
    sire_object: initialData?.sire_tag ? { tag_number: initialData.sire_tag } : null as any,
    status: initialData?.status || 'pending',
    notes: initialData?.notes || '',
  });

  const isFormValid = useMemo(() => {
    return formData.dam !== '' && formData.breeding_date !== '' && formData.method !== '';
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    try {
      setIsSubmitting(true);
      const payload = {
        dam: Number(formData.dam),
        breeding_date: formData.breeding_date,
        method: formData.method,
        sire_tag: formData.sire_tag,
        status: formData.status,
        notes: formData.notes
      };

      if (id) {
        await dispatch(updateBreedingEvent({ id: Number(id), data: payload })).unwrap();
      } else {
        await dispatch(logBreedingEvent(payload)).unwrap();
      }
      history.replace("/reproduction");
    } catch (error) {
      console.error("Breeding event submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { formData, setFormData, isSubmitting, handleSubmit, isFormValid };
};