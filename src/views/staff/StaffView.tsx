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