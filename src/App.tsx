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
  trendingUpOutline,
  cashOutline
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
import ProtectedRoute, { RoleProtectedRoute } from './components/ProtectedRoute';
import { initializeAuth, logout } from './redux/store/slices/authSlice';
import StaffPage from './pages/StaffPage';
import { Grass } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import BeefDashboard from './pages/BeefDashboard';
import FinancePage from './pages/FinancePage';
import NewEntryPage from './pages/NewEntryPage';
import { MenuItem, UserRole } from './types/types';


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

// const App: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const history = useHistory();
//   const { user } = useSelector((state: RootState) => state.auth);
//   // Pull unread count from Redux
//   const unreadCount = useSelector((state: RootState) => state.notifications.unreadCount);
//   const canManageStaff = user?.profile?.role === 'owner' || user?.profile?.role === 'manager';
//   const userRole: UserRole = 'manager';
//   const { isAuthenticated } = useSelector((state: RootState) => state.auth);
//      console.log('isAuthenticated',isAuthenticated)
//   const zvipfuyoTheme = createTheme({
//     typography: {
//       // Setting the global font family
//       fontFamily: '"Plus Jakarta Sans", sans-serif',
//       button: {
//         textTransform: 'none', // Keeps buttons from being all caps
//         fontWeight: 600,
//       },
//     },
//     palette: {
//       primary: {
//         main: '#18774c', // Your specific green
//       },
//     },
//   });
//   // Fetch notifications on app load to sync the badge
//   const MENU_ITEMS: MenuItem[] = [
//   { label: 'Dashboard', icon: homeOutline, url: '/dashboard', roles: ['owner', 'manager', 'hand', 'vet'] },
//   { label: 'Insights', icon: statsChartOutline, url: '/insights', roles: ['owner', 'manager', 'vet'] },
//   { label: 'My Herds', icon: listOutline, url: '/herds', roles: ['owner', 'manager', 'hand', 'vet'] },
//   { label: 'My Animals', icon: pawOutline, url: '/animals', roles: ['owner', 'manager', 'hand', 'vet'] },
//   { label: 'Dairy Operations', icon: waterOutline, url: '/dairy', roles: ['owner', 'manager', 'hand'] },
//   { label: 'Beef Cattle Operations', icon: trendingUpOutline, url: '/beef', roles: ['owner', 'manager', 'hand'] },
//   { label: 'Health & Treatments', icon: medkitOutline, url: '/health', roles: ['owner', 'manager', 'vet', 'hand'] },
//   { label: 'Reproduction', icon: gitNetworkOutline, url: '/reproduction', roles: ['owner', 'manager', 'vet'] },
//   { label: 'Weight Tracking', icon: scaleOutline, url: '/weights', roles: ['owner', 'manager', 'hand'] },
//   { label: 'Counting Session', icon: calculatorOutline, url: '/counting', roles: ['owner', 'manager', 'hand'] },
//   { label: 'Tasks', icon: checkboxOutline, url: '/tasks', roles: ['owner', 'manager', 'hand', 'vet'] },
//   { label: 'Transfer', icon: swapHorizontalOutline, url: '/transfer', roles: ['owner', 'manager'] },
//   { label: 'Sales & Expenses', icon: cashOutline, url: '/sales-expenses', roles: ['owner'] },
//   { label: 'Inventory', icon: archiveOutline, url: '/inventory', roles: ['owner', 'manager', 'hand'] },
//   { label: 'Procurement', icon: cartOutline, url: '/procurement', roles: ['owner', 'manager'] },
//   { label: 'Supplier Directory', icon: businessOutline, url: '/suppliers', roles: ['owner', 'manager'] },
// ];
//   useEffect(() => {
//     dispatch(fetchNotifications());
//   }, [dispatch]);
//     useEffect(() => {
//     dispatch(initializeAuth());
//   }, [dispatch,canManageStaff]);
//   const handleLogout = () => {
//     dispatch(logout()); // Dispatch the logout async thunk action
//     history.replace("/login"); // Redirect to the login page after logout
//   };
//   console.log('canManageStaff',canManageStaff)
//   return (

