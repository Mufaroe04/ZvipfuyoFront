import React, { useEffect, useState } from 'react';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonButtons, IonMenuButton, IonIcon, useIonToast, useIonLoading 
} from '@ionic/react';
import { Container, Box, Typography, Paper, Button, Stack, Chip, Card, CardContent } from '@mui/material';
import { cartOutline, printOutline, checkmarkCircleOutline, timeOutline, sparklesOutline,logoWhatsapp, } from 'ionicons/icons';
import api from '../services/api';
import { sendOrderToWhatsApp } from '../utils/whatsappUtils'; // Import the new utility
import { generatePurchasePDF } from '../utils/printUtils';

const Procurement: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // FIXED: Renamed toast 'present' to 'showToast' to avoid conflict with loading 'present'
  const [showToast] = useIonToast();
  const [presentLoading, dismissLoading] = useIonLoading();
  
  const [stats, setStats] = useState({ totalSpent: 0, pendingValue: 0 });

  useEffect(() => {
    if (orders.length > 0) {
      const spent = orders
        .filter(o => o.status === 'received')
        .reduce((acc, curr) => acc + parseFloat(curr.estimated_cost || 0), 0);
      
      const pending = orders
        .filter(o => o.status !== 'received')
        .reduce((acc, curr) => acc + parseFloat(curr.estimated_cost || 0), 0);
      
      setStats({ totalSpent: spent, pendingValue: pending });
    }
  }, [orders]);

  const fetchOrders = async () => {
    try {
      const res = await api.get('procurement/');
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching POs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleMarkAsSent = async (id: number) => {
    try {
      await api.patch(`procurement/${id}/`, { status: 'sent' });
      showToast({ message: 'PO marked as Sent to Supplier', duration: 2000, color: 'success' });
      fetchOrders();
    } catch (err) {
      showToast({ message: 'Failed to update status', duration: 2000, color: 'danger' });
    }
  };

  const handleReceiveStock = async (id: number) => {
    try {
      await api.post(`procurement/${id}/receive_stock/`);
      showToast({ message: 'Stock added to inventory!', duration: 2000, color: 'success' });
      fetchOrders(); 
    } catch (err) {
      showToast({ message: 'Error receiving stock', duration: 2000, color: 'danger' });
    }
  };

  const handleBulkGenerate = async () => {
    // FIXED: Use the loading hook correctly
    await presentLoading({
      message: 'Analyzing stock levels & generating drafts...',
      spinner: 'crescent'
    });

    try {
      const res = await api.post('procurement/bulk-generate/');
      // FIXED: use showToast instead of presentToast
      showToast({ 
        message: res.data.message, 
        color: 'success', 
        duration: 3000 
      });
      fetchOrders(); 
    } catch (err) {
      showToast({ message: 'Failed to auto-generate orders', color: 'danger' });
    } finally {
      dismissLoading();
    }
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start"><IonMenuButton /></IonButtons>
          <IonTitle>Procurement Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <Container maxWidth="lg">
          <Box sx={{ mb: 4, mt: 2 }}>
            <Typography variant="h4" fontWeight="800" color="primary">Supply Chain</Typography>
            <Typography variant="body1" color="text.secondary">Review and approve automated stock requisitions.</Typography>
          </Box>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
            <Paper sx={{ p: 2, flex: 1, bgcolor: 'primary.main', color: 'white', borderRadius: '16px' }}>
              <Typography variant="overline" sx={{ opacity: 0.8 }}>Total Procurement (Last 3 Months)</Typography>
              <Typography variant="h4" fontWeight="bold">${stats.totalSpent.toLocaleString()}</Typography>
            </Paper>

            <Paper sx={{ p: 2, flex: 1, bgcolor: '#fff', border: '1px solid #e0e0e0', borderRadius: '16px' }}>
              <Typography variant="overline" color="text.secondary">Committed / Pending Orders</Typography>
              <Typography variant="h4" fontWeight="bold" color="warning.main">${stats.pendingValue.toLocaleString()}</Typography>
            </Paper>
          </Stack>

          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5" fontWeight="bold">Active Requisitions</Typography>
            <Button 
              variant="contained" 
              color="secondary" 
              startIcon={<IonIcon icon={sparklesOutline} />}
              onClick={handleBulkGenerate}
              sx={{ borderRadius: '12px', textTransform: 'none', px: 3 }}
            >
              Auto-Generate Drafts
            </Button>
          </Box>

          <Stack spacing={2}>
            {orders.length === 0 && !loading && (
              <Paper variant="outlined" sx={{ p: 4, textAlign: 'center', borderRadius: '16px' }}>
                <Typography color="text.secondary">No pending purchase orders. Stock levels are healthy.</Typography>
              </Paper>
            )}

            {orders.map((po) => (
              <Card key={po.id} variant="outlined" sx={{ borderRadius: '16px', borderLeft: po.status === 'draft' ? '6px solid #ffc409' : '6px solid #2dd36f' }}>
                <CardContent>
                  <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center">
                    <Box>
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                        <Typography variant="h6" fontWeight="700">{po.item_name}</Typography>
                        <Chip 
                          label={po.status.toUpperCase()} 
                          size="small" 
                          color={po.status === 'draft' ? "warning" : "success"} 
                          icon={<IonIcon icon={po.status === 'draft' ? timeOutline : checkmarkCircleOutline} />}
                        />
                      </Stack>
                      <Typography variant="body2" color="text.secondary">
                        Suggested Order: <strong>{po.order_quantity} Units</strong> | Est. Cost: ${po.estimated_cost}
                      </Typography>
                    </Box>

                    <Stack direction="row" spacing={1} sx={{ mt: { xs: 2, sm: 0 } }}>
                        <Button 
                        variant="outlined" 
                        color="success"
                        startIcon={<IonIcon icon={logoWhatsapp} />}
                        onClick={() => sendOrderToWhatsApp(po)}
                        sx={{ borderRadius: '10px', borderColor: '#25D366', color: '#25D366' }}
                        >
                            WhatsApp
                        </Button>
                      <Button 
                        variant="outlined" 
                        startIcon={<IonIcon icon={printOutline} />}
                        onClick={() => generatePurchasePDF(po)}
                        sx={{ borderRadius: '10px' }}
                      >
                        Print PDF
                      </Button>
                      {po.status === 'draft' && (
                        <Button 
                          variant="contained" 
                          color="primary"
                          startIcon={<IonIcon icon={cartOutline} />}
                          onClick={() => handleMarkAsSent(po.id)}
                          sx={{ borderRadius: '10px' }}
                        >
                          Confirm Order
                        </Button>
                      )}
                      {po.status === 'sent' && (
                        <Button 
                          variant="contained" 
                          color="success"
                          startIcon={<IonIcon icon={checkmarkCircleOutline} />}
                          onClick={() => handleReceiveStock(po.id)}
                          sx={{ borderRadius: '10px' }}
                        >
                          Receive Stock
                        </Button>
                      )}
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default Procurement;