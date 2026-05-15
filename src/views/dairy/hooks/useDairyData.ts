// import { useEffect, useMemo, useState } from 'react';
// import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
// import { 
//   fetchMilkYields, fetchMilkQuality, fetchLactationPeriods, 
//   updateLactationPeriodDryOff
// } from '../../../redux/store/slices/operationsSlice';
// import { useHistory } from 'react-router-dom';

// export const useDairyData = () => {
//   const dispatch = useAppDispatch();
//   const history = useHistory();
//   const [tabValue, setTabValue] = useState(0);
//   const [selectedBreed, setSelectedBreed] = useState('All');
//   const { milkYields, milkQuality, lactations, loading } = useAppSelector((state) => state.operations);

//   useEffect(() => {
//     dispatch(fetchMilkYields());
//     dispatch(fetchMilkQuality());
//     dispatch(fetchLactationPeriods());
//   }, [dispatch]);

//   const aggregateData = (data: any[], valueKeys: string | string[]) => {
//     const stats = data.reduce((acc: any, curr) => {
//       if (selectedBreed !== 'All' && curr.breed !== selectedBreed) return acc;
//       const dateKey = curr.date || curr.test_date || curr.start_date;
//       if (!dateKey) return acc;
//       if (!acc[dateKey]) {
//         acc[dateKey] = { total: Array.isArray(valueKeys) ? valueKeys.map(() => 0) : 0, count: 0 };
//       }
//       if (Array.isArray(valueKeys)) {
//         valueKeys.forEach((key, idx) => { acc[dateKey].total[idx] += Number(curr[key]) || 0; });
//       } else {
//         acc[dateKey].total += Number(curr[valueKeys]) || 0;
//       }
//       acc[dateKey].count += 1;
//       return acc;
//     }, {});
//     return Object.keys(stats).sort().reduce((obj: any, key) => { obj[key] = stats[key]; return obj; }, {});
//   };

//   const yieldSeries = useMemo(() => {
//     const daily = aggregateData(milkYields, 'amount_liters');
//     return [{
//       name: 'Avg Liters/Day',
//       data: Object.keys(daily).map(date => ({ x: new Date(date).getTime(), y: Number((daily[date].total / daily[date].count).toFixed(2)) }))
//     }];
//   }, [milkYields, selectedBreed]);

//   const qualitySeries = useMemo(() => {
//     const daily = aggregateData(milkQuality, ['fat_percentage', 'protein_percentage']);
//     return [
//       { name: 'Avg Fat %', data: Object.keys(daily).map(date => ({ x: new Date(date).getTime(), y: Number((daily[date].total[0] / daily[date].count).toFixed(2)) })) },
//       { name: 'Avg Protein %', data: Object.keys(daily).map(date => ({ x: new Date(date).getTime(), y: Number((daily[date].total[1] / daily[date].count).toFixed(2)) })) }
//     ];
//   }, [milkQuality, selectedBreed]);

//   const lactationDistribution = useMemo(() => {
//     const stages = { 'Early (0-100d)': 0, 'Mid (100-200d)': 0, 'Late (200-305d)': 0, 'Overdue (>305d)': 0 };
//     lactations.forEach(l => {
//       if (selectedBreed !== 'All' && l.breed !== selectedBreed) return;
//       if (l.end_date) return;
//       const days = Math.floor((new Date().getTime() - new Date(l.start_date).getTime()) / (1000 * 60 * 60 * 24));
//       if (days <= 100) stages['Early (0-100d)']++;
//       else if (days <= 200) stages['Mid (100-200d)']++;
//       else if (days <= 305) stages['Late (200-305d)']++;
//       else stages['Overdue (>305d)']++;
//     });
//     return Object.keys(stages).map(key => ({ x: key, y: (stages as any)[key] }));
//   }, [lactations, selectedBreed]);

//   const handleDryOff = (id: number) => {
//     if (window.confirm("Mark this animal as Dry?")) {
//       dispatch(updateLactationPeriodDryOff({ id }));
//     }
//   };
  
//   const filteredYields = milkYields.filter(r => selectedBreed === 'All' || r.breed === selectedBreed);
//   const filteredQuality = milkQuality.filter(r => selectedBreed === 'All' || r.breed === selectedBreed);
//   const filteredLactations = lactations.filter(r => selectedBreed === 'All' || r.breed === selectedBreed);

//   return { 
//     yieldSeries, qualitySeries, lactationDistribution,filteredQuality, 
//     milkYields, milkQuality, lactations,filteredYields,filteredLactations, 
//     loading, selectedBreed, setSelectedBreed,handleDryOff,history,tabValue,
//     setTabValue
//   };
// };

// import { useEffect, useMemo, useState } from 'react';
// import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
// import { 
//   fetchMilkYields, fetchMilkQuality, fetchLactationPeriods, 
//   updateLactationPeriodDryOff
// } from '../../../redux/store/slices/operationsSlice';
// import { useHistory } from 'react-router-dom';

// export const useDairyData = () => {
//   const dispatch = useAppDispatch();
//   const history = useHistory();
//   const [tabValue, setTabValue] = useState(0);
//   const [selectedBreed, setSelectedBreed] = useState('All');
  
//   // Extract state properties reflecting PaginatedResponse structures
//   const { milkYields, milkQuality, lactations, loading } = useAppSelector((state) => state.operations);

//   // --- Independent Pagination Management Models ---
//   const [yieldPagination, setYieldPagination] = useState({ page: 0, pageSize: 10 });
//   const [qualityPagination, setQualityPagination] = useState({ page: 0, pageSize: 10 });
//   const [lactationPagination, setLactationPagination] = useState({ page: 0, pageSize: 10 });