//     <IonApp>
//       <ThemeProvider theme={zvipfuyoTheme}>
//         <IonReactRouter>
//           <IonMenu contentId="main-content" type="overlay">
//             <IonHeader className="ion-no-border">
//               <IonToolbar color="primary">
//                 <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#ffffff' }}>
//                   <Grass sx={{ color: '#18774c', fontSize: 32 }} />
//                   <Typography variant="h4" component="h1" sx={{ fontWeight: 800, color: '#18774c', letterSpacing: -0.5 }}>
//                     Zvipfuyo
//                   </Typography>
//                   <Typography variant="caption" color="textSecondary">
//                     Smart Livestock Platform
//                   </Typography>
//                 </Box>
//               </IonToolbar>
//             </IonHeader>
//             <IonContent>
//               <IonList>
//                 {/* 1. Filtered Core Operations Menu Items */}
//                 {MENU_ITEMS.filter(item => item.roles.includes(userRole)).map((item) => (
//                   <IonMenuToggle key={item.url} autoHide={false}>
//                     <IonItem button routerLink={item.url} lines="none">
//                       <IonIcon icon={item.icon} slot="start" />
//                       <IonLabel><strong>{item.label}</strong></IonLabel>
//                     </IonItem>
//                   </IonMenuToggle>
//                 ))}

//                 {/* 2. Communication Links (All Authenticated Users) */}
//                 <IonMenuToggle autoHide={false}>
//                   <IonItem button routerLink="/notifications" lines="none">
//                     <IonIcon icon={notificationsOutline} slot="start" />
//                     <IonLabel><strong>Notifications</strong></IonLabel>
//                     {unreadCount > 0 && (
//                       <IonText slot="end" style={{ color: "#18774c", fontWeight: "bold" }}>
//                         {unreadCount}
//                       </IonText>
//                     )}
//                   </IonItem>
//                 </IonMenuToggle>

//                 <IonMenuToggle autoHide={false}>
//                   <IonItem button routerLink="/chat" lines="none">
//                     <IonIcon icon={chatbubblesOutline} slot="start" />
//                     <IonLabel><strong>Chat</strong></IonLabel>
//                   </IonItem>
//                 </IonMenuToggle>

//                 {/* 3. Filtered Staff Management (Owner Only) */}
//                 {userRole === 'owner' && (
//                   <IonMenuToggle autoHide={false}>
//                     <IonItem button routerLink="/staff" lines="none">
//                       <IonIcon icon={peopleOutline} slot="start" />
//                       <IonLabel><strong>Staff Management</strong></IonLabel>
//                     </IonItem>
//                   </IonMenuToggle>
//                 )}

//                 {/* 4. Common Footer Operations */}
//                 <IonMenuToggle autoHide={false}>
//                   <IonItem button routerLink="/profile" lines="none">
//                     <IonIcon icon={personOutline} slot="start" />
//                     <IonLabel><strong>Profile</strong></IonLabel>
//                   </IonItem>
//                 </IonMenuToggle>

//                 <IonMenuToggle autoHide={false}>
//                   <IonItem button lines="none" detail={false} onClick={handleLogout}>
//                     <IonIcon icon={logOutOutline} slot="start" />
//                     <IonLabel><strong>Logout</strong></IonLabel>
//                   </IonItem>
//                 </IonMenuToggle>
//               </IonList>
//             </IonContent>
//           </IonMenu>

//           <IonRouterOutlet id="main-content">
//             {/* Base Routes */}
//             <Route exact path="/">
//               <Redirect to="/dashboard" />
//             </Route>
//             <Route exact path="/login" component={Login} />

//             {/* General Access Routes (Available to All Valid Roles) */}
//             <RoleProtectedRoute exact path="/dashboard" component={Dashboard} allowedRoles={['owner', 'manager', 'hand', 'vet']} userRole={userRole} isAuthenticated={isAuthenticated} />
//             <RoleProtectedRoute exact path="/profile" component={Profile} allowedRoles={['owner', 'manager', 'hand', 'vet']} userRole={userRole} isAuthenticated={isAuthenticated} />
//             <RoleProtectedRoute exact path="/notifications" component={Notifications} allowedRoles={['owner', 'manager', 'hand', 'vet']} userRole={userRole} isAuthenticated={isAuthenticated} />
//             <RoleProtectedRoute exact path="/chat" component={Chat} allowedRoles={['owner', 'manager', 'hand', 'vet']} userRole={userRole} isAuthenticated={isAuthenticated} />

