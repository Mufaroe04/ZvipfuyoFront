import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { fetchStaff, addStaffMember, updateStaffMember } from '../../../redux/store/slices/staffSlice';
import { fetchAllHerds } from '../../../redux/store/slices/livestockSlice';
import { User } from '../../../types/types';

interface StaffFormData {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  phone_number: string;
  assigned_herds: number[];
}

const initialFormState: StaffFormData = {
  username: '',
  email: '',
  first_name: '',
  last_name: '',
  role: 'hand',
  phone_number: '',
  assigned_herds: [],
};

export const useStaffData = () => {
  const dispatch = useAppDispatch();
  const { members, loading } = useAppSelector((state: RootState) => state.staff);
  const { herds } = useAppSelector((state: RootState) => state.livestock);

  // Presentational State extracted from UI component
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [formData, setFormData] = useState<StaffFormData>(initialFormState);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  useEffect(() => {
    dispatch(fetchStaff({ page: paginationModel.page + 1 }));
    dispatch(fetchAllHerds({ page: paginationModel.page + 1 }));
  }, [dispatch,paginationModel.page]);

  // View Operational Control Actions
  const handleOpenAddMode = () => {
    setIsEditMode(false);
    setSelectedId(null);
    setFormData(initialFormState);
    setIsDialogOpen(true);
  };

  const handleOpenEditMode = (member: User) => {
    setIsEditMode(true);
    setSelectedId(member.id);
    setFormData({
      username: member.username,
      email: member.email,
      first_name: member.first_name,
      last_name: member.last_name,
      role: member.profile.role,
      phone_number: member.profile.phone_number || '',
      assigned_herds: member.profile.assigned_herds || [],
    });
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setFormData(initialFormState);
  };

  const handleFormChange = (updatedData: StaffFormData) => {
    setFormData(updatedData);
  };

const handleSubmitForm = () => {
    if (isEditMode && selectedId) {
      // Fix: Wrap the form payload inside the explicit data field
      dispatch(updateStaffMember({ id: selectedId, data: formData }));
    } else {
      dispatch(addStaffMember(formData));
    }
    setIsDialogOpen(false);
  };
const herdsArray = Array.isArray(herds) 
  ? herds 
  : (herds && typeof herds === 'object' && Array.isArray((herds as any).results))
    ? (herds as any).results
    : [];
  return {
    // Structural System State
    staff: members.results,
    herds:herdsArray,
    loading,

    // Dialog State Flags
    isDialogOpen,
    isEditMode,
    formData,

    // UI Event Handlers
    onOpenAddMode: handleOpenAddMode,
    onOpenEditMode: handleOpenEditMode,
    onCloseDialog: handleCloseDialog,
    onFormChange: handleFormChange,
    onSubmitForm: handleSubmitForm,
  };
};