// src/views/finance/components/SalesForm.tsx

import React, { useRef } from 'react';
import {
  Box, Typography, Button, Card, CardContent,
  TextField, MenuItem, Stack, Paper, Divider
} from '@mui/material';
import { Print, CheckCircle } from '@mui/icons-material';
import { useReactToPrint } from 'react-to-print';
import { useSalesForm } from '../hooks/useSalesForm';
import { AsyncAnimalSelect } from '../../../components/search/AsyncAnimalSelect';

const ReceiptContent = React.forwardRef<HTMLDivElement, { saleData: any; type: string }>((props, ref) => {
  const { saleData, type } = props;
  if (!saleData) return null;

  const tx = saleData.transaction_details || {};

  return (
    <Box ref={ref} sx={{ p: 5, bgcolor: 'white', color: 'black', width: '210mm', minHeight: '297mm', fontFamily: 'Inter, sans-serif' }}>
      <Box textAlign="center" mb={4}>
        <Typography variant="h5" fontWeight="900" sx={{ letterSpacing: 1 }}>ALITHEIA RANCH</Typography>
        <Typography variant="body2" color="text.secondary">Official Sales Receipt / Tax Invoice</Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box display="flex" justifyContent="space-between" mb={4}>
        <Box>
          <Typography variant="caption" color="text.secondary" fontWeight="bold">CUSTOMER DETAILS</Typography>
          <Typography variant="body1" fontWeight="bold">
            {type === 'milk' ? saleData.buyer : saleData.buyer_name}
          </Typography>
        </Box>
        <Box textAlign="right">
          <Typography variant="caption" color="text.secondary" fontWeight="bold">INVOICE DETAILS</Typography>
          <Typography variant="body2">Date: {tx.date || new Date().toLocaleDateString()}</Typography>
          <Typography variant="body2">Currency: {tx.currency || 'USD'}</Typography>
          {tx.reference_number && (
            <Typography variant="body2" fontWeight="bold" color="primary">
              Ref: {tx.reference_number}
            </Typography>
          )}
        </Box>
      </Box>

      <Box sx={{ minHeight: 180 }}>
        <Box display="flex" justifyContent="space-between" pb={1}>
          <Typography variant="subtitle2" fontWeight="bold">Description</Typography>
          <Typography variant="subtitle2" fontWeight="bold">Total ({tx.currency || 'USD'})</Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />

        <Box display="flex" justifyContent="space-between" py={1}>
          <Box>
            {type === 'milk' ? (
              <>
                <Typography variant="body1" fontWeight="bold">Milk Sale</Typography>
                <Typography variant="body2" color="text.secondary">
                  {saleData.liters_sold} liters @ {tx.currency || 'USD'} {saleData.price_per_liter}/L
                </Typography>
              </>
            ) : (
              <>
                <Typography variant="body1" fontWeight="bold">Cattle Sale</Typography>
                <Typography variant="body2" color="text.secondary">
                  {saleData.animals?.length} animals sold | Total Weight: {saleData.total_weight_kg}kg
                </Typography>
              </>
            )}
          </Box>
          <Typography variant="body1" fontWeight="bold" sx={{ mt: 1 }}>
            {tx.currency || 'USD'} {parseFloat(tx.amount || '0').toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mt: 8, borderTop: '1px dashed #ccc', pt: 3, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
          Thank you for choosing Zvipfuyo Ranch. All sales are final.
        </Typography>
      </Box>
    </Box>
  );
});

interface SalesFormProps {
  editId?: string;
  initialData?: any;
}

export const SalesForm: React.FC<SalesFormProps> = ({ editId, initialData }) => {
  const {
    type,
    setType,
    formData,
    handleInputChange,
    selectedAnimals,
    setSelectedAnimals,
    isCompleted,
    saleDetails,
    isSubmitting,
    handleFormSubmit,
    resetFormState,
    history,
  } = useSalesForm({ initialType: initialData?.type || null, initialData, editId });

  const printRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({ contentRef: printRef });

  return (
    <Box sx={{ flexGrow: 1, p: { xs: 1, md: 2 }, minHeight: '100%' }}>
      <Stack spacing={4} alignItems="center">
        
        {/* Step 1: Mode Configuration */}
        {!type && !isCompleted && (
          <Card variant="outlined" sx={{ width: '100%', maxWidth: 650, borderRadius: 4, textAlign: 'center', p: 4, bgcolor: 'white' }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>What type of entry are you creating?</Typography>
            <Typography variant="body2" color="text.secondary" mb={4}>Select your sales stream to launch the corresponding form.</Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
              <Button variant="outlined" size="large" onClick={() => setType('milk')} sx={{ px: 5, py: 3, borderRadius: 3, borderWidth: 2, fontSize: '1.1rem' }}>
                 Milk Sale
              </Button>
              <Button variant="outlined" size="large" onClick={() => setType('cattle')} sx={{ px: 5, py: 3, borderRadius: 3, borderWidth: 2, fontSize: '1.1rem' }}>
                 Cattle Sale
              </Button>
            </Stack>
          </Card>
        )}

        {/* Step 2: Main Form Fields Layout */}
        {type && !isCompleted && (
          <Card variant="outlined" sx={{ width: '100%', maxWidth: 650, borderRadius: 4, p: 2, bgcolor: 'white' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                {editId ? 'Modify' : 'Log'} {type === 'milk' ? 'Milk Volume' : 'Cattle/Livestock'} Sale
              </Typography>
              <form onSubmit={handleFormSubmit}>
                <Stack spacing={3}>
                  <TextField 
                    fullWidth 
                    label="Date" 
                    type="date" 
                    name="date" 
                    value={formData.date} 
                    onChange={(e) => handleInputChange('date', e.target.value)} 
                    InputLabelProps={{ shrink: true }} 
                    required 
                  />
                  
                  <TextField 
                    fullWidth 
                    select 
                    label="Currency" 
                    name="currency" 
                    value={formData.currency} 
                    onChange={(e) => handleInputChange('currency', e.target.value)}
                  >
                    <MenuItem value="USD">USD</MenuItem>
                    <MenuItem value="ZiG">ZiG</MenuItem>
                  </TextField>

                  {type === 'cattle' && (
                    <AsyncAnimalSelect
                      multiple={true}
                      value={selectedAnimals} // Now correctly expects Animal[]
                      onChange={(val) => setSelectedAnimals(val)} // Receives Animal[]
                      label="Select Animals Sold"
                      required
                    /> 
                  )}

                  {type === 'milk' ? (
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <TextField 
                        fullWidth 
                        label="Liters Sold" 
                        name="liters_sold" 
                        type="number" 
                        value={formData.liters_sold} 
                        onChange={(e) => handleInputChange('liters_sold', e.target.value)} 
                        required 
                      />
                      <TextField 
                        fullWidth 
                        label="Price per Liter" 
                        name="price_per_liter" 
                        type="number" 
                        value={formData.price_per_liter} 
                        onChange={(e) => handleInputChange('price_per_liter', e.target.value)} 
                        required 
                      />
                    </Stack>
                  ) : (
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <TextField 
                        fullWidth 
                        label="Total Weight (kg)" 
                        name="total_weight_kg" 
                        type="number" 
                        value={formData.total_weight_kg} 
                        onChange={(e) => handleInputChange('total_weight_kg', e.target.value)} 
                        required 
                      />
                      <TextField 
                        fullWidth 
                        label="Price per kg" 
                        name="price_per_kg" 
                        type="number" 
                        value={formData.price_per_kg} 
                        onChange={(e) => handleInputChange('price_per_kg', e.target.value)} 
                        required 
                      />
                    </Stack>
                  )}

                  <TextField fullWidth label="Calculated Total Amount" name="amount" value={formData.amount} disabled required />
                  
                  <TextField 
                    fullWidth 
                    label="Buyer / Client" 
                    name="buyer" 
                    value={formData.buyer} 
                    onChange={(e) => handleInputChange('buyer', e.target.value)} 
                    required 
                  />
                  
                  <TextField 
                    fullWidth 
                    select 
                    label="Payment Method" 
                    name="payment_method" 
                    value={formData.payment_method} 
                    onChange={(e) => handleInputChange('payment_method', e.target.value)}
                  >
                    <MenuItem value="cash_usd">Cash (USD)</MenuItem>
                    <MenuItem value="ecocash">EcoCash</MenuItem>
                    <MenuItem value="bank_transfer">Bank Transfer</MenuItem>
                  </TextField>

                  <TextField 
                    fullWidth 
                    label="Internal Notes / Description" 
                    name="description" 
                    value={formData.description} 
                    onChange={(e) => handleInputChange('description', e.target.value)} 
                    multiline 
                    rows={2} 
                    placeholder="Optional notes for internal logging" 
                  />
                </Stack>

                <Stack direction="row" spacing={2} mt={4} justifyContent="flex-end">
                  {!editId && <Button variant="text" color="inherit" onClick={resetFormState}>Cancel</Button>}
                  <Button variant="contained" color="success" type="submit" disabled={isSubmitting} sx={{ borderRadius: 2, px: 4 }}>
                    {isSubmitting ? 'Saving...' : editId ? 'Update Record' : 'Record & Generate Receipt'}
                  </Button>
                </Stack>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Lifecycle Finalization Panel */}
        {isCompleted && (
          <Stack spacing={3} alignItems="center" sx={{ width: '100%', maxWidth: 800 }}>
            <Paper variant="outlined" sx={{ p: 3, width: '100%', textAlign: 'center', bgcolor: '#e8f5e9', border: '1px solid #a5d6a7', borderRadius: 3 }}>
              <CheckCircle color="success" sx={{ fontSize: 50, mb: 1 }} />
              <Typography variant="h6" fontWeight="bold">Sale Successfully Saved!</Typography>
              <Typography variant="body2" color="text.secondary">The backend ledger transaction has been finalized directly. You can now view or print the invoice document.</Typography>
            </Paper>

            <Stack direction="row" spacing={2}>
              <Button variant="contained" size="large" startIcon={<Print />} onClick={() => handlePrint?.()} sx={{ borderRadius: 2, px: 4 }}>
                Print Receipt
              </Button>
              <Button variant="outlined" size="large" onClick={() => history.replace('/sales-expenses')} sx={{ borderRadius: 2 }}>
                Return to Dashboard
              </Button>
            </Stack>

            <Paper variant="outlined" sx={{ p: 1, mt: 2, borderRadius: 4, overflow: 'hidden', width: '210mm', bgcolor: 'white', border: '1px solid #e0e0e0' }}>
              <ReceiptContent ref={printRef} saleData={saleDetails} type={type!} />
            </Paper>
          </Stack>
        )}
      </Stack>
    </Box>
  );
};

export default SalesForm;

