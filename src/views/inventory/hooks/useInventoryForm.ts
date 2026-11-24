import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { addInventoryItem, updateInventoryItem } from '../../../redux/store/slices/inventorySlice';
import { useIonLoading } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { Category, InventoryItem } from '../../../types/types';
import { fetchSuppliers } from '../../../redux/store/slices/supplierSlice';

// Enforce strict types down to your form boundaries
interface InventoryFormData {
  name: string;
  category: Category; // Updated from generic string to strong Domain enum/union
  quantity_on_hand: number;
  unit: string;
  reorder_level: number;
  preferred_supplier: number; // Storing the numeric primary key reference
}

export const useInventoryForm = (initialData?: InventoryItem | null) => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  const [present] = useIonLoading();

  const { suppliers } = useSelector((state: RootState) => state.suppliers);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  }); 

  const [formData, setFormData] = useState<InventoryFormData>({
    name: '',
    category: 'feed', // No type-casting/assertion required now
    quantity_on_hand: 0,
    unit: 'kg',
    reorder_level: 10,
    preferred_supplier: 0
  });

  useEffect(() => {
    dispatch(fetchSuppliers({ page: paginationModel.page + 1 }));
  }, [dispatch, paginationModel.page]);
  
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        category: initialData.category,
        quantity_on_hand: initialData.quantity_on_hand || 0,
        unit: initialData.unit || 'kg',
        reorder_level: initialData.reorder_level || 10,
        preferred_supplier: initialData?.preferred_supplier?.id || 0
      });
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await present('Saving changes...');
    
    // Convert form structure back into structural models expected by the API layer
    const payload: Partial<InventoryItem> & { preferred_supplier_id?: number | null } = {
      name: formData.name,
      category: formData.category,
      quantity_on_hand: formData.quantity_on_hand,
      unit: formData.unit,
      reorder_level: formData.reorder_level,
      // If preferred_supplier is 0/falsy, pass null or omit to match backend expectations
      preferred_supplier_id: formData.preferred_supplier > 0 ? formData.preferred_supplier : null
    };
    
    if (initialData?.id) {
      await dispatch(updateInventoryItem({ id: initialData.id, data: payload as any }));
    } else {
      await dispatch(addInventoryItem(payload as any));
    }
    
    history.goBack();
  };

  return {
    formData,
    setFormData,
    suppliers: suppliers?.results || [],
    setPaginationModel,
    handleSubmit,
    handleCancel: () => history.goBack()
  };
};