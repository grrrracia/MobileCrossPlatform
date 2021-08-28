import { Redirect, Route } from 'react-router-dom';
import {
  IonApp, IonButton, IonCard, IonCardContent,
  IonCol, IonContent,
  IonGrid,
  IonHeader, IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonRouterOutlet,
  IonRow,
  IonTitle, IonToolbar
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

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

/* Theme variables */
import './theme/variables.css';
import {calculatorOutline, refreshOutline} from "ionicons/icons";
import {useRef, useState} from "react";

const App: React.FC = () => {
  const [calculatedBMI, setCalculatedBMI] = useState<number>();
  const [categoryBMI, setCategoryBMI] = useState<string>();
  const heightInputRef = useRef<HTMLIonInputElement>(null);
  const weightInputRef = useRef<HTMLIonInputElement>(null);

  const calculateBMI = () => {
    const enteredWeight = weightInputRef.current!.value;
    const enteredHeight = heightInputRef.current!.value;

    let category = "";

    if (!enteredWeight || !enteredHeight){
      return;
    }

    const bmi = +enteredWeight/ ((+enteredHeight/100) * (+enteredHeight/100));

    if (bmi < 18.5){
      category = "Kurus";
    }else if (bmi < 24.9){
      category = "Normal";
    }else if (bmi < 29.9){
      category = "Gemuk";
    }else if (bmi >= 30){
      category = "Obesitas";
    }

    // console.log(bmi);
    setCalculatedBMI(bmi);
    setCategoryBMI(category);
  };
  const resetInputs = () => {
    weightInputRef.current!.value = '';
    heightInputRef.current!.value = '';
    setCategoryBMI('');
  };

  return (
  <IonApp>
    <IonHeader>
      <IonToolbar>
        <IonTitle>BMI Calculator</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent className="ion-padding">
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">Tinggi Badan (cm)</IonLabel>
              <IonInput ref={heightInputRef}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonItem>
              <IonLabel position="floating">Berat Badan (kg)</IonLabel>
              <IonInput ref={weightInputRef}></IonInput>
            </IonItem>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol className="ion-text-left">
            <IonButton onClick={calculateBMI}>
              <IonIcon slot="start" icon={calculatorOutline}></IonIcon>
              Calculate
            </IonButton>
          </IonCol>
          <IonCol className="ion-text-right">
            <IonButton onClick={resetInputs}>
              <IonIcon slot="start" icon={refreshOutline}></IonIcon>
              Reset
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>

      {calculatedBMI && categoryBMI &&(<IonRow>
        <IonCol>
          <IonCard>
            <IonCardContent className="ion-text-center">
              <h2>{calculatedBMI}</h2>
              <h1>{categoryBMI}</h1>
            </IonCardContent>
          </IonCard>
        </IonCol>
      </IonRow>)}
    </IonContent>
  </IonApp>
  )
};

export default App;
