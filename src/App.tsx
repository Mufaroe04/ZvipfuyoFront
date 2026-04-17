import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
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
  waterOutline
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
  
  // Pull unread count from Redux
  const unreadCount = useSelector((state: RootState) => state.notifications.unreadCount);
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

  return (

    <IonApp>
      <ThemeProvider theme={zvipfuyoTheme}>
      <IonReactRouter>
        <IonMenu contentId="main-content" type="overlay">
          <IonHeader>
            <IonToolbar color="primary">
              <IonTitle>Zvipfuyo Menu</IonTitle>
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

              <IonMenuToggle autoHide={false}>
                <IonItem button routerLink="/profile" lines="none">
                  <IonIcon icon={personOutline} slot="start" />
                  <IonLabel><strong>Profile</strong></IonLabel>
                </IonItem>
              </IonMenuToggle>

              <IonMenuToggle autoHide={false}>
                <IonItem button lines="none" detail={false}>
                  <IonIcon icon={logOutOutline} slot="start"  />
                  <IonLabel ><strong>Logout</strong></IonLabel>
                </IonItem>
              </IonMenuToggle>
            </IonList>
          </IonContent>
        </IonMenu>

        <IonRouterOutlet id="main-content">
          <Route exact path="/"><Redirect to="/dashboard" /></Route>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/scan" component={Scan} />
          <Route exact path="/herds" component={MyHerds} />
          <Route exact path="/herdsadd" component={HerdCreatePage} />
          <Route exact path="/herds/:id" component={HerdDetailView} />
          <Route exact path="/animals" component={MyAnimals} />
          <Route exact path="/herds/:herdId/add-animal" component={RegisterAnimalView} />
          <Route exact path="/animals/add" component={RegisterAnimalView} />
          <Route exact path="/animal/:id" component={AnimalDetailView} />
          <Route exact path="/dairy" component={DairyOperations} />
          <Route exact path="/dairy/milk-yield/add" component={AddMilkYields} />
          <Route exact path="/dairy/milk-quality/add" component={AddMilkQuality} />
          <Route exact path="/dairy/milk-lactation/add" component={AddLactation} />
          <Route exact path="/health" component={HealthAndTreatments} />
          <Route exact path="/health/add" component={AddHealthRecord} />
          <Route exact path="/reproduction" component={Reproduction} />
          <Route exact path="/reproduction/add" component={AddBreedingEvent} />
          <Route exact path="/weights" component={WeightListing} />
          <Route exact path="/weights/add" component={AddWeight} />
          <Route exact path="/insights" component={Insights} />
          <Route exact path="/counting" component={CountingSession} />
          <Route exact path="/tasks" component={Tasks} />
          <Route exact path="/tasks/add" component={AddTask} />
          <Route exact path="/transfer" component={Transfer} />
          <Route exact path="/operations/add-transfer" component={AddTransfer} />
          <Route exact path="/inventory" component={Inventory} />
          <Route exact path="/inventory/add" component={AddInventoryItem} />
          <Route path="/inventory/history" exact component={StockHistory} />
          <Route exact path="/procurement" component={Procurement} />
          <Route exact path="/suppliers" component={Suppliers} />
          <Route exact path="/notifications" component={Notifications} />
          <Route exact path="/chat" component={Chat} />
          <Route exact path="/profile" component={Profile} />
        </IonRouterOutlet>
      </IonReactRouter>
      </ThemeProvider>
    </IonApp>
  );
};

export default App;