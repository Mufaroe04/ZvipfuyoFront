import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIonToast, useIonLoading } from '@ionic/react';
import { AppDispatch, RootState } from '../../../redux/store';
import { fetchSuppliers, addSupplier } from '../../../redux/store/slices/supplierSlice';

export const useSuppliers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showToast] = useIonToast();
  const [presentLoading, dismissLoading] = useIonLoading();
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
    });

  const { suppliers, loading } = useSelector((state: RootState) => state.suppliers);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', location: '', email: '', contact_person: '' });

  useEffect(() => {
    dispatch(fetchSuppliers({page: paginationModel.page + 1}));
  }, [dispatch,paginationModel.page]);

  const handleRegisterSupplier = async (e: React.FormEvent) => {
    e.preventDefault();
    await presentLoading('Registering partner...');
    try {
      await dispatch(addSupplier(formData)).unwrap();
      showToast({ message: 'Supplier registered successfully', color: 'success', duration: 2000 });
      setOpenModal(false);
      setFormData({ name: '', phone: '', location: '', email: '', contact_person: '' });
    } catch (err) {
      showToast({ message: 'Error saving supplier', color: 'danger', duration: 2000 });
    } finally {
      dismissLoading();
    }
  };

  return {
    suppliers:suppliers.results,
    loading,
    openModal,
    setOpenModal,
    formData,
    setFormData,
    handleRegisterSupplier
  };
};