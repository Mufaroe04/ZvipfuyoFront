import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { fetchTransfers, dispatchTransferAction, deleteTransferAction } from '../../../redux/store/slices/logisticsSlice';
import { useIonLoading, useIonToast } from '@ionic/react';

export const useTransferList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [presentLoading, dismissLoading] = useIonLoading();
  const [presentToast] = useIonToast();

  const { transfers, loading } = useSelector((state: RootState) => state.logistics);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteTargetId, setDeleteTargetId] = useState<number | null>(null);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });

  useEffect(() => {
    // Django backend expects standard 1-based index paging configuration
    dispatch(fetchTransfers({ page: paginationModel.page + 1 }));
  }, [dispatch, paginationModel.page]);

  const handleDispatch = async (id: number) => {
    await presentLoading('Dispatching transit pipeline...');
    const result = await dispatch(dispatchTransferAction(id));
    await dismissLoading();

    if (dispatchTransferAction.fulfilled.match(result)) {
      presentToast({ message: 'Vehicle successfully dispatched.', duration: 2000, color: 'success' });
    } else {
      presentToast({ message: result.payload as string || 'Dispatch execution failed.', duration: 2000, color: 'danger' });
    }
  };

  const handleDeleteConfirm = async () => {
    if (deleteTargetId === null) return;
    const target = deleteTargetId;
    setDeleteTargetId(null);

    await presentLoading('Removing transfer manifest...');
    const result = await dispatch(deleteTransferAction(target));
    await dismissLoading();

    if (deleteTransferAction.fulfilled.match(result)) {
      presentToast({ message: 'Manifest erased.', duration: 2000, color: 'success' });
    } else {
      presentToast({ message: 'Failed to erase document record.', duration: 2000, color: 'danger' });
    }
  };

  const filteredTransfers = transfers.results.filter((t) => {
    const term = searchQuery.toLowerCase();
    return (
      (t.external_destination?.toLowerCase() || '').includes(term) ||
      (t.transfer_type?.toLowerCase() || '').includes(term) ||
      (t.status?.toLowerCase() || '').includes(term)
    );
  });

  return {
    transfers: filteredTransfers,
    totalRows: transfers.count,
    loading,
    searchQuery,
    setSearchQuery,
    deleteTargetId,
    setDeleteTargetId,
    paginationModel,
    setPaginationModel,
    handleDispatch,
    handleDeleteConfirm,
  };
};