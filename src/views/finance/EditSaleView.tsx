// src/views/finance/EditSaleView.tsx

import React, { useEffect, useState } from 'react';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonBackButton
} from '@ionic/react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import SalesForm from './components/SalesForm';

const EditSaleView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [recordData, setRecordData] = useState<any>(null);
  
  // Reference existing storage vectors to retrieve historical details
  const { milkSales, cattleSales } = useSelector((state: RootState) => state.finance);

  useEffect(() => {
    if (id) {
      // Look for the specific transaction ID across both tables
      const milkMatch = milkSales?.results?.find((item: any) => item.id?.toString() === id);
      if (milkMatch) {
        setRecordData({ ...milkMatch, type: 'milk' });
        return;
      }

      const cattleMatch = cattleSales?.results?.find((item: any) => item.id?.toString() === id);
      if (cattleMatch) {
        setRecordData({ ...cattleMatch, type: 'cattle' });
      }
    }
  }, [id, milkSales, cattleSales]);

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/sales-expenses" />
            <IonMenuButton />
          </IonButtons>
          <IonTitle style={{ fontWeight: 700 }}>Edit Sale Transaction</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding" style={{ '--background': '#fafafa' }}>
        {recordData ? (
          <SalesForm editId={id} initialData={recordData} />
        ) : (
          <p style={{ padding: '16px', textAlign: 'center' }}>Loading transaction records...</p>
        )}
      </IonContent>
    </IonPage>
  );
};

export default EditSaleView;