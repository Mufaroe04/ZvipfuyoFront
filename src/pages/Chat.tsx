import React, { useState, useRef, useEffect } from 'react';
import { 
  IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, 
  IonTitle, IonToolbar, IonFooter, IonItem, IonInput, IonButton, 
  IonIcon, IonSpinner,
  IonNote
} from '@ionic/react';
import { sendOutline, sparklesOutline } from 'ionicons/icons';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
// Fix: Import addLocalMessage and the new Thunk
import { addLocalMessage, sendMessageToAI } from '../redux/store/slices/chatSlice'; 
import '../components/Chat.css';
import ReactMarkdown from 'react-markdown';

const Chat: React.FC = () => {
  const dispatch = useAppDispatch();
  const { messages, isLoading } = useAppSelector((state) => state.chat);
  const [input, setInput] = useState('');
  const contentRef = useRef<HTMLIonContentElement>(null);

  useEffect(() => {
    contentRef.current?.scrollToBottom(300);
  }, [messages, isLoading]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      text: input,
      sender: 'user' as const,
      timestamp: new Date().toISOString()
    };

    // 1. Add the user's message to the UI locally
    dispatch(addLocalMessage(userMsg));
    
    const currentInput = input;
    setInput('');

    // 2. Dispatch the Thunk to talk to Django/Gemini
    // You can pass an animalId here if the user is on a specific cow's page
    dispatch(sendMessageToAI({ message: currentInput }));
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start"><IonMenuButton /></IonButtons>
          <IonTitle style={{ display: 'flex', alignItems: 'center' }}>
            <IonIcon icon={sparklesOutline} color="secondary" style={{ marginRight: '8px' }} />
            Zvipfuyo AI Consultant
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent ref={contentRef} className="chat-content ion-padding">
        <div className="message-container">
          {messages.map((msg) => (
            <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
              <div className="message-bubble">
                <ReactMarkdown>{msg.text}</ReactMarkdown>
                <div className="message-time">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="message-wrapper ai">
              <div className="message-bubble thinking">
                <IonSpinner name="dots" color="secondary" />
              </div>
            </div>
          )}
          {messages.length === 1 && (
  <div className="suggestion-chips ion-padding-top">
    <IonNote className="ion-margin-bottom">Try asking about:</IonNote>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
      {['Herd Health Summary', 'Low Stock Alerts', 'Weather Risks'].map(hint => (
        <IonButton 
          key={hint} 
          size="small" 
          fill="outline" 
          shape="round" 
          style={{ textTransform: 'none' }}
          onClick={() => {
            setInput(hint);
            // Optional: Auto-submit it
          }}
        >
          {hint}
        </IonButton>
      ))}
    </div>
  </div>
)}
        </div>
      </IonContent>

      <IonFooter className="ion-no-border">
        <IonToolbar className="ion-padding-horizontal">
          <IonItem lines="none" className="chat-input-item">
            <IonInput 
              placeholder="Hello! I'm your Zvipfuyo AI Consultant. Ask me anything about your herd's health, ROI, or the current weather risks." 
              value={input}
              onIonInput={(e) => setInput(e.detail.value!)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <IonButton slot="end" fill="clear" onClick={handleSendMessage} disabled={!input.trim() || isLoading}>
              <IonIcon slot="icon-only" icon={sendOutline} />
            </IonButton>
          </IonItem>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Chat;