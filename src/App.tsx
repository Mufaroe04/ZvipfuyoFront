import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IonApp, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ThemeProvider } from '@mui/material/styles';

// Imports from new dedicated configuration/component locations
import { AppMenu } from './layout/AppMenu';
import { AppRoutes } from './routes/AppRoutes';
import { zvipfuyoTheme } from './config/theme';
import { RootState, AppDispatch } from './redux/store';
import { fetchNotifications } from './redux/store/slices/notificationSlice';
import { initializeAuth } from './redux/store/slices/authSlice';
import { UserRole } from './types/types';

// Ionic Required Assets
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';
import { StyledEngineProvider } from '@mui/material/styles';
import { LoadingSpinner } from './components/feedback/LoadingSpinner';

/**

 * Ionic Dark Mode

 * -----------------------------------------------------

 * For more info, please see:

 * https://ionicframework.com/docs/theming/dark-mode

 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
// import '@ionic/react/css/palettes/dark.system.css';

setupIonicReact();

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  // Derive active roles
  // const userRole: UserRole = (user?.profile?.role as UserRole) || 'hand';
  const isInitializing = isAuthenticated && !user;

  useEffect(() => {
    dispatch(initializeAuth());
    dispatch(fetchNotifications());
  }, [dispatch]);

// 2. Prevent the routes from loading too early while reading from storage
  if (isInitializing) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        {/* Or use your Ionic/Loading Spinner */}
        <LoadingSpinner/>
      </div>
    );
  }
  const userRole: UserRole | null = (user?.profile?.role as UserRole) || null;

  return (
    <IonApp>
      <StyledEngineProvider injectFirst>
      <ThemeProvider theme={zvipfuyoTheme}>
       
        <IonReactRouter>
          {/* Decoupled Navigation Component */}
          <AppMenu userRole={userRole} />
          {/* Decoupled Routes Component */}
          <AppRoutes userRole={userRole} isAuthenticated={isAuthenticated} />
        </IonReactRouter>
      </ThemeProvider>
      </StyledEngineProvider>
    </IonApp>
  );
};

export default App;