import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { createHerd, updateHerd } from '../../../redux/store/slices/livestockSlice';
import { SelectChangeEvent } from "@mui/material";

export interface HerdFormState {
  name: string;
  location: string;
  herd_type: string;
  primary_breed: string;
}

export const useHerdForm = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { herds } = useAppSelector((state) => state.livestock);

  const [formState, setFormState] = useState<HerdFormState>({
    name: '',
    location: '',
    herd_type: '',
    primary_breed: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load existing data if in Edit Mode
  useEffect(() => {
    if (id) {
      const existing = herds?.find((h) => String(h.id) === id);
      if (existing) {
        setFormState({
          name: existing.name || '',
          location: existing.location || '',
          herd_type: existing.herd_type || '',
          primary_breed: existing.primary_breed || '',
        });
      }
    }
  }, [id, herds]);

  const handleChange = (field: keyof HerdFormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>
  ) => {
    setFormState((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const isFormValid = 
    formState.name.trim() !== '' &&
    formState.location.trim() !== '' &&
    formState.herd_type !== '' &&
    formState.primary_breed !== '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    try {
      setIsSubmitting(true);
      if (id) {
        // Update Logic
        await dispatch(updateHerd({ id: Number(id), data: formState })).unwrap();
      } else {
        // Create Logic
        await dispatch(createHerd(formState)).unwrap();
      }
      history.replace("/herds");
    } catch (error) {
      console.error("Form submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formState,
    isSubmitting,
    isFormValid,
    handleChange,
    handleSubmit,
    isEditMode: !!id,
    goBack: () => history.goBack()
  };
};