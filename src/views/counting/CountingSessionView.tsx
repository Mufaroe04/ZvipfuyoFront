import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonMenuButton, IonIcon } from '@ionic/react';
import { Box, Tabs, Tab, Paper, Container } from '@mui/material';
import { addCircleOutline, airplaneOutline, clipboardOutline } from 'ionicons/icons';

// Hooks and Domain Subcomponents
import { useCountingSession } from './hooks/useCountingSession';
import { ManualAuditTab } from './components/ManualAuditTab';
import { DroneAuditTab } from './components/DroneAuditTab';
import { AuditHistoryTab } from './components/AuditHistoryTab';

const CountingSessionView: React.FC = () => {
  const {
    viewMode,
    setViewMode,
    herds,
    history,
    isScanning,
    selectedFile,
    previewUrl,
    fileInputRef,
    formData,
    setFormData,
    handleHerdChange,
    handleFileSelect,
    clearMediaFile,
    handleDroneScan,
    handleSubmit,
    shortages,
    totalMissing
  } = useCountingSession();

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start"><IonMenuButton /></IonButtons>
          <IonTitle style={{ fontWeight: 700 }}>Herd & Habitat Audit</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <Container maxWidth="xl" sx={{ py: 3 }}>
          
          {/* Uniform Material-UI Navigation Tab Section Layout */}
          <Paper elevation={0} sx={{ borderRadius: '4px', mb: 3, overflow: 'hidden' }}>
            <Tabs 
              value={viewMode} 
              onChange={(_, val) => setViewMode(val)} 
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab icon={<IonIcon icon={addCircleOutline} />} label="Manual" />
              <Tab icon={<IonIcon icon={airplaneOutline} />} label="Drone AI" />
              <Tab icon={<IonIcon icon={clipboardOutline} />} label="Reports" />
            </Tabs>
          </Paper>

          {/* Conditional View Engine Matching Active Numerical Indices */}
          {viewMode === 0 && (
            <ManualAuditTab 
              formData={formData}
              setFormData={setFormData}
              herds={herds}
              handleHerdChange={handleHerdChange}
              handleSubmit={handleSubmit}
            />
          )}

          {viewMode === 1 && (
            <DroneAuditTab 
              formData={formData}
              herds={herds}
              isScanning={isScanning}
              selectedFile={selectedFile}
              previewUrl={previewUrl}
              fileInputRef={fileInputRef}
              handleHerdChange={handleHerdChange}
              handleFileSelect={handleFileSelect}
              clearMediaFile={clearMediaFile}
              handleDroneScan={handleDroneScan}
              handleSubmit={handleSubmit}
            />
          )}

          {viewMode === 2 && (
            <AuditHistoryTab 
              history={history}
              shortages={shortages}
              totalMissing={totalMissing}
            />
          )}
          
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default CountingSessionView;