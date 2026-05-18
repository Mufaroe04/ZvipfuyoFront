import React from 'react';
import { useHealthyRecordsList } from '../hooks/useHealthyRecordsList';
import { Box, Button, Grid, Paper, Stack, Typography } from '@mui/material';
import { IonIcon } from '@ionic/react';
import { addOutline, cashOutline } from 'ionicons/icons';

interface Props{
  totalSpend:number
}
const ClinicalBanner:React.FC<Props>=({totalSpend})=>{

    const { history}=useHealthyRecordsList()
    return(
        <Box maxWidth="lg">
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1, mt: 1 }}>
            <Box>
              <Typography variant="body1" fontWeight="bold">Clinical Records</Typography>
              <Typography variant="body2" color="text.secondary">Tracking medical history and expenses</Typography>
            </Box>
            <Button 
              variant="contained" 
              startIcon={<IonIcon icon={addOutline} />}
              onClick={() => history.push("/health/add")}
              sx={{ borderRadius: '4px', bgcolor: '#18774c', '&:hover': { bgcolor: '#14633f' } }}
            >
              New Record
            </Button>
          </Stack>

          <Grid container sx={{ mb: 1 }}>
            <Grid item xs={12} md={4}>
              <Paper elevation={0} sx={{ p: 1, bgcolor: '#ffffff', borderRadius: '4px', border: '1px solid #ececec' }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box sx={{ p: 1, bgcolor: 'white', borderRadius: '4px', display: 'flex', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                    <IonIcon icon={cashOutline} style={{ fontSize: '1.5rem', color: '#18774c' }} />
                  </Box>
                  <Box>
                    <Typography variant="caption" fontWeight="bold" color="text.secondary">TOTAL HEALTH SPEND</Typography>
                    <Typography variant="h6" fontWeight="bold">${totalSpend.toLocaleString()}</Typography>
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          </Grid>

        </Box>
    )
}

export default ClinicalBanner;