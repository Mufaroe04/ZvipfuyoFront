import React, { useEffect } from 'react';
import { Redirect, Route,useHistory } from 'react-router-dom';
import { 
  IonApp, IonRouterOutlet, setupIonicReact, IonIcon, IonLabel, IonHeader, 
  IonToolbar, IonContent, IonItem, IonList, IonMenu, IonMenuToggle, 
  IonTitle, IonBadge,
  IonText, 
} from '@ionic/react';
import {
  homeOutline, scanOutline, listOutline, medkitOutline, gitNetworkOutline, 
  statsChartOutline, calculatorOutline, checkboxOutline, swapHorizontalOutline, 
  archiveOutline, notificationsOutline, chatbubblesOutline, personOutline, 
  logOutOutline, pawOutline, cartOutline, businessOutline,
  scaleOutline,
  waterOutline,peopleOutline,
  trendingUpOutline
} from "ionicons/icons";
import { IonReactRouter } from '@ionic/react-router';

// Redux Imports
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './redux/store'; 
import { fetchNotifications } from './redux/store/slices/notificationSlice';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// Page Imports
import Dashboard from './pages/Dashboard';
import Scan from './pages/Scan';
import MyHerds from './pages/MyHerds';
import MyAnimals from './pages/MyAnimals';
import HealthAndTreatments from './pages/HealthAndTreatments';
import Reproduction from './pages/Reproduction';
import Insights from './pages/Insights';
import CountingSession from './pages/CountingSession';
import Tasks from './pages/Tasks';
import Transfer from './pages/Transfer';
import Inventory from './pages/Inventory';
import Notifications from './pages/Notifications';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import HerdCreatePage from './pages/HerdCreatePage';
import HerdDetailView from './pages/HerdDetailView';
import RegisterAnimalView from './pages/RegisterAnimalView';
import AnimalDetailView from './pages/AnimalDetailView';
import AddHealthRecord from './pages/AddHealthRecord';
import AddBreedingEvent from './pages/AddBreedingEvent';
import AddTask from './pages/AddTask';
import AddTransfer from './pages/AddTransfer';
import AddInventoryItem from './pages/AddInventoryItem';
import StockHistory from './pages/StockHistory';
import Procurement from './pages/Procurement';
import Suppliers from './pages/Suppliers';

/* Core CSS required for Ionic components to work properly */

