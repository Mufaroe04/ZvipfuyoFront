import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { addMilkQuality } from '../../../redux/store/slices/operationsSlice';
import { fetchAllAnimals } from '../../../redux/store/slices/livestockSlice';
import { useHistory } from 'react-router-dom';

export const useMilkQuality = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { animals } = useAppSelector((state) => state.livestock);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    animal: '',
    date: new Date().toISOString().split('T')[0],
    fat_percentage: '',
    protein_percentage: '',
    somatic_cell_count: '',
  });

  useEffect(() => {
    if (animals.length === 0) dispatch(fetchAllAnimals());
  }, [dispatch, animals.length]);

  const submitForm = async () => {
    setLoading(true);
    const payload = {
      ...formData,
      animal: formData.animal ? Number(formData.animal) : null,
      fat_percentage: parseFloat(formData.fat_percentage),
      protein_percentage: parseFloat(formData.protein_percentage),
      somatic_cell_count: parseInt(formData.somatic_cell_count),
    };
    const result = await dispatch(addMilkQuality(payload as any));
    if (addMilkQuality.fulfilled.match(result)) history.push('/dairy');
    setLoading(false);
  };

  return { formData, setFormData, animals, loading, submitForm };
};