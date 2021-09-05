import React from 'react';
import {IonCard, IonCardContent, IonCol, IonRow} from "@ionic/react";

export const BmiResult: React.FC < {
    calculatedBMIValue: number,
    categorizedBMI: string;
}> = props =>{
    return (
        <IonRow>
            <IonCol>
                <IonCard>
                    <IonCardContent className="ion-text-center">
                        <h2>{props.calculatedBMIValue}</h2>
                        <h1>{props.categorizedBMI}</h1>
                    </IonCardContent>
                </IonCard>
            </IonCol>
        </IonRow>
    );

}
