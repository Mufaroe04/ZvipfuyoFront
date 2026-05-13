// import { useState, useEffect, useMemo } from 'react';
// import { useHistory } from 'react-router-dom';
// import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
// import { fetchAllAnimals } from '../../../redux/store/slices/livestockSlice';
// import { logBreedingEvent, updateBreedingEvent } from '../../../redux/store/slices/reproductionSlice';

// export const useBreedingEventForm = (initialData?: any) => {
//   const history = useHistory();
//   const dispatch = useAppDispatch();
//   const { animals } = useAppSelector((state) => state.livestock);
//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     animal: initialData?.dam || '',
//     breeding_date: initialData?.breeding_date || new Date().toISOString().split('T')[0],
//     method: initialData?.method || 'natural',
//     sire_tag: initialData?.sire_tag || '',
//     status: initialData?.status || 'pending',
//     notes: initialData?.notes || '',
//   });

//   useEffect(() => {
//     if (animals.length === 0) dispatch(fetchAllAnimals());
//   }, [dispatch, animals.length]);

//   // Validation Logic using useMemo
//   const isFormValid = useMemo(() => {
//     return (
//       formData.animal !== '' &&
//       formData.breeding_date !== '' &&
//       formData.method !== ''
//     );
//   }, [formData]);

//   const females = useMemo(() => animals.filter(a => a.gender?.toLowerCase() === 'female'), [animals]);
//   const males = useMemo(() => animals.filter(a => a.gender?.toLowerCase() === 'male'), [animals]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!isFormValid) return;
    
//     setLoading(true);
//     const action = initialData?.id 
//       ? updateBreedingEvent({ id: initialData.id, ...formData })
//       : logBreedingEvent(formData);

//     const resultAction = await dispatch(action);
//     if (logBreedingEvent.fulfilled.match(resultAction) || updateBreedingEvent.fulfilled.match(resultAction)) {
//       history.push('/reproduction');
//     }
//     setLoading(false);
//   };

//   return { formData, setFormData, loading, handleSubmit, females, males, isFormValid };
// };
import { useState, useEffect, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { fetchAllAnimals } from '../../../redux/store/slices/livestockSlice';
import { logBreedingEvent, updateBreedingEvent } from '../../../redux/store/slices/reproductionSlice';

export const useBreedingEventForm = (initialData?: any) => {
  const history = useHistory();
  const { id } = useParams<{ id: string }>(); // Extract ID from URL for update logic
  const dispatch = useAppDispatch();
  const { animals } = useAppSelector((state) => state.livestock);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    animal: initialData?.dam || '',
    breeding_date: initialData?.breeding_date || new Date().toISOString().split('T')[0],
    method: initialData?.method || 'natural',
    sire_tag: initialData?.sire_tag || '',
    status: initialData?.status || 'pending',
    notes: initialData?.notes || '',
  });

  useEffect(() => {
    if (animals.length === 0) dispatch(fetchAllAnimals());
  }, [dispatch, animals.length]);

  // Validation Logic
  const isFormValid = useMemo(() => {
    return (
      formData.animal !== '' &&
      formData.breeding_date !== '' &&
      formData.method !== ''
    );
  }, [formData]);

  const females = useMemo(() => animals.filter(a => a.gender?.toLowerCase() === 'female'), [animals]);
  const males = useMemo(() => animals.filter(a => a.gender?.toLowerCase() === 'male'), [animals]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    try {
      setIsSubmitting(true);
      
      if (id) {
        // Update Logic using .unwrap() for direct error catching
        await dispatch(updateBreedingEvent({ 
          id: Number(id), 
          data: formData 
        })).unwrap();
      } else {
        // Create Logic
        await dispatch(logBreedingEvent(formData)).unwrap();
      }

      // Redirect using replace to clean up navigation history
      history.replace("/reproduction");
    } catch (error) {
      console.error("Breeding event submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { 
    formData, 
    setFormData, 
    isSubmitting, 
    handleSubmit, 
    females, 
    males, 
    isFormValid 
  };
};