//             {/* Core Livestock Management */}
//             <RoleProtectedRoute exact path="/insights" component={Insights} allowedRoles={['owner', 'manager', 'vet']} userRole={userRole} isAuthenticated={isAuthenticated} />
//             <RoleProtectedRoute exact path="/herds" component={MyHerds} allowedRoles={['owner', 'manager', 'hand', 'vet']} userRole={userRole} isAuthenticated={isAuthenticated} />
//             <RoleProtectedRoute exact path="/herdsadd" component={HerdCreatePage} allowedRoles={['owner', 'manager']} userRole={userRole} isAuthenticated={isAuthenticated} />
//             <RoleProtectedRoute exact path="/herds/:id" component={HerdDetailView} allowedRoles={['owner', 'manager', 'hand', 'vet']} userRole={userRole} isAuthenticated={isAuthenticated} />
//             <RoleProtectedRoute exact path="/animals" component={MyAnimals} allowedRoles={['owner', 'manager', 'hand', 'vet']} userRole={userRole} isAuthenticated={isAuthenticated} />
//             <RoleProtectedRoute exact path="/animals/add" component={RegisterAnimalView} allowedRoles={['owner', 'manager', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />
//             <RoleProtectedRoute exact path="/herds/:herdId/add-animal" component={RegisterAnimalView} allowedRoles={['owner', 'manager', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />
//             <RoleProtectedRoute exact path="/animal/:id" component={AnimalDetailView} allowedRoles={['owner', 'manager', 'hand', 'vet']} userRole={userRole} isAuthenticated={isAuthenticated} />

//             {/* Specialized Production Operations */}
//             <RoleProtectedRoute exact path="/dairy" component={DairyOperations} allowedRoles={['owner', 'manager', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />
//             <RoleProtectedRoute exact path="/dairy/milk-yield/add" component={AddMilkYields} allowedRoles={['owner', 'manager', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />
//             <RoleProtectedRoute exact path="/dairy/milk-quality/add" component={AddMilkQuality} allowedRoles={['owner', 'manager', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />
//             <RoleProtectedRoute exact path="/dairy/milk-lactation/add" component={AddLactation} allowedRoles={['owner', 'manager', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />
//             <RoleProtectedRoute exact path="/beef" component={BeefDashboard} allowedRoles={['owner', 'manager', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />

//             {/* Health, Breeding & Measurement Entries */}
//             <RoleProtectedRoute exact path="/health" component={HealthAndTreatments} allowedRoles={['owner', 'manager', 'vet', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />
//             <RoleProtectedRoute exact path="/health/add" component={AddHealthRecord} allowedRoles={['owner', 'manager', 'vet', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />
//             <RoleProtectedRoute exact path="/reproduction" component={Reproduction} allowedRoles={['owner', 'manager', 'vet']} userRole={userRole} isAuthenticated={isAuthenticated} />
//             <RoleProtectedRoute exact path="/reproduction/add" component={AddBreedingEvent} allowedRoles={['owner', 'manager', 'vet']} userRole={userRole} isAuthenticated={isAuthenticated} />
//             <RoleProtectedRoute exact path="/weights" component={WeightListing} allowedRoles={['owner', 'manager', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />
//             <RoleProtectedRoute exact path="/weights/add" component={AddWeight} allowedRoles={['owner', 'manager', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />
//             <RoleProtectedRoute exact path="/counting" component={CountingSession} allowedRoles={['owner', 'manager', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />

//             {/* Task Management & Core Transfers */}
//             <RoleProtectedRoute exact path="/tasks" component={Tasks} allowedRoles={['owner', 'manager', 'hand', 'vet']} userRole={userRole} isAuthenticated={isAuthenticated} />
//             <RoleProtectedRoute exact path="/tasks/add" component={AddTask} allowedRoles={['owner', 'manager']} userRole={userRole} isAuthenticated={isAuthenticated} />
//             <RoleProtectedRoute exact path="/transfer" component={Transfer} allowedRoles={['owner', 'manager']} userRole={userRole} isAuthenticated={isAuthenticated} />
//             <RoleProtectedRoute exact path="/operations/add-transfer" component={AddTransfer} allowedRoles={['owner', 'manager']} userRole={userRole} isAuthenticated={isAuthenticated} />

