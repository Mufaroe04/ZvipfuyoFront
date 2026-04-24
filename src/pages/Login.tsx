// import React, { useState } from 'react';
// import { 
//   IonContent, IonPage, IonInput, IonButton, IonItem, 
//   IonLabel, IonLoading, IonText, IonIcon, IonCard, IonCardContent 
// } from '@ionic/react';
// import { personOutline, lockClosedOutline, leafOutline } from 'ionicons/icons';
// import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
// import { loginUser } from '../redux/store/slices/authSlice';
// import { AppDispatch, RootState } from '../redux/store';
// import { LoginCredentials } from '../types/types';

// const Login: React.FC = () => {
//   const [credentials, setCredentials] = useState<LoginCredentials>({ username: '', password: '' });
//   const dispatch = useDispatch<AppDispatch>();
//   const history = useHistory();
  
//   const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.auth);

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     const resultAction = await dispatch(loginUser(credentials));
//     if (loginUser.fulfilled.match(resultAction)) {
//       history.push('/dashboard');
//     }
//   };

//   return (
//     <IonPage>
//       <IonContent className="ion-padding" scrollY={false}>
//         <div style={{
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           height: '100%',
//           background: 'linear-gradient(135deg, #f0f4f2 0%, #ffffff 100%)'
//         }}>
          
//           {/* Logo Section */}
//           <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
//             <div style={{ 
//               background: '#18774c', 
//               width: '80px', height: '80px', 
//               borderRadius: '20px', display: 'inline-flex',
//               alignItems: 'center', justifyContent: 'center',
//               boxShadow: '0 10px 20px rgba(24, 119, 76, 0.2)'
//             }}>
//               <IonIcon icon={leafOutline} style={{ fontSize: '40px', color: '#fff' }} />
//             </div>
//             <h1 style={{ fontWeight: 800, color: '#1a1a1a', marginTop: '1rem' }}>Zvipfuyo</h1>
//             <p style={{ color: '#666' }}>Smart Livestock Management</p>
//           </div>

//           <IonCard style={{ borderRadius: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
//             <IonCardContent className="ion-padding">
//               <form onSubmit={handleLogin}>
//                 <IonItem lines="none" style={{ 
//                   '--background': '#f5f5f5', borderRadius: '12px', marginBottom: '1rem' 
//                 }}>
//                   <IonIcon icon={personOutline} slot="start" color="primary" />
//                   <IonInput
//                     placeholder="Username"
//                     value={credentials.username}
//                     onIonChange={e => setCredentials({ ...credentials, username: e.detail.value! })}
//                     required
//                   />
//                 </IonItem>

//                 <IonItem lines="none" style={{ 
//                   '--background': '#f5f5f5', borderRadius: '12px', marginBottom: '1rem' 
//                 }}>
//                   <IonIcon icon={lockClosedOutline} slot="start" color="primary" />
//                   <IonInput
//                     type="password"
//                     placeholder="Password"
//                     value={credentials.password}
//                     onIonChange={e => setCredentials({ ...credentials, password: e.detail.value! })}
//                     required
//                   />
//                 </IonItem>

//                 {error && (
//                   <IonText color="danger" style={{ fontSize: '0.9rem', textAlign: 'center', display: 'block', marginBottom: '1rem' }}>
//                     {error}
//                   </IonText>
//                 )}

//                 <IonButton 
//                   expand="block" 
//                   type="submit" 
//                   style={{ '--border-radius': '12px', '--background': '#18774c', height: '50px' }}
//                 >
//                   Sign In
//                 </IonButton>
//               </form>
//             </IonCardContent>
//           </IonCard>

//           <div style={{ textAlign: 'center', marginTop: '1rem' }}>
//             <IonText color="medium" style={{ fontSize: '0.85rem' }}>
//               Contact Manager if you forgot your credentials
//             </IonText>
//           </div>
//         </div>

//         <IonLoading isOpen={loading} message={'Authenticating...'} />
//       </IonContent>
//     </IonPage>
//   );
// };

// export default Login;
import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AppDispatch, RootState } from '../redux/store';
import { loginUser } from '../redux/store/slices/authSlice';
import { LoginCredentials } from '../types/types';
import LoginComponent from '../components/LoginComponent';
import { Box } from '@mui/material';

const LoginPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleLoginSubmit = async (credentials: LoginCredentials) => {
    const resultAction = await dispatch(loginUser(credentials));
    if (loginUser.fulfilled.match(resultAction)) {
      // Direct navigation to dashboard after successful JWT storage
      history.push('/dashboard');
    }
  };

  return (
    <IonPage>
      <IonContent>
        <Box sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#f8faf9', // Very subtle green-tinted grey for the background
          backgroundImage: 'radial-gradient(#18774c05 2px, transparent 2px)',
          backgroundSize: '30px 30px' // Subtle pattern for web depth
        }}>
          <LoginComponent 
            onLogin={handleLoginSubmit} 
            loading={loading} 
            error={error} 
          />
        </Box>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;