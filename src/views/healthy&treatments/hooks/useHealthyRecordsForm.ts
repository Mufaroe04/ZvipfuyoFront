// import { useState, useEffect, useMemo } from 'react';
// import { useHistory, useParams } from 'react-router-dom';
// import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
// import { fetchAllAnimals } from '../../../redux/store/slices/livestockSlice';
// import { addHealthRecord,updateHealthRecord } from '../../../redux/store/slices/operationsSlice';


// export const useHealthyRecordsForm = () => {
//   const { id } = useParams<{ id: string }>();
//   const history = useHistory();
//   const dispatch = useAppDispatch();
//   const { healthRecords } = useAppSelector((state) => state.operations);
//   const { animals } = useAppSelector((state) => state.livestock);
  

//   const [formData, setFormData] = useState({
//     animal: 0,
//     animal_tag:'',
//     treatment_date: new Date().toISOString().split('T')[0],
//     condition: '',
//     treatment: '',
//     cost: 0,
//     follow_up_date: '',
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//     useEffect(() => {
//       if (animals.results.length === 0) dispatch(fetchAllAnimals());
//     }, [dispatch, animals.length]);
//   // Load existing data if in Edit Mode
//   useEffect(() => {
//     if (id) {
//       const existing = healthRecords?.results.find((h) => String(h.uuid) === id);
//       if (existing) {
//         setFormData({
//           animal:existing.animal|| 0,
//           animal_tag:existing.animal_tag||'',
//           treatment_date:existing.treatment_date|| '' ,
//           condition: existing.condition|| '',
//           treatment: existing.treatment|| '',
//           cost: existing.cost|| 0,
//           follow_up_date: existing.follow_up_date|| '',
//         });
//       }
//     }
//   }, [id, healthRecords]);


// const isFormValid = useMemo(() => {
//   const hasDate = formData.treatment_date && formData.treatment_date.length > 0;
//   const hasAnimal = formData.animal !== 0;
//   const hasCondition = formData.condition && formData.condition.length > 0;
//   const hasTag = formData.animal_tag && formData.animal_tag.trim().length > 0;
//   return !!(hasDate && hasCondition && hasAnimal  && hasTag);
// }, [formData]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!isFormValid || isSubmitting) return;

//     try {
//       setIsSubmitting(true);
//       if (id) {
//         // Update Logic
//         await dispatch(updateHealthRecord({ id: Number(id), data: formData })).unwrap();
//       } else {
//         // Create Logic
//         await dispatch(addHealthRecord(formData)).unwrap();
//       }
//       history.replace("/health");
//     } catch (error) {
//       console.error("Form submission failed:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return {
//     formData,
//     animals,
//     setFormData,
//     isSubmitting,
//     isFormValid,
//     handleSubmit,
//     isEditMode: !!id,
//     goBack: () => history.goBack()
//   };
// // };
// import { useState, useEffect, useMemo } from 'react';
// import { useHistory, useParams } from 'react-router-dom';
// import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
// import { fetchAllAnimals } from '../../../redux/store/slices/livestockSlice';
// import { addHealthRecord, updateHealthRecord } from '../../../redux/store/slices/operationsSlice';

// export const useHealthyRecordsForm = () => {
//   const { id } = useParams<{ id: string }>();
//   const history = useHistory();
//   const dispatch = useAppDispatch();
//   const { healthRecords } = useAppSelector((state) => state.operations);
//   const { animals } = useAppSelector((state) => state.livestock);

//   const [formData, setFormData] = useState({
//     animal: 0,
//     animal_tag: '',
//     treatment_date: new Date().toISOString().split('T')[0],
//     condition: '',
//     treatment: '',
//     cost: 0,
//     follow_up_date: '',
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Safely fetch animals if your Redux state cache is unpopulated
//   useEffect(() => {
//     if (animals.results && animals.results.length === 0) {
//       dispatch(fetchAllAnimals());
//     }
//   }, [dispatch, animals.results?.length]);

//   // Load existing database records cleanly inside Edit Mode
//   useEffect(() => {
//     if (id && healthRecords?.results) {
//       const existing = healthRecords.results.find((h) => String(h.uuid) === id);
//       if (existing) {
//         setFormData({
//           animal: existing.animal || 0,
//           animal_tag: existing.animal_tag || '', // Maps directly from your JSON response payload
//           treatment_date: existing.treatment_date || '',
//           condition: existing.condition || '',
//           treatment: existing.treatment || '',
//           cost: Number(existing.cost) || 0,
//           follow_up_date: existing.follow_up_date || '',
//         });
//       }
//     }
//   }, [id, healthRecords]);

//   const isFormValid = useMemo(() => {
//     const hasDate = formData.treatment_date && formData.treatment_date.length > 0;
//     const hasAnimal = formData.animal !== 0;
//     const hasCondition = formData.condition && formData.condition.length > 0;
//     const hasTag = formData.animal_tag && formData.animal_tag.trim().length > 0;
//     return !!(hasDate && hasCondition && hasAnimal && hasTag);
//   }, [formData]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!isFormValid || isSubmitting) return;

//     try {
//       setIsSubmitting(true);
//       if (id) {
//         await dispatch(updateHealthRecord({ id: id, data: formData })).unwrap();
//       } else {
//         await dispatch(addHealthRecord(formData)).unwrap();
//       }
//       history.replace("/health");
//     } catch (error) {
//       console.error("Form submission failed:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return {
//     formData,
//     animals,
//     setFormData,
//     isSubmitting,
//     isFormValid,
//     handleSubmit,
//     isEditMode: !!id,
//     goBack: () => history.goBack()
//   };
// };
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