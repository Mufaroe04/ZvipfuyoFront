import React from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  Box, 
  Typography, 
  Grid, 
  Divider, 
  Stack 
} from '@mui/material';
import { Print, Download, Receipt } from '@mui/icons-material';
import { FinanceSummary, MilkSale, CattleSale } from '../types/types';

interface ReceiptProps {
  open: boolean;
  onClose: () => void;
  sale: MilkSale | CattleSale | null;
  type: 'milk' | 'cattle';
  summary: FinanceSummary;
}

const SalesReceipt: React.FC<ReceiptProps> = ({ 
  open, onClose, sale, type, summary 
}) => {
  if (!sale) return null;

  const isMilk = type === 'milk';
  const milkSale = sale as MilkSale;
  const cattleSale = sale as CattleSale;
  
  const handlePrint = () => {
    window.print();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ bgcolor: '#fafafa', borderBottom: '1px solid #e0e0e0', pb: 2 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Receipt color={isMilk ? "success" : "primary"} />
          <Typography variant="h6" fontWeight="bold">
            {isMilk ? 'Milk Sales Receipt' : 'Cattle Sales Receipt'}
          </Typography>
        </Stack>
      </DialogTitle>
      
      <DialogContent dividers sx={{ p: 4, bgcolor: '#ffffff' }}>
        {/* Company Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" fontWeight="bold" color="text.primary">
            Ranch Operations Ledger
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Generated on {new Date().toLocaleDateString()}
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Transaction Details */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary" display="block">Receipt Number</Typography>
            <Typography variant="body2" fontWeight="bold">
              {sale.transaction_details?.reference_number || 'N/A'}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary" display="block">Date</Typography>
            <Typography variant="body2" fontWeight="bold">
              {sale.transaction_details?.date}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary" display="block">Payment Method</Typography>
            <Typography variant="body2" fontWeight="bold" sx={{ textTransform: 'capitalize' }}>
              {sale.transaction_details?.payment_method.replace('_', ' ')}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" color="text.secondary" display="block">Buyer/Market</Typography>
            <Typography variant="body2" fontWeight="bold">
              {isMilk ? milkSale.buyer : cattleSale.buyer_name}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Itemized Information */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Sale Information
          </Typography>
          
          {isMilk ? (
            <Stack spacing={1} sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Liters Sold</Typography>
                <Typography variant="body2" fontWeight="bold">{milkSale.liters_sold} L</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Price per Liter</Typography>
                <Typography variant="body2" fontWeight="bold">${milkSale.price_per_liter}</Typography>
              </Box>
            </Stack>
          ) : (
            <Stack spacing={1} sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Total Weight</Typography>
                <Typography variant="body2" fontWeight="bold">{cattleSale.total_weight_kg} kg</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Price per kg</Typography>
                <Typography variant="body2" fontWeight="bold">${cattleSale.price_per_kg}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2">Animal Count</Typography>
                <Typography variant="body2" fontWeight="bold">{cattleSale.animals?.length || 0} head</Typography>
              </Box>
            </Stack>
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Financial Summary */}
        <Box sx={{ bgcolor: '#f1f8e9', p: 2.5, borderRadius: 3, mt: 3 }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Typography variant="caption" color="text.secondary" display="block">
                Exchange Rate: 1 USD = {summary.current_zig_rate} ZiG
              </Typography>
              <Typography variant="subtitle2" sx={{ mt: 0.5 }}>
                LOCAL AMOUNT
              </Typography>
              <Typography variant="h6" fontWeight="bold" color="text.primary">
                {sale.transaction_details?.currency} {sale.transaction_details?.amount}
              </Typography>
            </Grid>
            
            <Grid item sx={{ textAlign: 'right' }}>
              <Typography variant="caption" color="success.main" fontWeight="bold">
                TOTAL VALUE
              </Typography>
              <Typography variant="h4" fontWeight="800" color="success.main">
                ${sale.transaction_details?.amount_in_usd?.toLocaleString()}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2.5, borderTop: '1px solid #e0e0e0' }}>
        <Button onClick={onClose} color="inherit" sx={{ textTransform: 'none' }}>
          Close
        </Button>
        <Button 
          variant="contained" 
          startIcon={<Print />} 
          onClick={handlePrint} 
          disableElevation
          sx={{ textTransform: 'none', borderRadius: 2 }}
        >
          Print Receipt
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SalesReceipt;