import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { 
  IonMenu, IonHeader, IonToolbar, IonContent, IonList, IonItem, 
  IonIcon, IonLabel, IonMenuToggle, IonText 
} from '@ionic/react';
import { Box, Typography } from '@mui/material';
import { Grass } from '@mui/icons-material';
import { 
  notificationsOutline, chatbubblesOutline, peopleOutline, 
  personOutline, logOutOutline 
} from "ionicons/icons";

import { RootState, AppDispatch } from '../redux/store';
import { logout } from '../redux/store/slices/authSlice';
import { MENU_ITEMS } from '../config/menuItems';
import { UserRole } from '../types/types';

interface AppMenuProps {
  userRole: UserRole;
}

export const AppMenu: React.FC<AppMenuProps> = ({ userRole }) => {
  const dispatch = useDispatch<AppDispatch>();
  const history = useHistory();
  const unreadCount = useSelector((state: RootState) => state.notifications.unreadCount);

  const handleLogout = () => {
    dispatch(logout());
    history.replace("/login");
  };

  return (
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
          {/* Core Operations Menu Items */}
          {MENU_ITEMS.filter(item => item.roles.includes(userRole)).map((item) => (
            <IonMenuToggle key={item.url} autoHide={false}>
              <IonItem button routerLink={item.url} lines="none">
                <IonIcon icon={item.icon} slot="start" />
                <IonLabel><strong>{item.label}</strong></IonLabel>
              </IonItem>
            </IonMenuToggle>
          ))}

          {/* Communication Links */}
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

          {/* Employee Management (Only Owner) */}
          {userRole === 'owner' && (
            <IonMenuToggle autoHide={false}>
              <IonItem button routerLink="/staff" lines="none">
                <IonIcon icon={peopleOutline} slot="start" />
                <IonLabel><strong>Staff Management</strong></IonLabel>
              </IonItem>
            </IonMenuToggle>
          )}

          {/* Secondary Options */}
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
  );
};