//   // --- Unified Fetch Trigger Blocks ---
//   useEffect(() => {
//     dispatch(fetchMilkYields({ page: yieldPagination.page + 1 }));
//   }, [dispatch, yieldPagination.page]);

//   useEffect(() => {
//     dispatch(fetchMilkQuality({ page: qualityPagination.page + 1 }));
//   }, [dispatch, qualityPagination.page]);

//   useEffect(() => {
//     dispatch(fetchLactationPeriods({ page: lactationPagination.page + 1 }));
//   }, [dispatch, lactationPagination.page]);


//   // --- Helper Data Extractor (Safe Extraction of .results) ---
//   const aggregateData = (dataArray: any[], valueKeys: string | string[]) => {
//     const stats = dataArray.reduce((acc: any, curr) => {
//       if (selectedBreed !== 'All' && curr.breed !== selectedBreed) return acc;
//       const dateKey = curr.date || curr.test_date || curr.start_date;
//       if (!dateKey) return acc;
//       if (!acc[dateKey]) {
//         acc[dateKey] = { total: Array.isArray(valueKeys) ? valueKeys.map(() => 0) : 0, count: 0 };
//       }
//       if (Array.isArray(valueKeys)) {
//         valueKeys.forEach((key, idx) => { acc[dateKey].total[idx] += Number(curr[key]) || 0; });
//       } else {
//         acc[dateKey].total += Number(curr[valueKeys]) || 0;
//       }
//       acc[dateKey].count += 1;
//       return acc;
//     }, {});
//     return Object.keys(stats).sort().reduce((obj: any, key) => { obj[key] = stats[key]; return obj; }, {});
//   };

//   // --- Series Chart Computations ---
//   const yieldSeries = useMemo(() => {
//     const rawResults = milkYields?.results || [];
//     const daily = aggregateData(rawResults, 'amount_liters');
//     return [{
//       name: 'Avg Liters/Day',
//       data: Object.keys(daily).map(date => ({ x: new Date(date).getTime(), y: Number((daily[date].total / daily[date].count).toFixed(2)) }))
//     }];
//   }, [milkYields, selectedBreed]);

//   const qualitySeries = useMemo(() => {
//     const rawResults = milkQuality?.results || [];
//     const daily = aggregateData(rawResults, ['fat_percentage', 'protein_percentage']);
//     return [
//       { name: 'Avg Fat %', data: Object.keys(daily).map(date => ({ x: new Date(date).getTime(), y: Number((daily[date].total[0] / daily[date].count).toFixed(2)) })) },
//       { name: 'Avg Protein %', data: Object.keys(daily).map(date => ({ x: new Date(date).getTime(), y: Number((daily[date].total[1] / daily[date].count).toFixed(2)) })) }
//     ];
//   }, [milkQuality, selectedBreed]);

//   const lactationDistribution = useMemo(() => {
//     const stages = { 'Early (0-100d)': 0, 'Mid (100-200d)': 0, 'Late (200-305d)': 0, 'Overdue (>305d)': 0 };
//     const rawResults = lactations?.results || [];
    
//     rawResults.forEach(l => {
//       if (selectedBreed !== 'All' && l.breed !== selectedBreed) return;
//       if (l.end_date) return;
//       const days = Math.floor((new Date().getTime() - new Date(l.start_date).getTime()) / (1000 * 60 * 60 * 24));
//       if (days <= 100) stages['Early (0-100d)']++;
//       else if (days <= 200) stages['Mid (100-200d)']++;
//       else if (days <= 305) stages['Late (200-305d)']++;
//       else stages['Overdue (>305d)']++;
//     });
//     return Object.keys(stages).map(key => ({ x: key, y: (stages as any)[key] }));
//   }, [lactations, selectedBreed]);

//   // --- Interaction Actions ---
//   const handleDryOff = (id: number) => {
//     if (window.confirm("Mark this animal as Dry?")) {
//       dispatch(updateLactationPeriodDryOff({ id }));
//     }
//   };
  
//   // --- Presentational Data Filters (Safe Fallbacks Included) ---
//   const filteredYields = useMemo(() => {
//     return (milkYields?.results || []).filter(r => selectedBreed === 'All' || r.breed === selectedBreed);
//   }, [milkYields, selectedBreed]);

//   const filteredQuality = useMemo(() => {
//     return (milkQuality?.results || []).filter(r => selectedBreed === 'All' || r.breed === selectedBreed);
//   }, [milkQuality, selectedBreed]);

//   const filteredLactations = useMemo(() => {
//     return (lactations?.results || []).filter(r => selectedBreed === 'All' || r.breed === selectedBreed);
//   }, [lactations, selectedBreed]);

//   return { 
//     yieldSeries, 
//     qualitySeries, 
//     lactationDistribution,
//     filteredQuality, 
//     filteredYields,
//     filteredLactations, 
//     loading, 
//     selectedBreed, 
//     setSelectedBreed,
//     handleDryOff,
//     history,
//     tabValue, 
//     setTabValue,
//     milkYields,
//     // Expose Pagination configurations safely to feed Material UI DataGrids
//     pagination: {
//       yields: {
//         model: yieldPagination,
//         onChange: setYieldPagination,
//         rowCount: milkYields?.count || 0
//       },
//       quality: {
//         model: qualityPagination,
//         onChange: setQualityPagination,
//         rowCount: milkQuality?.count || 0
//       },
//       lactations: {
//         model: lactationPagination,
//         onChange: setLactationPagination,
//         rowCount: lactations?.count || 0
//       }
//     }
//   };
// };

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