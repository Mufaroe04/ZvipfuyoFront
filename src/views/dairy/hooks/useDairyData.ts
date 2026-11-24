import { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { 
  fetchMilkYields, fetchMilkQuality, fetchLactationPeriods, 
  updateLactationPeriodDryOff
} from '../../../redux/store/slices/operationsSlice';
import { useHistory } from 'react-router-dom';
import api from '../../../services/api';

export const useDairyData = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [tabValue, setTabValue] = useState(0);
  const [selectedBreed, setSelectedBreed] = useState('All');
  
  // Dynamic state targets for our async backend analytics endpoints
  const [yieldAnalytics, setYieldAnalytics] = useState<any[]>([]);
  const [qualityAnalytics, setQualityAnalytics] = useState<any[]>([]);
  const [lactationAnalytics, setLactationAnalytics] = useState<any[]>([]);
  const [isChartLoading, setIsChartLoading] = useState(false);

  const { milkYields, milkQuality, lactations, loading } = useAppSelector((state) => state.operations);

  // --- Independent Pagination Management Models ---
  const [yieldPagination, setYieldPagination] = useState({ page: 0, pageSize: 10 });
  const [qualityPagination, setQualityPagination] = useState({ page: 0, pageSize: 10 });
  const [lactationPagination, setLactationPagination] = useState({ page: 0, pageSize: 10 });

  // --- Unified Fetch Trigger Blocks for Data Grid Views ---
  useEffect(() => {
    dispatch(fetchMilkYields({ page: yieldPagination.page + 1 }));
  }, [dispatch, yieldPagination.page]);

  useEffect(() => {
    dispatch(fetchMilkQuality({ page: qualityPagination.page + 1 }));
  }, [dispatch, qualityPagination.page]);

  useEffect(() => {
    dispatch(fetchLactationPeriods({ page: lactationPagination.page + 1 }));
  }, [dispatch, lactationPagination.page]);


  // --- Async Side Effects Fetching Analytics Data (Full Sets) ---
  useEffect(() => {
    const fetchDairyAnalytics = async () => {
      setIsChartLoading(true);
      try {
        const [yieldRes, qualityRes, lactationRes] = await Promise.all([
          api.get('milk-yields/analytics/', { params: { breed: selectedBreed } }),
          api.get('milk-quality/analytics/', { params: { breed: selectedBreed } }),
          api.get('lactations/analytics/', { params: { breed: selectedBreed } })
        ]);
        setYieldAnalytics(yieldRes.data);
        setQualityAnalytics(qualityRes.data);
        setLactationAnalytics(lactationRes.data);
      } catch (err) {
        console.error("Failed to recover unpaginated analytical data sets", err);
      } finally {
        setIsChartLoading(false);
      }
    };

    fetchDairyAnalytics();
  }, [selectedBreed]);


  // --- Series Chart Computations (Consuming Pure Backend Projections) ---
  const yieldSeries = useMemo(() => {
    if (!yieldAnalytics || yieldAnalytics.length === 0) return [{ name: 'Avg Liters/Day', data: [] }];
    return [{
      name: 'Avg Liters/Day',
      data: yieldAnalytics.map((d: any) => ({ x: new Date(d.x).getTime(), y: d.y }))
    }];
  }, [yieldAnalytics]);

  const qualitySeries = useMemo(() => {
    if (!qualityAnalytics || qualityAnalytics.length === 0) {
      return [
        { name: 'Avg Fat %', data: [] },
        { name: 'Avg Protein %', data: [] }
      ];
    }
    return [
      {
        name: 'Avg Fat %',
        data: qualityAnalytics.map((d: any) => ({ x: new Date(d.date).getTime(), y: d.avg_fat }))
      },
      {
        name: 'Avg Protein %',
        data: qualityAnalytics.map((d: any) => ({ x: new Date(d.date).getTime(), y: d.avg_protein }))
      }
    ];
  }, [qualityAnalytics]);

  const lactationDistribution = useMemo(() => {
    if (!lactationAnalytics || lactationAnalytics.length === 0) return [];
    // The server outputs the complete structure: array of objects containing keys {x, y}
    return lactationAnalytics;
  }, [lactationAnalytics]);


  // --- Interaction Actions ---
  const handleDryOff = (id: number) => {
    if (window.confirm("Mark this animal as Dry?")) {
      dispatch(updateLactationPeriodDryOff({ id }));
    }
  };
  
  // --- Presentational Data Filters ---
  const filteredYields = useMemo(() => {
    return (milkYields?.results || []).filter(r => selectedBreed === 'All' || r.breed === selectedBreed);
  }, [milkYields, selectedBreed]);

  const filteredQuality = useMemo(() => {
    return (milkQuality?.results || []).filter(r => selectedBreed === 'All' || r.breed === selectedBreed);
  }, [milkQuality, selectedBreed]);

  const filteredLactations = useMemo(() => {
    return (lactations?.results || []).filter(r => selectedBreed === 'All' || r.breed === selectedBreed);
  }, [lactations, selectedBreed]);

  return { 
    yieldSeries, 
    qualitySeries, 
    lactationDistribution,
    filteredQuality, 
    filteredYields,
    filteredLactations, 
    loading, 
    isChartLoading,
    selectedBreed, 
    setSelectedBreed,
    handleDryOff,
    history,
    tabValue, 
    setTabValue,
    milkYields,
    pagination: {
      yields: {
        model: yieldPagination,
        onChange: setYieldPagination,
        rowCount: milkYields?.count || 0
      },
      quality: {
        model: qualityPagination,
        onChange: setQualityPagination,
        rowCount: milkQuality?.count || 0
      },
      lactations: {
        model: lactationPagination,
        onChange: setLactationPagination,
        rowCount: lactations?.count || 0
      }
    }
  };
};