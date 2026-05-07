import { useState, useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { 
  fetchMilkYields, 
  fetchMilkQuality, 
  fetchLactationPeriods, 
  updateLactationPeriodDryOff 
} from '../../../redux/store/slices/operationsSlice';

export const useDairyDashboard = () => {
  const dispatch = useAppDispatch();
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

  const filtered = useMemo(() => {
    const filterFn = (arr: any[]) => arr.filter(item => selectedBreed === 'All' || item.breed === selectedBreed);
    return {
      yields: filterFn(milkYields),
      quality: filterFn(milkQuality),
      lactations: filterFn(lactations)
    };
  }, [milkYields, milkQuality, lactations, selectedBreed]);

  const yieldSeries = useMemo(() => {
    const daily: any = {};
    filtered.yields.forEach(curr => {
      const date = curr.date;
      if (!daily[date]) daily[date] = { total: 0, count: 0 };
      daily[date].total += Number(curr.amount_liters);
      daily[date].count += 1;
    });
    return [{
      name: 'Avg Liters',
      data: Object.keys(daily).sort().map(d => ({ x: new Date(d).getTime(), y: Number((daily[d].total / daily[d].count).toFixed(2)) }))
    }];
  }, [filtered.yields]);

  const qualitySeries = useMemo(() => {
    const daily: any = {};
    filtered.quality.forEach(curr => {
      const date = curr.date;
      if (!daily[date]) daily[date] = { fat: 0, prot: 0, count: 0 };
      daily[date].fat += Number(curr.fat_percentage);
      daily[date].prot += Number(curr.protein_percentage);
      daily[date].count += 1;
    });
    return [
      { name: 'Fat %', data: Object.keys(daily).sort().map(d => ({ x: new Date(d).getTime(), y: Number((daily[d].fat / daily[d].count).toFixed(2)) })) },
      { name: 'Protein %', data: Object.keys(daily).sort().map(d => ({ x: new Date(d).getTime(), y: Number((daily[d].prot / daily[d].count).toFixed(2)) })) }
    ];
  }, [filtered.quality]);

  return { tabValue, setTabValue, selectedBreed, setSelectedBreed, filtered, yieldSeries, qualitySeries, loading, handleDryOff };
};