import React from 'react';
import {IonButton, IonCol, IonIcon, IonRow} from "@ionic/react";
import {calculatorOutline, refreshOutline} from "ionicons/icons";

export const BmrControls: React.FC < {onCalculate:() => void; onReset:() => void}> = props => {
    return (
        <IonRow>
            <IonCol size="12" size-md="6" className="ion-text-center">
                <IonButton expand="full" color="success" onClick={props.onCalculate}>
                    <IonIcon slot="start" icon={calculatorOutline}></IonIcon>
                    Calculate
                </IonButton>
            </IonCol>
            <IonCol size="10" size-md="6" className="ion-text-center">
                <IonButton fill="solid" color="medium" onClick={props.onReset}>
                    <IonIcon slot="start" icon={refreshOutline}></IonIcon>
                    Reset
                </IonButton>
            </IonCol>
        </IonRow>
    );
};