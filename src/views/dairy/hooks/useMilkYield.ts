import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { addMilkYields } from '../../../redux/store/slices/operationsSlice';
import { fetchAllAnimals } from '../../../redux/store/slices/livestockSlice';
import { useHistory } from 'react-router-dom';

export const useMilkYield = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { animals, loading: animalsLoading } = useAppSelector((state) => state.livestock);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    animal: '',
    date: new Date().toISOString().split('T')[0],
    amount_liters: '',
    session: 'AM',
    is_colostrum: false,
    notes: ''
  });

  useEffect(() => {
    if (animals.length === 0) dispatch(fetchAllAnimals());
  }, [dispatch, animals.length]);

  const submitForm = async () => {
    setLoading(true);
    const payload = {
      ...formData,
      animal: Number(formData.animal),
      amount_liters: parseFloat(formData.amount_liters),
    };
    const result = await dispatch(addMilkYields(payload as any));
    if (addMilkYields.fulfilled.match(result)) history.push('/dairy');
    setLoading(false);
  };

  return { formData, setFormData, animals, animalsLoading, loading, submitForm };
};