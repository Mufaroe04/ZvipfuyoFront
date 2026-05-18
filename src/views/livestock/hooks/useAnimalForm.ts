// import { useState, useEffect, useMemo } from 'react';
// import { useHistory, useParams } from 'react-router-dom';
// import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
// import { fetchAllHerds, fetchAllAnimals } from '../../../redux/store/slices/livestockSlice';
// import { livestockService } from '../../../services/livestockService';
// import { Gender, AnimalPayload, AnimalStatus, ReproStatus, Animal } from '../../../types/types';

// export const useAnimalForm = () => {
//   const { herdId, id } = useParams<{ herdId?: string; id?: string }>();
//   const isEditMode = !!id;
//   const history = useHistory();
//   const dispatch = useAppDispatch();
//   const [isSubmitting, setIsSubmitting] = useState(false);
  
//   const { herds, animals } = useAppSelector((state) => state.livestock);
  
//   const [loading, setLoading] = useState(false);
//   const [fetching, setFetching] = useState(isEditMode);
//   const [toastMsg, setToastMsg] = useState('');


// const [formData, setFormData] = useState({
//   tag_number: '',
//   herd: herdId ? Number(herdId) : 0,
//   breed: '',
//   gender: '' as Gender | '',
//   date_of_birth: new Date().toISOString().split('T')[0],
//   status: 'active' as AnimalStatus,
//   reproductive_status: 'open' as ReproStatus,
//   mother_tag: '', // Ensure this is an empty string, not undefined
//   father_tag: '', // Ensure this is an empty string, not undefined
//   birth_weight: ''
// });
// const isFormValid = useMemo(() => {
//   const hasGender = formData.gender && formData.gender.length > 0;
//   const hasStatus = formData.status && formData.status.length > 0;
//   const hasHerd = formData.herd !== 0;
//   const hasBreed = formData.breed && formData.breed.length > 0;
//   const hasTag = formData.tag_number && formData.tag_number.trim().length > 0;

//   // Debugging log to find the culprit
//   console.log('Validation Check:', { hasGender, hasStatus, hasHerd, hasBreed, hasTag });

//   return !!(hasGender && hasStatus && hasHerd && hasBreed && hasTag);
// }, [formData]);
//   const potentialMothers = (animals || []).filter(a => 
//     a.gender?.toLowerCase() === 'female' && a.id.toString() !== id
//   );
// // In useAnimalForm.ts
// const potentialFathers = (animals || []).filter(a => 
//   a.gender?.toLowerCase() === 'male' && a.id.toString() !== id
// );

//   useEffect(() => {
//     if (herds.length === 0) dispatch(fetchAllHerds());
//     if (animals.length === 0) dispatch(fetchAllAnimals());

//     if (isEditMode) {
//       loadAnimalData();
//     }
//   }, [id, dispatch]);



// // const isFormValid=true
//   const loadAnimalData = async () => {
//     try {
//       const animal = await livestockService.getAnimalById(Number(id));
//       setFormData({
//         tag_number: animal.tag_number,
//         herd: animal.herd,
//         breed: animal.breed || '',
//         gender: animal.gender as Gender,
//         date_of_birth: animal.date_of_birth || '',
//         status: animal.status,
//         reproductive_status: animal.reproductive_status,
//         mother_tag: animal.mother_tag_display === "Unknown" ? "" : animal.mother_tag_display,
//         father_tag: animal.father_tag_display === "Unknown" ? "" : animal.father_tag_display,
//         birth_weight: animal.birth_weight?.toString() || ''
//       });
//     } catch (error) {
//       setToastMsg('Failed to load animal data.');
//     } finally {
//       setFetching(false);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };


//   const handleMotherChange = (newValue: Animal | null) => {
//     setFormData((prev) => ({ 
//       ...prev, 
//       // Store the tag_number string, which the backend will resolve to an ID
//       mother_tag: newValue ? newValue.tag_number : '' 
//     }));
//   };

//   const handleFatherChange = (newValue: Animal | null) => {
//     setFormData((prev) => ({ 
//       ...prev, 
//       father_tag: newValue ? newValue.tag_number : '' 
//     }));
//   };


//  const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault(); // Move this to the very top

//   // 1. Guard Clause: Check both validity and current submission status
//   if (!isFormValid || isSubmitting) return;

//   // 2. Start Submission: Set BOTH to true immediately
//   setIsSubmitting(true);
//   setLoading(true);

//   const payload: AnimalPayload = {
//     ...formData,
//     gender: formData.gender as Gender,
//     mother_tag: formData.mother_tag || undefined,
//     father_tag: formData.father_tag || undefined,
//     birth_weight: formData.birth_weight || undefined,
//   };

//   try {
//     if (isEditMode) {
//       await livestockService.updateAnimal(Number(id), payload);
//       setToastMsg('Animal updated successfully!');
//     } else {
//       await livestockService.createAnimal(payload);
//       setToastMsg('Animal registered successfully!');
//     }
//     setLoading(false);
//     // Note: We do NOT set isSubmitting(false) here if we are navigating away.
//     // Keeping it true prevents the user from clicking again during the 1.5s delay.
//     setTimeout(() => {
//       history.push(herdId ? `/herds/${herdId}` : '/animals');
//     }, 1500);

//   } catch (error: any) {
//     // 3. Reset states ONLY if the operation failed so the user can try again
//     setToastMsg(error.response?.data?.tag_number?.[0] || 'Operation failed.');
//     setIsSubmitting(false); 
//     setLoading(false);
//   }
// };
// console.log('formData',formData)
//   return {
//     formData, herds, potentialMothers, potentialFathers,loading, fetching,
//     toastMsg, setToastMsg, herdId, isEditMode,handleFatherChange, isFormValid,
//     handleChange, handleMotherChange, handleSubmit,isSubmitting, setIsSubmitting,
//     goBack: () => history.goBack()
//   };
// };

import { useState, useEffect, useMemo } from 'react';
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
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const { herds } = useAppSelector((state) => state.livestock);

  const [formData, setFormData] = useState({
    tag_number: '',
    herd: herdId ? Number(herdId) : 0,
    breed: '',
    gender: '' as Gender | '',
    date_of_birth: new Date().toISOString().split('T')[0],
    status: 'active' as AnimalStatus,
    reproductive_status: 'open' as ReproStatus,
    mother_tag: '',
    father_tag: '',
    birth_weight: ''
  });

  const isFormValid = useMemo(() => {
    return !!(formData.gender && formData.status && formData.herd !== 0 && formData.breed && formData.tag_number.trim().length > 0);
  }, [formData]);

    useEffect(() => {
      if (herds.count === 0) {
        // Request a large size or a bypass flag so the dropdown displays everything
        dispatch(fetchAllHerds({ page: 1, pageSize: 200 })); 
      }
      
      if (isEditMode) loadAnimalData();
    }, [id, dispatch, herds.count, isEditMode]);

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
        mother_tag: animal.mother_tag_display === "Unknown" ? "" : animal.mother_tag_display,
        father_tag: animal.father_tag_display === "Unknown" ? "" : animal.father_tag_display,
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
      setIsSubmitting(false); 
      setLoading(false);
    }
  };

  return {
    formData, herds, loading, fetching, toastMsg, setToastMsg, herdId, isEditMode,
    isFormValid, handleChange, handleCustomTagChange, handleSubmit, isSubmitting,
    goBack: () => history.goBack()
  };
};