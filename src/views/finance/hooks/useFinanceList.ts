// src/views/finance/hooks/useFinanceList.ts
import { useState, useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { fetchFinanceData, updateExchangeRate } from '../../../redux/store/slices/financeSlice';
import { getMilkColumns, getCattleColumns, getExpenseColumns } from '../components/financeColumns';

export const useFinanceList = (paginationMode: 'client' | 'server' = 'server') => {
  const dispatch = useDispatch<AppDispatch>();
  const { summary, milkSales, cattleSales, expenses, loading } = useSelector((state: RootState) => state.finance);
  
  const [view, setView] = useState<'milk' | 'cattle' | 'expenses'>('milk');
  const [searchQuery, setSearchQuery] = useState('');
  const [openRateModal, setOpenRateModal] = useState<boolean>(false);
  const [newRate, setNewRate] = useState<string>("");
  const [submittingRate, setSubmittingRate] = useState<boolean>(false);
  
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  // Fetch data triggered by server-side page transformations
  useEffect(() => {
    if (paginationMode === 'server') {
      dispatch(fetchFinanceData({ page: paginationModel.page + 1, view }));
    }
  }, [dispatch, paginationModel.page, view, paginationMode]);

  const handleOpenRateModal = useCallback(() => {
    setNewRate(summary.current_zig_rate || "1.0000");
    setOpenRateModal(true);
  }, [summary.current_zig_rate]);

  const handleCloseRateModal = useCallback(() => {
    setOpenRateModal(false);
  }, []);

  const handleSaveRate = useCallback(async () => {
    if (!newRate || parseFloat(newRate) <= 0) return;
    setSubmittingRate(true);
    try {
      await dispatch(updateExchangeRate({ rate: newRate, page: paginationModel.page + 1 })).unwrap();
      handleCloseRateModal();
    } catch (err) {
      console.error("Error updating rate:", err);
    } finally {
      setSubmittingRate(false);
    }
  }, [newRate, paginationModel.page, dispatch, handleCloseRateModal]);

  // Dynamic domain target assessment
const activeDomainData = useMemo(() => {
    switch (view) {
      case 'cattle': return cattleSales?.results || [];
      // FIX: expenses is a flat array in Redux state, not a paginated object
      case 'expenses': return expenses || []; 
      case 'milk':
      default:
        return milkSales?.results || [];
    }
  }, [view, milkSales, cattleSales, expenses]);

  const rowCount = useMemo(() => {
    if (paginationMode !== 'server') return activeDomainData.length;
    switch (view) {
      case 'cattle': return cattleSales?.count || 0;
      // FIX: Access length directly since expenses is tracked as a flat slice from the transactions pool
      case 'expenses': return expenses?.length || 0; 
      case 'milk':
      default:
        return milkSales?.count || 0;
    }
  }, [paginationMode, view, milkSales, cattleSales, expenses, activeDomainData]);

  // Client-side quick filter matching reproduction pattern
  const filteredRows = useMemo(() => {
    if (!searchQuery.trim()) return activeDomainData;
    const lowerQuery = searchQuery.toLowerCase();
    
    return activeDomainData.filter((row: any) => {
      const buyer = (row.buyer || row.buyer_name || '');
      const ref = (row.reference_number || row.transaction_details?.reference_number || '');
      return buyer.toLowerCase().includes(lowerQuery) || ref.toLowerCase().includes(lowerQuery);
    });
  }, [activeDomainData, searchQuery]);

  const columns = useMemo(() => {
    switch (view) {
      case 'cattle': return getCattleColumns();
      case 'expenses': return getExpenseColumns();
      case 'milk':
      default:
        return getMilkColumns();
    }
  }, [view]);

  return {
    summary,
    loading,
    view,
    onViewChange: (newView: 'milk' | 'cattle' | 'expenses') => {
      setView(newView);
      setPaginationModel((prev) => ({ ...prev, page: 0 }));
    },
    columns,
    filteredRows,
    rowCount,
    searchQuery,
    setSearchQuery,
    paginationModel,
    onPaginationModelChange: setPaginationModel,
    openRateModal,
    newRate,
    setNewRate,
    submittingRate,
    handleOpenRateModal,
    handleCloseRateModal,
    handleSaveRate
  };
};