import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { addLactationPeriod } from '../../../redux/store/slices/operationsSlice';
import { fetchAllAnimals } from '../../../redux/store/slices/livestockSlice';
import { useHistory } from 'react-router-dom';

export const useLactation = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { animals } = useAppSelector((state) => state.livestock);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    animal: '',
    start_date: new Date().toISOString().split('T')[0],
    end_date: '',
    lactation_number: '',
    is_active: true
  });

  useEffect(() => {
    if (animals.length === 0) dispatch(fetchAllAnimals());
  }, [dispatch, animals.length]);

  const submitForm = async () => {
    setLoading(true);
    const payload = {
      ...formData,
      animal: Number(formData.animal),
      lactation_number: parseInt(formData.lactation_number),
      end_date: formData.end_date || null
    };

    const result = await dispatch(addLactationPeriod(payload as any));
    if (addLactationPeriod.fulfilled.match(result)) {
      history.push('/dairy');
    }
    setLoading(false);
  };

  return { formData, setFormData, animals, loading, submitForm ,history};
};