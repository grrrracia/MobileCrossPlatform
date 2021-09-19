import React from 'react';
import {IonCard, IonCardContent, IonCol, IonGrid, IonRow} from "@ionic/react";
import './BmiResult.css'

export const BmiResult: React.FC < {
    calculatedBMIValue: number,
    categorizedBMI: string,
    coloredCardBMI: string;
}> = props =>{
    return (
        <IonRow>
            <IonCol>
                    <IonCard id="result" color={props.coloredCardBMI}>
                        <IonCardContent className="ion-text-center">
                            <h2>{props.calculatedBMIValue}</h2>
                            <h1>{props.categorizedBMI}</h1>
                        </IonCardContent>
                    </IonCard>
            </IonCol>
        </IonRow>
    );

}
