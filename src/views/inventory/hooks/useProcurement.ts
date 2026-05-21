import { useEffect, useState, useMemo } from 'react';
import { useIonToast, useIonLoading } from '@ionic/react';
import api from '../../../services/api';
import { getProcurements } from '../../../redux/store/slices/inventorySlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';

export const useProcurement = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showToast] = useIonToast();
  const [presentLoading, dismissLoading] = useIonLoading();
  const { procurements: orders, loading } = useSelector((state: RootState) => state.inventory);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  // Self-contained triggering function
  const fetchOrders = () => {
    dispatch(getProcurements({ page: paginationModel.page + 1 }));
  };

  useEffect(() => {
    fetchOrders();
  }, [dispatch, paginationModel.page]);  

  // Read clean global aggregates directly from the paginated object shell metadata
  const stats = useMemo(() => {
    return orders?.stats || { totalSpent: 0, pendingValue: 0 };
  }, [orders?.stats]);

  const handleMarkAsSent = async (id: number) => {
    try {
      await api.patch(`procurement/${id}/`, { status: 'sent' });
      showToast({ message: 'PO marked as Sent', duration: 2000, color: 'success' });
      fetchOrders();
    } catch (err) {
      showToast({ message: 'Failed to update status', duration: 2000, color: 'danger' });
    }
  };

  const handleReceiveStock = async (id: number) => {
    try {
      await api.post(`procurement/${id}/receive_stock/`);
      showToast({ message: 'Stock added to inventory!', duration: 2000, color: 'success' });
      fetchOrders();
    } catch (err) {
      showToast({ message: 'Error receiving stock', duration: 2000, color: 'danger' });
    }
  };

  const handleBulkGenerate = async () => {
    await presentLoading({ message: 'Analyzing stock levels...', spinner: 'crescent' });
    try {
      const res = await api.post('procurement/bulk-generate/');
      showToast({ message: res.data.message, color: 'success', duration: 3000 });
      fetchOrders();
    } catch (err) {
      showToast({ message: 'Failed to auto-generate requests', color: 'danger', duration: 2000 });
    } finally {
      dismissLoading();
    }
  };

  return {
    orders: orders?.results || [], // Directly returns the domain collection array
    loading,
    stats,
    paginationModel,
    setPaginationModel,
    handleMarkAsSent,
    handleReceiveStock,
    handleBulkGenerate,
    refetch: fetchOrders
  };
};