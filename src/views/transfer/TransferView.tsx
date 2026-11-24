import React from 'react';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonIcon } from '@ionic/react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { addOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useTransferList } from './hooks/useTransferList';
import { getTransferColumns } from './components/TransferColumns';
import { TransferListGrid } from './components/TransferListGrid';

const TransferView: React.FC = () => {
  const history = useHistory();
  const { user } = useSelector((state: RootState) => state.auth); // Or your user state slice location
  const userRole = user?.profile?.role;


  const hook = useTransferList();

  const columns = getTransferColumns(userRole, {
    onDispatch: hook.handleDispatch,
    onEdit: (uuid) => history.push(`/operations/edit/${uuid}`),
    onDelete: (id) => hook.setDeleteTargetId(id),
  });

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start"><IonMenuButton /></IonButtons>
          <IonTitle style={{ fontWeight: 700 }}>Ownership Transfers</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1, mt: 1 }}>
            <Box>
              <Typography variant="body1" fontWeight="bold">Movement Logs</Typography>
              <Typography variant="body2" color="text.secondary">
                Manage sales, movements, and traditional transfers
              </Typography>
            </Box>

            <Button 
              variant="contained" 
              startIcon={<IonIcon icon={addOutline} />}
              onClick={() => history.push('/operations/add-transfer')}
              sx={{ 
                borderRadius: '4px', textTransform: 'none', fontWeight: 'bold', 
                bgcolor: '#18774c', '&:hover': { bgcolor: '#14633f' }
              }}
            >
              New Transfer
            </Button>
          </Stack>

      <TransferListGrid
        filteredTransfers={hook.transfers}
        rowCount={hook.totalRows}
        columns={columns}
        loading={hook.loading}
        searchQuery={hook.searchQuery}
        setSearchQuery={hook.setSearchQuery}
        deleteTargetId={hook.deleteTargetId}
        setDeleteTargetId={hook.setDeleteTargetId}
        handleDeleteConfirm={hook.handleDeleteConfirm} // Added missing callback property
        paginationModel={hook.paginationModel}
        onPaginationModelChange={hook.setPaginationModel}
      />
      </IonContent>
    </IonPage>
  );
};

export default TransferView;