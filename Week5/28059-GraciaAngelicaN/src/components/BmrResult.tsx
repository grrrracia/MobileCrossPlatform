import React from 'react';
import {IonCard, IonCardContent, IonCol, IonGrid, IonRow} from "@ionic/react";

export const BmrResult: React.FC < {
    calculatedBMRValue: number,
}> = props =>{
    return (
        <IonRow>
            <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
                <IonCard>
                    <IonCardContent className="ion-text-center">
                        <h1>BMR = {props.calculatedBMRValue} Calories/Day</h1>
                        <h2>Daily Calorie Needs Based on Activity Level</h2>
                        <IonGrid>
                            <IonRow>
                                <IonCol>
                                    <h3 style={{fontWeight: "bold", textAlign: "left"}}>Activity Level</h3>
                                </IonCol>
                                <IonCol>
                                    <h3 style={{fontWeight: "bold"}}>Calorie</h3>
                                </IonCol>
                            </IonRow>

                            <IonRow>
                                <IonCol>
                                    <h3 style={{textAlign: "left"}}>Sedentary: little or no exercise</h3>
                                </IonCol>
                                <IonCol>
                                    <h3>{(props.calculatedBMRValue)*1.2}</h3>
                                </IonCol>
                            </IonRow>

                            <IonRow>
                                <IonCol>
                                    <h3 style={{textAlign: "left"}}>Exercise 1-3 times/week</h3>
                                </IonCol>
                                <IonCol>
                                    <h3>{(props.calculatedBMRValue)*1.375}</h3>
                                </IonCol>
                            </IonRow>

                            <IonRow>
                                <IonCol>
                                    <h3 style={{textAlign: "left"}}>Exercise 4-5 times/week:</h3>
                                </IonCol>
                                <IonCol>
                                    <h3>{(props.calculatedBMRValue)*1.55}</h3>
                                </IonCol>
                            </IonRow>

                            <IonRow>
                                <IonCol>
                                    <h3 style={{textAlign: "left"}}>Daily exercise or intense exercise 3-4 times/week</h3>
                                </IonCol>
                                <IonCol>
                                    <h3>{(props.calculatedBMRValue)*1.725}</h3>
                                </IonCol>
                            </IonRow>

                            <IonRow>
                                <IonCol>
                                    <h3 style={{textAlign: "left"}}>Intense exercise 6-7 times/week</h3>
                                </IonCol>
                                <IonCol>
                                    <h3>{(props.calculatedBMRValue)*1.9}</h3>
                                </IonCol>
                            </IonRow>

                        </IonGrid>
                    </IonCardContent>
                </IonCard>
            </IonCol>
        </IonRow>
    );

}
