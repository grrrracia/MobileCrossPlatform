import { Redirect, Route } from 'react-router-dom';
import {
    IonAlert,
    IonApp, IonButton, IonCard, IonCardContent,
    IonCol, IonContent,
    IonGrid,
    IonHeader, IonIcon,
    IonInput,
    IonItem,
    IonLabel, IonPage,
    IonRouterOutlet,
    IonRow,
    IonTitle, IonToolbar,
    IonBackButton, IonList, IonRadioGroup, IonListHeader, IonRadio
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './Home';

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
import '../theme/variables.css';
import {calculatorOutline, refreshOutline} from "ionicons/icons";
import React, {useRef, useState} from "react";

import {BmrControls} from '../components/BmrControls';
import InputControl from "../components/InputControl";
import {BmrResult} from "../components/BmrResult";

const App: React.FC = () => {
    const [calculatedBMR, setCalculatedBMR] = useState<number>();
    const heightInputRef = useRef<HTMLIonInputElement>(null);
    const weightInputRef = useRef<HTMLIonInputElement>(null);
    const ageInputRef = useRef<HTMLIonInputElement>(null);

    const [error, setError] = useState<string>();
    const [calcUnits, setCalsUnits] = useState<'cmkg' | 'ftlbs'>('cmkg');

    const selectCalcUnitHandler = (selectedValue: 'cmkg' | 'ftlbs') => {
        setCalsUnits(selectedValue);
    };

    const calculateBMR = () => {
        let enteredWeight = weightInputRef.current!.value;
        let enteredHeight = heightInputRef.current!.value;
        let chosenGender = gender;
        let enteredAge = ageInputRef.current!.value;

        if (!enteredWeight || !enteredHeight || +enteredHeight <= 0 || +enteredWeight <= 0){
            setError('Please enter a valid (non-negative) height and weight');
            return;
        }

        if (!enteredAge || +enteredAge <= 0){
            setError('Please enter a valid (non-negative) age');
            return;
        }

        if (!chosenGender){
            setError('Please choose a gender');
            return;
        }

        let bmr = 0;

        if (calcUnits == 'cmkg'){
            if (chosenGender == 'female'){
                bmr = 655 + (9.6 * +enteredWeight) + (1.8 * +enteredHeight) - (4.7 * +enteredAge);
            }else if (chosenGender == 'male'){
                bmr = 66 + (13.7 * +enteredWeight) + (5 * +enteredHeight) - (6.8 * +enteredAge);
            }
        }

        if (calcUnits == 'ftlbs'){
            if (chosenGender == 'female'){
                bmr = 655 + (4.35 * +enteredWeight) + (4.7 * 12 * +enteredHeight) - (4.7 * +enteredAge);
            }else if (chosenGender == 'male'){
                bmr = 66 + (6.23 * +enteredWeight) + (12.7 * 12 * +enteredHeight) - (6.8 * +enteredAge);
            }
        }

        setCalculatedBMR(bmr);
    };
    const resetInputs = () => {
        weightInputRef.current!.value = '';
        heightInputRef.current!.value = '';
        ageInputRef.current!.value = '';
    };

    let clearError;
    let gender: any;

    return (
        <IonPage>
            <IonAlert
                isOpen={!!error}
                message={error}
                buttons={[
                    {text: 'Okay', handler: clearError}
                ]}/>

            <IonApp>
                <IonHeader>
                    <IonToolbar>
                        <IonButton slot="start">
                            <IonBackButton defaultHref="/"></IonBackButton>
                        </IonButton>
                        <IonTitle>BMR Calculator</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <InputControl selectedValue={calcUnits} onSelectValue={selectCalcUnitHandler}/>
                                <IonRow>
                                    <IonCol>
                                        <IonItem>
                                            <IonLabel position="floating">Age</IonLabel>
                                            <IonInput ref={ageInputRef}></IonInput>
                                        </IonItem>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol>
                                        <IonRadioGroup onIonChange={
                                            (e) => gender = e.detail.value}>
                                            <IonListHeader>
                                                <IonLabel>Gender</IonLabel>
                                            </IonListHeader>
                                            <IonRow>
                                                <IonItem>
                                                    <IonLabel>Male</IonLabel>
                                                    <IonRadio slot="start" color="success" value="male"/>
                                                </IonItem>
                                                <IonItem>
                                                    <IonLabel>Female</IonLabel>
                                                    <IonRadio slot="start" color="success" value="female"/>
                                                </IonItem>
                                            </IonRow>
                                        </IonRadioGroup>
                                    </IonCol>
                                </IonRow>
                                <IonItem>
                                    <IonLabel position="floating">Tinggi Badan
                                        ({calcUnits === 'cmkg' ? 'cm' : 'feet'})</IonLabel>
                                    <IonInput ref={heightInputRef}></IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <IonCol>
                                <IonItem>
                                    <IonLabel position="floating">Berat Badan
                                        ({calcUnits === 'cmkg' ? 'kg' : 'lbs'})</IonLabel>
                                    <IonInput ref={weightInputRef}></IonInput>
                                </IonItem>
                            </IonCol>
                        </IonRow>
                        <IonRow>
                            <BmrControls onCalculate={calculateBMR} onReset={resetInputs}/>
                        </IonRow>
                    </IonGrid>

                    {calculatedBMR && (
                        <BmrResult calculatedBMRValue={calculatedBMR}/>
                    )}
                </IonContent>
            </IonApp>
        </IonPage>
    )
};

export default App;
