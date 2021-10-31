import React from "react";
import {
    IonButton,
    IonButtons,
    IonContent, IonFab, IonFabButton,
    IonHeader,
    IonIcon,
    IonPage,
    IonTitle,
    IonToolbar,
    isPlatform
} from "@ionic/react";
import {addOutline} from "ionicons/icons";

const GoodMemories: React.FC = () => {

    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Good Memories</IonTitle>
                    {!isPlatform('android') &&(
                        <IonButtons slot="end">
                            <IonButton routerLink={`/tabs/newmemory`}>
                                <IonIcon icon={addOutline} />
                            </IonButton>
                        </IonButtons>
                    )}
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <h2>Good Memories</h2>


                {isPlatform('android') && (
                    <IonFab horizontal="end" vertical="bottom" slot="fixed">
                        <IonFabButton color="secondary" routerLink={`/tabs/newmemory`}>
                            <IonIcon icon={addOutline} />
                        </IonFabButton>
                    </IonFab>
                )}
            </IonContent>
        </IonPage>
    )
};

export default GoodMemories;