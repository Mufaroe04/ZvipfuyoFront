// import React, { useState, useRef, useEffect } from 'react';
// import { 
//   Box, Typography, Button, Card, CardContent, 
//   TextField, MenuItem, Stack, Paper, Divider, 
//   Autocomplete, Checkbox 
// } from '@mui/material';
// import { ArrowBack, Print, CheckCircle } from '@mui/icons-material';
// import { useHistory } from 'react-router-dom';
// import { useReactToPrint } from 'react-to-print';
// import { useDispatch, useSelector } from 'react-redux';
// import { createMilkSale, createCattleSale } from '../redux/store/slices/financeSlice';
// import { fetchAllAnimals } from '../redux/store/slices/livestockSlice';
// import { AppDispatch, RootState } from '../redux/store';

// // A4 Print Wrapper Component
// const ReceiptContent = React.forwardRef<HTMLDivElement, { saleData: any; type: string }>((props, ref) => {
//   const { saleData, type } = props;
//   if (!saleData) return null;

//   return (
//     <Box ref={ref} sx={{ p: 5, bgcolor: 'white', color: 'black', width: '210mm', minHeight: '297mm', fontFamily: 'Inter, sans-serif' }}>
//       <Box textAlign="center" mb={4}>
//         <Typography variant="h5" fontWeight="900" sx={{ letterSpacing: 1 }}>ALITHEIA RANCH</Typography>
//         <Typography variant="body2" color="text.secondary">Official Sales Receipt / Tax Invoice</Typography>
//       </Box>

//       <Divider sx={{ my: 2 }} />

//       <Box display="flex" justifyContent="space-between" mb={4}>
//         <Box>
//           <Typography variant="caption" color="text.secondary" fontWeight="bold">CUSTOMER DETAILS</Typography>
//           <Typography variant="body1" fontWeight="bold">
//             {type === 'milk' ? saleData.buyer : saleData.buyer_name}
//           </Typography>
//         </Box>
//         <Box textAlign="right">
//           <Typography variant="caption" color="text.secondary" fontWeight="bold">INVOICE DETAILS</Typography>
//           <Typography variant="body2">Date: {saleData.date || new Date().toLocaleDateString()}</Typography>
//           <Typography variant="body2">Currency: {saleData.currency}</Typography>
//           {saleData.reference_number && (
//             <Typography variant="body2">Ref: {saleData.reference_number}</Typography>
//           )}
//         </Box>
//       </Box>

//       <Box sx={{ minHeight: 180 }}>
//         <Box display="flex" justifyContent="space-between" pb={1}>
//           <Typography variant="subtitle2" fontWeight="bold">Description</Typography>
//           <Typography variant="subtitle2" fontWeight="bold">Total ({saleData.currency})</Typography>
//         </Box>
//         <Divider sx={{ mb: 2 }} />

//         <Box display="flex" justifyContent="space-between" py={1}>
//           <Box>
//             {type === 'milk' ? (
//               <>
//                 <Typography variant="body1" fontWeight="bold">Milk Sale</Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   {saleData.liters_sold} liters @ {saleData.currency} {saleData.price_per_liter}/L
//                 </Typography>
//               </>
//             ) : (
//               <>
//                 <Typography variant="body1" fontWeight="bold">Cattle Sale</Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   {saleData.animals?.length} animals sold | Total Weight: {saleData.total_weight_kg}kg
//                 </Typography>
//               </>
//             )}
//           </Box>
//           <Typography variant="body1" fontWeight="bold" sx={{ mt: 1 }}>
//             {saleData.currency} {parseFloat(saleData.amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
//           </Typography>
//         </Box>
//       </Box>

//       <Box sx={{ mt: 8, borderTop: '1px dashed #ccc', pt: 3, textAlign: 'center' }}>
//         <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
//           Thank you for choosing Alitheia Ranch. All sales are final.
//         </Typography>
//       </Box>
//     </Box>
//   );
// });

// export const NewEntryForm: React.FC = () => {
//   const history = useHistory();
//   const dispatch = useDispatch<AppDispatch>();

//   const { animals } = useSelector((state: RootState) => state.livestock);

//   const [type, setType] = useState<'milk' | 'cattle' | null>(null);
//   const [isCompleted, setIsCompleted] = useState(false);
//   const [saleDetails, setSaleDetails] = useState<any>(null);

//   const printRef = useRef<HTMLDivElement>(null);
//   const handlePrint = useReactToPrint({ contentRef: printRef });

