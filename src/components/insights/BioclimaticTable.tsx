import React from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { useAppSelector } from '../../redux/hooks';

export const BioclimaticTable: React.FC = () => {
  const { insights_data } = useAppSelector((state: any) => state.insights);

  const bioclimatic = {
    temperature: insights_data?.weather?.temp || 0,
    humidity: insights_data?.weather?.humidity || 0,
    thi: insights_data?.weather?.thi || 0
  };

  const assessmentText = typeof insights_data?.narrative === 'object' 
    ? insights_data.narrative.bioclimaticAssessment 
    : 'Bioclimatic metrics normal.';

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="body1" sx={{ fontWeight: 700, mb: 2, color: '#1F2937' }}>
        4. Bioclimatic Risk & Environmental Management
      </Typography>

      <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: '8px', mb: 3, border: '1px solid #D1D5DB' }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#F8FAFC' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, color: '#1E293B' }}>Metric</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#1E293B' }}>Value</TableCell>
              <TableCell sx={{ fontWeight: 700, color: '#1E293B' }}>Risk Level</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow sx={{ borderBottom: '1px solid #E2E8F0' }}>
              <TableCell sx={{ color: '#334155' }}>Ambient Temperature</TableCell>
              <TableCell sx={{ color: '#0F172A' }}>{bioclimatic.temperature}°C</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#16A34A' }}>Low (Thermal Comfort)</TableCell>
            </TableRow>
            <TableRow sx={{ borderBottom: '1px solid #E2E8F0' }}>
              <TableCell sx={{ color: '#334155' }}>Relative Humidity</TableCell>
              <TableCell sx={{ color: '#0F172A' }}>{bioclimatic.humidity}%</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#16A34A' }}>Optimal</TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ color: '#334155' }}>THI (Computed)</TableCell>
              <TableCell sx={{ color: '#0F172A' }}>{bioclimatic.thi}</TableCell>
              <TableCell sx={{ fontWeight: 600, color: '#16A34A' }}>Safe Range</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box>
        <Typography variant="body2" component="div" sx={{ lineHeight: 1.7 }}>
          <ReactMarkdown>{assessmentText}</ReactMarkdown>
        </Typography>
      </Box>
    </Box>
  );
};