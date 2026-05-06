import React  from 'react';
import { 
  IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, 
  IonCardContent, IonIcon, IonChip, IonLabel, 
  IonSpinner,
  IonText
} from '@ionic/react';
import { 
  sunnyOutline, 
  thermometerOutline, 
  waterOutline, 
  alertCircleOutline,
  checkmarkCircleOutline
} from 'ionicons/icons';
import {  useAppSelector } from '../redux/hooks';

const WeatherCard: React.FC = () => {
  const { insights_data, loading_insights,  } = useAppSelector((state: any) => state.insights);
  

  if (loading_insights) return <IonSpinner name="crescent" />;
  // const isHeatStress = weather.thi >= 72;
  const isHeatStress = insights_data?.weather.thi >= 72;

  return (
  <IonCard color="secondary" style={{ height: '100%' ,}}> {/* This makes the background Primary and text white */}
  <IonCardHeader>
    {/* By default, subtitle and title will now be white */}
    <IonCardTitle style={{ color: 'white' }}>
      {insights_data?.weather.location} Forecast
    </IonCardTitle>
    <IonCardTitle style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
      <IonIcon icon={sunnyOutline} color="warning" /> 
      {insights_data?.weather.temp}°C
    </IonCardTitle>
    <IonText>{insights_data?.weather.condition}</IonText>
  </IonCardHeader>

  <IonCardContent>
    <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
      {/* Changed to 'light' color for chips so they remain visible on the blue background */}
      <IonChip outline style={{ color: 'white', borderColor: 'white' }}>
        <IonIcon icon={thermometerOutline} style={{ color: 'white' }} />
        <IonLabel>THI: {insights_data?.weather.thi}</IonLabel>
      </IonChip>
      
      <IonChip outline style={{ color: 'white', borderColor: 'white' }}>
        <IonIcon icon={waterOutline} style={{ color: 'white' }} />
        <IonLabel>{insights_data?.weather.humidity}% Humidity</IonLabel>
      </IonChip>
    </div>

    {isHeatStress ? (
      /* Using inline styles to ensure visibility on the primary background */
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        backgroundColor: 'rgba(255, 0, 0, 0.2)', 
        padding: '8px', 
        borderRadius: '8px',
        color: 'white' 
      }}>
        <IonIcon icon={alertCircleOutline} style={{ marginRight: '8px' }} />
        <IonText style={{ margin: 0, fontSize: '0.9rem' }}>
          Mild Heat Stress Alert: Ensure adequate water.
        </IonText>
      </div>
    ) : (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        color: 'white',
        opacity: 0.9
      }}>
        <IonIcon icon={checkmarkCircleOutline} style={{ marginRight: '8px', color: '#2dd36f' }} />
        <IonText style={{ margin: 0 }}>Optimal conditions for grazing.</IonText>
      </div>
    )}
  </IonCardContent>
</IonCard>
  );
};

export default WeatherCard;