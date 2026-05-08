import { useState, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { 
  fetchMilkYields, 
  fetchMilkQuality, 
  fetchLactationPeriods, 
  updateLactationPeriodDryOff 
} from '../../../redux/store/slices/operationsSlice';
import { useHistory } from 'react-router-dom';

export const useDairyDashboard = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [tabValue, setTabValue] = useState(0);
  const [selectedBreed, setSelectedBreed] = useState('All');
  const { milkYields, milkQuality, lactations, loading } = useAppSelector((state) => state.operations);

  useEffect(() => {
    dispatch(fetchMilkYields());
    dispatch(fetchMilkQuality());
    dispatch(fetchLactationPeriods());
  }, [dispatch]);

  const handleDryOff = (id: number) => {
    if (window.confirm("Mark this animal as Dry?")) {
      dispatch(updateLactationPeriodDryOff({ id }));
    }
  };

  const filteredYields = milkYields.filter(r => selectedBreed === 'All' || r.breed === selectedBreed);
  const filteredQuality = milkQuality.filter(r => selectedBreed === 'All' || r.breed === selectedBreed);
  const filteredLactations = lactations.filter(r => selectedBreed === 'All' || r.breed === selectedBreed);
 

  return {history, tabValue, setTabValue, selectedBreed, setSelectedBreed, filteredYields, filteredQuality, filteredLactations, loading, handleDryOff };
};