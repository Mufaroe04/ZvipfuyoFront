// src/views/operations/hooks/useHealthyRecordsForm.ts
import { useState, useEffect, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchAllAnimals } from '../../../redux/store/slices/livestockSlice';
import { addHealthRecord, updateHealthRecord } from '../../../redux/store/slices/operationsSlice';

export const useHealthyRecordsForm = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { healthRecords } = useAppSelector((state) => state.operations);
  const { animals } = useAppSelector((state) => state.livestock);

  const [formData, setFormData] = useState({
    animal: 0,
    animal_tag: '',
    animal_object: null as any,
    treatment_date: new Date().toISOString().split('T')[0],
    condition: '',
    treatment: '',
    cost: 0,
    follow_up_date: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (animals.results && animals.results.length === 0) {
      dispatch(fetchAllAnimals());
    }
  }, [dispatch, animals.results?.length]);

  useEffect(() => {
    if (id && healthRecords?.results) {
      const existing = healthRecords.results.find((h) => String(h.uuid) === id);
      if (existing) {
        // Hydrate both ID and Object states for seamless cross-compilation
        const matchingAnimal = animals.results?.find((a) => Number(a.id) === Number(existing.animal));
        setFormData({
          animal: existing.animal || 0,
          animal_tag: existing.animal_tag || '',
          animal_object: matchingAnimal || { id: existing.animal, tag_number: existing.animal_tag },
          treatment_date: existing.treatment_date || '',
          condition: existing.condition || '',
          treatment: existing.treatment || '',
          cost: Number(existing.cost) || 0,
          follow_up_date: existing.follow_up_date || '',
        });
      }
    }
  }, [id, healthRecords, animals.results]);

  const isFormValid = useMemo(() => {
    return !!(formData.treatment_date && formData.condition && formData.animal !== 0 && formData.animal_tag);
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    try {
      setIsSubmitting(true);
      // Clean temporary object trackers prior to payload dispatch
      const { animal_object, ...cleanedPayload } = formData;
      if (id) {
        await dispatch(updateHealthRecord({ id: id, data: cleanedPayload })).unwrap();
      } else {
        await dispatch(addHealthRecord(cleanedPayload)).unwrap();
      }
      history.replace("/health");
    } catch (error) {
      console.error("Form submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    setFormData,
    isSubmitting,
    isFormValid,
    handleSubmit,
    isEditMode: !!id,
    goBack: () => history.goBack()
  };
};