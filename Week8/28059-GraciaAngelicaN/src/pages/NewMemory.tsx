import React from "react";
import {
    IonApp,
    IonButtons,
    IonHeader,
    IonPage,
    IonToolbar,
    IonBackButton,
    IonContent,
    IonTitle,
    IonRow, IonCol, IonButton, IonIcon, IonLabel
} from "@ionic/react";
import {camera} from "ionicons/icons";
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';

const NewMemory: React.FC = () => {

    const takePhotoHandler = async () => {
        const image = Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 80,
            width: 500
        });
        console.log(image);
    }

    return(
        <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/"/>
                        </IonButtons>
                        <IonTitle>Add New Memory</IonTitle>
                    </IonToolbar>
                </IonHeader>
            <IonContent>
                <IonRow className="ion-text-center">
                    <IonCol>
                        <div className="image-preview">
                            <h3>No photo chosen.</h3>
                        </div>
                        <IonButton fill="clear" onClick={takePhotoHandler}>
                            <IonIcon slot="start" icon={camera}/>
                            <IonLabel>Take Photo</IonLabel>
                        </IonButton>
                    </IonCol>
                </IonRow>
                <IonRow className="ion-margin-top">
                    <IonCol className="ion-text-center">
                        <IonButton>Add Memory</IonButton>
                    </IonCol>
                </IonRow>
            </IonContent>
        </IonPage>
    )

}

export default NewMemory;