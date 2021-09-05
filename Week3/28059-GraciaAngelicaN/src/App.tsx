import { Redirect, Route } from 'react-router-dom';
import {
  IonAlert,
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

import {BmiControls} from './components/BmiControls';
import InputControl from "./components/InputControl";
import {BmiResult} from "./components/BmiResult";

const App: React.FC = () => {
  const [calculatedBMI, setCalculatedBMI] = useState<number>();
  const [categoryBMI, setCategoryBMI] = useState<string>();
  const heightInputRef = useRef<HTMLIonInputElement>(null);
  const weightInputRef = useRef<HTMLIonInputElement>(null);

  const [error, setError] = useState<string>();
  const [calcUnits, setCalsUnits] = useState<'cmkg' | 'ftlbs'>('cmkg');

  const selectCalcUnitHandler = (selectedValue: 'cmkg' | 'ftlbs') => {
    setCalsUnits(selectedValue);
  };

  const calculateBMI = () => {
    let enteredWeight = weightInputRef.current!.value;
    let enteredHeight = heightInputRef.current!.value;

    let category = "";

    if (!enteredWeight || !enteredHeight || +enteredHeight <= 0 || +enteredWeight <= 0){
      setError('Please enter a valid (non-negative) input number');
      return;
    }

    let  bmi = +enteredWeight/ ((+enteredHeight/100) * (+enteredHeight/100));

    if (calcUnits == 'cmkg'){
      bmi = +enteredWeight/ ((+enteredHeight/100) * (+enteredHeight/100));
    }

    if (calcUnits == 'ftlbs'){
      bmi = ((+enteredWeight)/ (((+enteredHeight)*12) * ((+enteredHeight)*12)))*703;
    }

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

  let clearError;
  return (
      <>
        <IonAlert
            isOpen={!!error}
            message={error}
            buttons={[
              {text: 'Okay', handler: clearError}
            ]}/>

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
                  <InputControl selectedValue={calcUnits} onSelectValue={selectCalcUnitHandler}/>
                  <IonItem>
                    <IonLabel position="floating">Tinggi Badan ({calcUnits === 'cmkg' ? 'cm' : 'feet'})</IonLabel>
                    <IonInput ref={heightInputRef}></IonInput>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonLabel position="floating">Berat Badan ({calcUnits === 'cmkg' ? 'kg' : 'lbs'})</IonLabel>
                    <IonInput ref={weightInputRef}></IonInput>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <BmiControls onCalculate={calculateBMI} onReset={resetInputs}/>
              </IonRow>
            </IonGrid>

            {calculatedBMI && categoryBMI &&(
                <BmiResult calculatedBMIValue={calculatedBMI} categorizedBMI={categoryBMI}/>
            )}

          </IonContent>

        </IonApp>
      </>
  )
};

export default App;
