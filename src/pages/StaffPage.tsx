import React, { useEffect } from 'react';
import { IonContent, IonPage, IonLoading } from '@ionic/react';
import StaffManagementComponent from '../components/StaffManagementComponent';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { RootState } from '../redux/store';
import { addStaffMember, fetchStaff } from '../redux/store/slices/staffSlice';
import { fetchAllHerds } from '../redux/store/slices/livestockSlice';


const StaffPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { members, loading } = useAppSelector((state: RootState) => state.staff);
    const { herds } = useAppSelector((state: RootState) => state.livestock); // Already fetched

useEffect(() => {
  dispatch(fetchStaff());
  dispatch(fetchAllHerds()); // Ensure herds are available for the dropdown
}, [dispatch]);

const handleCreateStaff = (data: any) => {
  dispatch(addStaffMember(data));
};



  return (
    <IonPage>
      <IonContent style={{ '--background': '#fcfdfc' }}>
        <StaffManagementComponent 
          staff={members} 
          herds={herds} 
          onCreateStaff={handleCreateStaff}
          loading={loading}
        />
        <IonLoading isOpen={loading} message="Processing..." />
      </IonContent>
    </IonPage>
  );
};

export default StaffPage;