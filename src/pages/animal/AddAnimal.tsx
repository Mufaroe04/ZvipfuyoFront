import React, { useState } from 'react';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonList, IonItem, IonLabel, IonInput, IonSelect, 
  IonSelectOption, IonButton, IonDatetime, IonButtons, 
  IonBackButton, IonIcon, IonNote 
} from '@ionic/react';
import { saveOutline, cameraOutline } from 'ionicons/icons';

const AddAnimal: React.FC = () => {
  const [animalData, setAnimalData] = useState({
    tagId: '',
    breed: '',
    gender: 'Heifer',
    birthDate: new Date().toISOString(),
    weight: ''
  });

  const handleSave = () => {
    console.log('Saving to local storage (SQLite/Redux)...', animalData);
    // Here we will trigger the Redux action to save locally 
    // and sync with Django when signal returns.
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/dashboard" />
          </IonButtons>
          <IonTitle>Register New Animal</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <IonButton fill="outline" color="medium" style={{ width: '150px', height: '150px', borderRadius: '15px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <IonIcon icon={cameraOutline} style={{ fontSize: '40px' }} />
              <p>Add Photo</p>
            </div>
          </IonButton>
        </div>

        <IonList>
          {/* PRIMARY IDENTIFIER */}
          <IonItem lines="full">
            <IonLabel position="stacked">Visual Tag ID / Name</IonLabel>
            <IonInput 
              placeholder="e.g. B-204 or 'Star'" 
              value={animalData.tagId}
              onIonChange={e => setAnimalData({...animalData, tagId: e.detail.value!})}
            />
          </IonItem>

          {/* BREED SELECTION */}
          <IonItem lines="full">
            <IonLabel position="stacked">Breed</IonLabel>
            <IonSelect 
              value={animalData.breed} 
              placeholder="Select Breed"
              onIonChange={e => setAnimalData({...animalData, breed: e.detail.value})}
            >
              <IonSelectOption value="brahman">Brahman</IonSelectOption>
              <IonSelectOption value="mashona">Mashona</IonSelectOption>
              <IonSelectOption value="boran">Boran</IonSelectOption>
              <IonSelectOption value="cross">Crossbreed</IonSelectOption>
            </IonSelect>
          </IonItem>

          {/* GENDER */}
          <IonItem lines="full">
            <IonLabel position="stacked">Category</IonLabel>
            <IonSelect 
              value={animalData.gender}
              onIonChange={e => setAnimalData({...animalData, gender: e.detail.value})}
            >
              <IonSelectOption value="bull">Bull</IonSelectOption>
              <IonSelectOption value="cow">Cow</IonSelectOption>
              <IonSelectOption value="heifer">Heifer</IonSelectOption>
              <IonSelectOption value="steer">Steer</IonSelectOption>
            </IonSelect>
          </IonItem>

          {/* DATE OF BIRTH */}
          <IonItem lines="full">
            <IonLabel position="stacked">Date of Birth (Approx)</IonLabel>
            <IonInput type="date" value={animalData.birthDate.split('T')[0]} />
          </IonItem>

          {/* INITIAL WEIGHT */}
          <IonItem lines="full">
            <IonLabel position="stacked">Current Weight (kg)</IonLabel>
            <IonInput 
              type="number" 
              placeholder="0.00"
              value={animalData.weight}
              onIonChange={e => setAnimalData({...animalData, weight: e.detail.value!})}
            />
            <IonNote slot="end">kg</IonNote>
          </IonItem>
        </IonList>

        <div className="ion-padding-top">
          <IonButton expand="block" onClick={handleSave}>
            <IonIcon slot="start" icon={saveOutline} />
            Save Animal Record
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AddAnimal;