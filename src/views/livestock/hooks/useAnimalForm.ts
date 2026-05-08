import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchAllHerds, fetchAllAnimals } from '../../../redux/store/slices/livestockSlice';
import { livestockService } from '../../../services/livestockService';
import { Gender, AnimalPayload, AnimalStatus, ReproStatus } from '../../../types/types';

export const useAnimalForm = () => {
  const { herdId, id } = useParams<{ herdId?: string; id?: string }>();
  const isEditMode = !!id;
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { herds, animals } = useAppSelector((state) => state.livestock);
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEditMode);
  const [toastMsg, setToastMsg] = useState('');

const [formData, setFormData] = useState({
    tag_number: '',
    herd: herdId ? Number(herdId) : 0,
    breed: '',
    gender: '' as Gender | '',
    date_of_birth: new Date().toISOString().split('T')[0],
    status: 'active' as AnimalStatus, // Type assertion here
    reproductive_status: 'open' as ReproStatus, // Type assertion here
    mother_tag: '', 
    father_tag: '',
    birth_weight: ''
  });

  const potentialMothers = (animals || []).filter(a => 
    a.gender?.toLowerCase() === 'female' && a.id.toString() !== id
  );
// In useAnimalForm.ts
const potentialFathers = (animals || []).filter(a => 
  a.gender?.toLowerCase() === 'male' && a.id.toString() !== id
);
  useEffect(() => {
    if (herds.length === 0) dispatch(fetchAllHerds());
    if (animals.length === 0) dispatch(fetchAllAnimals());

    if (isEditMode) {
      loadAnimalData();
    }
  }, [id, dispatch]);

  const loadAnimalData = async () => {
    try {
      const animal = await livestockService.getAnimalById(Number(id));
      setFormData({
        tag_number: animal.tag_number,
        herd: animal.herd,
        breed: animal.breed || '',
        gender: animal.gender as Gender,
        date_of_birth: animal.date_of_birth || '',
        status: animal.status,
        reproductive_status: animal.reproductive_status,
        mother_tag: animal.mother_tag?.toString() || '',
        father_tag: animal.father_tag || '',
        birth_weight: animal.birth_weight?.toString() || ''
      });
    } catch (error) {
      setToastMsg('Failed to load animal data.');
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMotherChange = (newValue: any) => {
    setFormData((prev) => ({ ...prev, mother_tag: newValue ? newValue.id.toString() : '' }));
  };

  const handleFatherChange = (newValue: any) => {
    setFormData((prev) => ({ ...prev, father_tag: newValue ? newValue.id.toString() : '' }));
  };
    const isFormValid = 
    formData.gender.trim() !== '' &&
    formData.status.trim() !== '' &&
    formData.herd !== 0 &&
    formData.breed !== '';
        // const isFormValid =true;


  const handleSubmit = async (e: React.FormEvent) => {
    if (!isFormValid || isSubmitting) return;
    e.preventDefault();
    setLoading(true);

    const payload: AnimalPayload = {
      ...formData,
      gender: formData.gender as Gender,
      mother_tag: formData.mother_tag || undefined,
      father_tag: formData.father_tag || undefined,
      birth_weight: formData.birth_weight || undefined,
    };

    try {
      setIsSubmitting(true);
      if (isEditMode) {
        await livestockService.updateAnimal(Number(id), payload);
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
    } finally {
      setLoading(false);
    }
  };
console.log('formData',formData)
  return {
    formData, herds, potentialMothers, potentialFathers,loading, fetching,
    toastMsg, setToastMsg, herdId, isEditMode,handleFatherChange, isFormValid,
    handleChange, handleMotherChange, handleSubmit,isSubmitting, setIsSubmitting,
    goBack: () => history.goBack()
  };
};