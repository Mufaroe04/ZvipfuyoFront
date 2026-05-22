// import React, { useEffect } from 'react';
// import { IonContent, IonPage, IonLoading, IonButtons, IonToolbar, IonHeader, IonMenuButton, IonTitle } from '@ionic/react';
// import StaffManagementList from './components/StaffManagementList';
// import { useAppDispatch, useAppSelector } from '../../redux/hooks';
// import { RootState } from '../../redux/store';
// import { addStaffMember, fetchStaff, updateStaffMember } from '../../redux/store/slices/staffSlice';
// import { fetchAllHerds } from '../../redux/store/slices/livestockSlice';


// const StaffView: React.FC = () => {
//     const dispatch = useAppDispatch();
//     const { members, loading } = useAppSelector((state: RootState) => state.staff);
//     const { herds } = useAppSelector((state: RootState) => state.livestock); // Already fetched

// useEffect(() => {
//   dispatch(fetchStaff());
//   dispatch(fetchAllHerds()); // Ensure herds are available for the dropdown
// }, [dispatch]);

// const handleCreateStaff = (data: any) => {
//   dispatch(addStaffMember(data));
// };

// const handleEditStaff = (data: any) => {
//   dispatch(updateStaffMember(data));
// };

 

//   return (
//     <IonPage>
//             <IonHeader className="ion-no-border">
//               <IonToolbar>
//                 <IonButtons slot="start">
//                   {/* The missing piece of the puzzle! */}
//                   <IonMenuButton />
//                 </IonButtons>
//                 <IonTitle>Staff Management</IonTitle>
//               </IonToolbar>
//             </IonHeader>
//       <IonContent style={{ '--background': '#fcfdfc' }}>
//         <StaffManagementList 
//           staff={members} 
//           herds={herds} 
//           onCreateStaff={handleCreateStaff}
//           onUpdateStaff={handleEditStaff}
//           loading={loading}
//         />
//         <IonLoading isOpen={loading} message="Processing..." />
//       </IonContent>
//     </IonPage>
//   );
// };

// export default StaffView;
import React from 'react';
import { IonContent, IonPage, IonLoading, IonButtons, IonToolbar, IonHeader, IonMenuButton, IonTitle } from '@ionic/react';
import StaffManagementList from './components/StaffManagementList';
import { useStaffData } from './hooks/useStaffData';

const StaffView: React.FC = () => {
  const { 
    staff, 
    herds, 
    loading, 
    isDialogOpen,
    isEditMode,
    formData,
    onOpenAddMode,
    onOpenEditMode,
    onCloseDialog,
    onFormChange,
    onSubmitForm
  } = useStaffData();

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle style={{ fontWeight: 700 }}>Staff Management</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent style={{ '--background': '#fcfdfc' }}>
        <StaffManagementList 
          staff={staff} 
          herds={herds} 
          loading={loading}
          isDialogOpen={isDialogOpen}
          isEditMode={isEditMode}
          formData={formData}
          onOpenAddMode={onOpenAddMode}
          onOpenEditMode={onOpenEditMode}
          onCloseDialog={onCloseDialog}
          onFormChange={onFormChange}
          onSubmitForm={onSubmitForm}
        />
        <IonLoading isOpen={loading} message="Processing..." />
      </IonContent>
    </IonPage>
  );
};

export default StaffView;