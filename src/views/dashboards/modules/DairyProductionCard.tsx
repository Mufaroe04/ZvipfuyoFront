import React from 'react';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonCardSubtitle, IonText } from '@ionic/react';
import { waterOutline } from 'ionicons/icons';
import { Box, Typography } from '@mui/material';
import { useAppSelector } from '../../../redux/hooks';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

export const DairyProductionCard: React.FC = () => {
  const { data } = useAppSelector((state) => state.dashboard);
  const dairyStats = data?.dairy_stats;

  if (!dairyStats) return null;

  const chartOptions: ApexOptions = {
    chart: { type: 'line', toolbar: { show: false }, zoom: { enabled: false }, dropShadow: { enabled: false } },
    colors: ['#3880ff'],
    stroke: { curve: 'smooth', width: 4, dashArray: 0 },
    fill: { type: 'solid', opacity: 1 },
    xaxis: {
      categories: dairyStats.milk_trend?.map(t => new Date(t.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })) || [],
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
    data: dairyStats.milk_trend?.map(t => t.daily_total) || []
  }];

  return (
    <IonCard style={{ borderLeft: '4px solid var(--ion-color-primary)', height: '100%'  }}>
      <IonCardHeader>
        <IonCardTitle style={{  color: 'var(--ion-color-dark)' }}>
          <IonIcon icon={waterOutline} /> Dairy Production 
        </IonCardTitle>
      </IonCardHeader>
      <IonCardContent>
        <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center', marginBottom: '15px' }}>
          <div>
            <h2 style={{ margin: 0, fontWeight: 'bold', color: 'var(--ion-color-dark)' }}>{dairyStats.active_milkers || 0}</h2>
            <IonText style={{ fontSize: '0.8rem',  color:'#374151' }}>Active Milkers</IonText>
          </div>
          <div>
            <h2 style={{ margin: 0, fontWeight: 'bold' ,color: 'var(--ion-color-dark)'}}>{dairyStats.daily_total || 0} L</h2>
            <IonText style={{ fontSize: '0.8rem', color:'#374151' }}>Total Today</IonText>
          </div>
          <div>
            <h2 style={{ margin: 0, fontWeight: 'bold',color: 'var(--ion-color-dark)' }}>{dairyStats.avg_yield_per_cow || 0} L</h2>
            <IonText style={{ fontSize: '0.8rem', color:'#374151' }}>Avg/Cow</IonText>
          </div>
        </div>
        <Box sx={{ mt: 2, height: '150px' }}>
          <Typography variant="caption" sx={{ fontWeight: 'bold', ml: 1, color: '#000' }}>
            7-DAY YIELD TREND (Liters)
          </Typography>
          <Chart options={chartOptions} series={chartSeries} type="line" height="100%" />
        </Box>
      </IonCardContent>
    </IonCard>
  );
};