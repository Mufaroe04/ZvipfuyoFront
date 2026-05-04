import React from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { useAppSelector } from '../redux/hooks';

export const SnapshotTable: React.FC = () => {
  const { insights_data } = useAppSelector((state: any) => state.insights);

  const beef = {
    totalActiveCattle: insights_data?.beef?.totalActiveCattle || 0,
    avgDailyGain: insights_data?.beef?.avgDailyGain || 0,
    estHerdValue: insights_data?.beef?.estHerdValue || 0
  };

  const dairy = {
    activeMilkingCows: insights_data?.dairy?.activeMilkingCows || 0,
    avgDailyYield: insights_data?.dairy?.avgDailyYield || 0,
    somaticCellCount: insights_data?.dairy?.somaticCellCount || 0
  };

  const directiveText = typeof insights_data?.narrative === 'object'
    ? insights_data.narrative.strategicDirective
    : 'Directive pending generation.';

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#1F2937' }}>
        1. Executive Operations Snapshot
      </Typography>
      <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: '8px', mb: 3, border: '1px solid #D1D5DB' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#F3F4F6' }}>
            <TableRow>
              <TableCell colSpan={2} align="center" sx={{ fontWeight: 800, py: 1.5, color: '#111827', fontSize: '0.95rem', borderBottom: '1px solid #D1D5DB' }}>
                DUAL-ENTERPRISE METRICS
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ width: '50%', fontWeight: 700, color: '#374151', borderRight: '1px solid #E5E7EB' }}>BEEF & HERD</TableCell>
              <TableCell sx={{ width: '50%', fontWeight: 700, color: '#374151' }}>DAIRY</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell sx={{ borderRight: '1px solid #E5E7EB', verticalAlign: 'top', py: 2 }}>
                <Typography variant="body1">Total Active Cattle: <strong>{beef.totalActiveCattle} head</strong></Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>Avg Daily Gain (ADG): <strong>+{beef.avgDailyGain} kg</strong></Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>Est. Herd Market Value: <strong>${beef.estHerdValue.toLocaleString()}</strong></Typography>
              </TableCell>
              <TableCell sx={{ verticalAlign: 'top', py: 2 }}>
                <Typography variant="body1">Milking Cows (Active): <strong>{dairy.activeMilkingCows} head</strong></Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>Avg Daily Yield: <strong>{dairy.avgDailyYield} L/cow</strong></Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>Bulk Somatic Cell Count: <strong>{dairy.somaticCellCount.toLocaleString()}/mL</strong></Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ p: 2.5, backgroundColor: '#F8FAFC', borderRadius: '8px', borderLeft: '4px solid #3B82F6' }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1E3A8A', textTransform: 'uppercase', mb: 0.5 }}>
          Strategic Directive
        </Typography>
        <Typography variant="body2" component="div" sx={{ color: '#334155', lineHeight: 1.6 }}>
          <ReactMarkdown>{directiveText}</ReactMarkdown>
        </Typography>
      </Box>
    </Box>
  );
};