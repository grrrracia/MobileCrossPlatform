import {IonIcon, IonLabel, IonRouterOutlet, IonTab, IonTabBar, IonTabButton, IonTabs} from "@ionic/react";
import {Redirect, Route} from "react-router";
import Meet from "./Meet";
import Mail from "./Mail";
import {mailOutline, videocamOutline} from "ionicons/icons";
import Spam from "./Spam";

const MailTabs: React.FC = () => {
    return(
        <IonTabs>
            <IonRouterOutlet>
                <Redirect exact path="/tabs" to="/tabs/mail" />
                <Route exact path="/tabs/mail" component={Mail} />
                <Route exact path="/tabs/meet" component={Meet} />
                <Route exact path="/tabs/spam" component={Spam} />
            </IonRouterOutlet>
            <IonTabBar slot="bottom">
                <IonTabButton tab="mail" href="/tabs/mail">
                    <IonIcon icon={mailOutline} />
                    <IonLabel>Mail</IonLabel>
                </IonTabButton>
                <IonTabButton tab="meet" href="/tabs/meet">
                    <IonIcon icon={videocamOutline} />
                    <IonLabel>Meet</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </IonTabs>
    )
}

export default MailTabs;