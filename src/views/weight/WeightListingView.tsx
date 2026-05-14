import React from 'react';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonIcon 
} from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import { Typography, Box, Stack, Button, Container } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useBeefOperations } from '../beef/hooks/useBeefOperations';
import { LoadingSpinner } from '../../components/feedback/LoadingSpinner';
import BeefHerdGrid from '../beef/components/BeefHerdGrid';

const WeightListingView: React.FC = () => {
  const history = useHistory();
const { 
    weights, rowCount, columns, loading, 
    searchTerm, setSearchTerm,
    paginationModel, setPaginationModel
  } = useBeefOperations();

  if (loading && (!weights || weights.length === 0)) {
    return <LoadingSpinner />;
  }

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start"><IonMenuButton /></IonButtons>
          <IonTitle style={{ fontWeight: 700 }}>Weight Logs</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4, mt: 2 }}>
            <Box>
              <Typography variant="body1" fontWeight="bold">Growth Monitor</Typography>
              <Typography variant="body2" color="text.secondary">Digital Kraal weight gain records</Typography>
            </Box>

            <Button 
              variant="contained" 
              startIcon={<IonIcon icon={addOutline} />}
              onClick={() => history.push("/weights/add")}
              sx={{ 
                borderRadius: '8px', 
                textTransform: 'none', 
                fontWeight: 'bold', 
                bgcolor: '#18774c',
                boxShadow: 'none',
                '&:hover': { bgcolor: '#14633f', boxShadow: 'none' }
              }}
            >
              New Weight
            </Button>
          </Stack>

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
      </IonContent>
    </IonPage>
  );
};

export default WeightListingView;