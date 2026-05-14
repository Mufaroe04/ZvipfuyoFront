// import React from 'react';
// import { 
//   IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
//   IonButtons, IonMenuButton 
// } from '@ionic/react';
// import BeefTabContent from './components/BeefTabContent';

// const BeefOperations: React.FC = () => {

//   return (
//     <IonPage>
//       <IonHeader className="ion-no-border">
//         <IonToolbar style={{ '--background': '#ffffff' }}>
//           <IonButtons slot="start"><IonMenuButton /></IonButtons>
//           <IonTitle style={{ fontWeight: 900 }}>Beef Operations</IonTitle>
//         </IonToolbar>
//       </IonHeader>

//       <IonContent fullscreen style={{ '--background': '#f8faf9' }}>
//       <BeefTabContent/>
//       </IonContent>
//     </IonPage>
//   );
// };

// export default BeefOperations;

import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton } from '@ionic/react';
import { Container, Stack, Paper, Tab, Tabs,} from '@mui/material';
import { barChartOutline, pricetagOutline } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';

import { useBeefOperations } from './hooks/useBeefOperations';
import BeefGrowthChart from './components/BeefGrowthChart';
import BeefHerdGrid from './components/BeefHerdGrid';
import MarketConfigTable from './components/MarketConfigTable';
import MarketPriceChart from './components/MarketPriceChart';
import { LoadingSpinner } from '../../components/feedback/LoadingSpinner';

const BeefOperationsView: React.FC = () => {
const { 
    weights, rowCount, columns, marketPrices, growthSeries, marketSeries, loading, 
    tabValue, setTabValue, searchTerm, setSearchTerm, 
    selectedBreed, setSelectedBreed, actions,
    paginationModel, setPaginationModel ,isChartLoading
  } = useBeefOperations();

 if (loading && (!weights || weights.length === 0)) return <LoadingSpinner />;

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ '--background': '#ffffff' }}>
          <IonButtons slot="start"><IonMenuButton /></IonButtons>
          <IonTitle style={{ fontWeight: 700 }}>Beef Operations</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent style={{ '--background': '#f8faf9' }}>
        <Container maxWidth="xl" sx={{ py: 3 }}>
          <Paper sx={{ mb: 1, borderRadius: '4px', boxShadow: 'none', border: '1px solid #e0e0e0' }}>
            <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)} sx={{ px: 2 }}>
              <Tab icon={<IonIcon icon={barChartOutline} />} label="Herd Performance" iconPosition="start" />
              <Tab icon={<IonIcon icon={pricetagOutline} />} label="Market Configuration" iconPosition="start" />
            </Tabs>
          </Paper>

          {tabValue === 0 ? (
            <Stack spacing={4}>
              <BeefGrowthChart 
                series={growthSeries} 
                breed={selectedBreed} 
                onBreedChange={setSelectedBreed} 
                isLoading={isChartLoading}
              />
             <BeefHerdGrid 
                rows={weights}
                rowCount={rowCount}
                columns={columns}
                loading={loading}
                search={searchTerm} 
                onSearch={setSearchTerm} 
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
              />
            </Stack>
          ) : (
            <Stack spacing={4}>
              <MarketPriceChart series={marketSeries} />
              <MarketConfigTable 
                prices={marketPrices} 
                onUpdate={actions.updatePrice} 
                onAdd={actions.addPrice} 
              />
            </Stack>
          )}
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default BeefOperationsView;