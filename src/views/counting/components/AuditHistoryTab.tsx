import React from 'react';
import { Box, Typography, Paper, Stack, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Chip } from '@mui/material';
import { IonIcon } from '@ionic/react';
import { trendingDownOutline } from 'ionicons/icons';

interface AuditHistoryTabProps {
  history: any[];
  shortages: any[];
  totalMissing: number;
}

export const AuditHistoryTab: React.FC<AuditHistoryTabProps> = ({ history, shortages, totalMissing }) => (
  <Box sx={{ mt: 1, pb: 1 }}>
    <Typography variant="body1" fontWeight="bold" gutterBottom>Audit Logs</Typography>
    
    <Paper elevation={0} sx={{ p: 1, mb: 1, bgcolor: '#ffffff',  borderRadius: '4px' }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Box sx={{ bgcolor: '#d32f2f', p: 1, borderRadius: '4px', display: 'flex' }}>
          <IonIcon icon={trendingDownOutline} style={{ fontSize: '24px', color: '#fff' }} />
        </Box>
        <Box>
          <Typography variant="body1" color="error.main" fontWeight="bold">Loss Prevention Report</Typography>
          <Typography variant="body2">
            Detected <strong>{shortages.length}</strong> shortages with <strong>{totalMissing}</strong> missing head.
          </Typography>
        </Box>
      </Stack>
    </Paper>

    <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: '4px' }}>
      <Table>
        <TableHead sx={{ bgcolor: '#f8f9fa' }}>
          <TableRow>
            <TableCell><strong>Date</strong></TableCell>
            <TableCell><strong>Herd</strong></TableCell>
            <TableCell align="center"><strong>Count (A/E)</strong></TableCell>
            <TableCell align="right"><strong>Status</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {history.map((session) => (
            <TableRow key={session.id}>
              <TableCell sx={{ fontSize: '0.85rem' }}>{new Date(session.session_date).toLocaleDateString()}</TableCell>
              <TableCell><Typography variant="body2" fontWeight="600">{session.herd_name}</Typography></TableCell>
              <TableCell align="center">{session.actual_count} / {session.expected_count}</TableCell>
              <TableCell align="right">
                <Chip 
                  label={session.actual_count < session.expected_count ? `-${session.expected_count - session.actual_count}` : "Verified"} 
                  color={session.actual_count < session.expected_count ? "error" : "success"} 
                  size="small" 
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
);