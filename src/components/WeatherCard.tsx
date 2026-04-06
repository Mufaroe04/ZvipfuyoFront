import React, { useEffect, useState } from 'react';
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
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchLiveInsights } from '../redux/store/slices/insightsSlice';
import { Geolocation } from '@capacitor/geolocation';

const WeatherCard: React.FC = () => {
  const { insights_data, loading_insights, lastFetched } = useAppSelector((state: any) => state.insights);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    const CACHE_TIME = 30 * 60 * 1000; // 30 Minutes
    const now = Date.now();

    // Only fetch if we have no data OR the data is older than 30 mins
    if (!insights_data || !lastFetched || (now - lastFetched > CACHE_TIME)) {
      const initIntelligence = async () => {
        try {
                const position = await Geolocation.getCurrentPosition({
                enableHighAccuracy: true,
                timeout: 10000 });
          dispatch(fetchLiveInsights({ 
            lat: position.coords.latitude, 
            lon: position.coords.longitude 
          }));
        } catch (e) {
          // Fallback to Harare if GPS fails
          dispatch(fetchLiveInsights({ lat: -17.82, lon: 31.05 }));
        }
      };
      initIntelligence();
    }
  }, [dispatch, insights_data, lastFetched]);
  if (loading_insights) return <IonSpinner name="crescent" />;
  // const isHeatStress = weather.thi >= 72;
  const isHeatStress = insights_data?.weather.thi >= 72;

  return (
  <IonCard color="secondary"> {/* This makes the background Primary and text white */}
  <IonCardHeader>
    {/* By default, subtitle and title will now be white */}
    <IonCardSubtitle style={{ color: 'white' }}>
      {insights_data?.weather.location} Forecast
    </IonCardSubtitle>
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
        <p style={{ margin: 0, fontSize: '0.9rem' }}>
          Mild Heat Stress Alert: Ensure adequate water.
        </p>
      </div>
    ) : (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        color: 'white',
        opacity: 0.9
      }}>
        <IonIcon icon={checkmarkCircleOutline} style={{ marginRight: '8px', color: '#2dd36f' }} />
        <p style={{ margin: 0 }}>Optimal conditions for grazing.</p>
      </div>
    )}
  </IonCardContent>
</IonCard>
  );
};

export default WeatherCard;