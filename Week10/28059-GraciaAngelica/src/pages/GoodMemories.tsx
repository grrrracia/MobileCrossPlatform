import React, {useContext, useEffect, useState} from "react";
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
import MemoryItem from '../components/MemoryComponent'
import axios, {AxiosResponse} from "axios";

interface MemoryData { id: string, image_path: string, title: string, type: string, base64Url: string, lat: string, lng: string}


const GoodMemories: React.FC = () => {

    const [data,setData] = useState<AxiosResponse>();
    // const [data, setData] = useState<Response>();
    const [memories,setMemories] = useState<Array<MemoryData>>([]);
    const urlGetData = "http://localhost/api/select_all_memories.php";
    const allGoodMemories = memories.filter(allGoodMemories => allGoodMemories.type == "good");
    useEffect(() => {
        axios.get(urlGetData).then((data) => {
            setData(data);
            console.log(data);
            setMemories(data?.data.memories);
        });
    }, []);

    // const memoriesCtx = useContext(MemoriesContext);
    // const goodMemories = memoriesCtx.memories.filter(memory => memory.type === 'good');

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
                <IonGrid>
                    {allGoodMemories.length === 0 && (
                        <IonRow>
                            <IonCol className="ion-text-center">
                                <h2>No good memories found.</h2>
                            </IonCol>
                        </IonRow>
                    )}
                    {allGoodMemories.map(memory => (
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
                                    lat={parseInt(memory.lat)}
                                    lng={parseInt(memory.lng)}/>
                    ))}
                </IonGrid>
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