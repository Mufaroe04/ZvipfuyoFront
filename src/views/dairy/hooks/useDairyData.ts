import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { 
  fetchMilkYields, fetchMilkQuality, fetchLactationPeriods, 
  updateLactationPeriodDryOff
} from '../../../redux/store/slices/operationsSlice';
import { useHistory } from 'react-router-dom';

export const useDairyData = () => {
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

  const aggregateData = (data: any[], valueKeys: string | string[]) => {
    const stats = data.reduce((acc: any, curr) => {
      if (selectedBreed !== 'All' && curr.breed !== selectedBreed) return acc;
      const dateKey = curr.date || curr.test_date || curr.start_date;
      if (!dateKey) return acc;
      if (!acc[dateKey]) {
        acc[dateKey] = { total: Array.isArray(valueKeys) ? valueKeys.map(() => 0) : 0, count: 0 };
      }
      if (Array.isArray(valueKeys)) {
        valueKeys.forEach((key, idx) => { acc[dateKey].total[idx] += Number(curr[key]) || 0; });
      } else {
        acc[dateKey].total += Number(curr[valueKeys]) || 0;
      }
      acc[dateKey].count += 1;
      return acc;
    }, {});
    return Object.keys(stats).sort().reduce((obj: any, key) => { obj[key] = stats[key]; return obj; }, {});
  };

  const yieldSeries = useMemo(() => {
    const daily = aggregateData(milkYields, 'amount_liters');
    return [{
      name: 'Avg Liters/Day',
      data: Object.keys(daily).map(date => ({ x: new Date(date).getTime(), y: Number((daily[date].total / daily[date].count).toFixed(2)) }))
    }];
  }, [milkYields, selectedBreed]);

  const qualitySeries = useMemo(() => {
    const daily = aggregateData(milkQuality, ['fat_percentage', 'protein_percentage']);
    return [
      { name: 'Avg Fat %', data: Object.keys(daily).map(date => ({ x: new Date(date).getTime(), y: Number((daily[date].total[0] / daily[date].count).toFixed(2)) })) },
      { name: 'Avg Protein %', data: Object.keys(daily).map(date => ({ x: new Date(date).getTime(), y: Number((daily[date].total[1] / daily[date].count).toFixed(2)) })) }
    ];
  }, [milkQuality, selectedBreed]);

  const lactationDistribution = useMemo(() => {
    const stages = { 'Early (0-100d)': 0, 'Mid (100-200d)': 0, 'Late (200-305d)': 0, 'Overdue (>305d)': 0 };
    lactations.forEach(l => {
      if (selectedBreed !== 'All' && l.breed !== selectedBreed) return;
      if (l.end_date) return;
      const days = Math.floor((new Date().getTime() - new Date(l.start_date).getTime()) / (1000 * 60 * 60 * 24));
      if (days <= 100) stages['Early (0-100d)']++;
      else if (days <= 200) stages['Mid (100-200d)']++;
      else if (days <= 305) stages['Late (200-305d)']++;
      else stages['Overdue (>305d)']++;
    });
    return Object.keys(stages).map(key => ({ x: key, y: (stages as any)[key] }));
  }, [lactations, selectedBreed]);

  const handleDryOff = (id: number) => {
    if (window.confirm("Mark this animal as Dry?")) {
      dispatch(updateLactationPeriodDryOff({ id }));
    }
  };
  
  const filteredYields = milkYields.filter(r => selectedBreed === 'All' || r.breed === selectedBreed);
  const filteredQuality = milkQuality.filter(r => selectedBreed === 'All' || r.breed === selectedBreed);
  const filteredLactations = lactations.filter(r => selectedBreed === 'All' || r.breed === selectedBreed);

  return { 
    yieldSeries, qualitySeries, lactationDistribution,filteredQuality, 
    milkYields, milkQuality, lactations,filteredYields,filteredLactations, 
    loading, selectedBreed, setSelectedBreed,handleDryOff,history,tabValue,
    setTabValue
  };
};