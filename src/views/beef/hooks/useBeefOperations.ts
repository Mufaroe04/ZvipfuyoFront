// import { useState, useMemo, useEffect } from 'react';
// import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
// import { 
//   fetchWeights, 
//   fetchMarketPrices, 
//   updateMarketPrice,
//   addMarketPrice 
// } from '../../../redux/store/slices/operationsSlice';
// import { getBreedLabel } from '../../../constants/livestock';
// import { useHistory, useParams } from 'react-router-dom';
// import { getBeefTableColumns } from '../components/beefTableConfig';
// import { handleLoadMore } from '../../../utils/pagination';

// export const useBeefOperations = () => {
//   const dispatch = useAppDispatch();
//   const { weights, marketPrices, loading } = useAppSelector((state) => state.operations);
//   const { id } = useParams<{ id: string }>();
//   const { user } = useAppSelector((state) => state.auth);
//   const userRole = user?.profile?.role;
//   const history = useHistory();
//   const [tabValue, setTabValue] = useState(0);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedBreed, setSelectedBreed] = useState('All');
//   const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
//   const [paginationModel, setPaginationModel] = useState({
//     page: 0,
//     pageSize: 10,
//   });

//   useEffect(() => {
//     dispatch(fetchWeights({}));
//     dispatch(fetchMarketPrices());
//   }, [dispatch]);

//   // Tab 0: Growth Velocity Data
//   const growthSeries = useMemo(() => {
//     const dailyStats = weights.results.reduce((acc: any, curr) => {
//       if (selectedBreed !== 'All' && curr.breed !== selectedBreed) return acc;
//       const date = curr.date;
//       if (!acc[date]) acc[date] = { total: 0, count: 0 };
//       acc[date].total += curr.adg || 0;
//       acc[date].count += 1;
//       return acc;
//     }, {});

//     const sortedDates = Object.keys(dailyStats).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
//     return [{
//       name: `${selectedBreed === 'All' ? 'Herd' : getBreedLabel(selectedBreed)} ADG`,
//       data: sortedDates.map(d => ({ x: new Date(d).getTime(), y: (dailyStats[d].total / dailyStats[d].count).toFixed(2) }))
//     }];
//   }, [weights, selectedBreed]);

//   // Tab 1: Market Price Data
//   const marketSeries = useMemo(() => [{
//     name: 'Price per KG ($)',
//     data: marketPrices.results.map(p => ({ x: getBreedLabel(p.breed), y: p.price_per_kg }))
//   }], [marketPrices]);

//   // const filteredWeights = weights.filter(w => 
//   //   w.animal_tag.toLowerCase().includes(searchTerm.toLowerCase()) ||
//   //   getBreedLabel(w.breed).toLowerCase().includes(searchTerm.toLowerCase())
//   // );
//   // Note: weights is now an object, so we access weights.results
//   const filteredWeights = useMemo(() => {
//     return weights.results.filter(w => 
//       w.animal_tag.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//   }, [weights.results, searchTerm]);

//   const handleDelete= async () => {
//     // if (deleteTargetId) {
//     //   await dispatch(deleteAnimal(deleteTargetId)).unwrap();
//     //   setDeleteTargetId(null);
//     // }
//   }

// const loadMoreWeights = () => 
//     handleLoadMore(dispatch, fetchWeights, weights, loading);

//   const columns = useMemo(() => 
//     getBeefTableColumns(userRole, {
//       onView: (id) => history.push(`/weight/${id}`),
//       onEdit: (id) => history.push(`/weight/edit/${id}`),
//       onDelete: (id) => setDeleteTargetId(Number(id))
//     }), 
//     [history, userRole, setDeleteTargetId]
//   );
//   return {
//     weights: filteredWeights,
//     marketPrices,
//     growthSeries,
//     marketSeries,
//     loading,
//     tabValue,
//     setTabValue,
//     searchTerm,
//     setSearchTerm,
//     selectedBreed,
//     handleDelete,
//     setSelectedBreed,
//     columns,
//     actions: {
//       updatePrice: (id: number, price: number) => dispatch(updateMarketPrice({ id, price })),
//       addPrice: (data: any) => dispatch(addMarketPrice(data))
//     },
//     pagination: {
//       hasMore: !!weights.next,
//       total: weights.count,
//       loadMore: loadMoreWeights
//     },
//   };
// };