//   const [formData, setFormData] = useState({
//     date: new Date().toISOString().split('T')[0],
//     amount: '',
//     currency: 'USD',
//     payment_method: 'cash_usd',
//     buyer: '',
//     liters_sold: '',
//     price_per_liter: '',
//     total_weight_kg: '',
//     price_per_kg: '',
//     reference_number: ''
//   });

//   const [selectedAnimals, setSelectedAnimals] = useState<any[]>([]);

//   useEffect(() => {
//     dispatch(fetchAllAnimals());
//   }, [dispatch]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => {
//       const update = { ...prev, [name]: value };
//       if (type === 'milk' && (name === 'liters_sold' || name === 'price_per_liter')) {
//         const total = parseFloat(update.liters_sold || '0') * parseFloat(update.price_per_liter || '0');
//         update.amount = isNaN(total) ? '' : total.toFixed(2);
//       }
//       if (type === 'cattle' && (name === 'total_weight_kg' || name === 'price_per_kg')) {
//         const total = parseFloat(update.total_weight_kg || '0') * parseFloat(update.price_per_kg || '0');
//         update.amount = isNaN(total) ? '' : total.toFixed(2);
//       }
//       return update;
//     });
//   };

//   const handleLogSale = async (e: React.FormEvent) => {
//     e.preventDefault();

//     let payload: any = {
//       date: formData.date,
//       amount: parseFloat(formData.amount),
//       currency: formData.currency,
//       payment_method: formData.payment_method,
//       reference_number: formData.reference_number
//     };

//     try {
//       if (type === 'milk') {
//         payload = {
//           ...payload,
//           buyer: formData.buyer,
//           liters_sold: parseFloat(formData.liters_sold),
//           price_per_liter: parseFloat(formData.price_per_liter)
//         };
//         await dispatch(createMilkSale(payload)).unwrap();
//       } else {
//         payload = {
//           ...payload,
//           buyer_name: formData.buyer,
//           total_weight_kg: parseFloat(formData.total_weight_kg),
//           price_per_kg: parseFloat(formData.price_per_kg),
//           animals: selectedAnimals.map((a) => a.id)
//         };
//         await dispatch(createCattleSale(payload)).unwrap();
//       }

//       setSaleDetails(payload);
//       setIsCompleted(true);
//     } catch (err) {
//       console.error("Error creating sale entry:", err);
//     }
//   };

//   return (
//     <Box sx={{ flexGrow: 1, p: { xs: 1, md: 2 }, minHeight: '100%' }}>
//       <Stack spacing={4} alignItems="center">
//         {/* State 1: Choose Form Type */}
//         {!type && !isCompleted && (
//           <Card variant="outlined" sx={{ width: '100%', maxWidth: 650, borderRadius: 4, textAlign: 'center', p: 4, bgcolor: 'white' }}>
//             <Typography variant="h6" fontWeight="bold" gutterBottom>What type of entry are you creating?</Typography>
//             <Typography variant="body2" color="text.secondary" mb={4}>Select your sales stream to launch the corresponding form.</Typography>
//             <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
//               <Button variant="outlined" size="large" onClick={() => setType('milk')} sx={{ px: 5, py: 3, borderRadius: 3, borderWidth: 2, fontSize: '1.1rem' }}>
//                 🥛 Milk Sale
//               </Button>
//               <Button variant="outlined" size="large" onClick={() => setType('cattle')} sx={{ px: 5, py: 3, borderRadius: 3, borderWidth: 2, fontSize: '1.1rem' }}>
//                 🐂 Cattle Sale
//               </Button>
//             </Stack>
//           </Card>
//         )}

//         {/* State 2: Forms Section */}
//         {type && !isCompleted && (
//           <Card variant="outlined" sx={{ width: '100%', maxWidth: 650, borderRadius: 4, p: 2, bgcolor: 'white' }}>
//             <CardContent>
//               <Typography variant="h6" fontWeight="bold" mb={3}>
//                 Log {type === 'milk' ? 'Milk Volume' : 'Cattle/Livestock'} Sale
//               </Typography>
//               <form onSubmit={handleLogSale}>
//                 <Stack spacing={3}>
//                   <TextField fullWidth label="Date" type="date" name="date" value={formData.date} onChange={handleChange} InputLabelProps={{ shrink: true }} required />
                  
//                   <TextField fullWidth select label="Currency" name="currency" value={formData.currency} onChange={handleChange}>
//                     <MenuItem value="USD">USD</MenuItem>
//                     <MenuItem value="ZiG">ZiG</MenuItem>
//                   </TextField>

