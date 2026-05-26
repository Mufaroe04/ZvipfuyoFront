import { useState, useEffect, useMemo, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchAllHerds } from '../../../redux/store/slices/livestockSlice';
import { livestockService } from '../../../services/livestockService';
import { Gender, AnimalPayload, AnimalStatus, ReproStatus } from '../../../types/types';

export const useAnimalForm = () => {
  const { herdId, id } = useParams<{ herdId?: string; id?: string }>();
  const isEditMode = !!id;
  const history = useHistory();
  const dispatch = useAppDispatch();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditMode);
  const [toastMsg, setToastMsg] = useState('');
  
  const { herds } = useAppSelector((state) => state.livestock);

  const [formData, setFormData] = useState({
    tag_number: '',
    herd: 0, // Will be hydrated securely via downstream side effects
    breed: '',
    gender: '' as Gender | '',
    date_of_birth: new Date().toISOString().split('T')[0],
    status: 'active' as AnimalStatus,
    reproductive_status: 'none' as ReproStatus,
    mother_tag: '',
    father_tag: '',
    birth_weight: ''
  });

  // Isolated, type-safe animal record loading logic
  const loadAnimalData = useCallback(async (targetId: string) => {
    try {
      const animal = await livestockService.getAnimalById(targetId);
      setFormData({
        tag_number: animal.tag_number,
        herd: animal.herd,
        breed: animal.breed || '',
        gender: animal.gender as Gender,
        date_of_birth: animal.date_of_birth || '',
        status: animal.status,
        reproductive_status: animal.reproductive_status,
        mother_tag: animal.mother_tag_display === "Unknown" ? "" : animal.mother_tag_display,
        father_tag: animal.father_tag_display === "Unknown" ? "" : animal.father_tag_display,
        birth_weight: animal.birth_weight?.toString() || ''
      });
    } catch (error) {
      setToastMsg('Failed to load animal data.');
    } finally {
      setFetching(false);
    }
  }, []);

  // 1. Initial Data Fetching Lifecycles (Runs once on mount or when context changes)
  useEffect(() => {
    if (herds.count === 0) {
      dispatch(fetchAllHerds({ page: 1, pageSize: 200 })); 
    }
    
    // Explicit type-check context wrapper resolves your TypeScript error safely
    if (isEditMode && id) {
      loadAnimalData(id);
    }
  }, [id, isEditMode, herds.count, dispatch, loadAnimalData]);

  // 2. Controlled Side-Effect: Sync URL Herd UUID into the Form Field Primary Key Index
  useEffect(() => {
    if (herdId && herds?.results?.length > 0 && !isEditMode) {
      const existingHerd = herds.results.find((h) => String(h.uuid) === herdId);
      if (existingHerd) {
        setFormData((prev) => {
          // Prevent setting state if it's already matching to avoid layout churn
          if (prev.herd === existingHerd.id) return prev;
          return { ...prev, herd: Number(existingHerd.id) };
        });
      }
    }
  }, [herdId, herds.results, isEditMode]);

  const isFormValid = useMemo(() => {
    return !!(
      formData.gender && 
      formData.status && 
      formData.herd !== 0 && 
      formData.breed && 
      formData.tag_number.trim().length > 0
    );
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCustomTagChange = (field: 'mother_tag' | 'father_tag', value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);
    setLoading(true);

    const payload: AnimalPayload = {
      ...formData,
      gender: formData.gender as Gender,
      mother_tag: formData.mother_tag || undefined,
      father_tag: formData.father_tag || undefined,
      birth_weight: formData.birth_weight || undefined,
    };

    try {
      if (isEditMode && id) {
        await livestockService.updateAnimal(id, payload);
        setToastMsg('Animal updated successfully!');
      } else {
        await livestockService.createAnimal(payload);
        setToastMsg('Animal registered successfully!');
      }
      setTimeout(() => {
        history.push(herdId ? `/herds/${herdId}` : '/animals');
      }, 1500);
    } catch (error: any) {
      setToastMsg(error.response?.data?.tag_number?.[0] || 'Operation failed.');
      setIsSubmitting(false); 
      setLoading(false);
    }
  };

  return {
    formData, 
    herds, 
    loading, 
    fetching, 
    toastMsg, 
    setToastMsg, 
    herdId, 
    isEditMode,
    isFormValid, 
    handleChange, 
    handleCustomTagChange, 
    handleSubmit, 
    isSubmitting,
    goBack: () => history.goBack()
  };
};