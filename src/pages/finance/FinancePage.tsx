import React, { useEffect, useState } from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle } from '@ionic/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFinanceData } from '../../redux/store/slices/financeSlice';
import { AppDispatch, RootState } from '../../redux/store';
import FinanceDashboard from '../../components/FinanceDashboard';
const FinancePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { summary, milkSales, cattleSales, expenses, loading } = useSelector((state: RootState) => state.finance);
  const [view, setView] = useState<'milk' | 'cattle' | 'expenses'>('milk');

  useEffect(() => {
    dispatch(fetchFinanceData());
  }, [dispatch]);

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Sales and Finances Management</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding gray-bg">
        <FinanceDashboard 
          summary={summary}
          milkSales={milkSales}
          cattleSales={cattleSales}
          expenses={expenses} // Passing the filtered expenses
          loading={loading}
          view={view}
          onViewChange={(v) => setView(v)}
        />
      </IonContent>
    </IonPage>
  );
};
export default FinancePage;