//                   {type === 'cattle' && (
//                     <Autocomplete
//                       multiple
//                       options={animals || []}
//                       getOptionLabel={(option) => `${option.tag_number || 'Tag'} (${option.name || 'Unnamed'})`}
//                       disableCloseOnSelect
//                       value={selectedAnimals}
//                       onChange={(_, newValue) => setSelectedAnimals(newValue)}
//                       renderOption={(props, option, { selected }) => (
//                         <li {...props}>
//                           <Checkbox checked={selected} style={{ marginRight: 8 }} />
//                           {option.tag_number} - {option.name || 'Unnamed Animal'}
//                         </li>
//                       )}
//                       renderInput={(params) => (
//                         <TextField {...params} label="Select Animals Sold" placeholder="Add Multiple Animals" required={selectedAnimals.length === 0} />
//                       )}
//                     />
//                   )}

//                   {type === 'milk' ? (
//                     <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
//                       <TextField fullWidth label="Liters Sold" name="liters_sold" type="number" value={formData.liters_sold} onChange={handleChange} required />
//                       <TextField fullWidth label="Price per Liter" name="price_per_liter" type="number" value={formData.price_per_liter} onChange={handleChange} required />
//                     </Stack>
//                   ) : (
//                     <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
//                       <TextField fullWidth label="Total Weight (kg)" name="total_weight_kg" type="number" value={formData.total_weight_kg} onChange={handleChange} required />
//                       <TextField fullWidth label="Price per kg" name="price_per_kg" type="number" value={formData.price_per_kg} onChange={handleChange} required />
//                     </Stack>
//                   )}

//                   <TextField fullWidth label="Calculated Total Amount" name="amount" value={formData.amount} onChange={handleChange} disabled required />
//                   <TextField fullWidth label="Buyer / Client" name="buyer" value={formData.buyer} onChange={handleChange} required />
                  
//                   <TextField fullWidth select label="Payment Method" name="payment_method" value={formData.payment_method} onChange={handleChange}>
//                     <MenuItem value="cash_usd">Cash (USD)</MenuItem>
//                     <MenuItem value="ecocash">EcoCash</MenuItem>
//                     <MenuItem value="bank_transfer">Bank Transfer</MenuItem>
//                   </TextField>
                  
//                   <TextField fullWidth label="Invoice / Receipt Number" name="reference_number" value={formData.reference_number} onChange={handleChange} placeholder="e.g. REC-1021" />
//                 </Stack>

//                 <Stack direction="row" spacing={2} mt={4} justifyContent="flex-end">
//                   <Button variant="text" color="inherit" onClick={() => setType(null)}>Cancel</Button>
//                   <Button variant="contained" color="success" type="submit" sx={{ borderRadius: 2, px: 4 }}>
//                     Record & Generate Receipt
//                   </Button>
//                 </Stack>
//               </form>
//             </CardContent>
//           </Card>
//         )}

//         {/* State 3: Receipt Preview/Print */}
//         {isCompleted && (
//           <Stack spacing={3} alignItems="center" sx={{ width: '100%', maxWidth: 800 }}>
//             <Paper variant="outlined" sx={{ p: 3, width: '100%', textAlign: 'center', bgcolor: '#e8f5e9', border: '1px solid #a5d6a7', borderRadius: 3 }}>
//               <CheckCircle color="success" sx={{ fontSize: 50, mb: 1 }} />
//               <Typography variant="h6" fontWeight="bold">Sale Successfully Recorded!</Typography>
//               <Typography variant="body2" color="text.secondary">Your ledger has been updated. You can print the customer receipt below.</Typography>
//             </Paper>

//             <Stack direction="row" spacing={2}>
//               <Button variant="contained" size="large" startIcon={<Print />} onClick={() => handlePrint?.()} sx={{ borderRadius: 2, px: 4 }}>
//                 Print Receipt
//               </Button>
//               <Button variant="outlined" size="large" onClick={() => history.replace('/sales-expenses')} sx={{ borderRadius: 2 }}>
//                 Return to Dashboard
//               </Button>
//             </Stack>

//             <Paper variant="outlined" sx={{ p: 1, mt: 2, borderRadius: 4, overflow: 'hidden', width: '210mm', bgcolor: 'white', border: '1px solid #e0e0e0' }}>
//               <ReceiptContent ref={printRef} saleData={saleDetails} type={type!} />
//             </Paper>
//           </Stack>
//         )}
//       </Stack>
//     </Box>
//   );
// };

