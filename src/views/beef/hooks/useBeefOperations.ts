import { useState, useMemo, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { 
  fetchWeights, 
  fetchMarketPrices, 
  updateMarketPrice,
  addMarketPrice 
} from '../../../redux/store/slices/operationsSlice';
import { getBreedLabel } from '../../../constants/livestock';

export const useBeefOperations = () => {
  const dispatch = useAppDispatch();
  const { weights, marketPrices, loading } = useAppSelector((state) => state.operations);
  
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBreed, setSelectedBreed] = useState('All');

  useEffect(() => {
    dispatch(fetchWeights());
    dispatch(fetchMarketPrices());
  }, [dispatch]);

  // Tab 0: Growth Velocity Data
  const growthSeries = useMemo(() => {
    const dailyStats = weights.reduce((acc: any, curr) => {
      if (selectedBreed !== 'All' && curr.breed !== selectedBreed) return acc;
      const date = curr.date;
      if (!acc[date]) acc[date] = { total: 0, count: 0 };
      acc[date].total += curr.adg || 0;
      acc[date].count += 1;
      return acc;
    }, {});

    const sortedDates = Object.keys(dailyStats).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    return [{
      name: `${selectedBreed === 'All' ? 'Herd' : getBreedLabel(selectedBreed)} ADG`,
      data: sortedDates.map(d => ({ x: new Date(d).getTime(), y: (dailyStats[d].total / dailyStats[d].count).toFixed(2) }))
    }];
  }, [weights, selectedBreed]);

  // Tab 1: Market Price Data
  const marketSeries = useMemo(() => [{
    name: 'Price per KG ($)',
    data: marketPrices.map(p => ({ x: getBreedLabel(p.breed), y: p.price_per_kg }))
  }], [marketPrices]);

  const filteredWeights = weights.filter(w => 
    w.animal_tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getBreedLabel(w.breed).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return {
    weights: filteredWeights,
    marketPrices,
    growthSeries,
    marketSeries,
    loading,
    tabValue,
    setTabValue,
    searchTerm,
    setSearchTerm,
    selectedBreed,
    setSelectedBreed,
    actions: {
      updatePrice: (id: number, price: number) => dispatch(updateMarketPrice({ id, price })),
      addPrice: (data: any) => dispatch(addMarketPrice(data))
    }
  };
};