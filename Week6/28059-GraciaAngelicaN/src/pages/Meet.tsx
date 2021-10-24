import React, {useRef, useState} from "react";
import {
    IonAlert,
    IonApp, IonAvatar, IonButton,
    IonButtons,
    IonContent,
    IonHeader, IonIcon,
    IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {banSharp, chevronForwardOutline, create, trash} from "ionicons/icons";

export const FRIENDS_DATA = [
    {id: 'f1', name: 'John Thor', avatar: 'https://cdn1-production-images-kly.akamaized.net/ydqCQZvoJLLH8CObck_hvOEKTtM=/640x640/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/958815/original/c9bdb9441a642b9ee1a6c83bd6dc4e77hemsworth-dark-world.jpg'},
    {id: 'f2', name: 'John Ness', avatar: 'https://images.unsplash.com/flagged/photo-1566127992631-137a642a90f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&w=1000&q=80'},
    {id: 'f3', name: 'John Doe', avatar: 'https://847542.smushcdn.com/1791561/wp-content/uploads/2021/03/bullfrog.png?lossy=1&strip=1&webp=1'},
]

const callFriendHandler = () => {
    console.log("Calling...");
};

const Meet: React.FC = () => {
    const slidingOptionsRef = useRef<HTMLIonItemSlidingElement>(null);
    const blockFriendHandler = (event: React.MouseEvent) => {
        // event.stopPropagation();
        slidingOptionsRef.current?.closeOpened();
        console.log("Blocking...");
    };

    const deleteFriendHandler = (event: React.MouseEvent) => {
        // event.stopPropagation();
        slidingOptionsRef.current?.closeOpened();
        console.log("Deleting...");
    };

    const editFriendHandler = (event: React.MouseEvent) => {
        // event.stopPropagation();
        slidingOptionsRef.current?.closeOpened();
        console.log("Editing...");
    };

    return(
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonMenuButton/>
                        </IonButtons>
                        <IonTitle>Meet</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    {FRIENDS_DATA.map(friend => (
                        <IonItemSliding key={friend.id} ref={slidingOptionsRef}>
                            <IonItemOptions side="start">
                                <IonItemOption color="danger" onClick={blockFriendHandler}>
                                    <IonIcon icon={banSharp} slot="icon-only"/>
                                </IonItemOption>
                                <IonItemOption color="warning" onClick={deleteFriendHandler}>
                                    <IonIcon icon={trash} slot="icon-only"/>
                                </IonItemOption>
                            </IonItemOptions>
                            <IonItemOptions side="end">
                                <IonItemOption color="warning" onClick={editFriendHandler}>
                                    <IonIcon icon={create} slot="icon-only"/>
                                </IonItemOption>
                            </IonItemOptions>
                            <IonItem key={friend.id}
                                 lines="full"
                                 button
                                 onClick={callFriendHandler}>
                                <IonAvatar slot="start">
                                    <img src={friend.avatar}/>
                                </IonAvatar>
                            <IonLabel>{friend.name}</IonLabel>
                                    <IonIcon icon={chevronForwardOutline} slot="end"/>
                        </IonItem>
                        </IonItemSliding>
                    ))}
                </IonContent>
            </IonPage>

    );
}
export default Meet;