// export default NewEntryForm;
import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, Typography, Button, Card, CardContent, 
  TextField, MenuItem, Stack, Paper, Divider, 
  Autocomplete, Checkbox 
} from '@mui/material';
import { ArrowBack, Print, CheckCircle } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { useDispatch, useSelector } from 'react-redux';
import { createMilkSale, createCattleSale } from '../redux/store/slices/financeSlice';
import { fetchAllAnimals } from '../redux/store/slices/livestockSlice';
import { AppDispatch, RootState } from '../redux/store';

// A4 Print Component reads the data returned directly from the Backend
const ReceiptContent = React.forwardRef<HTMLDivElement, { saleData: any; type: string }>((props, ref) => {
  const { saleData, type } = props;
  if (!saleData) return null;

  // Extract the nested transaction details returned from the backend
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
          {/* Extracted from the nested transaction data */}
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
          Thank you for choosing Alitheia Ranch. All sales are final.
        </Typography>
      </Box>
    </Box>
  );
});

export const NewEntryForm: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch<AppDispatch>();

  const { animals } = useSelector((state: RootState) => state.livestock);

  const [type, setType] = useState<'milk' | 'cattle' | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [saleDetails, setSaleDetails] = useState<any>(null);

  const printRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({ contentRef: printRef });

  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    amount: '',
    currency: 'USD',
    payment_method: 'cash_usd',
    buyer: '',
    liters_sold: '',
    price_per_liter: '',
    total_weight_kg: '',
    price_per_kg: '',
    description: '' // Optional internal description note
  });

  const [selectedAnimals, setSelectedAnimals] = useState<any[]>([]);

  useEffect(() => {
    dispatch(fetchAllAnimals());
  }, [dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const update = { ...prev, [name]: value };
      if (type === 'milk' && (name === 'liters_sold' || name === 'price_per_liter')) {
        const total = parseFloat(update.liters_sold || '0') * parseFloat(update.price_per_liter || '0');
        update.amount = isNaN(total) ? '' : total.toFixed(2);
      }
      if (type === 'cattle' && (name === 'total_weight_kg' || name === 'price_per_kg')) {
        const total = parseFloat(update.total_weight_kg || '0') * parseFloat(update.price_per_kg || '0');
        update.amount = isNaN(total) ? '' : total.toFixed(2);
      }
      return update;
    });
  };

  const handleLogSale = async (e: React.FormEvent) => {
    e.preventDefault();

    let payload: any = {
      date: formData.date,
      amount: parseFloat(formData.amount),
      currency: formData.currency,
      payment_method: formData.payment_method,
      description: formData.description
    };

    try {
      let response: any;

      if (type === 'milk') {
        payload = {
          ...payload,
          buyer: formData.buyer,
          liters_sold: parseFloat(formData.liters_sold),
          price_per_liter: parseFloat(formData.price_per_liter)
        };
        // Expecting unwrap() to return fully serialized data including backend-generated reference_number
        response = await dispatch(createMilkSale(payload)).unwrap();
      } else {
        payload = {
          ...payload,
          buyer_name: formData.buyer,
          total_weight_kg: parseFloat(formData.total_weight_kg),
          price_per_kg: parseFloat(formData.price_per_kg),
          animals: selectedAnimals.map((a) => a.id)
        };
        response = await dispatch(createCattleSale(payload)).unwrap();
      }

      // Populate our receipt viewer with exactly what the backend returned
      setSaleDetails(response);
      setIsCompleted(true);
    } catch (err) {
      console.error("Error creating sale entry:", err);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: { xs: 1, md: 2 }, minHeight: '100%' }}>
      <Stack spacing={4} alignItems="center">
        {/* State 1: Choose Transaction Type */}
        {!type && !isCompleted && (
          <Card variant="outlined" sx={{ width: '100%', maxWidth: 650, borderRadius: 4, textAlign: 'center', p: 4, bgcolor: 'white' }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>What type of entry are you creating?</Typography>
            <Typography variant="body2" color="text.secondary" mb={4}>Select your sales stream to launch the corresponding form.</Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} justifyContent="center">
              <Button variant="outlined" size="large" onClick={() => setType('milk')} sx={{ px: 5, py: 3, borderRadius: 3, borderWidth: 2, fontSize: '1.1rem' }}>
                🥛 Milk Sale
              </Button>
              <Button variant="outlined" size="large" onClick={() => setType('cattle')} sx={{ px: 5, py: 3, borderRadius: 3, borderWidth: 2, fontSize: '1.1rem' }}>
                🐂 Cattle Sale
              </Button>
            </Stack>
          </Card>
        )}

        {/* State 2: Input Data Form */}
        {type && !isCompleted && (
          <Card variant="outlined" sx={{ width: '100%', maxWidth: 650, borderRadius: 4, p: 2, bgcolor: 'white' }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                Log {type === 'milk' ? 'Milk Volume' : 'Cattle/Livestock'} Sale
              </Typography>
              <form onSubmit={handleLogSale}>
                <Stack spacing={3}>
                  <TextField fullWidth label="Date" type="date" name="date" value={formData.date} onChange={handleChange} InputLabelProps={{ shrink: true }} required />
                  
                  <TextField fullWidth select label="Currency" name="currency" value={formData.currency} onChange={handleChange}>
                    <MenuItem value="USD">USD</MenuItem>
                    <MenuItem value="ZiG">ZiG</MenuItem>
                  </TextField>

                  {type === 'cattle' && (
                    <Autocomplete
                      multiple
                      options={animals || []}
                      getOptionLabel={(option) => `${option.tag_number || 'Tag'} (${option.name || 'Unnamed'})`}
                      disableCloseOnSelect
                      value={selectedAnimals}
                      onChange={(_, newValue) => setSelectedAnimals(newValue)}
                      renderOption={(props, option, { selected }) => (
                        <li {...props}>
                          <Checkbox checked={selected} style={{ marginRight: 8 }} />
                          {option.tag_number} - {option.name || 'Unnamed Animal'}
                        </li>
                      )}
                      renderInput={(params) => (
                        <TextField {...params} label="Select Animals Sold" placeholder="Add Multiple Animals" required={selectedAnimals.length === 0} />
                      )}
                    />
                  )}

                  {type === 'milk' ? (
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <TextField fullWidth label="Liters Sold" name="liters_sold" type="number" value={formData.liters_sold} onChange={handleChange} required />
                      <TextField fullWidth label="Price per Liter" name="price_per_liter" type="number" value={formData.price_per_liter} onChange={handleChange} required />
                    </Stack>
                  ) : (
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                      <TextField fullWidth label="Total Weight (kg)" name="total_weight_kg" type="number" value={formData.total_weight_kg} onChange={handleChange} required />
                      <TextField fullWidth label="Price per kg" name="price_per_kg" type="number" value={formData.price_per_kg} onChange={handleChange} required />
                    </Stack>
                  )}

                  <TextField fullWidth label="Calculated Total Amount" name="amount" value={formData.amount} onChange={handleChange} disabled required />
                  <TextField fullWidth label="Buyer / Client" name="buyer" value={formData.buyer} onChange={handleChange} required />
                  
                  <TextField fullWidth select label="Payment Method" name="payment_method" value={formData.payment_method} onChange={handleChange}>
                    <MenuItem value="cash_usd">Cash (USD)</MenuItem>
                    <MenuItem value="ecocash">EcoCash</MenuItem>
                    <MenuItem value="bank_transfer">Bank Transfer</MenuItem>
                  </TextField>

                  <TextField fullWidth label="Internal Notes / Description" name="description" value={formData.description} onChange={handleChange} multiline rows={2} placeholder="Optional notes for internal logging" />
                </Stack>

                <Stack direction="row" spacing={2} mt={4} justifyContent="flex-end">
                  <Button variant="text" color="inherit" onClick={() => setType(null)}>Cancel</Button>
                  <Button variant="contained" color="success" type="submit" sx={{ borderRadius: 2, px: 4 }}>
                    Record & Generate Receipt
                  </Button>
                </Stack>
              </form>
            </CardContent>
          </Card>
        )}

        {/* State 3: Document Receipt Preview */}
        {isCompleted && (
          <Stack spacing={3} alignItems="center" sx={{ width: '100%', maxWidth: 800 }}>
            <Paper variant="outlined" sx={{ p: 3, width: '100%', textAlign: 'center', bgcolor: '#e8f5e9', border: '1px solid #a5d6a7', borderRadius: 3 }}>
              <CheckCircle color="success" sx={{ fontSize: 50, mb: 1 }} />
              <Typography variant="h6" fontWeight="bold">Sale Successfully Recorded!</Typography>
              <Typography variant="body2" color="text.secondary">The backend ledger transaction has been saved directly. You can now view and print the invoice.</Typography>
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

export default NewEntryForm;