import { useState, useMemo, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { 
  fetchWeights, 
  fetchMarketPrices, 
  updateMarketPrice,
  addMarketPrice 
} from '../../../redux/store/slices/operationsSlice';
import { getBreedLabel } from '../../../constants/livestock';
import { useHistory, useParams } from 'react-router-dom';
import { getBeefTableColumns } from '../components/beefTableConfig';
import api from '../../../services/api';

export const useBeefOperations = () => {
  const dispatch = useAppDispatch();
  const { weights, marketPrices, loading } = useAppSelector((state) => state.operations);
  const { id } = useParams<{ id: string }>();
  const { user } = useAppSelector((state) => state.auth);
  const userRole = user?.profile?.role;
  const history = useHistory();

  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBreed, setSelectedBreed] = useState('All');
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const [analyticsData, setAnalyticsData] = useState([]);
  const [isChartLoading, setIsChartLoading] = useState(false);

  // --- Server-side Pagination State ---
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  // Fetch weights whenever the page changes
  useEffect(() => {
    // API pages are usually 1-indexed, DataGrid is 0-indexed
    dispatch(fetchWeights({ page: paginationModel.page + 1 }));
  }, [dispatch, paginationModel.page]);

  // Fetch market prices once on mount
  useEffect(() => {
    dispatch(fetchMarketPrices({ page: paginationModel.page + 1 }));
  }, [dispatch,paginationModel.page]);

  useEffect(() => {
  const fetchAnalytics = async () => {
    setIsChartLoading(true);
    try {
      // Replace with your actual API call logic
      const response = await api.get(`weights/growth/`, {
        params: { breed: selectedBreed }
      });
      setAnalyticsData(response.data);
    } catch (err) {
      console.error("Failed to fetch analytics", err);
    } finally {
      setIsChartLoading(false);
    }
  };

  fetchAnalytics();
}, [selectedBreed]);

  // // Tab 0: Growth Velocity Data
  // const growthSeries = useMemo(() => {
  //   const dailyStats = weights.results.reduce((acc: any, curr) => {
  //     if (selectedBreed !== 'All' && curr.breed !== selectedBreed) return acc;
  //     const date = curr.date;
  //     if (!acc[date]) acc[date] = { total: 0, count: 0 };
  //     acc[date].total += curr.adg || 0;
  //     acc[date].count += 1;
  //     return acc;
  //   }, {});

  //   const sortedDates = Object.keys(dailyStats).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
  //   return [{
  //     name: `${selectedBreed === 'All' ? 'Herd' : getBreedLabel(selectedBreed)} ADG`,
  //     data: sortedDates.map(d => ({ 
  //       x: new Date(d).getTime(), 
  //       y: Number((dailyStats[d].total / dailyStats[d].count).toFixed(2)) 
  //     }))
  //   }];
  // }, [weights.results, selectedBreed]);
  const growthSeries = useMemo(() => {
    if (!analyticsData || analyticsData.length === 0) return [{ name: 'ADG', data: [] }];

    return [{
      name: `${selectedBreed === 'All' ? 'Herd' : getBreedLabel(selectedBreed)} Avg Weight`,
      data: analyticsData.map(d => ({ 
        x: new Date(d.x).getTime(), 
        y: d.y 
      }))
    }];
  }, [analyticsData, selectedBreed]);

  // Tab 1: Market Price Data
  const marketSeries = useMemo(() => [{
    name: 'Price per KG ($)',
    data: marketPrices.results.map(p => ({ x: getBreedLabel(p.breed), y: p.price_per_kg }))
  }], [marketPrices.results]);

  const filteredWeights = useMemo(() => {
    return weights.results.filter(w => 
      w.animal_tag.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [weights.results, searchTerm]);

  const handleDelete = async () => {
    // Logic for deletion
  };

  const columns = useMemo(() => 
    getBeefTableColumns(userRole, {
      onView: (id) => history.push(`/weight/${id}`),
      onEdit: (id) => history.push(`/weight/edit/${id}`),
      onDelete: (id) => setDeleteTargetId(Number(id))
    }), 
    [history, userRole]
  );

  return {
    weights: filteredWeights,
    rowCount: weights.count, // Total count for the server-side footer
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
    handleDelete,
    columns,
    isChartLoading,
    paginationModel,
    setPaginationModel,
    actions: {
      updatePrice: (id: number, price: number) => dispatch(updateMarketPrice({ id, price })),
      addPrice: (data: any) => dispatch(addMarketPrice(data))
    }
  };
};