//             {/* Inventory, Supply Chain & Financial Control */}
//             <RoleProtectedRoute exact path="/inventory" component={Inventory} allowedRoles={['owner', 'manager', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />
//             <RoleProtectedRoute exact path="/inventory/add" component={AddInventoryItem} allowedRoles={['owner', 'manager']} userRole={userRole} isAuthenticated={isAuthenticated} />
//             <RoleProtectedRoute exact path="/inventory/history" component={StockHistory} allowedRoles={['owner', 'manager', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />
//             <RoleProtectedRoute exact path="/sales-expenses" component={FinancePage} allowedRoles={['owner']} userRole={userRole} isAuthenticated={isAuthenticated} />
//             <RoleProtectedRoute exact path="/sales-new-entry" component={NewEntryPage} allowedRoles={['owner']} userRole={userRole} isAuthenticated={isAuthenticated} />
//             <RoleProtectedRoute exact path="/procurement" component={Procurement} allowedRoles={['owner', 'manager']} userRole={userRole} isAuthenticated={isAuthenticated} />
//             <RoleProtectedRoute exact path="/suppliers" component={Suppliers} allowedRoles={['owner', 'manager']} userRole={userRole} isAuthenticated={isAuthenticated} />

//             {/* Employee Control (Owner Only) */}
//             <RoleProtectedRoute exact path="/staff" component={StaffPage} allowedRoles={['owner']} userRole={userRole} isAuthenticated={isAuthenticated} />

