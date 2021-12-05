
import { IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle } from "@ionic/react";
import React from "react";
import {LoadScript,GoogleMap,Marker} from '@react-google-maps/api';

const MemoryItem: React.FC<{ id: string, base64Url: string, title: string, lat:number, lng:number }> = props => {
    const containerStyle = {
        width: '100%',
        height: '200px'
    }

    return (
        <IonRow key={props.id}>
            <IonCard>
                <IonCardHeader>
                    <IonCardTitle>{props.title}</IonCardTitle>
                </IonCardHeader>
                <img src={props.base64Url} alt={props.title} />
                <LoadScript googleMapsApiKey='AIzaSyBGh5bhBwUd_m6CtIeBaIDpX6SRe-Z-goE'>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={{ lat: props.lat, lng: props.lng }}
                        zoom={10}>
                        <Marker position={{ lat: props.lat, lng: props.lng }} />
                    </GoogleMap>
                </LoadScript>
            </IonCard>
        </IonRow>
    );
}

export default MemoryItem;