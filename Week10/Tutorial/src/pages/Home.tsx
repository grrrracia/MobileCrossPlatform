import { IonAvatar, IonButton, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import ExploreContainer from '../components/ExploreContainer';
import axios, {AxiosResponse} from "axios";

interface Student { nim: string, nama: string, prodi: string, foto: string }

const Home: React.FC = () => {

    const [dataPost,setDataPost] = useState('');
    // const [data,setData] = useState<Response>();
    const [data,setData] = useState<AxiosResponse>();
    const [students,setStudents] = useState<Array<Student>>([]);
    const urlGetData = "http://localhost/api/select_all_students.php";
    const urlPostData = "http://localhost/api/insert_new_student.php";
    const nim = useRef<HTMLIonInputElement>(null);
    const nama = useRef<HTMLIonInputElement>(null);
    const prodi = useRef<HTMLIonInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File>();

    const fileChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedFile(event.target!.files![0]);
    };

    const insertHandler = () => {
        const formData = new FormData();

        const inNim = nim.current?.value as string;
        const inNama = nama.current?.value as string;
        const inProdi = prodi.current?.value as string;

        formData.append('nim', inNim);
        formData.append('nama', inNama);
        formData.append('prodi', inProdi);
        formData.append('foto', selectedFile as File);

        // fetch(urlPostData, {
        //   method: "post",
        //   body: formData
        // }).then(response => response.text()).then((dataPost)=>{
        //   setDataPost(dataPost);
        //   console.log(dataPost);
        // })

        axios.post(urlPostData, formData).then(res => {
            console.log(res);
        });
    };

    // useEffect(() => {
    //   fetch(urlGetData)
    //     .then(response => response.json())
    //     .then((data)=>{
    //       setData(data)
    //       console.log(data.students);
    //       setStudents(data.students);
    //     });
    // }, []);

    useEffect(() => {
        axios.get(urlGetData).then((data) => {
            setData(data);
            console.log(data);
            setStudents(data?.data.students);
        });
    }, []);

    // useEffect(()=>{
    //   console.log(data);
    //   setStudents(data?.data.students);
    // }, [data]);

    const getAllDataHandler = () => {
        fetch(urlGetData)
            .then(response => response.json())
            .then((data) => {
                setData(data)
                console.log(data);
            });
    };

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
                        <IonItem key={student.nim}>
                            <IonAvatar slot="start">
                                <img src={"http://localhost/api/" + (student.foto ? student.foto : 'uploads/man.jpg')} />
                            </IonAvatar>
                            <IonLabel>
                                {student.nim}<br/>
                                {student.nama}<br/>
                                {student.prodi}
                            </IonLabel>
                        </IonItem>
                    ))}
                </IonList>
                <IonButton onClick={getAllDataHandler}>Get All Data</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Home;