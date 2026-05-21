import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { fetchAllInventory, updateInventoryItem } from '../../../redux/store/slices/inventorySlice';
import { useIonLoading } from '@ionic/react';
import { InventoryItem } from '../../../types/types';

export const useInventoryList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [presentLoading, dismissLoading] = useIonLoading();
  const { items, loading } = useSelector((state: RootState) => state.inventory);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
    });
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  const [adjustAmount, setAdjustAmount] = useState<number>(0);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    dispatch(fetchAllInventory({page: paginationModel.page + 1}));
  }, [dispatch,paginationModel.page]);

  const handleOpenAdjust = (item: InventoryItem) => {
    setSelectedItem(item);
    setOpenModal(true);
  };

  const handleUpdateStock = async (type: 'add' | 'remove') => {
    if (!selectedItem) return;
    await presentLoading('Updating levels...');
    
    const change = type === 'add' ? adjustAmount : -adjustAmount;
    const newTotal = Number(selectedItem.quantity_on_hand) + change;
    
    await dispatch(updateInventoryItem({
      id: selectedItem.id,
      data: { 
        quantity_on_hand: newTotal,
        notes: notes || `${type === 'add' ? 'Added' : 'Used'} ${adjustAmount} ${selectedItem.unit}`
      }
    }));
    
    await dismissLoading();
    setOpenModal(false);
    setAdjustAmount(0);
    setNotes('');
  };

  return {
    items,
    rowCount:items.count,
    loading,
    openModal,
    setOpenModal,
    selectedItem,
    paginationModel,
    setPaginationModel,
    setAdjustAmount,
    setNotes,
    handleOpenAdjust,
    handleUpdateStock
  };
};