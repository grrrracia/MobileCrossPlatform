import { IonAvatar, IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import "../firebaseConfig";

import { collection, addDoc, getFirestore, getDocs } from "firebase/firestore";

import { getStorage, uploadBytes, ref, getDownloadURL } from 'firebase/storage';

const Home: React.FC = () => {

    const nim = useRef<HTMLIonInputElement>(null);
    const nama = useRef<HTMLIonInputElement>(null);
    const prodi = useRef<HTMLIonInputElement>(null);
    const [fileName,setFilename] = useState('');
    const [selectedFile, setSelectedFile] = useState<File>();
    const storage = getStorage();

    const db = getFirestore();
    const [students,setStudents] = useState<Array<any>>([]);

    const addData = async(url: string) => {
        try {
            const docRef = await addDoc(collection(db, "students"), {
                nim: nim.current?.value,
                nama: nama.current?.value,
                prodi: prodi.current?.value,
                foto: fileName,
                fotoUrl: url
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFile(event.target!.files![0]);
        setFilename(event.target!.files![0].name);
    };

    const insertHandler = async() => {
        const storageRef = ref(storage, fileName);
        uploadBytes(storageRef, selectedFile as Blob).then(() => {
            console.log('upload file success');
            getDownloadURL(ref(storage, fileName)).then((url) =>{
                addData(url);
            })
        })
    };

    useEffect(()=>{
        async function getData() {
            const querySnapshot = await getDocs(collection(db, "students"));
            console.log('querySnapshot:',querySnapshot);
            setStudents(querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id})));

            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} = > ${doc.data}`);
                console.log('doc:',doc);
            })
        }

        getData();
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Blank</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonItem>
                    <IonLabel position="floating">NIM</IonLabel>
                    <IonInput ref={nim}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Nama</IonLabel>
                    <IonInput ref={nama}></IonInput>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Prodi</IonLabel>
                    <IonInput ref={prodi}></IonInput>
                </IonItem>
                <IonItem>
                    <input type="file" onChange={fileChangeHandler}/>
                </IonItem>
                <IonButton onClick={insertHandler}>Simpan</IonButton>
                <IonList>
                    {students.map(student => (
                        <IonItem key={student.id}>
                            <IonAvatar slot="start">
                                <img src={student.fotoUrl} />
                            </IonAvatar>
                            <IonLabel>
                                {student.nim}<br/>
                                {student.nama}<br/>
                                {student.prodi}
                            </IonLabel>
                        </IonItem>
                    ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
};

export default Home;