import '@ionic/react/css/core.css';
/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';
import AddWeight from './pages/AddWeight';
import WeightListing from './pages/WeightListing';
import DairyOperations from './pages/DairyOperations';
import AddMilkYields from './pages/AddMilkYields';
import AddMilkQuality from './pages/AddMilkQuality';
import AddLactation from './pages/AddLactation';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { initializeAuth, logout } from './redux/store/slices/authSlice';
import StaffPage from './pages/StaffPage';
import { Grass } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import BeefDashboard from './pages/BeefDashboard';

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
  const history = useHistory();
  const { user } = useSelector((state: RootState) => state.auth);
  // Pull unread count from Redux
  const unreadCount = useSelector((state: RootState) => state.notifications.unreadCount);
  const canManageStaff = user?.profile?.role === 'owner' || user?.profile?.role === 'manager';
  const zvipfuyoTheme = createTheme({
    typography: {
      // Setting the global font family
      fontFamily: '"Plus Jakarta Sans", sans-serif',
      button: {
        textTransform: 'none', // Keeps buttons from being all caps
        fontWeight: 600,
      },
    },
    palette: {
      primary: {
        main: '#18774c', // Your specific green
      },
    },
  });
  // Fetch notifications on app load to sync the badge
  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);
    useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch,canManageStaff]);
  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout async thunk action
    history.replace("/login"); // Redirect to the login page after logout
  };
  console.log('canManageStaff',canManageStaff)
  return (

    <IonApp>
      <ThemeProvider theme={zvipfuyoTheme}>
      <IonReactRouter>
        <IonMenu contentId="main-content" type="overlay" >
          <IonHeader className="ion-no-border">
            <IonToolbar color="primary">
              {/* <IonTitle>Zvipfuyo Menu</IonTitle> */}
                      <Box sx={{ textAlign: 'center' }}>
                        <Box sx={{ 
                          // bgcolor: '#18774c', width: 64, height: 64, borderRadius: 3, 
                          // display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                          // mb: 2, boxShadow: '0 8px 16px rgba(24, 119, 76, 0.15)' 
                          bgcolor: '#ffffff',
                        }}>
                          <Grass sx={{ color: '#18774c', fontSize: 32 }} />
                        <Typography variant="h4" component="h1" sx={{ fontWeight: 800, color: '#18774c', letterSpacing: -0.5 }}>
                          Zvipfuyo
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          Smart Livestock Platform
                        </Typography>
                        </Box>
              
                      </Box>
              
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              {/* Common Menu Items */}
              {[
                { label: 'Dashboard', icon: homeOutline, url: '/dashboard' },
                { label: 'Insights', icon: statsChartOutline, url: '/insights' },
                // { label: 'Scan Tag', icon: scanOutline, url: '/scan' },
                { label: 'My Herds', icon: listOutline, url: '/herds' },
                { label: 'My Animals', icon: pawOutline, url: '/animals' },
                { label: 'Dairy Operations', icon: waterOutline, url: '/dairy' },
                { label: 'Beef Cattle Operations', icon: trendingUpOutline, url: '/beef' },
                { label: 'Health & Treatments', icon: medkitOutline, url: '/health' },
                { label: 'Reproduction', icon: gitNetworkOutline, url: '/reproduction' },
                { label: 'Weight Tracking', icon: scaleOutline, url: '/weights' },
                { label: 'Counting Session', icon: calculatorOutline, url: '/counting' },
                { label: 'Tasks', icon: checkboxOutline, url: '/tasks' },
                { label: 'Transfer', icon: swapHorizontalOutline, url: '/transfer' },
                { label: 'Inventory', icon: archiveOutline, url: '/inventory' },
                { label: 'Procurement', icon: cartOutline, url: '/procurement' },
                { label: 'Supplier Directory', icon: businessOutline, url: '/suppliers' },
              ].map((item) => (
                <IonMenuToggle key={item.url} autoHide={false}>
                  <IonItem button routerLink={item.url} lines="none">
                    <IonIcon icon={item.icon} slot="start" />
                    <IonLabel><strong>{item.label}</strong></IonLabel>
                  </IonItem>
                </IonMenuToggle>
              ))}

              {/* SPECIAL CASE: Notifications with Badge */}
              <IonMenuToggle autoHide={false}>
                <IonItem button routerLink="/notifications" lines="none">
                  <IonIcon icon={notificationsOutline} slot="start" />
                  <IonLabel><strong>Notifications</strong></IonLabel>
                {unreadCount > 0 && (
                  <IonText slot="end" style={{ color: "#18774c", fontWeight: "bold" }}>
                    {unreadCount}
                  </IonText>
                )}
                </IonItem>
              </IonMenuToggle>

              <IonMenuToggle autoHide={false}>
                <IonItem button routerLink="/chat" lines="none">
                  <IonIcon icon={chatbubblesOutline} slot="start" />
                  <IonLabel><strong>Chat</strong></IonLabel>
                </IonItem>
              </IonMenuToggle>
              {canManageStaff && (
                <IonMenuToggle autoHide={false}>
                  <IonItem button routerLink="/staff" lines="none">
                    <IonIcon icon={peopleOutline} slot="start" />
                    <IonLabel><strong>Staff Management</strong></IonLabel>
                  </IonItem>
                </IonMenuToggle>
              )}
              <IonMenuToggle autoHide={false}>
                <IonItem button routerLink="/profile" lines="none">
                  <IonIcon icon={personOutline} slot="start" />
                  <IonLabel><strong>Profile</strong></IonLabel>
                </IonItem>
              </IonMenuToggle>

              <IonMenuToggle autoHide={false}>
                <IonItem button lines="none" detail={false} onClick={handleLogout}>
                  <IonIcon icon={logOutOutline} slot="start"  />
                  <IonLabel ><strong>Logout</strong></IonLabel>
                </IonItem>
              </IonMenuToggle>
            </IonList>
          </IonContent>
        </IonMenu>

        <IonRouterOutlet id="main-content">
          {/* <ProtectedRoute exact path="/"><Redirect to="/dashboard" /></ProtectedRoute> */}
          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
          <ProtectedRoute exact path="/scan" component={Scan} />
          <ProtectedRoute exact path="/herds" component={MyHerds} />
          <ProtectedRoute exact path="/herdsadd" component={HerdCreatePage} />
          <ProtectedRoute exact path="/herds/:id" component={HerdDetailView} />
          <ProtectedRoute exact path="/animals" component={MyAnimals} />
          <ProtectedRoute exact path="/herds/:herdId/add-animal" component={RegisterAnimalView} />
          <ProtectedRoute exact path="/animals/add" component={RegisterAnimalView} />
          <ProtectedRoute exact path="/animal/:id" component={AnimalDetailView} />
          <ProtectedRoute exact path="/dairy" component={DairyOperations} />
          <ProtectedRoute exact path="/dairy/milk-yield/add" component={AddMilkYields} />
          <ProtectedRoute exact path="/dairy/milk-quality/add" component={AddMilkQuality} />
          <ProtectedRoute exact path="/dairy/milk-lactation/add" component={AddLactation} />
          <ProtectedRoute exact path="/beef" component={BeefDashboard} />
          <ProtectedRoute exact path="/health" component={HealthAndTreatments} />
          <ProtectedRoute exact path="/health/add" component={AddHealthRecord} />
          <ProtectedRoute exact path="/reproduction" component={Reproduction} />
          <ProtectedRoute exact path="/reproduction/add" component={AddBreedingEvent} />
          <ProtectedRoute exact path="/weights" component={WeightListing} />
          <ProtectedRoute exact path="/weights/add" component={AddWeight} />
          <ProtectedRoute exact path="/insights" component={Insights} />
          <ProtectedRoute exact path="/counting" component={CountingSession} />
          <ProtectedRoute exact path="/tasks" component={Tasks} />
          <ProtectedRoute exact path="/tasks/add" component={AddTask} />
          <ProtectedRoute exact path="/transfer" component={Transfer} />
          <ProtectedRoute exact path="/operations/add-transfer" component={AddTransfer} />
          <ProtectedRoute exact path="/inventory" component={Inventory} />
          <ProtectedRoute exact path="/inventory/add" component={AddInventoryItem} />
          <ProtectedRoute path="/inventory/history" exact component={StockHistory} />
          <ProtectedRoute exact path="/procurement" component={Procurement} />
          <ProtectedRoute exact path="/suppliers" component={Suppliers} />
          <ProtectedRoute exact path="/notifications" component={Notifications} />
          <ProtectedRoute exact path="/chat" component={Chat} />
          <ProtectedRoute exact path="/profile" component={Profile} />
          <ProtectedRoute exact path="/staff" component={StaffPage} />

          <Route exact path="/login" component={Login} />
          {/* <ProtectedRoute exact path="/dashboard" component={Dashboard} />
          <ProtectedRoute exact path="/suppliers" component={Suppliers} /> */}
          
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>

        </IonRouterOutlet>
      </IonReactRouter>
      </ThemeProvider>
    </IonApp>
  );
};

export default App;