import React, { useEffect, useState } from 'react';
import { 
  IonPage, IonContent, IonGrid, IonRow, IonCol, IonButton, 
  IonSegment, IonSegmentButton, IonLabel, IonCard, IonCardContent 
} from '@ionic/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFinanceData } from '../redux/store/slices/financeSlice';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { DataGrid } from '@mui/x-data-grid'; // Assuming MUI for the DataGrid

const SalesPage: React.FC = () => {
  const dispatch = useDispatch();
  const { summary, milkSales, cattleSales, loading } = useSelector((state: any) => state.finance);
  const [view, setView] = useState<'milk' | 'cattle'>('milk');

  useEffect(() => { dispatch(fetchFinanceData()); }, [dispatch]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'date', headerName: 'Date', width: 150, valueGetter: (params: any) => params.row.transaction_details.date },
    { field: 'amount', headerName: 'Amount', width: 130, valueGetter: (params: any) => `${params.row.transaction_details.currency} ${params.row.transaction_details.amount}` },
    { field: 'buyer', headerName: 'Buyer', width: 200, valueGetter: (params: any) => params.row.buyer || params.row.buyer_name },
  ];

  return (
    <IonPage>
      <IonContent className="ion-padding">
        {/* TOP BANNER */}
        <IonGrid>
          <IonRow className="ion-align-items-center" style={{ background: '#f4f4f4', borderRadius: '12px', padding: '20px' }}>
            <IonCol size="8" className="ion-text-center">
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <div>
                  <h4 style={{ color: 'green' }}>Total Income</h4>
                  <h2>${summary.total_income_usd || 0}</h2>
                </div>
                <div>
                  <h4 style={{ color: 'red' }}>Total Expenses</h4>
                  <h2>${summary.total_expense_usd || 0}</h2>
                </div>
              </div>
            </IonCol>
            <IonCol size="4" className="ion-text-right">
              <IonButton color="primary">New Sale Entry</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* TABS / SEGMENTS */}
        <div style={{ marginTop: '20px' }}>
          <IonSegment value={view} onIonChange={e => setView(e.detail.value as any)}>
            <IonSegmentButton value="milk"><IonLabel>Milk Sales</IonLabel></IonSegmentButton>
            <IonSegmentButton value="cattle"><IonLabel>Beef Cattle Sales</IonLabel></IonSegmentButton>
          </IonSegment>
        </div>

        {/* GRAPH SECTION */}
        <IonCard>
          <IonCardContent>
            <div style={{ height: '300px', width: '100%' }}>
              <ResponsiveContainer>
                <BarChart data={view === 'milk' ? milkSales : cattleSales}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="id" /> {/* Replace with date for better logic */}
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="transaction_details.amount" fill="#3880ff" name="Income" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </IonCardContent>
        </IonCard>

        {/* DATA GRID */}
        <div style={{ height: 400, width: '100%', marginTop: '20px' }}>
          <DataGrid 
            rows={view === 'milk' ? milkSales : cattleSales} 
            columns={columns} 
            loading={loading}
            pageSize={5}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default SalesPage;