//             <Route render={() => <Redirect to="/login" />} />
//           </IonRouterOutlet>
//         </IonReactRouter>
//       </ThemeProvider>
//     </IonApp>
//   );
// };

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  
  // 1. Pull user and auth state from Redux
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const unreadCount = useSelector((state: RootState) => state.notifications.unreadCount);

  // 2. Compute dynamic roles and permissions from logged-in user profile
  const userRole: UserRole = (user?.profile?.role as UserRole) || 'hand';
  const canManageStaff = userRole === 'owner' || userRole === 'manager';

  console.log('Current Auth State:', { isAuthenticated, userRole, canManageStaff });

  const zvipfuyoTheme = createTheme({
    typography: {
      fontFamily: '"Plus Jakarta Sans", sans-serif',
      button: {
        textTransform: 'none',
        fontWeight: 600,
      },
    },
    palette: {
      primary: {
        main: '#18774c',
      },
    },
  });

  const MENU_ITEMS: MenuItem[] = [
    { label: 'Dashboard', icon: homeOutline, url: '/dashboard', roles: ['owner', 'manager', 'hand', 'vet'] },
    { label: 'Insights', icon: statsChartOutline, url: '/insights', roles: ['owner', 'manager', 'vet'] },
    { label: 'My Herds', icon: listOutline, url: '/herds', roles: ['owner', 'manager', 'hand', 'vet'] },
    { label: 'My Animals', icon: pawOutline, url: '/animals', roles: ['owner', 'manager', 'hand', 'vet'] },
    { label: 'Dairy Operations', icon: waterOutline, url: '/dairy', roles: ['owner', 'manager', 'hand'] },
    { label: 'Beef Cattle Operations', icon: trendingUpOutline, url: '/beef', roles: ['owner', 'manager', 'hand'] },
    { label: 'Health & Treatments', icon: medkitOutline, url: '/health', roles: ['owner', 'manager', 'vet', 'hand'] },
    { label: 'Reproduction', icon: gitNetworkOutline, url: '/reproduction', roles: ['owner', 'manager', 'vet'] },
    { label: 'Weight Tracking', icon: scaleOutline, url: '/weights', roles: ['owner', 'manager', 'hand'] },
    { label: 'Counting Session', icon: calculatorOutline, url: '/counting', roles: ['owner', 'manager', 'hand'] },
    { label: 'Tasks', icon: checkboxOutline, url: '/tasks', roles: ['owner', 'manager', 'hand', 'vet'] },
    { label: 'Transfer', icon: swapHorizontalOutline, url: '/transfer', roles: ['owner', 'manager'] },
    { label: 'Sales & Expenses', icon: cashOutline, url: '/sales-expenses', roles: ['owner'] },
    { label: 'Inventory', icon: archiveOutline, url: '/inventory', roles: ['owner', 'manager', 'hand'] },
    { label: 'Procurement', icon: cartOutline, url: '/procurement', roles: ['owner', 'manager'] },
    { label: 'Supplier Directory', icon: businessOutline, url: '/suppliers', roles: ['owner', 'manager'] },
  ];

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    history.replace("/login");
  };

  return (
    <IonApp>
      <ThemeProvider theme={zvipfuyoTheme}>
        <IonReactRouter>
          <IonMenu contentId="main-content" type="overlay">
            <IonHeader className="ion-no-border">
              <IonToolbar color="primary">
                <Box sx={{ textAlign: 'center', p: 2, bgcolor: '#ffffff' }}>
                  <Grass sx={{ color: '#18774c', fontSize: 32 }} />
                  <Typography variant="h4" component="h1" sx={{ fontWeight: 800, color: '#18774c', letterSpacing: -0.5 }}>
                    Zvipfuyo
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    Smart Livestock Platform
                  </Typography>
                </Box>
              </IonToolbar>
            </IonHeader>
            <IonContent>
              <IonList>
                {/* 1. Filtered Core Operations Menu Items */}
                {MENU_ITEMS.filter(item => item.roles.includes(userRole)).map((item) => (
                  <IonMenuToggle key={item.url} autoHide={false}>
                    <IonItem button routerLink={item.url} lines="none">
                      <IonIcon icon={item.icon} slot="start" />
                      <IonLabel><strong>{item.label}</strong></IonLabel>
                    </IonItem>
                  </IonMenuToggle>
                ))}

                {/* 2. Communication Links */}
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

                {/* 3. Filtered Staff Management (Owner Only) */}
                {userRole === 'owner' && (
                  <IonMenuToggle autoHide={false}>
                    <IonItem button routerLink="/staff" lines="none">
                      <IonIcon icon={peopleOutline} slot="start" />
                      <IonLabel><strong>Staff Management</strong></IonLabel>
                    </IonItem>
                  </IonMenuToggle>
                )}

                {/* 4. Common Footer Operations */}
                <IonMenuToggle autoHide={false}>
                  <IonItem button routerLink="/profile" lines="none">
                    <IonIcon icon={personOutline} slot="start" />
                    <IonLabel><strong>Profile</strong></IonLabel>
                  </IonItem>
                </IonMenuToggle>

                <IonMenuToggle autoHide={false}>
                  <IonItem button lines="none" detail={false} onClick={handleLogout}>
                    <IonIcon icon={logOutOutline} slot="start" />
                    <IonLabel><strong>Logout</strong></IonLabel>
                  </IonItem>
                </IonMenuToggle>
              </IonList>
            </IonContent>
          </IonMenu>

          <IonRouterOutlet id="main-content">
            {/* Base Routes */}
            <Route exact path="/">
              <Redirect to="/dashboard" />
            </Route>
            <Route exact path="/login" component={Login} />

            {/* General Access Routes */}
            <RoleProtectedRoute exact path="/dashboard" component={Dashboard} allowedRoles={['owner', 'manager', 'hand', 'vet']} userRole={userRole} isAuthenticated={isAuthenticated} />
            <RoleProtectedRoute exact path="/profile" component={Profile} allowedRoles={['owner', 'manager', 'hand', 'vet']} userRole={userRole} isAuthenticated={isAuthenticated} />
            <RoleProtectedRoute exact path="/notifications" component={Notifications} allowedRoles={['owner', 'manager', 'hand', 'vet']} userRole={userRole} isAuthenticated={isAuthenticated} />
            <RoleProtectedRoute exact path="/chat" component={Chat} allowedRoles={['owner', 'manager', 'hand', 'vet']} userRole={userRole} isAuthenticated={isAuthenticated} />

            {/* Core Livestock Management */}
            <RoleProtectedRoute exact path="/insights" component={Insights} allowedRoles={['owner', 'manager', 'vet']} userRole={userRole} isAuthenticated={isAuthenticated} />
            <RoleProtectedRoute exact path="/herds" component={MyHerds} allowedRoles={['owner', 'manager', 'hand', 'vet']} userRole={userRole} isAuthenticated={isAuthenticated} />
            <RoleProtectedRoute exact path="/herdsadd" component={HerdCreatePage} allowedRoles={['owner', 'manager']} userRole={userRole} isAuthenticated={isAuthenticated} />
            <RoleProtectedRoute exact path="/herds/:id" component={HerdDetailView} allowedRoles={['owner', 'manager', 'hand', 'vet']} userRole={userRole} isAuthenticated={isAuthenticated} />
            <RoleProtectedRoute exact path="/animals" component={MyAnimals} allowedRoles={['owner', 'manager', 'hand', 'vet']} userRole={userRole} isAuthenticated={isAuthenticated} />
            <RoleProtectedRoute exact path="/animals/add" component={RegisterAnimalView} allowedRoles={['owner', 'manager', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />
            <RoleProtectedRoute exact path="/herds/:herdId/add-animal" component={RegisterAnimalView} allowedRoles={['owner', 'manager', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />
            <RoleProtectedRoute exact path="/animal/:id" component={AnimalDetailView} allowedRoles={['owner', 'manager', 'hand', 'vet']} userRole={userRole} isAuthenticated={isAuthenticated} />

            {/* Specialized Production Operations */}
            <RoleProtectedRoute exact path="/dairy" component={DairyOperations} allowedRoles={['owner', 'manager', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />
            <RoleProtectedRoute exact path="/dairy/milk-yield/add" component={AddMilkYields} allowedRoles={['owner', 'manager', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />
            <RoleProtectedRoute exact path="/dairy/milk-quality/add" component={AddMilkQuality} allowedRoles={['owner', 'manager', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />
            <RoleProtectedRoute exact path="/dairy/milk-lactation/add" component={AddLactation} allowedRoles={['owner', 'manager', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />
            <RoleProtectedRoute exact path="/beef" component={BeefDashboard} allowedRoles={['owner', 'manager', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />

            {/* Health, Breeding & Measurement Entries */}
            <RoleProtectedRoute exact path="/health" component={HealthAndTreatments} allowedRoles={['owner', 'manager', 'vet', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />
            <RoleProtectedRoute exact path="/health/add" component={AddHealthRecord} allowedRoles={['owner', 'manager', 'vet', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />
            <RoleProtectedRoute exact path="/reproduction" component={Reproduction} allowedRoles={['owner', 'manager', 'vet']} userRole={userRole} isAuthenticated={isAuthenticated} />
            <RoleProtectedRoute exact path="/reproduction/add" component={AddBreedingEvent} allowedRoles={['owner', 'manager', 'vet']} userRole={userRole} isAuthenticated={isAuthenticated} />
            <RoleProtectedRoute exact path="/weights" component={WeightListing} allowedRoles={['owner', 'manager', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />
            <RoleProtectedRoute exact path="/weights/add" component={AddWeight} allowedRoles={['owner', 'manager', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />
            <RoleProtectedRoute exact path="/counting" component={CountingSession} allowedRoles={['owner', 'manager', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />

            {/* Task Management & Core Transfers */}
            <RoleProtectedRoute exact path="/tasks" component={Tasks} allowedRoles={['owner', 'manager', 'hand', 'vet']} userRole={userRole} isAuthenticated={isAuthenticated} />
            <RoleProtectedRoute exact path="/tasks/add" component={AddTask} allowedRoles={['owner', 'manager']} userRole={userRole} isAuthenticated={isAuthenticated} />
            <RoleProtectedRoute exact path="/transfer" component={Transfer} allowedRoles={['owner', 'manager']} userRole={userRole} isAuthenticated={isAuthenticated} />
            <RoleProtectedRoute exact path="/operations/add-transfer" component={AddTransfer} allowedRoles={['owner', 'manager']} userRole={userRole} isAuthenticated={isAuthenticated} />

            {/* Inventory, Supply Chain & Financial Control */}
            <RoleProtectedRoute exact path="/inventory" component={Inventory} allowedRoles={['owner', 'manager', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />
            <RoleProtectedRoute exact path="/inventory/add" component={AddInventoryItem} allowedRoles={['owner', 'manager']} userRole={userRole} isAuthenticated={isAuthenticated} />
            <RoleProtectedRoute exact path="/inventory/history" component={StockHistory} allowedRoles={['owner', 'manager', 'hand']} userRole={userRole} isAuthenticated={isAuthenticated} />
            <RoleProtectedRoute exact path="/sales-expenses" component={FinancePage} allowedRoles={['owner']} userRole={userRole} isAuthenticated={isAuthenticated} />
            <RoleProtectedRoute exact path="/sales-new-entry" component={NewEntryPage} allowedRoles={['owner']} userRole={userRole} isAuthenticated={isAuthenticated} />
            <RoleProtectedRoute exact path="/procurement" component={Procurement} allowedRoles={['owner', 'manager']} userRole={userRole} isAuthenticated={isAuthenticated} />
            <RoleProtectedRoute exact path="/suppliers" component={Suppliers} allowedRoles={['owner', 'manager']} userRole={userRole} isAuthenticated={isAuthenticated} />

            {/* Employee Control (Owner Only) */}
            <RoleProtectedRoute exact path="/staff" component={StaffPage} allowedRoles={['owner']} userRole={userRole} isAuthenticated={isAuthenticated} />

            <Route render={() => <Redirect to="/login" />} />
          </IonRouterOutlet>
        </IonReactRouter>
      </ThemeProvider>
    </IonApp>
  );
};

export default App;