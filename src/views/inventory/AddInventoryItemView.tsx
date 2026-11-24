import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonIcon } from '@ionic/react';
import { Container, IconButton } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { arrowBackOutline } from 'ionicons/icons';
import InventoryFormModal from './components/InventoryFormModal';

const AddInventoryItemView: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IconButton onClick={() => history.goBack()} sx={{ color: 'text.primary' }}>
              <IonIcon icon={arrowBackOutline} />
            </IconButton>
          </IonButtons>
          <IonTitle style={{ fontWeight: 700 }}>Add Stock</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <Container maxWidth="sm">
          <InventoryFormModal title="New Inventory Entry" />
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default AddInventoryItemView;