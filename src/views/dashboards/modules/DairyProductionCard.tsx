import React from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon } from '@ionic/react';
import { waterOutline } from 'ionicons/icons';
import { Box, Typography } from '@mui/material';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface DairyProductionCardProps {
  dairyStats: {
    active_milkers: number;
    daily_total: number;
    avg_yield_per_cow: number;
    milk_trend: Array<{ date: string; daily_total: number }>;
  };
}

export const DairyProductionCard: React.FC<DairyProductionCardProps> = ({ dairyStats }) => {
  const chartOptions: ApexOptions = {
    chart: { type: 'line', toolbar: { show: false }, zoom: { enabled: false }, dropShadow: { enabled: false } },
    colors: ['#3880ff'],
    stroke: { curve: 'smooth', width: 4, dashArray: 0 },
    fill: { type: 'solid', opacity: 1 },
    xaxis: {
      categories: dairyStats.milk_trend.map(t => new Date(t.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })),
      labels: { show: true, style: { fontSize: '10px', fontWeight: 600 } },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: { show: false },
    grid: { show: false, padding: { left: 10, right: 10 } },
    markers: { size: 4, colors: ['#3880ff'], strokeWidth: 2 },
    tooltip: { x: { format: 'dd MMM' }, y: { formatter: (val) => `${val.toFixed(2)} L` } }
  };

  const chartSeries = [{
    name: 'Daily Yield',
    data: dairyStats.milk_trend.map(t => t.daily_total)
  }];

  return (
    <IonCard style={{ borderLeft: '4px solid var(--ion-color-primary)', height: '100%' }}>
      <IonCardHeader>
        <IonCardTitle>
          <IonIcon icon={waterOutline} /> Dairy Production
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center', marginBottom: '15px' }}>
          <div>
            <h2 style={{ margin: 0, fontWeight: 'bold' }}>{dairyStats.active_milkers}</h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--ion-color-medium)' }}>Active Milkers</p>
          </div>
          <div>
            <h2 style={{ margin: 0, fontWeight: 'bold' }}>{dairyStats.daily_total} L</h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--ion-color-medium)' }}>Total Today</p>
          </div>
          <div>
            <h2 style={{ margin: 0, fontWeight: 'bold' }}>{dairyStats.avg_yield_per_cow} L</h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--ion-color-medium)' }}>Avg/Cow</p>
          </div>
        </div>
        <Box sx={{ mt: 2, height: '150px' }}>
          <Typography variant="caption" sx={{ fontWeight: 'bold', ml: 1, color: 'text.secondary' }}>
            7-DAY YIELD TREND (Liters)
          </Typography>
          <Chart options={chartOptions} series={chartSeries} type="line" height="100%" />
        </Box>
      </IonCardContent>
    </IonCard>
  );
};