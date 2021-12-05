import React, {useContext, useRef, useState} from "react";
import {
    IonApp,
    IonButtons,
    IonHeader,
    IonPage,
    IonToolbar,
    IonBackButton,
    IonContent,
    IonTitle,
    IonRow, IonCol, IonButton, IonIcon, IonLabel, IonInput, IonSelect, IonSelectOption
} from "@ionic/react";
import {camera} from "ionicons/icons";
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import {Directory, Filesystem} from "@capacitor/filesystem";
// import {base64FromPath} from "@ionic/react-hooks/filesystem";
import {base64FromPath} from '@capacitor-community/filesystem-react';
import {useHistory} from "react-router";
import MemoriesContext from "../data/memories-context";

const NewMemory: React.FC = () => {
    const [takenPhoto, setTakenPhoto] = useState<{
        path: string | undefined;
        preview: string
    }>();

    const [chosenMemoryType, setChosenMemoryType] = useState<'good' | 'bad'>('good');
    const titleRef = useRef<HTMLIonInputElement>(null);

    const selectMemoryTypeHandler = (event: CustomEvent) => {
        const selectedMemoryType = event.detail.value;
        setChosenMemoryType(selectedMemoryType);
    };

    const takePhotoHandler = async () => {
        const photo = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 80,
            width: 500
        });
        console.log(photo);

        if(!photo || /*!photo.path || */ !photo.webPath){
            return;
        }

        setTakenPhoto({
            path: photo.path,
            preview: photo.webPath
        });
    };

    const memoriesCtx = useContext(MemoriesContext);
    const history = useHistory();

    const addMemoryHandler = async () => {
        const enteredTitle = titleRef.current?.value;
        if(!enteredTitle || enteredTitle.toString().trim().length === 0 || !takenPhoto || !chosenMemoryType){
            return;
        }
        const fileName = new Date().getTime() + '.jpeg';
        const base64 = await base64FromPath(takenPhoto!.preview);
        await Filesystem.writeFile({
            path: fileName,
            data: base64,
            directory: Directory.Data
        });

        memoriesCtx.addMemory(fileName, base64, enteredTitle.toString(), chosenMemoryType);
        history.length > 0 ? history.goBack() : history.replace('/good-memories');
    };

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
                <IonRow className="ion-margin-top">
                    <IonCol className="ion-text-center">
                        <IonInput type="text" ref={titleRef} placeholder="Insert Memory Title"></IonInput>
                    </IonCol>
                </IonRow>
                <IonRow>
                    <IonCol>
                        <IonSelect onIonChange={selectMemoryTypeHandler} placeholder="Select One">
                            <IonSelectOption value="good">Good Memory</IonSelectOption>
                            <IonSelectOption value="bad">Bad Memory</IonSelectOption>
                        </IonSelect>
                    </IonCol>
                </IonRow>
                <IonRow className="ion-text-center">
                    <IonCol>
                        <div className="image-preview">
                            {!takenPhoto && <h3>No photo chosen.</h3>}
                            {takenPhoto && <img src={takenPhoto.preview} alt="Preview"/>}
                        </div>
                        <IonButton fill="clear" onClick={takePhotoHandler}>
                            <IonIcon slot="start" icon={camera}/>
                            <IonLabel>Take Photo</IonLabel>
                        </IonButton>
                    </IonCol>
                </IonRow>
                <IonRow className="ion-margin-top">
                    <IonCol className="ion-text-center">
                        <IonButton onClick={addMemoryHandler}>Add Memory</IonButton>
                    </IonCol>
                </IonRow>
            </IonContent>
        </IonPage>
    )

}

export default NewMemory;