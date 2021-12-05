import React, {useContext} from "react";
import {
    IonButton,
    IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCol,
    IonContent, IonFab, IonFabButton, IonGrid,
    IonHeader,
    IonIcon,
    IonPage, IonRow,
    IonTitle,
    IonToolbar,
    isPlatform
} from "@ionic/react";
import {addOutline} from "ionicons/icons";
import MemoriesContext from "../data/memories-context";
import MemoryItem from "../components/MemoryComponent";

const BadMemories: React.FC = () => {
    const memoriesCtx = useContext(MemoriesContext);
    const badMemories = memoriesCtx.memories.filter(memory => memory.type === 'bad');
    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Bad Memories</IonTitle>
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
                <IonGrid>
                    {badMemories.length === 0 && (
                        <IonRow>
                            <IonCol className="ion-text-center">
                                <h2>No bad memories found.</h2>
                            </IonCol>
                        </IonRow>
                    )}
                    {badMemories.map(memory => (
                        // <IonRow key={memory.id}>
                        //     <IonCol>
                        //         <IonCard>
                        //             <img src={memory.base64Url} alt={memory.title} />
                        //             <IonCardHeader>
                        //                 <IonCardTitle>{memory.title}</IonCardTitle>
                        //             </IonCardHeader>
                        //         </IonCard>
                        //     </IonCol>
                        // </IonRow>
                        <MemoryItem key={memory.id}
                                    id={memory.id}
                                    base64Url={memory.base64Url}
                                    title={memory.title}
                                    lat={memory.lat}
                                    lng={memory.lng}/>
                    ))}
                </IonGrid>

                <h2>Bad Memories</h2>


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

export default BadMemories;