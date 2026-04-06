import React, { useEffect } from 'react';
import { 
  IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, 
  IonTitle, IonToolbar, IonIcon, IonFab, IonFabButton, 
  useIonLoading, useIonToast 
} from '@ionic/react';
import { Container, Box, Typography, Paper, Chip, Button, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { addOutline, timeOutline, busOutline, documentTextOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store'; // Adjust paths as needed
import { fetchTransfers } from '../redux/store/slices/operationsSlice';
import { operationsService } from '../services/operationsService';

const Transfer: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();
  const [presentLoading, dismissLoading] = useIonLoading();
  const [presentToast] = useIonToast();

  // Connect to Redux state
  const { transfers, loading } = useSelector((state: RootState) => state.operations);

  useEffect(() => {
    dispatch(fetchTransfers());
  }, [dispatch]);

  const handleDispatch = async (id: number) => {
    await presentLoading('Dispatching vehicle...');
    try {
      await operationsService.dispatchTransfer(id);
      presentToast({ message: 'Transfer dispatched. Animals moved to quarantine.', duration: 2000, color: 'success' });
      dispatch(fetchTransfers()); // Refresh list
    } catch (err) {
      presentToast({ message: 'Dispatch failed.', duration: 2000, color: 'danger' });
    } finally {
      dismissLoading();
    }
  };

  const columns: GridColDef[] = [
    { 
      field: 'animal_tags', 
      headerName: 'Animals', 
      flex: 1, 
      renderCell: (params) => (
        <Typography variant="body2" sx={{ pt: 1.5 }}>
          {params.value?.join(', ') || 'N/A'}
        </Typography>
      )
    },
    { field: 'external_destination', headerName: 'Destination', flex: 1.2 },
    { 
        field: 'created_at', 
        headerName: 'Date', 
        flex: 1,
        valueFormatter: (params) => new Date(params.value).toLocaleDateString()
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      renderCell: (params) => {
        const statusColors: any = {
          completed: 'success',
          pending: 'warning',
          intransit: 'secondary',
          approved: 'info'
        };
        return (
          <Chip 
            label={params.value.toUpperCase()} 
            size="small"
            color={statusColors[params.value] || 'default'}
            variant="outlined"
            sx={{ fontWeight: '700', fontSize: '0.7rem' }}
          />
        );
      }
    },
    {
      field: 'actions',
      headerName: 'Logistics',
      flex: 1,
      sortable: false,
      renderCell: (params) => {
        // Only show dispatch button if approved and ready to move
        if (params.row.status === 'approved' || params.row.status === 'pending') {
          return (
            <Button
              size="small"
              variant="contained"
              color="primary"
              startIcon={<IonIcon icon={busOutline} />}
              onClick={() => handleDispatch(params.row.id)}
              sx={{ textTransform: 'none', borderRadius: '8px', mt: 1 }}
            >
              Dispatch
            </Button>
          );
        }
        return null;
      }
    },
    // Inside your columns array in Transfer.tsx
{
  field: 'print',
  headerName: 'Permit',
  width: 100,
  sortable: false,
  renderCell: (params) => (
    <IconButton 
      color="primary" 
      onClick={() => handlePrintPermit(params.row)}
      sx={{ mt: 0.5 }}
    >
      <IonIcon icon={documentTextOutline} />
    </IconButton>
  )
},
  ];
const handlePrintPermit = (transfer: any) => {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const html = `
    <html>
      <head>
        <title>Livestock Movement Permit - ${transfer.id}</title>
        <style>
          body { font-family: 'Helvetica', sans-serif; padding: 40px; color: #333; }
          .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 10px; }
          .section { margin-top: 20px; }
          .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
          .label { font-weight: bold; text-transform: uppercase; font-size: 12px; color: #666; }
          .value { font-size: 16px; margin-bottom: 10px; border-bottom: 1px solid #eee; }
          .animals { margin-top: 30px; width: 100%; border-collapse: collapse; }
          .animals th, .animals td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          .footer { margin-top: 50px; font-size: 10px; text-align: center; font-style: italic; }
          @media print { .no-print { display: none; } }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>ZVIPFUYO DIGITAL KRAAL</h1>
          <h3>Livestock Movement Manifest</h3>
          <p>Reference: TRF-${transfer.id}</p>
        </div>

        <div class="section grid">
          <div>
            <div class="label">From (Origin)</div>
            <div class="value">${transfer.from_herd_name}</div>
            
            <div class="label">Destination</div>
            <div class="value">${transfer.external_destination || transfer.to_herd_name}</div>
          </div>
          <div>
            <div class="label">Vet Permit Number</div>
            <div class="value">${transfer.vet_permit_number || 'N/A'}</div>
            
            <div class="label">Police Clearance Ref</div>
            <div class="value">${transfer.police_clearance_ref || 'N/A'}</div>
          </div>
        </div>

        <div class="section grid">
          <div>
            <div class="label">Driver Name</div>
            <div class="value">${transfer.driver_name || 'N/A'}</div>
          </div>
          <div>
            <div class="label">Vehicle Registration</div>
            <div class="value">${transfer.truck_reg_number || 'N/A'}</div>
          </div>
        </div>

        <div class="section">
          <div class="label">Animals Authorized for Movement</div>
          <table class="animals">
            <thead>
              <tr>
                <th>Item</th>
                <th>Tag Number</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              ${(transfer.animal_tags || []).map((tag: string, index: number) => `
                <tr>
                  <td>${index + 1}</td>
                  <td><strong>${tag}</strong></td>
                  <td>Bovine - Active</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div class="footer">
          <p>Generated on ${new Date().toLocaleString()}</p>
          <p>This document serves as a digital manifest for internal tracking and movement identification.</p>
        </div>

        <script>
          window.onload = function() { window.print(); window.close(); };
        </script>
      </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
};
  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Digital Kraal</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <Container maxWidth="lg">
          <Box sx={{ mb: 4, mt: 2 }}>
            <Typography variant="h4" fontWeight="800" gutterBottom>
              Ownership Transfers
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Manage movements, sales, and traditional transfers (Lobola/Feasting).
            </Typography>
          </Box>

          <Paper variant="outlined" sx={{ height: '60vh', width: '100%', borderRadius: '16px', overflow: 'hidden' }}>
            <DataGrid
              rows={transfers}
              columns={columns}
              loading={loading}
              initialState={{
                pagination: { paginationModel: { pageSize: 10 } },
              }}
              pageSizeOptions={[10]}
              disableRowSelectionOnClick
              sx={{
                border: 'none',
                '& .MuiDataGrid-columnHeaders': {
                  backgroundColor: '#f8f9fa',
                  fontWeight: 'bold',
                },
              }}
            />
          </Paper>
        </Container>

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => history.push('/operations/add-transfer')}>
            <IonIcon icon={addOutline} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Transfer;