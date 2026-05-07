// src/views/livestock/hooks/useRegisterAnimal.ts
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchAllHerds } from '../../../redux/store/slices/livestockSlice';
import { livestockService } from '../../../services/livestockService';
import { Gender, AnimalPayload } from '../../../types/types'; // Import types

export const useRegisterAnimal = () => {
  const { herdId } = useParams<{ herdId?: string }>();
  const history = useHistory();
  const dispatch = useAppDispatch();
  
  const { herds, animals } = useAppSelector((state) => state.livestock);
  
  const [loading, setLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  // Explicitly type the state so it aligns with our needs
  const [formData, setFormData] = useState({
    tag_number: '',
    herd: herdId ? Number(herdId) : 0,
    breed: '',
    gender: '' as Gender | '', // Initialize as empty but typed
    date_of_birth: new Date().toISOString().split('T')[0],
    status: 'active',
    reproductive_status: 'open',
    mother_id: '', 
    father_tag: '',
    birth_weight: ''
  });

  const potentialMothers = animals.filter(a => a.gender?.toLowerCase() === 'female');

  useEffect(() => {
    if (!herdId && herds.length === 0) {
      dispatch(fetchAllHerds());
    }
  }, [herdId, dispatch, herds.length]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMotherChange = (newValue: any) => {
    setFormData((prev) => ({ ...prev, mother_id: newValue ? newValue.id.toString() : '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.herd || !formData.gender) {
      setToastMsg('Please complete all required fields.');
      return;
    }

    setLoading(true);

    /**
     * DATA TRANSFORMATION LAYER
     * Map the flat form state to the strictly typed AnimalPayload
     */
    const payload: AnimalPayload = {
      tag_number: formData.tag_number,
      herd: formData.herd,
      breed: formData.breed,
      gender: formData.gender as Gender, // Type assertion here
      date_of_birth: formData.date_of_birth,
      status: formData.status as any,
      reproductive_status: formData.reproductive_status as any,
      mother_id: formData.mother_id || undefined,
      father_tag: formData.father_tag || undefined,
      birth_weight: formData.birth_weight || undefined,
    };

    try {
      await livestockService.createAnimal(payload);
      setToastMsg(`Animal ${formData.tag_number} registered successfully!`);
      
      setTimeout(() => {
        history.push(herdId ? `/herds/${herdId}` : '/animals');
      }, 1500);
    } catch (error: any) {
      const errorMsg = error.response?.data?.tag_number?.[0] || 'Registration failed.';
      setToastMsg(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    herds,
    potentialMothers,
    loading,
    toastMsg,
    setToastMsg,
    herdId,
    handleChange,
    handleMotherChange,
    handleSubmit
  };
};